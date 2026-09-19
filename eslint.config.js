import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'src/generated/**',
      'src/js/lodash.custom.js',
      'test-results/**',
      'mochawesome-reports/**',
      'docs/**'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['src/ts/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error'
    }
  },
  {
    files: ['src/js/**/*.js'],
    languageOptions: {
      globals: { ...globals.browser }
    }
  },
  {
    files: ['scripts/**/*.mjs', 'eslint.config.js', 'tsup.config.ts'],
    languageOptions: {
      globals: { ...globals.node }
    }
  },
  {
    files: ['test/**/*.js', 'e2e/**/*.js'],
    languageOptions: {
      globals: { ...globals.node, ...globals.mocha }
    }
  }
);
