---
id: select
title: "select"
diataxis_type: reference
package: state
legacy_guard: false
sidebar_label: "select"
tags: [state, api-reference]
concepts: [E3]
---

# `select`

RxJS operator that reads a slice of state as a **shared, replayed, distinct** `Observable`. It removes the need to think about late subscribers, multiple subscribers, or repeated emissions of the same value. `select` has several overloads: read the whole state, apply operators, access a (possibly nested) key by path, or transform a key/slice with a projection function.

## Signatures

### Whole state

```ts
function select<T>(): MonoTypeOperatorFunction<T>;
```

Returns the state as a shared, replayed, distinct `Observable<T>`.

```ts
const state$ = state.pipe(select());
state$.subscribe((state) => doStuff(state));
```

### Operator composition

```ts
function select<T, A>(op: OperatorFunction<T, A>): OperatorFunction<T, A>;
```

Accepts arbitrary RxJS operators to enrich the selection with reactive composition. Intermediate typed overloads exist for up to 5 chained operators (`select<T, A, B>`, … `select<T, A, B, C, D, E>`).

```ts
const profilePicture$ = state.pipe(
  select(
    map((state) => state.profilePicture),
    switchMap((profilePicture) => mapImageAsync(profilePicture)),
  ),
);
```

### Access a key by path (deep-key overloads)

`select` accepts **1 to 6** string keys to walk a (nested) path. Each depth has its own typed overload so the return type is inferred at every level:

```ts
function select<T, K1 extends keyof T>(k1: K1): OperatorFunction<T, T[K1]>;
function select<T, K1 extends keyof T, K2 extends keyof T[K1]>(
  k1: K1,
  k2: K2,
): OperatorFunction<T, T[K1][K2]>;
// … k3, k4, k5, k6 overloads follow the same pattern
function select<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  K5 extends keyof T[K1][K2][K3][K4],
  K6 extends keyof T[K1][K2][K3][K4][K5],
>(
  k1: K1,
  k2: K2,
  k3: K3,
  k4: K4,
  k5: K5,
  k6: K6,
): OperatorFunction<T, T[K1][K2][K3][K4][K5][K6]>;
```

```ts
// Access a single property
const bar$ = state$.pipe(select('bar'));

// Access a nested property (the 2-key overload)
const foo$ = state$.pipe(select('bar', 'foo'));
```

### Transform a single key

```ts
function select<T, K extends keyof T, R>(
  k: K,
  fn: (val: T[K]) => R,
): OperatorFunction<T, R>;
```

Returns the result of applying `fn` to the property, cached and distinct.

```ts
const foo$ = state$.pipe(select('bar', (bar) => `bar equals ${bar}`));
```

### Transform a slice

```ts
function select<T extends object, K extends keyof T, R>(
  keys: K[],
  fn?: (slice: PickSlice<T, K>) => R,
  keyCompareMap?: KeyCompareMap<Pick<T, K>>,
): OperatorFunction<T, R>;
```

Returns the result of applying `fn` to the selected slice, cached and distinct.

```ts
const text$ = state$.pipe(
  select(
    ['query', 'results'],
    ({ query, results }) => `${results.length} results found for "${query}"`,
  ),
);
```

## Import

```ts
import { select } from '@rx-angular/state/selections';
```

## Signal alternative

For reading state **inside a component**, prefer the native signal surface over `select`. An `RxState` handle exposes `state.signal('key')` (and `computed()` for derivations); a global source can be adapted with `toSignal(...)`. Use the `select` operator when you are composing an **RxJS pipeline** (multiple `Observable` sources, `connect` feeds), rather than when you are only reading a value for a template.

```ts
// in-component read — no operator, no async pipe
protected readonly bar = this.state.signal('bar');
```

## See also

- Concept: [Reactive state: global vs local, RxState + signals](../../../concepts/E3-reactive-state-global-vs-local.md)
- Reference: [`selectSlice`](./select-slice.md) · [`stateful`](./stateful.md) · [`distinctUntilSomeChanged`](./distinct-until-some-changed.md)
