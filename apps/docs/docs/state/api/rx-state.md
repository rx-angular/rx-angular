---
sidebar_label: RxState
sidebar_position: 2
title: RxState
# Moved from libs/state/api/
---

## Overview

`RxState` is a light-weight reactive state management service for managing local state in Angular.

## Example

```typescript
Component({
  selector: 'app-stateful',
  template: `<div>{{ state$ | async | json }}</div>`,
  providers: [RxState],
});
export class StatefulComponent {
  readonly state$ = this.state.select();

  constructor(private state: RxState<{ foo: string }>) {}
}
```

## Signature

```typescript
class RxState<T extends object> implements OnDestroy, Subscribable<T> {
  readonly $: Observable<T> = this.accumulator.signal$;

  connect(inputOrSlice$: Observable<Partial<T> | V>, projectFn?: ProjectStateReducer<T, V>) => void;
  connect(key: K, slice$: Observable<T[K]>) => void;
  connect(key: K, input$: Observable<V>, projectSliceFn: ProjectValueReducer<T, K, V>) => void;

  set(stateOrProjectState: Partial<T> | ProjectStateFn<T>) => void;
  set(key: K, projectSlice: ProjectValueFn<T, K>) => void;

  select(op: OperatorFunction<T, A>) => Observable<A>;
  select(k1: K1) => Observable<T[K1]>;
  select(k: K, fn: (val: T[K]) => V): Observable<V>;
  select(keys: K[], fn: (slice: PickSlice<T, K>) => V, keyCompareMap?: KeyCompareMap<Pick<T, K>>): Observable<V>;
  select() => Observable<T>;

  get() => T;
  get(k1: K1) => Partial<T>;

  hold(obsOrObsWithSideEffect: Observable<S>, sideEffectFn?: (arg: S) => void) => void;

  setAccumulator(accumulatorFn: AccumulationFn) => void;
}
```

![](../../../../../libs/state/docs/images/api-schema.jpg)

![](../../../../../libs/state/docs/images/api-reveal.jpg)

## $ (state observable)

##### typeof: Observable&#60;T&#62;

The unmodified state exposed as `Observable<T>`. It is not shared, distinct or gets replayed.
Use the `$` property if you want to read the state without having applied [stateful](rxjs-operators/stateful.md) to it.

---

## asReadOnly

##### typeof: Pick&#60;RxState&#60;State&#62;, 'get' | 'select' | 'computed' | 'signal'&#62;

Return RxState in ReadOnly mode that is exposing
get(), select(), computed() and signal() methods.
This can be helpful when you don't want others to write in your state.

```typescript
const readOnlyState = state.asReadOnly();
const getNum = readOnlyState.get('num');
const selectNum$ = readOnlyState.select('num');
```

Trying to call any method that is not exposed in readOnlyState will throw an appropriate error

```typescript
const readOnlyState = state.asReadOnly();
readOnlyState['set']('num', (state) => state.num + 1);
```

```language: none
throwing -> readOnlyState.set is not a function
```

---

## connect

### Signature

```typescript
connect(inputOrSlice$: Observable<Partial<T> | V>, projectFn?: ProjectStateReducer<T, V>): void
```

Connect an `Observable<Partial<T>>` to the state `T`.
Any change emitted by the source will get merged into the state.
Subscription handling is done automatically.

_Example_

```typescript
const sliceToAdd$ = interval(250).pipe(mapTo({
  bar: 5,
  foo: 'foo'
});
state.connect(sliceToAdd$);
// every 250ms the properties bar and foo get updated due to the emission of sliceToAdd$

// Additionally you can provide a `projectionFunction` to access the current state object and do custom mappings.

const sliceToAdd$ = interval(250).pipe(mapTo({
  bar: 5,
  foo: 'foo'
});
state.connect(sliceToAdd$, (state, slice) => state.bar += slice.bar);
// every 250ms the properties bar and foo get updated due to the emission of sliceToAdd$. Bar will increase by
// 5 due to the projectionFunction
```

### Signature

```typescript
connect(key: K, slice$: Observable<T[K]>): void
```

Connect an `Observable<T[K]>` source to a specific property `K` in the state `T`. Any emitted change will update
this
specific property in the state.
Subscription handling is done automatically.

_Example_

```typescript
const myTimer$ = interval(250);
state.connect('timer', myTimer$);
// every 250ms the property timer will get updated
```

### Signature

```typescript
connect(key: K, slice$: Observable<V>, projectSliceFn: ProjectValueReducer<T, K, V>): void
```

Connect an `Observable<V>` source to a specific property in the state. Additionally you can provide a
`projectionFunction` to access the current state object on every emission of your connected `Observable`.
Any change emitted by the source will get merged into the state.
Subscription handling is done automatically.

