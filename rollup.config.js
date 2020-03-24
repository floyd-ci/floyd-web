import * as fs from "fs";
import * as path from "path";

import browsersync from "rollup-plugin-browsersync";
import copy from "rollup-plugin-copy";
import postcss from "rollup-plugin-postcss";
import purgecss from "@fullhuman/postcss-purgecss";
import replace from "@rollup/plugin-replace";
import resolve from "@rollup/plugin-node-resolve";
import sucrase from "@rollup/plugin-sucrase";
import svelte from "rollup-plugin-svelte";
import {terser} from "rollup-plugin-terser";

const production = !process.env.ROLLUP_WATCH;

function handle404(req, res, next) {
  const {pathname} = new URL(req.url, "https://example.org");
  const fileExists = fs.existsSync("dist" + pathname);
  if (!fileExists && !pathname.startsWith("/browser-sync/")) {
    req.url = "/404.html";
  }

  return next();
}

function fromEntries(entries) {
  return [...entries].reduce((obj, [key, val]) => {
    obj[key] = val;
    return obj;
  }, {});
}

function mkRoutes(cwd) {
  return fromEntries(
    fs
      .readdirSync(cwd)
      .map(item => {
        const resolved = path.join(cwd, item);
        const is_dir = fs.statSync(resolved).isDirectory();
        const ext = path.extname(item);
        const name = path.basename(item, ext);

        if (!is_dir && ext != ".svelte") {
          return;
        }

        let key = name == "index" ? "@" : name == "_header" ? "/" : name;

        const value = is_dir
          ? mkRoutes(resolved)
          : name == "index" || name == "_header"
          ? resolved
          : {"@": resolved};

        const match = /^\[(\.{3})?([^\]]+)]$/.exec(name);
        if (match) {
          key = match[1] ? "*" : ":";
          value["~"] = match[2];
        }

        return [key, value];
      })
      .filter(Boolean),
  );
}

function routes(cwd) {
  return {
    name: "routes",
    resolveId: id => (id === "@routes@" ? "\0routes" : null),
    load(id) {
      if (id == "\0routes") {
        let id = 0;
        let imports = "";
        const re = new RegExp(`"(${cwd}[^"]*)"`, "g");
        const rt = JSON.stringify(mkRoutes(cwd), null, 2).replace(
          re,
          (_, p) => {
            const mod = `M${id++}`;
            const imp = path.basename(p) === "_header.svelte" ? "" : "* as";
            imports += `import ${imp} ${mod} from "./${p}";\n`;
            return mod;
          },
        );
        return imports + "export default " + rt;
      }
    },
  };
}

export default {
  input: "src/main.ts",
  output: {
    file: "dist/app.js",
    format: "esm",
  },
  plugins: [
    !production &&
      browsersync({
        open: true,
        server: {
          baseDir: "dist",
          middleware: handle404,
        },
      }),
    copy({
      targets: [
        {src: "src/404.html", dest: "dist"},
        {src: "src/index.html", dest: "dist"},
      ],
    }),
    postcss({
      extract: true,
      minimize: production,
      plugins: [
        production &&
          purgecss({
            content: ["./src/**/*.svelte", "./src/index.html"],
            whitelistPatterns: [/^svelte-/],
            whitelistPatternsChildren: [/^svelte-/],
          }),
      ],
    }),
    replace({
      "process.env.FLOYD_API_URL": `"${process.env.FLOYD_API_URL}"`,
      "process.env.FLOYD_AUTH_URL": `"${process.env.FLOYD_AUTH_URL}"`,
    }),
    routes("src/routes"),
    resolve({
      browser: true,
    }),
    svelte({
      dev: !production,
      emitCss: true,
    }),
    sucrase({
      exclude: ["node_modules/**"],
      production,
      transforms: ["typescript"],
    }),
    production &&
      terser({
        module: true,
      }),
  ],
  watch: {
    clearScreen: false,
  },
};
