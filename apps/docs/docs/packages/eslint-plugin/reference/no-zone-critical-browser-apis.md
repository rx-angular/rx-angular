---
id: no-zone-critical-browser-apis
title: 'no-zone-critical-browser-apis'
diataxis_type: reference
package: eslint-plugin
legacy_guard: 'Zone.js only'
sidebar_label: 'no-zone-critical-browser-apis'
tags: [eslint-plugin, api-reference, migration]
concepts: [E2]
---

import LegacyGuard from '@site/src/components/LegacyGuard';

# no-zone-critical-browser-apis

<LegacyGuard audience="Zone.js only">

This rule only does anything when **Zone.js is present**. Since Angular v21, change
detection is zoneless by default and Zone.js is dropped from the default bundle, so
there is nothing to patch and this rule is a no-op. See
[Zoneless &amp; how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md).

</LegacyGuard>

## What it flags

Direct calls to the browser scheduling APIs Zone.js monkey-patches (`setTimeout`,
`clearTimeout`, `setInterval`, `clearInterval`, `setImmediate`, `clearImmediate`,
`requestAnimationFrame`, `cancelAnimationFrame`, and the vendor-prefixed frame
variants), whether called bare or off `window`.

## Options

This rule has no options (`schema: []`).

```jsonc
// eslintrc
{
  "rules": {
    "@rx-angular/no-zone-critical-browser-apis": "error",
  },
}
```

```js
// eslint.config.js (flat config)
import rxAngular from '@rx-angular/eslint-plugin';

export default [
  {
    plugins: { '@rx-angular': rxAngular },
    rules: {
      '@rx-angular/no-zone-critical-browser-apis': 'error',
    },
  },
];
```

## Incorrect

```ts
// ❌ Incorrect — the Zone-patched global schedules a change-detection run
setTimeout(() => {
  console.log('hello');
}, 0);
```

## Correct

```ts
// ✅ Correct — in a zoneless app (v21+) the native API is fine as-is;
// there is nothing to unpatch.
setTimeout(() => {
  console.log('hello');
}, 0);
```

For the residual case where Zone.js is still present and you need the unpatched
timer, import it from the shipping browser sub-entry point (Zone.js apps only):

```ts
// Zone.js only — @rx-angular/cdk/zone-less/browser ships the unpatched versions
import { setTimeout } from '@rx-angular/cdk/zone-less/browser';

setTimeout(() => {
  console.log('hello');
}, 0);
```

:::warning Do not use the dropped top-level path
The old top-level `@rx-angular/cdk/zone-less` import was **removed** (rx#1355). Do
not add it or present it as a current path. On a zoneless app you do not need any
unpatch utility; on a Zone.js app use `@rx-angular/cdk/zone-less/browser` (shown
above) or `getZoneUnPatchedApi` from `@rx-angular/cdk/internals/core`.
:::

## Why

Zone-patched scheduling APIs can trigger unnecessary change-detection runs.
Why &rarr; [Zoneless &amp; how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md).
