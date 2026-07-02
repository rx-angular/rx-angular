---
id: coalescing
title: "coalesceWith"
diataxis_type: reference
package: cdk
legacy_guard: "zoneful / RxJS users"
sidebar_label: "coalesceWith (legacy)"
tags: [cdk, api-reference, migration]
concepts: [E2]
---

import LegacyGuard from '@site/src/components/LegacyGuard';

# `coalesceWith`

<LegacyGuard audience="zoneful / RxJS users">

Since **Angular v21, change detection is zoneless by default** and **Zone.js is
dropped from the default bundle**, the change-detection pressure `coalesceWith`
was written to relieve is largely gone. The operator itself is still a valid RxJS
tool with **no native equivalent**: it stays useful for de-duplicating
high-frequency emissions in an RxJS pipeline. It is shelved here because its
original motivation (coalescing manual change-detection calls in a Zone.js app)
is legacy. For native event coalescing, use
`provideZoneChangeDetection({ eventCoalescing: true })` (the CLI default since
v18, and moot under zoneless). For background, see
[Zoneless &amp; how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md).

</LegacyGuard>

`coalesceWith` is an RxJS operator from `@rx-angular/cdk/coalescing`. It limits
the source to **one emission per coalescing window** (the trailing value), then
repeats for each window. The window is defined by an Observable you supply.

## Import

```typescript
import { coalesceWith } from '@rx-angular/cdk/coalescing';
```

## Signature

```typescript
function coalesceWith<T>(
  durationSelector: Observable<unknown>,
  scope?: Record<string, unknown>
): MonoTypeOperatorFunction<T>;
```

| Parameter | Type | Required | Meaning |
| --- | --- | --- | --- |
| `durationSelector` | `Observable<unknown>` | **yes** | Defines the coalescing window. Its **first emission** closes the current window and lets the trailing source value through. There is **no default**; you must pass one. |
| `scope` | `Record<string, unknown>` | no | An object the operator uses as the coalescing key, so multiple subscriptions can share one window. Defaults to a fresh per-subscription object (`{}`). |

Returns a `MonoTypeOperatorFunction<T>`.

:::note `durationSelector` is required
`coalesceWith()` cannot be called with no arguments; `durationSelector` is a
required `Observable<unknown>`. It is an **Observable**, not a function or a
scheduler: pass e.g. `interval(0)`, `animationFrames()`, or `interval(500)`, not
`queueMicrotask` or `requestAnimationFrame`. (The operator's own JSDoc mentions a
`requestAnimationFrame` default, but the implementation has no default: the
argument is mandatory.)
:::

## Behavior

Choose the window with `durationSelector`:

- `interval(0)`: coalesce within a macrotask (`setInterval`-based).
- `animationFrames()`: coalesce within an animation frame.
- `interval(500)`: coalesce within a 500 ms window.

```typescript
import { from, interval } from 'rxjs';
import { coalesceWith } from '@rx-angular/cdk/coalescing';

function doStuff(value: number) {
  console.log(value);
}

// without coalescing: logs 1, 2, 3
from([1, 2, 3]).subscribe(doStuff);

// with coalescing over one macrotask window: logs 3 (trailing value only)
from([1, 2, 3]).pipe(coalesceWith(interval(0))).subscribe(doStuff);
```

## Scoping

By default each subscription coalesces independently. Pass a shared `scope`
object to make several subscriptions coalesce against the **same** window: the
last value across all of them wins, and earlier values are dropped:

```typescript
const scope = {};

from([1, 2, 3]).pipe(coalesceWith(interval(0), scope)).subscribe(render); // no emission
from([1, 2, 3]).pipe(coalesceWith(interval(0), scope)).subscribe(render); // renders 3 once
```

`scope` is a plain object used as a key (tracked via a `WeakMap`, so it does not
leak). Use it deliberately: a scope shared too widely (e.g. across unrelated
components) drops updates you meant to keep.

## Native alternative

For coalescing Angular's own event-driven change detection, the framework's
native option is:

```typescript
import { provideZoneChangeDetection } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [provideZoneChangeDetection({ eventCoalescing: true })],
});
```

This is the CLI default since v18 and is irrelevant under zoneless. Use
`coalesceWith` for coalescing arbitrary RxJS streams, where there is no native
equivalent.

## See also

- Concept (legacy context): [Zoneless &amp; how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md)
