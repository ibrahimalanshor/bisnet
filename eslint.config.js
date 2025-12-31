import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import json from '@eslint/json';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: { globals: globals.browser },
  },
  pluginVue.configs['flat/essential'],
  { files: ['**/*.json'], plugins: { json }, language: 'json/json' },
]);
