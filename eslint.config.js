import tseslint from '@typescript-eslint/eslint-plugin';
import jsxally from 'eslint-plugin-jsx-ally';
import standardWithTypescript from 'eslint-config-standard-with-typescript';
import prettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  standardWithTypescript,
  prettier,
  {
    files: ['**/*'],
    ignorePatterns: ['node_modules', 'dist'],
    plugins: {
      '@typescript-eslint': tseslint,
      'jsx-ally': jsxally,
    },
    rules: {
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
          },
          orderImportKind: 'asc',
        },
      ],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      'jsx-ally/anchor-is-valid': 'off',
      curly: ['error', 'all'],
      'no-irregular-whitespace': [
        'error',
        {
          skipTemplates: true,
          skipStrings: true,
        },
      ],
      'no-console': [
        'error',
        {
          allow: ['info', 'error', 'warn'],
        },
      ],
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },
]);
