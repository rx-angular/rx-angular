---
title: 'rxState'
package: state
sidebar_label: 'rxState (functional)'
sidebar_position: 1
tags: [state, api-reference]
---

# `rxState`

The functional way to create and configure an `RxState` instance. `rxState()` is a wrapper around the class-based [`RxState`](./rx-state-class.md) service that binds its lifecycle to the current injection context; the instance is destroyed automatically when the host component/directive/service is destroyed. It is the modern default for local reactive state; the class API is the legacy surface.

> **When to use RxState (and when signals are enough):** for local component state prefer Angular's `signal()` / `computed()`. `rxState()` earns its place for global/shared state, complex derived state, and async-heavy orchestration. See [Reactive state: global vs local, RxState + signals](/docs/concepts/reactive-state-global-vs-local).

**Import**

```ts
import { rxState } from '@rx-angular/state';
```

## Signature

`rxState` has **four overloads**: no-arg, setup function, options, and setup function + options:

```ts
export function rxState<State extends object>(): RxState<State>;
export function rxState<State extends object>(setupFn: RxStateSetupFn<State>): RxState<State>;
export function rxState<State extends object>(options: RxStateOptions): RxState<State>;
export function rxState<State extends object>(setupFn: RxStateSetupFn<State>, options: RxStateOptions): RxState<State>;
```

| Param     | Type                    | Meaning                                                                                                                                                                                  |
| --------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `setupFn` | `RxStateSetupFn<State>` | Optional. Runs once on creation with a subset of the state handle (`connect`, `set`, `get`, `select`, `setAccumulator`) so you can seed initial state and wire connections in one place. |
| `options` | `RxStateOptions`        | Optional. Provide an explicit `injector` so `rxState()` can be called outside an injection context.                                                                                      |
| _returns_ | `RxState<State>`        | The functional state handle (see below).                                                                                                                                                 |

Must be called within an injection context, unless an `injector` is supplied via `RxStateOptions`.

## Returned handle: `RxState<State>`

The functional handle is a `Pick` of the class `RxState` service exposing **10 members**:

```ts
// Illustrative shape only — see the note below.
type RxState<T extends object> = Pick<LegacyState<T>, 'get' | 'select' | 'connect' | 'set' | '$' | 'setAccumulator' | 'signal' | 'computed' | 'computedFrom' | 'asReadOnly'>;
```

> This `Pick` type shows the shape of the handle; it is **not** directly importable. `import { RxState } from '@rx-angular/state'` resolves to the class-based `RxState` service, not this type. If you need a named type for the handle, capture it via `ReturnType<typeof rxState>`.

