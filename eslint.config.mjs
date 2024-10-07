import globals from 'globals';
import pluginJs from '@eslint/js';


export default [
  {files: ['**/*.js'], languageOptions: {sourceType: 'commonjs'}},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  {
    rules: {
      'no-var': 'error', // Prohibir el uso de var
      //'semi': ['error', 'always'], // Requiere punto y coma
      'quotes': ['error', 'single'], // Fuerza comillas simples
      'indent': ['error', 2],
    }
  }
];