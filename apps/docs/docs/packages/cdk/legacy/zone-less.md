---
id: zone-less
title: "getZoneUnPatchedApi & the zone-less browser utilities"
diataxis_type: reference
package: cdk
legacy_guard: "zoneful / perf-retrofit / Angular <21"
sidebar_label: "Zone-less utilities (legacy)"
tags: [cdk, api-reference, migration]
concepts: [E2]
---

import LegacyGuard from '@site/src/components/LegacyGuard';

# `getZoneUnPatchedApi` &amp; the zone-less browser utilities

<LegacyGuard audience="zoneful / perf-retrofit / Angular <21">

Since **Angular v21, change detection is zoneless by default** and **Zone.js is
dropped from the default bundle**: with no Zone.js there is nothing to
"unpatch," so these utilities have no job in a default v21 app. Use them only if
Zone.js is still present (Angular &lt;21, or v21 with Zone.js opted back in, or a
performance retrofit of a brownfield Zone.js app). For new applications, the
native zoneless path is the answer; see
[Zoneless &amp; how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md).

</LegacyGuard>

:::warning The `@rx-angular/cdk/zone-less` entry point was dropped
The old `@rx-angular/cdk/zone-less` import path was **removed** (rx#1355), and
the separate `rxjs-zone-less` package is **unmaintained** (RxJS 6/7 only). **Do
not** add either as a dependency or present them as a current path. The
supported way to reach an unpatched API today is `getZoneUnPatchedApi` from
`@rx-angular/cdk/internals/core`, documented below, and even that is only for
apps still running Zone.js. On a zoneless app you do not need any of this.
:::

## What this is for (Zone.js only)

When Zone.js is present it monkey-patches most async browser APIs
(`setTimeout`, `addEventListener`, `requestAnimationFrame`, …). Every call to a
patched API can trigger change detection. Historically, the way to avoid that was
to inject `NgZone` and wrap the call in `runOutsideAngular`. These utilities
provide the unpatched original of an API directly, without injecting `NgZone`.

Under **zoneless** change detection there is nothing to unpatch, so none of this
applies; reach for signals and the native zoneless model instead.

## `getZoneUnPatchedApi`

The one primitive everything else builds on. It returns the original,
un-monkey-patched version of an API that Zone.js stashed on the target under a
`__zone_symbol__` key.

```typescript
import { getZoneUnPatchedApi } from '@rx-angular/cdk/internals/core';
```

Note the import path: `getZoneUnPatchedApi` lives in
`@rx-angular/cdk/internals/core`. It is **not** exported from any
`@rx-angular/cdk/zone-less` path.

Two call forms:

```typescript
// unpatched API off the global (window)
getZoneUnPatchedApi('setTimeout')(() => console.log('tada!'), 300);

// unpatched method off a specific target
getZoneUnPatchedApi(elem, 'addEventListener')('click', () => console.log('tada!'));
```

If Zone.js never patched the named API, `getZoneUnPatchedApi` returns the current
(native) implementation, so it is safe to call regardless.

## Browser utilities (`@rx-angular/cdk/zone-less/browser`)

In this checkout the only zone-less sub-entry that ships is
`@rx-angular/cdk/zone-less/browser`. It wraps `getZoneUnPatchedApi` to export the
unpatched versions of the common browser scheduling APIs directly, so you don't
call `getZoneUnPatchedApi` by hand:

```typescript
import { setTimeout, requestAnimationFrame } from '@rx-angular/cdk/zone-less/browser';

setTimeout(() => console.log('tada!'), 300); // does not trigger change detection
```

Full export list:

| Export | Kind |
| --- | --- |
| `setTimeout(cb, ms?)` | timer |
| `clearTimeout(id)` | timer |
| `setInterval(cb, ms?)` | timer |
| `clearInterval(id)` | timer |
| `requestAnimationFrame(cb)` | frame |
| `cancelAnimationFrame(id)` | frame |
| `Promise` | `PromiseConstructor` |
| `unpatchAddEventListener(target)` | rebinds a target's `addEventListener` to the unpatched version |

`Promise`, `requestAnimationFrame`, and `unpatchAddEventListener` are part of the
browser sub-entry; earlier docs listed only the timer/frame functions and omitted
these. `queueMicrotask` is defined internally in `browser.ts` but is **not**
re-exported from the entry point's `index.ts`, so it is not importable from
`@rx-angular/cdk/zone-less/browser` — do not import it.

There is no `@rx-angular/cdk/zone-less/rxjs` entry point in this checkout. The
RxJS "drop-in replacement" wrappers described by older documentation are not part
of the shipped package. Do not import them.

## Prefer the native path

For a Zone.js app the alternatives to these utilities are `NgZone`'s
`runOutsideAngular` (more boilerplate) and zone flags via
[`zoneConfig`](./zone-configurations.md) (coarser, patch-time). For a **new** app,
none of these are needed: run zoneless and use signals.

## See also

- Concept (legacy context): [Zoneless &amp; how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md)
- Reference: [`zoneConfig`](./zone-configurations.md)
