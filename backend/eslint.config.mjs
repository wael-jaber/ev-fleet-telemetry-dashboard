import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  js.configs.recommended, // built-in recommended rules
  {
    ignores: ['dist/', 'coverage/', 'node_modules/', '**/*.test.ts'],
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json', // Point to TypeScript config
        tsconfigRootDir: import.meta.dirname, // Set correct root directory
      },
      globals: {
        process: 'readonly',
        __dirname: 'readonly',
        console: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      prettier,
    },
    rules: {
      ...ts.configs.recommended.rules, // recommended TypeScript rules
      'prettier/prettier': 'warn', // Warn on Prettier formatting issues
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ], // Ignore unused variables prefixed with _
      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-console': 'off', // Allow console.log() for debugging
    },
  },
  prettierConfig, // Ensure Prettier compatibility
];
