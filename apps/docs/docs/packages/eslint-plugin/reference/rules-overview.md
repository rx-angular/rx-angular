---
id: rules-overview
title: "Rules overview"
diataxis_type: reference
package: eslint-plugin
legacy_guard: false
sidebar_label: "Rules overview"
sidebar_position: 0
tags: [eslint-plugin, api-reference, tooling]
---

# Rules overview

The plugin ships **12 rules** under the `@rx-angular` namespace. Each links to its own reference page. None of the rules are auto-fixable (no `fixable` metadata); they report but do not rewrite. The six `no-zone-*` rules are **legacy-guarded**: they only do anything when Zone.js is present and are a no-op under zoneless Angular (v21+). See [Zoneless & how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md) for why.

To turn these on, see [how to install and configure](../how-to/install-and-configure.md).

| Rule | What it flags | Fixable? | Legacy-guarded? |
| --- | --- | --- | --- |
| [`no-explicit-change-detection-apis`](./no-explicit-change-detection-apis.md) | Explicit calls to change-detection APIs (`detectChanges`/`markForCheck`). | No | No |
| [`no-rxstate-imperative-in-reactive`](./no-rxstate-imperative-in-reactive.md) | Mixing imperative RxState methods inside reactive methods. | No | No |
| [`no-rxstate-subscriptions-outside-constructor`](./no-rxstate-subscriptions-outside-constructor.md) | RxState subscription methods called outside the constructor. | No | No |
| [`no-zone-critical-browser-apis`](./no-zone-critical-browser-apis.md) | Zone-patched browser scheduling APIs (`setTimeout`, `setInterval`, `requestAnimationFrame`, …). | No | Yes (Zone.js only) |
| [`no-zone-critical-lodash-apis`](./no-zone-critical-lodash-apis.md) | Zone-related Lodash APIs. | No | Yes (Zone.js only) |
| [`no-zone-critical-rxjs-creation-apis`](./no-zone-critical-rxjs-creation-apis.md) | Zone-critical RxJS creation APIs. | No | Yes (Zone.js only) |
| [`no-zone-critical-rxjs-operators`](./no-zone-critical-rxjs-operators.md) | Zone-critical RxJS operators. | No | Yes (Zone.js only) |
| [`no-zone-critical-rxjs-schedulers`](./no-zone-critical-rxjs-schedulers.md) | RxJS schedulers (Zone-critical). | No | Yes (Zone.js only) |
| [`no-zone-run-apis`](./no-zone-run-apis.md) | `NgZone.run*` APIs (`run`, `runOutsideAngular`, …). | No | Yes (Zone.js only) |
| [`prefer-no-layout-sensitive-apis`](./prefer-no-layout-sensitive-apis.md) | Layout-sensitive APIs that may trigger style recalculation. | No | No |
| [`prefer-no-lodash-clone-deep`](./prefer-no-lodash-clone-deep.md) | Usages of Lodash `cloneDeep`. | No | No |
| [`prefer-no-lodash-is-equal`](./prefer-no-lodash-is-equal.md) | Usages of Lodash `isEqual`. | No | No |

## Presets

- **`recommended`** enables the change-detection, RxState-discipline, layout, and lodash rules; `no-zone-run-apis` is set to `warn`; the other five `no-zone-*` rules are not included.
- **`zoneless`** is a standalone preset — it includes the change-detection rule, all six `no-zone-*` rules at `error`, and the layout/lodash rules, but does **not** include the two RxState-discipline rules (`no-rxstate-imperative-in-reactive`, `no-rxstate-subscriptions-outside-constructor`). Users who want both sets should extend `recommended` and additionally enable the zone rules manually.

See [install & configure](../how-to/install-and-configure.md) for how to extend a preset or enable rules individually.

## See also

- How-to: [Install and configure the ESLint plugin](../how-to/install-and-configure.md).
- Concept: [Zoneless & how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md): why the six `no-zone-*` rules are legacy-guarded.
