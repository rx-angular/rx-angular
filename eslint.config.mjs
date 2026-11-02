// ESLint only lints Angular HTML templates; TS/JS is linted by oxlint
// (.oxlintrc.json), which can't parse Angular templates yet.
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';

export default [
  {
    files: ['**/*.html'],
    languageOptions: { parser: angularTemplateParser },
    plugins: { '@angular-eslint/template': angularTemplate },
    rules: {
      // angular-eslint templateRecommended
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/eqeqeq': 'error',
      '@angular-eslint/template/no-negated-async': 'error',
      '@angular-eslint/template/prefer-control-flow': 'error',
      // angular-eslint templateAccessibility
      '@angular-eslint/template/alt-text': 'error',
      '@angular-eslint/template/click-events-have-key-events': 'warn',
      '@angular-eslint/template/elements-content': 'error',
      '@angular-eslint/template/interactive-supports-focus': 'warn',
      '@angular-eslint/template/label-has-associated-control': 'error',
      '@angular-eslint/template/mouse-events-have-key-events': 'error',
      '@angular-eslint/template/no-autofocus': 'error',
      '@angular-eslint/template/no-distracting-elements': 'error',
      '@angular-eslint/template/role-has-required-aria': 'error',
      '@angular-eslint/template/table-scope': 'error',
      '@angular-eslint/template/valid-aria': 'error',
    },
  },
  {
    files: ['libs/**/*.html'],
    rules: { '@angular-eslint/template/eqeqeq': 'warn' },
  },
  {
    ignores: [
      '**/node_modules',
      '**/dist',
      '**/tmp',
      '**/coverage',
      '**/.nx',
      '**/.angular',
      '**/.docusaurus',
      '**/build',
      '.yarn',
    ],
  },
];
