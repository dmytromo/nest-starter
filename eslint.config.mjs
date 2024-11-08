import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['**/dist/**', 'eslint.config.js'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintConfigPrettier,
  {
    languageOptions: {
      parserOptions: {
        project: true,
        // import.meta.dirname is only present for ESM files in Node.js >=20.11.0 / >= 21.2.0. For CommonJS modules and/or older versions of Node.js, use __dirname
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
