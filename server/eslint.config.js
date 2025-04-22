import { defineConfig } from 'eslint/config';
import standardWithTypescript from 'eslint-config-standard-with-typescript';
import prettier from 'eslint-config-prettier';
import nodePlugin from 'eslint-plugin-node';

export default defineConfig([
  {
    extends: [standardWithTypescript, prettier],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      'node/no-process-env': 'error',
    },
    plugins: {
      node: nodePlugin,
    },
  },
]);
