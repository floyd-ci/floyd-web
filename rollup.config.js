import * as fs from "fs";
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
