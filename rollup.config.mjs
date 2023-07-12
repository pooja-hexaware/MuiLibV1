import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import svg from "rollup-plugin-svg";
import json from "@rollup/plugin-json";
// const packageJson = require("./package.json");
import packageJson from "./package.json" assert { type: "json" };
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import nativePlugin from 'rollup-plugin-natives';

export default [
    {
      input: "src/index.ts",
      output: [
        {
          file: packageJson.main,
          format: "cjs",
          // sourcemap: true,
        },
        {
          file: packageJson.module,
          format: "esm",
          // sourcemap: true,
        },
      ],
      plugins: [
        peerDepsExternal(),
        svg(),
        resolve(),  
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json" }),
        // terser(),
        postcss(), 
        json(),
        nativePlugin({
          copyTo: 'dist/libs',
      }),
      ],
    },
    {
      input: "dist/esm/types/index.d.ts",  //how the actual Javascript code of our library is generated.
      output: [{ file: "dist/index.d.ts", format: "esm" }], //how the actual Javascript code of our library is generated.
      plugins: [dts()],
      external: [...Object.keys(packageJson.peerDependencies || {}), /\.css$/],
    },
  ];