// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import pluginQuery from '@tanstack/eslint-plugin-query'
import pluginReact from 'eslint-plugin-react'
import globals from 'globals'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  ...pluginQuery.configs['flat/recommended'],
  {
    files: [ '**/*.{js,ts,tsx}' ],
    languageOptions: {
      parser: tseslint.parser,
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: { react, '@typescript-eslint': tseslint.plugin },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      "react/react-in-jsx-scope": "off"
    }
  },
  ...storybook.configs["flat/recommended"]
];
