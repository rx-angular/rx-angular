---
id: overview
title: '@rx-angular/eslint-plugin'
package: eslint-plugin
sidebar_label: 'Overview'
sidebar_position: 0
tags: [eslint-plugin, tooling, api-reference]
---

# `@rx-angular/eslint-plugin`

`@rx-angular/eslint-plugin` is a set of ESLint rules that keep an Angular codebase
**zoneless-ready** and enforce **RxState discipline**.

- **Change-detection discipline:** no hand-rolled `detectChanges`/`markForCheck`; no layout-sensitive APIs that force style recalculation.
- **RxState discipline:** no imperative RxState calls inside reactive methods; no subscriptions outside the constructor.
- **Zoneless readiness:** the six `no-zone-*` rules flag Zone-patched browser, RxJS, and `NgZone.run*` APIs. They are legacy-guarded: a no-op once the app runs zoneless (Angular v21+). See [Zoneless & how Zone.js affected change detection](/docs/concepts/zoneless-and-zonejs-change-detection).
- **Value-semantics hygiene:** flags Lodash `cloneDeep`/`isEqual` in favour of native equivalents.

## When to use it

Add it when you want the linter to guard a reactive, zoneless-ready codebase.
The plugin flags the imperative change-detection calls, Zone-critical APIs,
layout-thrashing calls, and RxState anti-patterns that get in the way of reactive,
performant, Zone-less Angular, so they surface in the linter instead of in
production.

## Install

The rules are TypeScript-aware, so they need `@typescript-eslint/parser`.

```shell
npm install --save-dev @typescript-eslint/parser @rx-angular/eslint-plugin
```

Then extend the `recommended` or `zoneless` preset.
[Install and configure the ESLint plugin](./how-to/install-and-configure.md)
covers flat config and `.eslintrc`.

`@rx-angular/eslint-plugin` has no direct peer dependency on Angular — it lints
your project's TypeScript output through `@typescript-eslint`, so it works with
any Angular version supported by the `@typescript-eslint/parser` version you
have installed. See the [package README](https://github.com/rx-angular/rx-angular/blob/main/libs/eslint-plugin/README.md#version-compatibility)
for the peer dependency table, and the
[official Angular versioning guide](https://angular.dev/reference/versions) for
Angular's own support windows.

## Where to go next

- **How-to:** [Install and configure the ESLint plugin](./how-to/install-and-configure.md):
  install the parser and plugin, then extend the `recommended` or `zoneless` preset
  (flat config or `.eslintrc`).
- **Reference:** [Rules overview](./reference/index.md): all 12 rules, what
  each flags, and which are legacy-guarded.
- **Concept:** [Zoneless & how Zone.js affected change detection](/docs/concepts/zoneless-and-zonejs-change-detection).
