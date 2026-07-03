---
id: rx-state-class
title: 'RxState'
diataxis_type: reference
package: state
legacy_guard: 'class-based RxState / DI-style consumers'
sidebar_label: 'RxState (class)'
sidebar_position: 2
tags: [state, api-reference, migration]
concepts: [E3]
---

import LegacyGuard from '@site/src/components/LegacyGuard';

# `RxState`

`RxState` is a light-weight reactive state management service for managing local state in Angular. This page documents the **class-based** API, the legacy surface. For new code, prefer the functional [`rxState()`](./rx-state-functional.md) creator, which wraps this class and binds its lifecycle to the injection context automatically.

Every signature below is source-derived (package `21.1.1`).

<LegacyGuard audience="class-based RxState / DI-style consumers" native="the functional rxState() creator wraps this class and manages its lifecycle for you" conceptSlug="E3-reactive-state-global-vs-local" conceptLabel="Reactive state: global vs local, RxState + signals">

The class-based `RxState<T>` (via `extends RxState` or constructor DI + `providers: [RxState]`) is the **legacy** way to use RxState. Class-based `RxState<T>` is not formally deprecated, but the functional [`rxState()`](./rx-state-functional.md) is the modern default. Reach for the class API only if you have existing DI-style consumers. For the mental model of when RxState fits at all, see [Reactive state: global vs local, RxState + signals](../../../concepts/E3-reactive-state-global-vs-local.md).

</LegacyGuard>

**Import**

```ts
import { RxState } from '@rx-angular/state';
```

## Signature

`RxState` **`implements Subscribable<State>`** (not `OnDestroy`):

```ts
class RxState<State extends object> implements Subscribable<State> {
  readonly $: Observable<State>;

  // connect — 8 overloads (Observable + Signal sources)
  connect(inputOrSlice$: Observable<Partial<State>>): void;
  connect(signal: Signal<Partial<State>>): void;
  connect<Value>(inputOrSlice$: Observable<Value>, projectFn: ProjectStateReducer<State, Value>): void;
  connect<Value>(signal: Signal<Value>, projectFn: ProjectStateReducer<State, Value>): void;
  connect<Key extends keyof State>(key: Key, slice$: Observable<State[Key]>): void;
  connect<Key extends keyof State>(key: Key, signal: Signal<State[Key]>): void;
  connect<Key extends keyof State, Value>(key: Key, input$: Observable<Value>, projectSliceFn: ProjectValueReducer<State, Key, Value>): void;
  connect<Key extends keyof State, Value>(key: Key, signal: Signal<Value>, projectSliceFn: ProjectValueReducer<State, Key, Value>): void;

  set(stateOrProjectState: Partial<State> | ProjectStateFn<State>): void;
  set<Key extends keyof State, Object>(key: Key, projectSlice: ProjectValueFn<State, Key>): void;

  select(): Observable<State>;
  select<A>(op: OperatorFunction<State, A>): Observable<A>;
  select<KeyA extends keyof State>(keyA: KeyA): Observable<State[KeyA]>;
  select<Key extends keyof State, Value>(key: Key, fn: (val: State[Key]) => Value): Observable<Value>;
  select<Key extends keyof State, Value>(keys: Key[], fn?: (slice: PickSlice<State, Key>) => Value, keyCompareMap?: KeyCompareMap<Pick<State, Key>>): Observable<Value>;

  get(): State;
  get<KeyA extends keyof State>(keyA: KeyA): State[KeyA];

  signal<Key extends keyof State>(key: Key): Signal<State[Key]>;
  computed<ComputedType>(fn: (slice: SignalStateProxy<State>) => ComputedType): Signal<ComputedType>;
  computedFrom<TypeA = State>(op1: OperatorFunction<State, TypeA>): Signal<TypeA>;

  asReadOnly(): Pick<RxState<State>, 'get' | 'select' | 'computed' | 'signal'>;

  hold<SideEffect>(obsOrObsWithSideEffect: Observable<SideEffect>, sideEffectFn?: (arg: SideEffect) => void): void;

  /** @deprecated use provideRxStateConfig(withAccumulatorFn(...)) */
  setAccumulator(accumulatorFn: AccumulationFn): void;
}
```

> Both `select`, `connect`, `computedFrom`, and `get` carry additional deep-key / multi-operator overloads marked `@internal` in source; the public overloads are shown above.

## Members

### `$` (state observable)

_typeof:_ `Observable<State>`

The unmodified state exposed as `Observable<State>`. It is **not** shared, distinct, or replayed. Use `$` to read the state without having `stateful` applied to it.

