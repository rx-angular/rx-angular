---
id: rx-strategy-provider
title: 'RxStrategyProvider'
diataxis_type: reference
package: cdk
legacy_guard: false
sidebar_label: 'RxStrategyProvider'
tags: [cdk, api-reference]
concepts: [E5]
---

import LegacyGuard from '@site/src/components/LegacyGuard';

# RxStrategyProvider

`RxStrategyProvider` is the service surface for scheduling arbitrary work against
the render strategies. It is **CDK-exclusive**: there is no native Angular
equivalent for priority-aware, frame-budgeted scheduling, so it stays a supported
API. Its scheduling methods (`schedule`, `scheduleWith`) are current; only the zone-era
change-detection methods (`scheduleCD`, `patchZone`) are legacy and marked inline
below.

For the mental model behind concurrent scheduling (frame budget, render
deadlines, and the RAIL targets these APIs serve), see
[Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md).

## Import path

```ts
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
```

## Signature

```ts
@Injectable({ providedIn: 'root' })
export class RxStrategyProvider<T extends string = string> {
  get config(): Required<RxRenderStrategiesConfig<T>>;

  get strategies(): RxStrategies<T>;
  get strategyNames(): string[];

  get primaryStrategy(): RxStrategyNames<T>;
  set primaryStrategy(strategyName: RxStrategyNames<T>);

  readonly primaryStrategy$: Observable<RxStrategyCredentials>;
  readonly strategies$: Observable<RxStrategies<T>>;
  readonly strategyNames$: Observable<string[]>;

  schedule<R>(work: () => R, options?: ScheduleOnStrategyOptions): Observable<R>;

  scheduleWith<R>(work: (v?: R) => void, options?: ScheduleOnStrategyOptions): MonoTypeOperatorFunction<R>;

  scheduleCD(
    cdRef: ChangeDetectorRef,
    options?: ScheduleOnStrategyOptions & {
      afterCD?: () => void;
      abortCtrl?: AbortController;
    },
  ): AbortController;
}
```

`ScheduleOnStrategyOptions` is `{ scope?: object; strategy?: string; patchZone?: false | NgZone }`.

## Accessors

### `get config()`

Returns the resolved configuration in use, of type `Required<RxRenderStrategiesConfig<T>>`.
It contains `primaryStrategy`, the `customStrategies` map, and `patchZone`.

```ts
const config = strategyProvider.config;
```

### `get strategies()` / `strategyNames`

`strategies` returns the `RxStrategies<T>` map: key-value pairs of strategy name
to its `RxStrategyCredentials`. `strategyNames` returns just the array of names.

```ts
const strategies = strategyProvider.strategies; // credentials map
const names = strategyProvider.strategyNames; // string[]
```

### `get primaryStrategy()` / `set primaryStrategy()`

Reads or sets the default strategy the service uses when a call does not name one.

```ts
strategyProvider.primaryStrategy = 'low';
const current = strategyProvider.primaryStrategy;
```

### `primaryStrategy$` / `strategies$` / `strategyNames$`

Observable forms of the accessors above. Note the split: **`strategies$` emits the
credentials map** (`RxStrategies<T>`), while **`strategyNames$` emits the array of
names** (`string[]`). `primaryStrategy$` emits the current primary strategy's
`RxStrategyCredentials`.

```ts
const strategies$ = strategyProvider.strategies$; // Observable<RxStrategies<T>>
const strategyNames$ = strategyProvider.strategyNames$; // Observable<string[]>
```

## Scheduling methods

### `schedule` & `scheduleWith`

The current, supported scheduling surface. Both take the work to run plus an
optional `ScheduleOnStrategyOptions`.

- `schedule` returns an `Observable<R>`; subscribe to run the work.
- `scheduleWith` returns a `MonoTypeOperatorFunction<R>` for use inside an RxJS
  `pipe()`.

The options let you pick a `strategy`, opt out of zone patching (`patchZone: false`),
and set a `scope`. Setting `scope` to `this` coalesces multiple scheduled
change-detection calls into a single cycle.

```ts
strategyProvider.schedule(() => myWork(), { strategy: 'idle', patchZone: false, scope: this }).subscribe();

source$.pipe(strategyProvider.scheduleWith(() => myWork(), { strategy: 'idle', scope: this })).subscribe();
```

### `scheduleCD` & zone patching

<LegacyGuard audience="Angular <21 / still-zoneful / perf-retrofit">

`scheduleCD` schedules an imperative change-detection cycle on a supplied
`ChangeDetectorRef`, and the `patchZone` option controls whether scheduled work
re-enters `NgZone`. Both belong to the Zone.js era. Under zoneless change detection
(default since Angular v21) `patchZone` is a no-op, and the manual-CD need that
`scheduleCD` served is usually covered by signals and `afterNextRender`. See
[Zoneless & how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md).

</LegacyGuard>

`scheduleCD` takes the target `ChangeDetectorRef` and an options object that may
add `afterCD` (work to run after the cycle) and `abortCtrl` (an `AbortController`
to cancel the scheduled cycle). It returns the `AbortController`.

```ts
const abort = strategyProvider.scheduleCD(this.cdRef, { afterCD: () => finalize() });
// later
abort.abort();
```

## See also

- Reference: [Concurrent strategies](./concurrent-strategies.md): names, priorities, render deadlines
- Concept: [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)
- How-to: [Render heavy UI work without blocking the frame](../../template/how-to/concurrent-rendering.md)