_Example_

```typescript
const myTimer$ = interval(250);
state.connect('timer', myTimer$, (state, timerChange) => (state.timer += timerChange));
// every 250ms the property timer will get updated
```

---

## set

### Signature

```typescript
set(stateOrProjectState: Partial<T> | ProjectStateFn<T>): void
```

Manipulate one or many properties of the state by providing a `Partial<T>` state or a `ProjectionFunction<T>`.

_Example_

```typescript
// Update one or many properties of the state by providing a `Partial<T>`

const partialState = {
  foo: 'bar',
  bar: 5,
};
state.set(partialState);

// Update one or many properties of the state by providing a `ProjectionFunction<T>`

const reduceFn = (oldState) => ({
  bar: oldState.bar + 5,
});
state.set(reduceFn);
```

### Signature

```typescript
set(key: K, projectSlice: ProjectValueFn<T, K>): void
```

Manipulate a single property of the state by the property name and a `ProjectionFunction<T>`.

_Example_

```typescript
const reduceFn = (oldState) => oldState.bar + 5;
state.set('bar', reduceFn);
```

---

## select

### Signature

```typescript
select(): Observable<T>
```

Returns the state as cached and distinct `Observable<T>`. This way you don't have to think about **late
subscribers**,
**multiple subscribers** or **multiple emissions** of the same value

_Example_

```typescript
const state$ = state.select();
state$.subscribe((state) => doStuff(state));
```

### Signature

```typescript
select(op: OperatorFunction<T, A>): Observable<A>
```

Returns the state as cached and distinct `Observable<A>`. Accepts arbitrary
[rxjs operators](https://rxjs-dev.firebaseapp.com/guide/operators) to enrich the selection with reactive composition.

_Example_

```typescript
const profilePicture$ = state.select(
  map((state) => state.profilePicture),
  switchMap((profilePicture) => mapImageAsync(profilePicture)),
);
```

### Signature

```typescript
select(k1: K1): Observable<T[K1]>
```

Access a single property of the state by providing keys.
Returns a single property of the state as cached and distinct `Observable<T[K1]>`.

_Example_

```typescript
// Access a single property

const bar$ = state.select('bar');

// Access a nested property

const foo$ = state.select('bar', 'foo');
```

### Signature

```typescript
select(k: K, fn: (val: T[K]) => V): Observable<V>;
```

Transform a single property of the state by providing a key and map function.
Returns result of applying function to state property as cached and distinct `Observable<V>`.

_Example_

```typescript
// Project state based on single property
const foo$ = state.select('bar', (bar) => `bar equals ${bar}`);
```

### Signature

```typescript
select(keys: K[], fn: (slice: PickSlice<T, K>) => V, keyCompareMap?: KeyCompareMap<Pick<T, K>>): Observable<V>;
```

Transform a slice of the state by providing keys and map function.
Returns result of applying function to state slice as cached and distinct `Observable<V>`.

_Example_

```typescript
// Project state slice
const text$ = state.select(['query', 'results'], ({ query, results }) => `${results.length} results found for "${query}"`);
```

---

## get

### Signature

```typescript
get(): T
```

Read from the state in imperative manner. Returns the state object in its current state.

_Example_

```typescript
const { disabled } = state.get();
if (!disabled) {
  doStuff();
}
```

### Signature

```typescript
get(k1: K1): Partial<T>
```

Read from the state in an imperative manner by providing keys as parameters to reach deeply nested values.
Returns the part of state object.

_Example_

```typescript
interface State {
  bar: { foo: `test` };
  baz: true;
}

// Access a single property

const bar = state.get('bar');

// Access a nested property

const foo = state.get('bar', 'foo');
```

---

## hold

### Signature

```typescript
  hold(obsOrObsWithSideEffect: Observable<S>, sideEffectFn?: (arg: S) => void): void
```

Manages side-effects of your state. Provide an `Observable<any>` **side-effect** and an optional
`sideEffectFunction`.
Subscription handling is done automatically.

_Example_

```typescript
// Directly pass an observable side-effect
const localStorageEffect$ = changes$.pipe(tap((changes) => storeChanges(changes)));
state.hold(localStorageEffect$);

// Pass an additional `sideEffectFunction`

const localStorageEffectFn = (changes) => storeChanges(changes);
state.hold(changes$, localStorageEffectFn);
```

---

## setAccumulator

### Signature

```typescript
setAccumulator(accumulatorFn: AccumulationFn) => void
```

Allows to customize state accumulation function.
This can be helpful to implement deep updates and tackle other immutability problems in a custom way.

_Example_

```typescript
const myAccumulator = (state: MyState, slice: Partial<MyState>) => ({
  ...state,
  ...slice,
});

this.state.setAccumulator(myAccumulator);
```