| Member           | Kind                | Meaning                                                                                                                                                                                                                                                                          |
| ---------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$`              | `Observable<State>` | The raw, unmodified state observable; not shared, distinct, or replayed.                                                                                                                                                                                                         |
| `get`            | method              | Read a one-shot, **non-reactive** snapshot; creates no dependency and never re-runs on change, so never call it inside `computed()`/`state.computed()` or a template binding. Use `signal`/`select`/`computed` for reactive reads. See [`RxState#get`](./rx-state-class.md#get). |
| `set`            | method              | Write a `Partial<State>`, a projection function, or a single-key value. See [`RxState#set`](./rx-state-class.md#set).                                                                                                                                                            |
| `connect`        | method              | Merge an `Observable`/`Signal` source into state (8 overloads). See [`RxState#connect`](./rx-state-class.md#connect).                                                                                                                                                            |
| `select`         | method              | Read state reactively as a cached, distinct `Observable`. See [`RxState#select`](./rx-state-class.md#select).                                                                                                                                                                    |
| `signal`         | method              | Read a single key as a `Signal<State[Key]>`, the signals-first template surface. See [`RxState#signal`](./rx-state-class.md#signal).                                                                                                                                             |
| `computed`       | method              | Derive a `Signal` from multiple keys. See [`RxState#computed`](./rx-state-class.md#computed).                                                                                                                                                                                    |
| `computedFrom`   | method              | Derive a `Signal` from state via RxJS operators. See [`RxState#computedFrom`](./rx-state-class.md#computedfrom).                                                                                                                                                                 |
| `asReadOnly`     | method              | Return a read-only view exposing only `get`/`select`/`computed`/`signal`.                                                                                                                                                                                                        |
| `setAccumulator` | method              | **`@deprecated`**: customize the accumulation function. Prefer `provideRxStateConfig(withAccumulatorFn(...))`.                                                                                                                                                                   |

> The functional handle does **not** expose `hold()`. For side effects, use `rxEffects().register(...)` instead. See [`rxEffects`](./rx-effects.md).

### `RxStateSetupFn<State>`

The setup function receives a **5-member** subset of the handle:

```ts
export type RxStateSetupFn<State extends object> = (rxState: Pick<RxState<State>, 'connect' | 'set' | 'get' | 'select' | 'setAccumulator'>) => void;
```

### `RxStateOptions`

```ts
type RxStateOptions = {
  injector?: Injector;
};
```

> `RxStateOptions` is an internal type: it is **not** re-exported from `@rx-angular/state`, so it cannot be imported by name. The signatures above use it only to describe the options object's shape — pass a matching object literal (`{ injector }`) directly.

| Field      | Type       | Meaning                                                                                                                            |
| ---------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `injector` | `Injector` | Optional. Explicit injector used to bind the instance's lifecycle, allowing `rxState()` to be called outside an injection context. |

## Minimal example

```ts
import { Component, inject } from '@angular/core';
import { rxState } from '@rx-angular/state';

@Component({
  selector: 'app-movie-list',
  template: `
    @for (movie of movies(); track movie.id) {
      <app-movie [movie]="movie" />
    }
  `,
})
export class MovieListComponent {
  private readonly movieService = inject(MovieService);

  private readonly state = rxState<{ movies: Movie[] }>(({ set, connect }) => {
    set({ movies: [] });
    connect('movies', this.movieService.movies$);
  });

  // signals-first template surface
  readonly movies = this.state.signal('movies');
}
```

## Signal interop

`rxState()` bridges reactive sources into signals for the template:

- `state.signal('key')`: read one key as a `Signal`.
- `state.computed((s) => s.a + s.b)`: derive a `Signal` from multiple keys.
- `state.computedFrom(map(...), filter(...))`: derive a `Signal` through RxJS operators.
- `connect('key', someSignal)`: write a `Signal` source into state.

Prefer these signal accessors over `$` / `select()` for template bindings on modern, zoneless apps.

## Partial updates

`RxState` has partial updates built in. Every change sent to the state over `set` or `connect` is treated as a **partial** update: an instance typed with `T` accepts `Partial<T>` on both methods, and the change is merged into the current state.

A partial update can be supplied two ways:

- directly, as a `Partial<T>` object; or
- via a projection function `(oldState) => Partial<T>` (the `set` overload that takes a `ProjectStateFn`). For a two-argument reducer `(oldState, value) => Partial<T>`, use `connect` with an observable source.

The merge is **shallow**. A partial update replaces top-level keys wholesale; nested objects are not deep-merged. Keys absent from the partial are left untouched. To merge differently, replace the [accumulator](./rx-state-config.md#accumulator).

## Configuration

`rxState()` reads its accumulator and scheduler from DI. Provide them with `provideRxStateConfig`:

```ts
import { provideRxStateConfig, withAccumulatorFn, withScheduler } from '@rx-angular/state';
import { asapScheduler } from 'rxjs';

providers: [
  provideRxStateConfig(
    withAccumulatorFn((state, slice) => ({ ...state, ...slice })),
    withScheduler(asapScheduler),
  ),
];
```

## See also

- Reference: [`RxState` (class API)](./rx-state-class.md), the full method surface `rxState()` wraps.
- Reference: [`rxEffects`](./rx-effects.md), side effects (the replacement for `hold()`).
- Concept: [Reactive state: global vs local, RxState + signals](/docs/concepts/reactive-state-global-vs-local).
