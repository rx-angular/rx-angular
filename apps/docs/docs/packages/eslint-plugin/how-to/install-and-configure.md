---
id: install-and-configure
title: 'How to install and configure the ESLint plugin'
diataxis_type: how-to
package: eslint-plugin
legacy_guard: false
sidebar_label: 'Install & configure'
sidebar_position: 1
tags: [eslint-plugin, guides, tooling]
---

# How to install and configure the ESLint plugin

## Goal

Add `@rx-angular/eslint-plugin` to an Angular workspace and turn on its rules: either the whole [recommended](#recommended-config) or [zoneless](#zoneless-config) preset, or a hand-picked subset. This page covers the task only; for the full rule catalogue see the [rules overview](../reference/rules-overview.md).

## Steps

1. **Install the parser and the plugin.** The rules are TypeScript-aware, so they need `@typescript-eslint/parser`.

   ```shell
   npm install --save-dev @typescript-eslint/parser @rx-angular/eslint-plugin
   ```

2. **Wire the plugin into your ESLint config.** The plugin ships two presets (`recommended` and `zoneless`) plus 12 individual rules. Pick one of the two config formats below.

### Flat config (`eslint.config.js`)

Flat config (`eslint.config.js`) is the default in ESLint 9. Register the plugin under the `@rx-angular` namespace and enable the rules you want:

```js title="eslint.config.js"
const rxAngular = require('@rx-angular/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');

module.exports = [
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@rx-angular': rxAngular,
    },
    rules: {
      '@rx-angular/no-explicit-change-detection-apis': 'error',
      '@rx-angular/prefer-no-layout-sensitive-apis': 'error',
      // …enable the rules you want; see the rules overview.
    },
  },
];
```

:::note No flat preset ships yet
The plugin's bundled `configs` (`recommended`, `zoneless`) are authored in **eslintrc format**; there is **no flat-config preset** exported yet ([issue #1781](https://github.com/rx-angular/rx-angular/issues/1781)). In flat config you therefore enable rules individually as shown above (or spread the eslintrc preset's `rules` object yourself). Track #1781 for a flat preset.
:::

### `.eslintrc` (legacy)

For projects still on the eslintrc format, extend a preset directly. This is the path the shipped `configs` are built for.

```json title=".eslintrc.json"
{
  "extends": ["plugin:@rx-angular/recommended"]
}
```

Or configure the parser, plugin, and rules manually:

```json title=".eslintrc.json"
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@rx-angular"],
  "rules": {
    "@rx-angular/no-explicit-change-detection-apis": "error",
    "@rx-angular/prefer-no-layout-sensitive-apis": "error"
  }
}
```

## The two shipped presets

| Preset        | Extends key                      | What it enables                                                                                                                                                                                                                                                                                                           |
| ------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `recommended` | `plugin:@rx-angular/recommended` | The change-detection, RxState-discipline, layout, and lodash rules for most Angular apps. `no-zone-run-apis` is set to `warn`; the other `no-zone-*` rules are **not** included.                                                                                                                                          |
| `zoneless`    | `plugin:@rx-angular/zoneless`    | For apps aspiring to run without Zone.js: turns on **all six** `no-zone-*` rules at `error` plus the change-detection, layout, and lodash rules — but does **not** include the RxState-discipline rules (`no-rxstate-imperative-in-reactive`, `no-rxstate-subscriptions-outside-constructor`) that `recommended` enables. |

- **Plugin namespace:** `@rx-angular` (rule ids are written `@rx-angular/<rule>`).
- **Parser:** `@typescript-eslint/parser` (required, since the rules inspect TypeScript syntax).

## Result

Run ESLint. Rules from the plugin report under their `@rx-angular/<rule>` id. If you extended `recommended` or `zoneless`, the preset's rules are active; if you enabled rules individually, only those fire.

```shell
npx eslint .
```

## See also

- Reference: [Rules overview](../reference/rules-overview.md): all 12 rules, what each flags, and which are zoneless-scoped.
- Concept: [Zoneless & how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md): why the `zoneless` preset exists.
