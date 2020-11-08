import alias from "@rollup/plugin-alias";
import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";

const path = require("path");

const production = !process.env.ROLLUP_WATCH;

const customResolver = resolve({
  extensions: [".mjs", ".js", ".jsx", ".json", ".sass", ".scss"],
});
const projectRootDir = path.resolve(__dirname);

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/bundle.js",
  },
  plugins: [
    alias({
      resolve: [".svelte", ".js"], // add any aditional extensions needed
      entries: [
        { find: "components", replacement: path.resolve("src/components") },
        { find: "utils", replacement: path.resolve("src/utils/index.js") },
        { find: "api", replacement: path.resolve("src/api/index.js") },
        { find: "store", replacement: path.resolve("src/store/index.js") },
        {
          find: "constants",
          replacement: path.resolve("src/constants/index.js"),
        },
      ],
    }),
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: (css) => {
        css.write("bundle.css");
      },
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      mainFields: ["browser"],
      preferBuiltins: true,
      dedupe: (importee) =>
        importee === "svelte" || importee.startsWith("svelte/"),
    }),
    commonjs(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
