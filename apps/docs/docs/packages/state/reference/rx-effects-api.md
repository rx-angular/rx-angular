---
id: rx-effects-api
title: 'rxEffects'
diataxis_type: reference
package: state
legacy_guard: false
sidebar_label: 'rxEffects'
sidebar_position: 10
tags: [state, api-reference]
concepts: [E6]
---

# `rxEffects`

`rxEffects` is the functional creation function for `RxEffects`, a small helper that runs **Observable- or Promise-based side effects** and cleans up their subscriptions automatically when the current injection context is destroyed. It replaces manual `subscribe` / `takeUntil(destroy$)` / `ngOnDestroy` boilerplate.

Every signature below is source-derived (package `21.1.1`, entry point `@rx-angular/state/effects`).

> **Why side effects need their own tool:** see the [RxState reactive discipline & effects](../../../concepts/E6-rxstate-discipline-and-effects.md) concept.

**Import**

```ts
import { rxEffects } from '@rx-angular/state/effects';
```

Must be called within an [injection context](https://angular.dev/guide/di/dependency-injection-context), unless an `injector` is supplied via `RxEffectsOptions`.

## Signature

`rxEffects` has **four overloads**: no-arg, setup function, options, and setup function + options:

```ts
export function rxEffects(): RxEffects;
export function rxEffects(setupFn: RxEffectsSetupFn): RxEffects;
export function rxEffects(options: RxEffectsOptions): RxEffects;
export function rxEffects(setupFn: RxEffectsSetupFn, options: RxEffectsOptions): RxEffects;
```

| Param     | Type               | Meaning                                                                                                                            |
| --------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `setupFn` | `RxEffectsSetupFn` | Optional. Runs once on creation with a `Pick` of the handle (`register`, `onDestroy`) so effects can be wired inline in one place. |
| `options` | `RxEffectsOptions` | Optional. Provide an explicit `injector` so `rxEffects()` can be called outside an injection context.                              |
| _returns_ | `RxEffects`        | The effects handle (see below).                                                                                                    |

## Returned handle: `RxEffects`

```ts
interface RxEffects {
  register<T>(observable: SideEffectObservable<T>, sideEffectOrObserver?: SideEffectFnOrObserver<T>): () => void;
  onDestroy: (fn: () => void) => () => void;
}
```

| Member      | Kind   | Meaning                                                                                                                                    |
| ----------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `register`  | method | Subscribe to a source and run a side effect on each emission. Returns an **unregister callback**; call it to cancel that one effect early. |
| `onDestroy` | method | Register custom cleanup logic to run when the host context is destroyed. Returns a callback that removes the registration.                 |

> The functional handle exposes **only** `register` and `onDestroy`. There is no `unregister`, `registerOnDestroy`, or `untilEffect`; those belonged to the deprecated class API below. To cancel one effect, call the function returned by `register`.

### `register`

```ts
register<T>(
  observable: SideEffectObservable<T>,
  sideEffectOrObserver?: SideEffectFnOrObserver<T>,
): () => void;
```

| Param                  | Type                                                                         | Meaning                                                                                                                                                                              |
| ---------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `observable`           | `SideEffectObservable<T>` (= `ObservableInput<T>`)                           | The trigger: any `ObservableInput`, meaning an `Observable`, a `Promise`, an iterable, or a scheduler action.                                                                        |
| `sideEffectOrObserver` | `SideEffectFnOrObserver<T>` (= `((value: T) => void) \| PartialObserver<T>`) | Optional. The side-effect logic, as either a `next` callback or a full observer object (`{ next, error, complete }`). Omit it when the source already performs its effect via `tap`. |
| _returns_              | `() => void`                                                                 | Unregister callback; invoke it to unsubscribe this effect before destruction.                                                                                                        |

These four forms are equivalent:

```ts
register(obs$, doSideEffect);
register(obs$.pipe(tap(doSideEffect)));
register(obs$, { next: doSideEffect }); // can also tap error / complete
register(obs$, {
  next: doSideEffect,
  error: (e) => handle(e),
});
```

**Error handling.** If a registered observer omits `error`, or its `error` runs, the error is forwarded to Angular's `ErrorHandler` (looked up optionally from DI). An error in one effect does not tear down the others, but that individual stream completes, so recover with RxJS `retry()` / `catchError()` inside the pipe if the effect must survive.

### `onDestroy`

```ts
onDestroy(callback: () => void): () => void;
```

Registers a callback fired when the host `DestroyRef` is destroyed. Returns a function that removes the registration.

### `RxEffectsSetupFn`

```ts
export type RxEffectsSetupFn = (cfg: Pick<RxEffects, 'register' | 'onDestroy'>) => void;
```

### `RxEffectsOptions`

```ts
export type RxEffectsOptions = {
  injector?: Injector;
};
```

| Field      | Type       | Meaning                                                                                                                              |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `injector` | `Injector` | Optional. Explicit injector used to bind the instance's lifecycle, allowing `rxEffects()` to be called outside an injection context. |

## Minimal example

```ts
import { Component, inject } from '@angular/core';
import { rxEffects } from '@rx-angular/state/effects';
import { fromEvent } from 'rxjs';

@Component({
  /* … */
})
export class MyComponent {
  private readonly effects = rxEffects(({ register, onDestroy }) => {
    register(fromEvent(window, 'resize'), () => {
      console.log('window was resized');
    });
    onDestroy(() => {
      console.log('custom cleanup logic');
    });
  });
}
```

## `rxEffects` vs native `effect()`

`rxEffects` and Angular's built-in [`effect()`](https://angular.dev/guide/signals#effects) both run side effects, but they consume different reactive sources. Pick by the shape of your trigger, and do not wrap one in the other to bridge.

| Trigger source                                               | Use                                   | Why                                                                                                   |
| ------------------------------------------------------------ | ------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| A `signal()` / `computed()` value                            | Angular `effect()`                    | `effect()` tracks signal reads and re-runs on change; no subscription to manage.                      |
| An `Observable` (streams, events, HTTP, intervals)           | `rxEffects().register(obs$, fn)`      | Native `effect()` cannot subscribe to Observables; `rxEffects` owns the subscription and its cleanup. |
| A `Promise` / `ObservableInput` (`fetch`, scheduler actions) | `rxEffects().register(promise, fn)`   | `register` accepts any `ObservableInput`; `effect()` does not consume Promises.                       |
| A signal you need as a stream                                | `rxEffects` after `toObservable(sig)` | Convert to an Observable at the boundary, then register; this keeps the effect in one paradigm.       |

Rule of thumb: **signal in → `effect()`; Observable/Promise in → `rxEffects`.** Reach for `rxEffects` when the trigger is asynchronous orchestration (multi-source merges, HTTP with `retry`/`catchError`, polling), and for `effect()` when reacting to already-signalized state.

## Deprecated: the `RxEffects` class

```ts
import { RxEffects } from '@rx-angular/state/effects';
```

> **`@deprecated`: use `rxEffects` instead.** The class-based `RxEffects` service is retained for backward compatibility only. New code should use the functional `rxEffects` creation function above.

The class is provided via `providers: [RxEffects]` and injected. Its surface differs from the functional handle:

| Member              | Signature                                                                                                                                                     | Functional equivalent                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `register`          | `register<T>(sourceObs, sideEffectFn): number` · `register(sourceObs, observer): number` · `register(sideEffectObs): number` · `register(subscription): void` | `register(...)` returning an unregister **callback** (not a numeric id) |
| `unregister`        | `unregister(effectId: number): void`                                                                                                                          | call the callback returned by `register(...)`                           |
| `registerOnDestroy` | `registerOnDestroy(sideEffect): number \| void`                                                                                                               | `onDestroy(callback)`                                                   |
| `onDestroy$`        | `Observable<boolean>`                                                                                                                                         | — (use `onDestroy(...)`)                                                |
| `untilEffect`       | `untilEffect(effectId)` operator                                                                                                                              | **dropped**; build your own (`takeUntil(...)`) if needed                |

The class `register` returns a numeric **effect id**; the functional `register` returns an **unregister function**, aligning with how Angular's `effect()` returns an `EffectRef`.

## See also

- How-to: [Manage side effects](../how-to/manage-effects.md)
