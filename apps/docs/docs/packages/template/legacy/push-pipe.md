---
id: push-pipe
title: "RxPush"
diataxis_type: reference
package: template
legacy_guard: "Zone.js / <21 / per-binding scheduling"
sidebar_label: "RxPush (legacy)"
tags: [template, api-reference, migration]
---

import LegacyGuard from '@site/src/components/LegacyGuard';

# RxPush

<LegacyGuard audience="Zone.js / <21 / per-binding scheduling" native="since Angular v21, change detection is zoneless by default and AsyncPipe works without Zone.js">

Under zoneless change detection (default since Angular v21) the standard
`AsyncPipe` works: it calls `markForCheck` on every emission, so it is a
first-class zoneless notifier. `toSignal()` is the other native option. Reach for
those first. `RxPush` is worth keeping only for its **residual unique value**,
the per-binding render scheduling described below.

</LegacyGuard>

`RxPush` (the `push` pipe) binds an `Observable` or `Promise` to the view the way
`AsyncPipe` does, but routes the resulting change detection through a
prioritized, cancelable [render strategy](../how-to/tune-rendering-with-strategies.md)
instead of marking the whole component tree dirty.

## Residual unique value: per-binding render scheduling

`AsyncPipe` marks the component and all its ancestors dirty on each emission and
lets Angular flush them together. `RxPush` instead **schedules each binding's
change detection independently** through the render-strategy scheduler, so a
batch of high-frequency emissions can be coalesced and spread across frames
rather than blocking a single synchronous flush. That per-binding,
frame-budgeted scheduling, not any Zone.js concern, is the reason to
prefer it over `AsyncPipe`/`toSignal()` on modern Angular.

For the scheduling model this builds on, see
[Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md).

## Import

```typescript
import { RxPush } from '@rx-angular/template/push';
```

`RxPush` is a standalone pipe (`name: 'push'`); add it to a component's
`imports`.

## Usage

```typescript
import { Component } from '@angular/core';
import { RxPush } from '@rx-angular/template/push';

@Component({
  selector: 'app-hero',
  imports: [RxPush],
  template: `
    <hero-search [term]="searchTerm$ | push" />
    <hero-list [heroes]="heroes$ | push" />
  `,
})
export class HeroComponent {
  // searchTerm$, heroes$ …
}
```

Select a render strategy per binding with the pipe argument:

```html
<hero-list [heroes]="heroes$ | push: 'immediate'" />
```

Or pass an object config to also supply a `renderCallback` or `patchZone`:

```html
<hero-list [heroes]="heroes$ | push: { strategy: 'normal', patchZone: false }" />
```

## Signature

```typescript
@Pipe({ name: 'push', pure: false, standalone: true })
class RxPush implements PipeTransform, OnDestroy {
  constructor(cdRef: ChangeDetectorRef);

  transform<U>(
    potentialObservable: null,
    config?: RxStrategyNames | Observable<RxStrategyNames>,
    renderCallback?: NextObserver<U>,
  ): null;
  transform<U>(
    potentialObservable: undefined,
    config?: RxStrategyNames | Observable<RxStrategyNames>,
    renderCallback?: NextObserver<U>,
  ): undefined;
  transform<U>(
    potentialObservable: ObservableInput<U> | U,
    config?: RxStrategyNames | Observable<RxStrategyNames>,
    renderCallback?: NextObserver<U>,
  ): U;
  transform<U>(
    potentialObservable: ObservableInput<U>,
    config?: PushInput<U>,
  ): U;

  ngOnDestroy(): void;
}
```

`RxPush` is **not generic**: the class-level generic argument was removed; the
element type `U` is inferred per `transform` call. The pipe uses `inject()`
internally to obtain its `RxStrategyProvider` and `NgZone`; its **only
constructor parameter is `cdRef: ChangeDetectorRef`**.

### Object config (`PushInput`)

The object-config overload accepts:

| Option | Type | Meaning |
| ------ | ---- | ------- |
| `strategy` | `RxStrategyNames \| Observable<RxStrategyNames>` | The render strategy for this binding. |
| `renderCallback` | `NextObserver<T>` | Notified after each render pass completes. |
| `patchZone` | `boolean` | Whether the render runs inside `NgZone`. Inert under zoneless. |

## See also

- Concept (legacy context): [Zoneless & how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md)
- Concept: [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)
- How-to: [Tune rendering with strategies](../how-to/tune-rendering-with-strategies.md)
