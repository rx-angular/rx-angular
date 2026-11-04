---
title: 'no-zone-critical-rxjs-schedulers'
package: eslint-plugin
sidebar_label: 'no-zone-critical-rxjs-schedulers'
sidebar_position: 9
tags: [eslint-plugin, api-reference, migration]
---

import LegacyGuard from '@site/src/components/LegacyGuard';

# no-zone-critical-rxjs-schedulers

<LegacyGuard audience="apps still running Zone.js">

This rule only does anything when **Zone.js is present**. Since Angular v21, change
detection is zoneless by default and Zone.js is dropped from the default bundle, so
there is nothing to patch and this rule is a no-op. See
[Zoneless &amp; how Zone.js affected change detection](../../../concepts/zoneless-and-zonejs-change-detection.md).

</LegacyGuard>

## What it flags

Use of RxJS schedulers that rely on Zone-patched timing (`asyncScheduler`,
`animationFrameScheduler`, `asapScheduler`, `queueScheduler`), typically passed to
`observeOn`/`subscribeOn` from `rxjs`. Emissions delivered through these schedulers
run on patched timers and can trigger change detection.

## Options

This rule has no options (`schema: []`).

```jsonc
// eslintrc
{
  "rules": {
    "@rx-angular/no-zone-critical-rxjs-schedulers": "error",
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
      '@rx-angular/no-zone-critical-rxjs-schedulers': 'error',
    },
  },
];
```

## Incorrect

```ts
// ❌ Incorrect — asyncScheduler delivers on a Zone-patched timer
import { interval, asyncScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

interval(10).pipe(observeOn(asyncScheduler)).subscribe(console.log);
```

## Correct

```ts
// ✅ Correct — in a zoneless app (v21+) the scheduler is no longer Zone-patched,
// so the plain rxjs scheduler is fine as-is.
import { interval, asyncScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

interval(10).pipe(observeOn(asyncScheduler)).subscribe(console.log);
```

:::warning Do not use `rxjs-zone-less`
Older guidance imported the scheduler from `rxjs-zone-less`. That package is
**unmaintained** (RxJS 6/7 only), so leave it out. In
a zoneless app you need no wrapper; in a residual Zone.js app, unpatch the underlying
timer via `getZoneUnPatchedApi` from `@rx-angular/cdk/internals/core`.
:::

## Why

RxJS schedulers backed by Zone-patched timers can trigger unnecessary
change-detection runs.
Why &rarr; [Zoneless &amp; how Zone.js affected change detection](../../../concepts/zoneless-and-zonejs-change-detection.md).
