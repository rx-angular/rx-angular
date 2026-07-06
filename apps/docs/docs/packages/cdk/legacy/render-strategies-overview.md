---
id: render-strategies-overview
title: 'Render strategies (overview)'
diataxis_type: reference
package: cdk
legacy_guard: 'Angular <21 / still-zoneful / perf-retrofit'
sidebar_label: 'Render strategies overview'
tags: [cdk, migration]
concepts: [E1, E2, E5]
---

import LegacyGuard from '@site/src/components/LegacyGuard';

# Render strategies (overview)

<LegacyGuard audience="Angular <21 / still-zoneful / perf-retrofit">

The render strategies were written to give explicit, fine-grained control over a
change detection system that ran globally and implicitly through Zone.js. Since
Angular v21 that premise is largely gone: change detection is **zoneless by
default**, signals track their own reads, and the framework re-renders only the
views that changed. Reach for the strategies below only for the audience
named above; for new applications, prefer the native zoneless path and see
[Zoneless & how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md).

</LegacyGuard>

Render strategies expose two things to the caller: the **render method** (the
work a strategy performs on a view, for example `markForCheck` or `detectChanges`)
and the **scheduling mechanism** that decides _when_ that work runs. Both are
carried on a strategy's `RxStrategyCredentials` and consumed by the directives
(`rxLet`, `rxFor`, `rxIf`) and by [`RxStrategyProvider`](../reference/rx-strategy-provider.md).

The strategies ship in two sets:

- **Native strategies**: `native`, `local`, `noop`. They render a single view
  with plain Angular APIs and no priority queue.
- **Concurrent strategies**: `immediate`, `userBlocking`, `normal`, `low`,
  `idle`. They schedule against a frame budget with per-priority render deadlines.
  These carry value with no native equivalent and are documented in full
  in [Concurrent strategies](../reference/concurrent-strategies.md).

## Why this existed

Before zoneless change detection, Angular's change detection was pull-based and
implicit: a single change could re-evaluate a component and every child on a
dirty-marked path, doing work on views that never changed. The strategies were a
way to opt into rendering only the view that received an update, and to spread
heavy rendering across frames.

Under Angular v21 the two halves of that motivation split apart. The
"re-render only what changed" half is now the default behaviour of signals and
zoneless change detection, so the native strategies mostly duplicate what the
framework already does. The "spread heavy rendering across frames" half has **no**
native equivalent and survives as the concurrent strategies. For the full mental
model of why change detection over-rendered, see
[Understanding change detection in Angular](../../../concepts/E1-change-detection.md);
for the frame-budget model behind the concurrent set, see
[Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md).

## Native strategies

| Name       | Render method   | Scheduling               | Notes                                                                         |
| ---------- | --------------- | ------------------------ | ----------------------------------------------------------------------------- |
| `"noop"`   | none            | none                     | Identity pass-through; no rendering.                                          |
| `"native"` | `markForCheck`  | none (synchronous `tap`) | Marks the view dirty; Angular renders it on its next cycle.                   |
| `"local"`  | `detectChanges` | `requestAnimationFrame`  | Coalesces per `requestAnimationFrame`, then renders the target view directly. |

Only the `local` strategy schedules through `requestAnimationFrame`; `native`
runs its `markForCheck` synchronously and `noop` does nothing. This mirrors the
one idea worth keeping from the old basic-strategies material: `local` renders
just the view it is applied to, rather than letting a global cycle re-evaluate the
tree.

## Concurrent strategies

The concurrent strategies schedule change detection against a frame budget and a
per-priority render deadline, chunking each render through a `MessageChannel`
(falling back to `setTimeout` where `MessageChannel` is unavailable). They
solve a problem Angular still has no native answer for: _how long_ a re-render may
run before it should yield to user input. They are **not** legacy. See
[Concurrent strategies](../reference/concurrent-strategies.md) for names,
priorities, and render deadlines, and
[Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)
for the mental model.

## See also

- Reference: [`RxStrategyProvider`](../reference/rx-strategy-provider.md)
- Reference: [Concurrent strategies](../reference/concurrent-strategies.md)
- Concept: [Understanding change detection in Angular](../../../concepts/E1-change-detection.md)
- Concept: [Zoneless & how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md)
- Concept: [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)
