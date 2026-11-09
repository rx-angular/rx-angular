---
title: 'no-zone-critical-rxjs-creation-apis'
package: eslint-plugin
sidebar_label: 'no-zone-critical-rxjs-creation-apis'
sidebar_position: 7
tags: [eslint-plugin, api-reference, migration]
---

import LegacyGuard from '@site/src/components/LegacyGuard';

# no-zone-critical-rxjs-creation-apis

<LegacyGuard audience="apps still running Zone.js">

This rule only does anything when **Zone.js is present**. Since Angular v21, change
detection is zoneless by default and Zone.js is dropped from the default bundle, so
there is nothing to patch and this rule is a no-op. See
[Zoneless &amp; how Zone.js affected change detection](/docs/concepts/zoneless-and-zonejs-change-detection).

</LegacyGuard>

## What it flags

RxJS creation functions that emit on Zone-patched timers (for example `interval`,
`timer`, and time-driven `fromEvent` pipelines) imported from `rxjs`. Each emission
runs through a patched scheduler and can trigger change detection.

## Options

This rule has no options (`schema: []`).

```jsonc
// eslintrc
{
  "rules": {
    "@rx-angular/no-zone-critical-rxjs-creation-apis": "error",
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
      '@rx-angular/no-zone-critical-rxjs-creation-apis': 'error',
    },
  },
];
```

## Incorrect

```ts
// ❌ Incorrect — interval emits on a Zone-patched timer
import { interval } from 'rxjs';

const source = interval(1000);
const subscribe = source.subscribe((val) => console.log(val));
```

## Correct

```ts
// ✅ Correct — in a zoneless app (v21+) the scheduler is no longer Zone-patched,
// so the plain rxjs creation function is fine as-is.
import { interval } from 'rxjs';

const source = interval(1000);
const subscribe = source.subscribe((val) => console.log(val));
```

:::warning Do not use `rxjs-zone-less`
Older guidance suggested importing these creation functions from `rxjs-zone-less`.
That package is **unmaintained** (RxJS 6/7 only), so leave it out.
In a zoneless app you need no wrapper at all; in a residual Zone.js
app, unpatch the underlying timer via `getZoneUnPatchedApi` from
`@rx-angular/cdk/internals/core` instead.
:::

## Why

RxJS creation APIs backed by Zone-patched schedulers can trigger unnecessary
change-detection runs.
Why &rarr; [Zoneless &amp; how Zone.js affected change detection](/docs/concepts/zoneless-and-zonejs-change-detection).
