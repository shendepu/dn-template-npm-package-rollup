import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";

import pkg from "./package.json";

const config = {
  input: "modules/index.js",
  output: {
    name: "create-redux-store"
  },
  external: Object.keys(pkg.peerDependencies),
  plugins: [
    babel({
      exclude: "node_modules/**",
      plugins: ["external-helpers"]
    }),
    resolve(),
    commonjs({
      include: /node_modules/
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ]
};

if (process.env.NODE_ENV === "production") {
  config.plugins.push(uglify());
}

export default config;
