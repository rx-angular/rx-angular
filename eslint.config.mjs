// ESLint only lints Angular templates (*.html and inline `template:` strings);
// TS/JS is linted by oxlint (.oxlintrc.json), which can't parse templates yet.
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';
import tsParser from '@typescript-eslint/parser';

const extractInlineHtml = angularTemplate.processors['extract-inline-html'];

export default [
  {
    // Extract inline `template:` strings into virtual *.html files so the
    // template rules below apply to them. Results for the .ts source itself
    // (block 0) are dropped: oxlint owns TS, and its `eslint-disable` comments
    // would otherwise fail here as unknown rules.
    files: ['**/*.ts'],
    languageOptions: { parser: tsParser },
    linterOptions: { reportUnusedDisableDirectives: 'off' },
    processor: {
      ...extractInlineHtml,
      postprocess: (messages, filename) =>
        extractInlineHtml.postprocess([[], ...messages.slice(1)], filename),
    },
  },
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
