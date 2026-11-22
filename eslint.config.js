const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  {
    ignores: [
      'dist/**',
      'coverage/**',
      'node_modules/**',
      '.angular/**',
      'storybook-static/**',
      'playwright-report/**',
      'test-results/**',
    ],
  },
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
    },
  },
  {
    files: ['libs/uw-ui/**/*.ts'],
    rules: {
      // TODO(uw-ui): substituir os `any` herdados do projeto de referência por `unknown` + type guards.
      '@typescript-eslint/no-explicit-any': 'warn',
      '@angular-eslint/prefer-inject': 'off',
      // Os outputs do projeto de referência usam nomes como `close`/`change`; renomear exige change própria.
      '@angular-eslint/no-output-native': 'off',
      'no-useless-escape': 'off',
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'uw', style: 'kebab-case' },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'uw', style: 'camelCase' },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@app/core', '@app/core/*', '@app/data', '@app/data/*', '@app/i18n', '@app/i18n/*'],
              message:
                'A uw-ui é uma biblioteca de apresentação: não pode depender de core, data ou i18n.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.stories.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
  },
);
