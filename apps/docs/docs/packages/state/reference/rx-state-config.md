---
id: rx-state-config
title: 'RxState configuration'
diataxis_type: reference
package: state
legacy_guard: false
sidebar_label: 'RxState configuration'
sidebar_position: 5
tags: [state, api-reference]
concepts: [E3]
---

# RxState configuration

`RxState` instances read two settings from the DI tree: the **scheduler** that drives state computation and the **accumulator** that merges each change into the state. Both are provided with the `provideRxStateConfig` provider function and its configuration features.

Every signature below is source-derived (package `21.1.1`).

**Import**

```ts
import { provideRxStateConfig, withScheduler, withSyncScheduler, withAccumulatorFn } from '@rx-angular/state';
```

## `provideRxStateConfig`

Registers `RxState` configuration in the DI tree. Pass one or more configuration features:

```ts title="main.ts"
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRxStateConfig } from '@rx-angular/state';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideRxStateConfig(),
    /* configuration features here */
  ],
});
```

| Configuration feature | Signature                                           | Purpose                                                  |
| --------------------- | --------------------------------------------------- | -------------------------------------------------------- |
| `withScheduler`       | `withScheduler(scheduler: SchedulerLike \| 'sync')` | Compute new states on the supplied RxJS `SchedulerLike`. |
| `withSyncScheduler`   | `withSyncScheduler()`                               | Compute new states fully synchronously.                  |
| `withAccumulatorFn`   | `withAccumulatorFn(accumulatorFn: AccumulationFn)`  | Replace the default state-merge function.                |

## Scheduler

By default, `RxState` observes changes and computes new states on RxJS's [`queueScheduler`](https://rxjs.dev/api/index/const/queueScheduler).

The `queueScheduler` provides a level of integrity: state mutations that trigger other state mutations execute in the right order. When used without a delay it runs a task synchronously, but when a task is scheduled recursively (inside an already-running scheduled task), that inner task is queued and waits for the current one to finish rather than executing immediately.

A consequence is that a nested mutation is not observed synchronously:

```ts
import { rxState } from '@rx-angular/state';

const state = rxState<{ foo: string; bar: string }>();

state.set(() => {
  // runs after `{ bar: 'bar' }` is set
  state.set('foo', 'foo');
  console.log(state.get('foo')); // prints undefined

  // runs first
  return { bar: 'bar' };
});
```

### `withSyncScheduler`

To make state fully synchronous, use `withSyncScheduler()`:

```ts title="main.ts"
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRxStateConfig, withSyncScheduler } from '@rx-angular/state';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [provideRxStateConfig(withSyncScheduler())],
});
```

### `withScheduler`

To use any other `SchedulerLike`, for example the `asapScheduler` to make state asynchronous:

```ts title="main.ts"
import { bootstrapApplication } from '@angular/platform-browser';
import { asapScheduler } from 'rxjs';
import { provideRxStateConfig, withScheduler } from '@rx-angular/state';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent, {
  providers: [provideRxStateConfig(withScheduler(asapScheduler))],
});
```

## Accumulator

The accumulator defines how the state transitions from change to change, meaning how each slice is integrated into the state.

By default, `RxState` is immutable at the top level of the state: slices are merged by spreading, producing a new object on every change (nested objects are shallow-cloned). The default `AccumulationFn` is:

```ts title="default-accumulator.ts"
import { AccumulationFn } from '@rx-angular/state/selections';

const defaultAccumulator: AccumulationFn = <T>(state: T, slice: Partial<T>): T => {
  return { ...state, ...slice };
};
```

### `withAccumulatorFn`

Use `withAccumulatorFn` to install a custom `AccumulationFn` via the DI tree, for example to integrate an [`immer`](https://immerjs.github.io/immer/)-based accumulation:

```ts title="main.ts"
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRxStateConfig, withAccumulatorFn } from '@rx-angular/state';
import { produce } from 'immer';
import { AppComponent } from './app.component';

const immerAccumulator = (state, slice) =>
  produce(state, (draft) => {
    Object.keys(slice).forEach((k) => {
      draft[k] = slice[k];
    });
  });

bootstrapApplication(AppComponent, {
  providers: [provideRxStateConfig(withAccumulatorFn(immerAccumulator))],
});
```

You can supply any custom merge strategy this way, such as a deep-copy algorithm or a fully mutable one.

> The per-instance `setAccumulator` method is **`@deprecated`** in favour of `withAccumulatorFn`. See the [`rxState` handle reference](./rx-state-functional.md).

## See also

- Reference: [`rxState` (functional)](./rx-state-functional.md), creating and configuring a state instance.
- Reference: [`RxState` (class API)](./rx-state-class.md).
- Concept: [Reactive state: global vs local, RxState + signals](../../../concepts/E3-reactive-state-global-vs-local.md).
