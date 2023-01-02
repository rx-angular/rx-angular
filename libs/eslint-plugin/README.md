# @rx-angular/eslint-plugin

> A set of ESLint rules for building reactive, performant and Zone-less Angular applications.

## Installation

If you haven't already, install `@typescript-eslint/parser`:

```bash
npm install --save-dev @typescript-eslint/parser
```

Install the package:

```bash
npm install --save-dev @rx-angular/eslint-plugin
```

To use the recommended ruleset, extend the configuration in your ESLint config (e.g. `.eslintrc.json`):

```json
{
  "extends": ["@rx-angular/recommended"]
}
```

Alternatively, if you prefer a more manual approach, add the plugin to your ESLint config, configure parser and enable whatever rules you chose:

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@rx-angular"],
  "rules": {
    "@rx-angular/no-explicit-change-detection-apis": "error",
    "@rx-angular/prefer-no-layout-sensitive-apis": "error"
  }
}
```

## Configurations

This plugin has two pre-defined configurations for different scenarios:

- `@rx-angular/recommended` is recommended for most Angular applications,
- `@rx-angular/zoneless` is a stricter configuration for applications that aspire to [avoid triggering Zone.js](https://rx-angular.io/docs/cdk/zone-less).

## Rules

Documentation for individual rules may be found [here](https://rx-angular.io/docs/eslint-plugin/rules).
