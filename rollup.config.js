import * as fs from "fs";
import browsersync from "rollup-plugin-browsersync";
import copy from "rollup-plugin-copy";
import postcss from "rollup-plugin-postcss";
import purgecss from "@fullhuman/postcss-purgecss";
import resolve from "rollup-plugin-node-resolve";
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
  input: "src/main.js",
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
    resolve({
      browser: true,
    }),
    svelte({
      dev: !production,
      emitCss: true,
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
