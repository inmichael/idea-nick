import { defineConfig } from 'eslint/config';
import standardWithTypescript from 'eslint-config-standard-with-typescript';
import prettier from 'eslint-config-prettier';

export default defineConfig([
  {
    extends: [standardWithTypescript, prettier],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
]);
