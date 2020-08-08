# Overview

RxState is a light-weight reactive state management service for managing local state in angular.

_Example_

```TypeScript
Component({
  selector: 'app-stateful',
  template: `<div>{{ state$ | async | json }}</div>`,
  providers: [RxState]
})
export class StatefulComponent {
  readonly state$ = this.state.select();

  constructor(private state: RxState<{ foo: string }>) {}
}
```

![](api-schema.jpg)

![](api-reveal.jpg)

## Signature

```TypeScript
class RxState<T extends object> implements OnDestroy, Subscribable<T> {
  readonly readonly $: Observable<T> = this.accumulator.signal$;

  connect(inputOrSlice$: Observable<Partial<T> | V>, projectFn?: ProjectStateReducer<T, V>) => void;
  connect(key: K, slice$: Observable<T[K]>) => void;
  connect(key: K, input$: Observable<V>, projectSliceFn: ProjectValueReducer<T, K, V>) => void;

  set(stateOrProjectState: Partial<T> | ProjectStateFn<T>) => void;
  set(key: K, projectSlice: ProjectValueFn<T, K>) => void;

  select(op: OperatorFunction<T, A>) => Observable<A>;
  select(k1: K1) => Observable<T[K1]>;
  select() => Observable<T>;

  get() => T;
  get(k1: K1) => Partial<T>;

  hold(obsOrObsWithSideEffect: Observable<S>, sideEffectFn?: (arg: S) => void) => void;

  setAccumulator(accumulatorFn: AccumulationFn) => void;
}
```

# \$

##### typeof: Observable&#60;T&#62;

The unmodified state exposed as `Observable<T>`. It is not shared, distinct or gets replayed.
Use the `$` property if you want to read the state without having applied <a href='/docs/generated/operators/stateful#stateful'>stateful</a> to it.

---

# connect

### Signature

```TypeScript
connect(inputOrSlice$: Observable<Partial<T> | V>, projectFn?: ProjectStateReducer<T, V>): void
```

Connect an `Observable<Partial<T>>` to the state `T`.
Any change emitted by the source will get merged into the state.
Subscription handling is done automatically.

_Example_

```TypeScript
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

```TypeScript
connect(key: K, slice$: Observable<T[K]>): void
```

Connect an `Observable<T[K]>` source to a specific property `K` in the state `T`. Any emitted change will update
this
specific property in the state.
Subscription handling is done automatically.

_Example_

```TypeScript
const myTimer$ = interval(250);
state.connect('timer', myTimer$);
// every 250ms the property timer will get updated
```

### Signature

```TypeScript
connect(key: K, slice$: Observable<V>, projectSliceFn: ProjectValueReducer<T, K, V>): void
```

Connect an `Observable<V>` source to a specific property in the state. Additionally you can provide a
`projectionFunction` to access the current state object on every emission of your connected `Observable`.
Any change emitted by the source will get merged into the state.
Subscription handling is done automatically.

_Example_

```TypeScript
const myTimer$ = interval(250);
state.connect('timer', myTimer$, (state, timerChange) => state.timer += timerChange);
// every 250ms the property timer will get updated
```

---

# set

### Signature

```TypeScript
set(stateOrProjectState: Partial<T> | ProjectStateFn<T>): void
```

Manipulate one or many properties of the state by providing a `Partial<T>` state or a `ProjectionFunction<T>`.

_Example_

```TypeScript
// Update one or many properties of the state by providing a `Partial<T>`

const partialState = {
  foo: 'bar',
  bar: 5
};
state.set(partialState);

// Update one or many properties of the state by providing a `ProjectionFunction<T>`

const reduceFn = oldState => ({
  bar: oldState.bar + 5
});
state.set(reduceFn);
```

### Signature

```TypeScript
set(key: K, projectSlice: ProjectValueFn<T, K>): void
```

Manipulate a single property of the state by the property name and a `ProjectionFunction<T>`.

_Example_

```TypeScript
const reduceFn = oldState => oldState.bar + 5;
state.set('bar', reduceFn);
```

---

# select

### Signature

```TypeScript
select(): Observable<T>
```

returns the state as cached and distinct `Observable<T>`. This way you don't have to think about **late
subscribers**,
**multiple subscribers** or **multiple emissions** of the same value

_Example_

```TypeScript
const state$ = state.select();
state$.subscribe(state => doStuff(state));
```

### Signature

```TypeScript
select(op: OperatorFunction<T, A>): Observable<A>
```

returns the state as cached and distinct `Observable<A>`. Accepts arbitrary
[rxjs operators](https://rxjs-dev.firebaseapp.com/guide/operators) to enrich the selection with reactive composition.

_Example_

```TypeScript
const profilePicture$ = state.select(
 pluck('profilePicture'),
 switchMap(profilePicture => mapImageAsync(profilePicture))
);
```

### Signature

```TypeScript
select(k1: K1): Observable<T[K1]>
```

Access a single property of the state by providing keys.
Returns a single property of the state as cached and distinct `Observable<T[K1]>`.

_Example_

```TypeScript
// Access a single property

const bar$ = state.select('bar');

// Access a nested property

const foo$ = state.select('bar', 'foo');
```

---

# get

### Signature

```TypeScript
get(): T
```

Read from the state in imperative manner. Returns the state object in its current state.

_Example_

```TypeScript
const { disabled } = state.get();
if (!disabled) {
  doStuff();
}
```

### Signature

```TypeScript
get(k1: K1): Partial<T>
```

Read from the state in an imperative manner by providing keys as parameters to reach deeply nested values.
Returns the part of state object.

_Example_

```TypeScript
interface State {
  bar: { foo: `test`},
  baz: true
}

// Access a single property

const bar = state.get('bar');

// Access a nested property

const foo = state.get('bar', 'foo');
```

---

# hold

### Signature

```TypeScript
  hold(obsOrObsWithSideEffect: Observable<S>, sideEffectFn?: (arg: S) => void): void
```

Manages side-effects of your state. Provide an `Observable<any>` **side-effect** and an optional
`sideEffectFunction`.
Subscription handling is done automatically.

_Example_

```TypeScript
// Directly pass an observable side-effect
const localStorageEffect$ = changes$.pipe(
 tap(changes => storeChanges(changes))
);
state.hold(localStorageEffect$);

// Pass an additional `sideEffectFunction`

const localStorageEffectFn = changes => storeChanges(changes);
state.hold(changes$, localStorageEffectFn);
```

---

# setAccumulator

### Signature

```TypeScript
setAccumulator(accumulatorFn: AccumulationFn) => void
```

Allows to customize state accumulation function.

_Example_

```Typescript
const myAccumulator = (state: MyState, slice: Partial<MyState>) => ({...state, ...slice});

this.state.setAccumulator(myAccumulator);
```
