---
title: 'State'
weight: 10
date: 2020-04-26T23:45:57.333Z
showtoc: true
generated: true
---

<!-- This file was generated from the Vendure source. Do not modify. Instead, re-run the "docs:build" script -->

# State

# RxState

RxState is a light-weight reactive state management service especially useful for component state in Angular.
Furthermore a global service is provided and can act as a small global state manager.

![state logo](https://raw.githubusercontent.com/BioPhoton/rx-angular/master/libs/state/images/state_logo.png)

_Example_

```Typescript
Component({
  selector: 'app-stateful',
  template: `
    <div>{{ state$ | async | json }}</div>
  `,
  providers: [RxState]
})
export class StatefulComponent {
  readonly state$ = this.state.select();

  constructor(private state: RxState<{ foo: string }>) {}
}
```

## Signature

```TypeScript
class RxState<T extends object> implements OnDestroy, Subscribable<any> {
  readonly readonly $ = this.accumulationObservable.state$;
  get() => T;
  set(stateOrProjectState: Partial<T> | ProjectStateFn<T>) => void;
  set(key: K, projectSlice: ProjectValueFn<T, K>) => void;
  set(keyOrStateOrProjectState: Partial<T> | ProjectStateFn<T> | K, stateOrSliceProjectFn?: ProjectValueFn<T, K>) => void;
  connect(slice$: Observable<any | Partial<T>>, projectFn?: ProjectStateReducer<T, K>) => void;
  connect(key: K, slice$: Observable<T[K]>) => void;
  connect(key: K, slice$: Observable<any>, projectSliceFn: ProjectValueReducer<T, K>) => void;
  select() => Observable<T>;
  select(op: OperatorFunction<T, A>) => Observable<A>;
  select(k1: K1) => Observable<T[K1]>;
  hold(obsOrObsWithSideEffect: Observable<S>, sideEffectFn?: (arg: S) => void) => void;
}
```

## Members

### \$

The state exposed as `Observable`

### get

Read from the state in imperative manner. Returns the state object in its current state.

_Example_

```Typescript
const { disabled } = state.get();
if (!disabled) {
  doStuff();
}
```

### set

Manipulate the state by providing a `Partial` state or a `ProjectionFunction`.

_Example_

Update the state by providing a `Partial`

```TypeScript
const update = {
  foo: 'bar',
  bar: 5
};
state.set(update);
```

Update the state by providing a `ProjectionFunction`

```TypeScript
const update = oldState => ({
  bar: oldState.bar + 5
});
state.set(update);
```

### set

Manipulate a single property by providing a `ProjectionFunction`.

_Example_

Update the state by providing a `ProjectionFunction`

```TypeScript
const update = oldState => oldState.bar + 5;
state.set('bar', update);
```

### set

Manipulate a single property by providing a value.

_Example_

Update the state by providing a value

```TypeScript
state.set('bar', 5);
```

### connect

Connect an `Observable` source of type `Partial<T>` to the state.
Any properties emitted by the source will result in an immediate update of the corresponding properties in the state.
The state will handle subscriptions.

_Example_

```Typescript
const sliceToAdd$ = interval(250).pipe(mapTo({
  bar: 5,
  foo: 'foo'
});
state.connect(sliceToAdd$);
// every 250ms the properties bar and foo get updated due to the emission of sliceToAdd$
```

Additionally you can provide a `projectionFunction` to access the current state object and do custom mappings.

```Typescript
const sliceToAdd$ = interval(250).pipe(mapTo({
  bar: 5,
  foo: 'foo'
});
state.connect(sliceToAdd$, (state, slice) => state.bar += slice.bar);
// every 250ms the properties bar and foo get updated due to the emission of sliceToAdd$. Bar will increase by
5 due to the projectionFunction
```

### connect

Connect an `Observable` source to a specific property in the state. Any emission of the source will
result in an immediate update of the corresponding property in the state.
The state will handle subscriptions.

_Example_

```Typescript
const myTimer$ = interval(250);
state.connect('timer', myTimer$);
// every 250ms the property timer will get updated
```

### connect

Connect an `Observable` source to a specific property in the state. Additionally you can provide a
`projectionFunction` to access the current state object on every emission of your connected `Observable`.
Any emission of the source will result in an immediate update of the corresponding property in the state.
The state will handle subscriptions.

_Example_

```Typescript
const myTimer$ = interval(250);
state.connect('timer', myTimer$, (state, timerChange) => state.timer += timerChange);
// every 250ms the property timer will get updated
```

### select

returns the state as cached and distinct `Observable`. This way you don't have to think about **late subscribers**,
**multiple subscribers** or **multiple emissions** of the same value

_Example_

```Typescript
const state$ = state.select();
state$.subscribe(state => doStuff(state));
```

### select

returns the state as cached and distinct `Observable`. Accepts arbitrary
[rxjs operators](https://rxjs-dev.firebaseapp.com/guide/operators) to manipulate the selection.

_Example_

```Typescript
const profilePicture$ = state.select(
 pluck('profilePicture'),
 switchMap(profilePicture => mapImageAsync(profilePicture))
);
```

### select

Access a single property of the state by providing keys.
Returns a single property of the state as cached and distinct `Observable`.

_Example_

\*Access a single property\*\*

```Typescript
const bar$ = state.select('bar');
```

**Access a nested property**

```Typescript
const foo$ = state.select('bar.foo');
```

### hold

Manages side-effects of your state. Provide any `Observable` **side-effect** and an optional `sideEffectFunction`.
The state will handle subscriptions.

_Example_

Directly pass an observable side-effect

```Typescript
const localStorageEffect$ = changes$.pipe(
 tap(changes => storeChanges(changes))
);

state.hold(localStorageEffect$);
```

Pass an additional `sideEffectFunction`

```Typescript
const localStorageEffectFn = changes => storeChanges(changes);
state.hold(changes$, localStorageEffectFn);
```
