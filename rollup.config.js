import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import { dts } from 'rollup-plugin-dts';
import pkg from './package.json' assert { type: 'json' };

const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const external = [...Object.keys(pkg.peerDependencies || {})];

export default [
  // 主入口构建
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({ extensions }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        extensions,
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
    ],
    external,
  },
  // React构建
  {
    input: 'src/react/index.ts',
    output: [
      {
        file: 'dist/react/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/react/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({ extensions }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        extensions,
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
    ],
    external,
  },
  // Vue构建
  {
    input: 'src/vue/index.ts',
    output: [
      {
        file: 'dist/vue/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/vue/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({ extensions }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        extensions,
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
    ],
    external,
  },
  // Solid构建
  {
    input: 'src/solid/index.ts',
    output: [
      {
        file: 'dist/solid/index.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/solid/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({ extensions }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        extensions,
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
    ],
    external,
  },
  // 类型定义构建
  {
    input: 'src/index.ts',
    output: {
      file: pkg.types,
      format: 'es',
    },
    plugins: [dts()],
    external,
  },
  // React类型定义
  {
    input: 'src/react/index.ts',
    output: {
      file: 'dist/react/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
    external,
  },
  // Vue类型定义
  {
    input: 'src/vue/index.ts',
    output: {
      file: 'dist/vue/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
    external,
  },
  // Solid类型定义
  {
    input: 'src/solid/index.ts',
    output: {
      file: 'dist/solid/index.d.ts',
      format: 'es',
    },
    plugins: [dts()],
    external,
  },
];