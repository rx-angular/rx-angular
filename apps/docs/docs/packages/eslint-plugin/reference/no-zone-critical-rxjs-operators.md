---
id: no-zone-critical-rxjs-operators
title: 'no-zone-critical-rxjs-operators'
diataxis_type: reference
package: eslint-plugin
legacy_guard: 'Zone.js only'
sidebar_label: 'no-zone-critical-rxjs-operators'
tags: [eslint-plugin, api-reference, migration]
concepts: [E2]
---

import LegacyGuard from '@site/src/components/LegacyGuard';

# no-zone-critical-rxjs-operators

<LegacyGuard audience="Zone.js only">

This rule only does anything when **Zone.js is present**. Since Angular v21, change
detection is zoneless by default and Zone.js is dropped from the default bundle, so
there is nothing to patch and this rule is a no-op. See
[Zoneless &amp; how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md).

</LegacyGuard>

## What it flags

RxJS operators that schedule on Zone-patched timers (`debounceTime`, `throttleTime`,
`delay`, and similar time-based operators) imported from `rxjs/operators`. Their
scheduled emissions run through a patched scheduler and can trigger change detection.

## Options

This rule has no options (`schema: []`).

```jsonc
// eslintrc
{
  "rules": {
    "@rx-angular/no-zone-critical-rxjs-operators": "error",
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
      '@rx-angular/no-zone-critical-rxjs-operators': 'error',
    },
  },
];
```

## Incorrect

```ts
// ❌ Incorrect — delay schedules on a Zone-patched timer
import { fromEvent, of } from 'rxjs';
import { mergeMap, delay, takeUntil } from 'rxjs/operators';

const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');

mousedown$.pipe(mergeMap((event) => of(event).pipe(delay(700), takeUntil(mouseup$)))).subscribe((event) => console.log('Long Press!', event));
```

## Correct

```ts
// ✅ Correct — in a zoneless app (v21+) the operator's scheduler is no longer
// Zone-patched, so the plain rxjs/operators import is fine as-is.
import { fromEvent, of } from 'rxjs';
import { mergeMap, delay, takeUntil } from 'rxjs/operators';

const mousedown$ = fromEvent(document, 'mousedown');
const mouseup$ = fromEvent(document, 'mouseup');

mousedown$.pipe(mergeMap((event) => of(event).pipe(delay(700), takeUntil(mouseup$)))).subscribe((event) => console.log('Long Press!', event));
```

:::note `./rxjs-zoneless-operators` is a user shim
Older examples imported the operator from a local `./rxjs-zoneless-operators` file.
That is a **user-authored shim**, not a shipped rx-angular path, so it is not an entry
point you can install. In a zoneless app you need no shim; in a residual Zone.js app,
unpatch the underlying timer via `getZoneUnPatchedApi` from
`@rx-angular/cdk/internals/core`.
:::

## Why

RxJS operators backed by Zone-patched schedulers can trigger unnecessary
change-detection runs.
Why &rarr; [Zoneless &amp; how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md).