### `connect`

Connect an `Observable` or `Signal` source to the state; every emission is merged in. Subscription handling is automatic. **8 overloads** cover whole-slice source, single-key source, and single-key-with-projection, each in an `Observable` and a `Signal` variant.

```ts
// whole-slice observable
state.connect(sliceToAdd$);
// single key
state.connect('timer', interval(250));
// single-key signal
state.connect('currentTime', currentTimeSignal);
// single key with projection
state.connect('timer', interval(250), (s, tick) => s.timer + tick);
```

### `set`

Write state by `Partial<State>`, a projection function, or a single key + value projection.

```ts
state.set({ foo: 'bar', bar: 5 });
state.set((oldState) => ({ bar: oldState.bar + 5 }));
state.set('bar', (oldState) => oldState.bar + 5);
```

### `select`

Read state reactively as a cached, distinct `Observable`. Overloads: whole state, an arbitrary RxJS operator, a single key, a key + map function, and a keys-slice + map function (with optional `KeyCompareMap`).

```ts
const state$ = state.select();
const bar$ = state.select('bar');
const label$ = state.select('bar', (bar) => `bar equals ${bar}`);
```

See [`CompareFn`](./compare-fn.md) and [`KeyCompareMap`](./key-compare-map.md) for custom key comparison.

### `get`

Read state imperatively.

```ts
get(): State;
get<KeyA extends keyof State>(keyA: KeyA): State[KeyA];
```

`get('bar')` returns `State['bar']` (the exact key type, not `Partial<State>`).

```ts
const { disabled } = state.get();
const bar = state.get('bar');
```

### `signal`

_typeof:_ `signal<Key extends keyof State>(key: Key): Signal<State[Key]>`

Returns a `Signal` of the given key. Its initial value is the current key value; it updates whenever the key changes. This is the signals-first read surface.

```ts
readonly foo = this.state.signal('foo');
```

### `computed`

Create a computed `Signal` from multiple keys via a signal-state proxy.

```ts
readonly total = this.state.computed((s) => s.foo + s.bar);
```

### `computedFrom`

Create a computed `Signal` derived from state through RxJS operators. Throws if there is no synchronous initial value; use `startWith()` to seed one.

```ts
readonly bigFoo = this.state.computedFrom(
  map((s) => s.foo),
  filter((foo) => foo > 5),
);
```

### `asReadOnly`

_typeof:_ `Pick<RxState<State>, 'get' | 'select' | 'computed' | 'signal'>`

Return `RxState` in read-only mode, exposing only `get()`, `select()`, `computed()`, and `signal()`. Useful when you do not want consumers to write into your state. Calling a non-exposed method (e.g. `set`) throws.

```ts
const readOnlyState = state.asReadOnly();
const num = readOnlyState.get('num');
```

### `hold`

Manage a side-effect. Provide an `Observable` side-effect and an optional `sideEffectFn`. Subscription handling is automatic. `hold` is **not** deprecated on the class.

```ts
state.hold(changes$, (changes) => storeChanges(changes));
```

> `hold()` exists only on the class. On the functional [`rxState()`](./rx-state-functional.md) handle, use `rxEffects().register(...)` instead.

### `setAccumulator`

**`@deprecated`**: use `provideRxStateConfig(withAccumulatorFn(...))` instead; will be removed in a future version.

```ts
setAccumulator(accumulatorFn: AccumulationFn): void
```

Customize the accumulation function (e.g. to implement deep updates).

## Reading state in the signal era

On modern, zoneless apps prefer the signal accessors (`signal('key')`, `computed(...)`, `computedFrom(...)`) for template bindings, and reserve `$` / `select()` for RxJS pipelines. `toSignal()` also works on any `select()` observable.

## Minimal example

```ts
import { Component } from '@angular/core';
import { rxState } from '@rx-angular/state';

@Component({
  selector: 'app-stateful',
  template: `{{ foo() }}`,
})
export class StatefulComponent {
  // Modern default — the class API is documented here for legacy consumers.
  private readonly state = rxState<{ foo: string }>(({ set }) => set({ foo: 'bar' }));
  readonly foo = this.state.signal('foo');
}
```

## See also

- Reference: [`rxState` (functional creator)](./rx-state-functional.md), the modern default.
- Reference: [`CompareFn`](./compare-fn.md) · [`KeyCompareMap`](./key-compare-map.md).
- Concept: [Reactive state: global vs local, RxState + signals](../../../concepts/E3-reactive-state-global-vs-local.md).
