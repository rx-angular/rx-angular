---
id: eslint-plugin-overview
title: '@rx-angular/eslint-plugin'
diataxis_type: reference
package: eslint-plugin
legacy_guard: false
sidebar_label: 'Overview'
sidebar_position: 0
tags: [eslint-plugin, tooling, api-reference]
---

# `@rx-angular/eslint-plugin`

A set of ESLint rules that keep an Angular codebase **zoneless-ready** and enforce
**RxState discipline**. The plugin flags the imperative change-detection calls,
Zone-critical APIs, layout-thrashing calls, and RxState anti-patterns that get in
the way of reactive, performant, Zone-less Angular, so they surface in the linter
instead of in production.

## Get started

- **Set it up:** [Install and configure the ESLint plugin](./how-to/install-and-configure.md): install the parser and plugin, then extend the `recommended` or `zoneless` preset (flat config or `.eslintrc`).
- **Look up the rules:** [Rules overview](./reference/rules-overview.md): all 12 rules, what each flags, and which are legacy-guarded.

## What the rules cover

- **Change-detection discipline:** no hand-rolled `detectChanges`/`markForCheck`; no layout-sensitive APIs that force style recalculation.
- **RxState discipline:** no imperative RxState calls inside reactive methods; no subscriptions outside the constructor.
- **Zoneless readiness:** the six `no-zone-*` rules flag Zone-patched browser, RxJS, and `NgZone.run*` APIs. They are legacy-guarded: a no-op once the app runs zoneless (Angular v21+). See [Zoneless & how Zone.js affected change detection](../../concepts/E2-zoneless-and-zonejs-change-detection.md).
- **Value-semantics hygiene:** flags Lodash `cloneDeep`/`isEqual` in favour of native equivalents.

## Version Compatibility

`@rx-angular/eslint-plugin` has no direct peer dependency on Angular — it lints
your project's TypeScript output through `@typescript-eslint`, so it works with
any Angular version supported by the `@typescript-eslint/parser` version you
have installed. See the [package README](https://github.com/rx-angular/rx-angular/blob/main/libs/eslint-plugin/README.md#version-compatibility)
for the peer dependency table, and the
[official Angular versioning guide](https://angular.dev/reference/versions) for
Angular's own support windows.

## Explore

- **Do:** [Install and configure](./how-to/install-and-configure.md).
- **Look up:** [Rules overview](./reference/rules-overview.md).
- **Learn:** [Zoneless & how Zone.js affected change detection](../../concepts/E2-zoneless-and-zonejs-change-detection.md) (E2).
