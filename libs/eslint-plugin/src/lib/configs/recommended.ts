import { TSESLint } from '@typescript-eslint/utils';

export default {
  parser: '@typescript-eslint/parser',
  plugins: ['@rx-angular'],
  rules: {
    '@rx-angular/no-explicit-change-detection-apis': 'error',
    '@rx-angular/no-rxstate-imperative-in-reactive': 'error',
    '@rx-angular/no-rxstate-subscriptions-outside-constructor': 'error',
    '@rx-angular/no-zone-run-apis': 'warn',
    '@rx-angular/prefer-no-layout-sensitive-apis': 'error',
    '@rx-angular/prefer-no-lodash-clone-deep': 'error',
    '@rx-angular/prefer-no-lodash-is-equal': 'error',
  },
} as TSESLint.Linter.Config;
