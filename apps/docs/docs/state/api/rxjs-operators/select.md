---
title: select
# Moved from libs/state/selections/docs/operators/
---

## select

### Signature

```typescript
function select<T>(): MonoTypeOperatorFunction<T>;
```

Returns the state as shared, replayed and distinct `Observable<T>`. This way you don't have to think about late
subscribers, multiple subscribers or multiple emissions of the same value.

_Example_

```typescript
const state$ = state.pipe(select());
state$.subscribe((state) => doStuff(state));
```

### Signature

```typescript
function select<T, A>(op: OperatorFunction<T, A>): OperatorFunction<T, A>;
```

Returns the state as cached and distinct `Observable<A>`. Accepts arbitrary
[rxjs operators](https://rxjs-dev.firebaseapp.com/guide/operators) to enrich the selection with reactive composition.

_Example_

```typescript
const profilePicture$ = state.pipe(
  select(
    pluck('profilePicture'),
    switchMap((profilePicture) => mapImageAsync(profilePicture))
  )
);
```

### Signature

```typescript
function select<T, K1 extends keyof T>(k1: K1): OperatorFunction<T, T[K1]>;
```

Access a single property of the state by providing keys.
Returns a single property of the state as cached and distinct `Observable<T[K1]>`.

_Example_

```typescript
// Access a single property
const bar$ = state$.pipe(select('bar'));

// Access a nested property
const foo$ = state$.pipe(select('bar', 'foo'));
```

### Signature

```typescript
function select<T, K extends keyof T, R>(
  k: K,
  fn: (val: T[K]) => R
): OperatorFunction<T, R>;
```

Transform a single property of the state by providing a key and map function.
Returns result of applying function to state property as cached and distinct `Observable<T[R]>`.

_Example_

```typescript
// Project state based on single property
const foo$ = state$.pipe(select('bar', (bar) => `bar equals ${bar}`));
```

### Signature

```typescript
function select<T extends object, K extends keyof T, R>(
  keys: K[],
  fn: (slice: PickSlice<T, K>) => R,
  keyCompareMap?: KeyCompareMap<Pick<T, K>>
): OperatorFunction<T, R>;
```

Transform a slice of the state by providing keys and map function.
Returns result of applying function to state slice as cached and distinct `Observable<R>`.

_Example_

```typescript
// Project state slice
const text$ = state$.pipe(
  select(
    ['query', 'results'],
    ({ query, results }) => `${results.length} results found for "${query}"`
  )
);
```
