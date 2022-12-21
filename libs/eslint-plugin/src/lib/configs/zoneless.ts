import { TSESLint } from '@typescript-eslint/utils';

export default {
  parser: '@typescript-eslint/parser',
  plugins: ['@rx-angular'],
  rules: {
    '@rx-angular/no-explicit-change-detection-apis': 'error',
    '@rx-angular/no-zone-critical-browser-apis': 'error',
    '@rx-angular/no-zone-critical-lodash-apis': 'error',
    '@rx-angular/no-zone-critical-rxjs-creation-apis': 'error',
    '@rx-angular/no-zone-critical-rxjs-operators': 'error',
    '@rx-angular/no-zone-critical-rxjs-schedulers': 'error',
    '@rx-angular/no-zone-run-apis': 'error',
    '@rx-angular/prefer-no-layout-sensitive-apis': 'error',
    '@rx-angular/prefer-no-lodash-clone-deep': 'error',
    '@rx-angular/prefer-no-lodash-is-equal': 'error',
  },
} as TSESLint.Linter.Config;
