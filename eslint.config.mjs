import angular from 'angular-eslint';
import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import nx from '@nx/eslint-plugin';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
});

export default [
  ...nx.configs['flat/base'],
  {
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
      'unused-imports': eslintPluginUnusedImports,
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allowCircularSelfDependency: false,
          banTransitiveDependencies: true,
          checkDynamicDependenciesExceptions: [],
          checkNestedExternalImports: true,
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: ['*'],
            },
            {
              sourceTag: 'template',
              onlyDependOnLibsWithTags: ['type:test-util', 'cdk'],
            },
            {
              sourceTag: 'state',
              onlyDependOnLibsWithTags: ['type:test-util', 'cdk'],
            },
            {
              sourceTag: 'cdk',
              onlyDependOnLibsWithTags: ['type:test-util'],
            },
          ],
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^\\u0000', '^@?\\w', '^[^.]', '^\\.']],
        },
      ],
      'simple-import-sort/exports': 'error',
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
    },
  },
  ...nx.configs['flat/typescript'],
  ...angular.configs.tsRecommended.map((c) => ({
    ...c,
    files: ['**/*.ts', '**/*.tsx'],
  })),
  ...compat
    .config({
      extends: [
        'prettier',
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
      ],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        ...config.rules,
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/no-inferrable-types': 'warn',
        '@typescript-eslint/no-empty-interface': 'warn',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unsafe-function-type': 'off',
        'prefer-rest-params': 'warn',
        'no-prototype-builtins': 'warn',
        'no-empty': 'warn',
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'typeParameter',
            format: ['PascalCase'],
          },
        ],
      },
      languageOptions: {
        parserOptions: {
          project: './tsconfig.*?.json',
        },
      },
    })),
  ...nx.configs['flat/javascript'],
  ...angular.configs.templateRecommended.map((c) => ({
    ...c,
    files: ['**/*.html'],
  })),
  {
    // Templates weren't linted before the flat-config migration (the template
    // config was mistakenly bound to *.js). These accessibility rules are kept
    // as warnings so demo/test templates don't break the build.
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/click-events-have-key-events': 'warn',
      '@angular-eslint/template/interactive-supports-focus': 'warn',
    },
  },
  ...compat.config({ extends: ['prettier'] }).map((config) => ({
    ...config,
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      ...config.rules,
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  })),
  {
    // Angular-eslint v22 promoted several modernization rules to errors.
    // The existing library/app code predates them, so keep them as warnings:
    // they stay visible for incremental adoption without breaking the build.
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
      '@angular-eslint/prefer-standalone': 'warn',
      '@angular-eslint/prefer-inject': 'warn',
      // rx-angular directives intentionally rename their inputs (e.g. rxLet).
      '@angular-eslint/no-input-rename': 'warn',
    },
  },
  {
    // The docs app is a standalone Docusaurus site; require() imports and
    // third-party React/Docusaurus packages are expected there.
    files: ['apps/docs/**/*.{ts,tsx,js,jsx}'],
    rules: {
      '@nx/enforce-module-boundaries': 'off',
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    // Demo and fixture apps are not published and intentionally use legacy
    // NgModules / generated components and POC/debug helpers, so the stricter
    // Angular and code-style rules are turned off for them.
    files: ['apps/demos/**/*.ts', 'apps/rebundle-demo/**/*.ts'],
    rules: {
      '@angular-eslint/prefer-on-push-component-change-detection': 'off',
      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/prefer-inject': 'off',
      '@angular-eslint/no-input-rename': 'off',
      '@angular-eslint/no-empty-lifecycle-method': 'off',
      '@angular-eslint/contextual-lifecycle': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'no-case-declarations': 'off',
      'prefer-spread': 'off',
      'prefer-const': 'off',
    },
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
