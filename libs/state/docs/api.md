# RxState

RxState is a light-weight reactive state management service especially useful for component state in Angular.
Furthermore a global service is provided and can act as a small global state manager.

![state logo](https://raw.githubusercontent.com/BioPhoton/rx-angular/master/libs/state/images/state_logo.png)

_Example_

```Typescript
@Component({
  selector: 'app-stateful',
  template: `<div>{{ state$ | async | json }}</div>`,
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

#####

The full state exposed as `Observable<T>`

### get

##### () => T

Read from the state in imperative manner. Returns the state object in its current state.

_Example_

```Typescript
const { disabled } = state.get();
if (!disabled) {
  doStuff();
}
```

### set

##### (stateOrProjectState: Partial&#60;T&#62; | ProjectStateFn&#60;T&#62;) => void

Manipulate one or many properties of the state by providing a `Partial<T>` state or a `ProjectionFunction<T>`.

_Example_

Update one or many properties of the state by providing a `Partial<T>`

```TypeScript
const partialState = {
  foo: 'bar',
  bar: 5
};
state.set(partialState);
```

Update one or many properties of the state by providing a `ProjectionFunction<T>`

```TypeScript
const updateFn = oldState => ({
  bar: oldState.bar + 5
});
state.set(updateFn);
```

### set

##### (key: K, projectSlice: ProjectValueFn&#60;T, K&#62;) => void

Manipulate a single property of the state by the property name and a `ProjectionFunction<T>`.

_Example_

```TypeScript
const reduceFn = oldState => oldState.bar + 5;
state.set('bar', reduceFn);
```

### set

##### (keyOrStateOrProjectState: Partial&#60;T&#62; | ProjectStateFn&#60;T&#62; | K, stateOrSliceProjectFn?: ProjectValueFn&#60;T, K&#62;) => void

Manipulate a single property by providing the property name and a value.

_Example_

```TypeScript
state.set('bar', 5);
```

### connect

##### (slice\$: Observable&#60;any | Partial&#60;T&#62;&#62;, projectFn?: ProjectStateReducer&#60;T, K&#62;) => void

Connect an `Observable<Partial<T>>` to the state `T`.
Any change emitted by the source will get merged into the state.
Subscription handling is done automatically.

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

##### (key: K, slice\$: Observable&#60;T[K]&#62;) => void

Connect an `Observable<T[K]>` source to a specific property `K` in the state `T`. Any emitted change will update
this
specific property in the state.
Subscription handling is done automatically.

_Example_

```Typescript
const myTimer$ = interval(250);
state.connect('timer', myTimer$);
// every 250ms the property timer will get updated
```

### connect

##### (key: K, slice\$: Observable&#60;any&#62;, projectSliceFn: ProjectValueReducer&#60;T, K&#62;) => void

Connect an `Observable<Partial<T>>` source to a specific property in the state. Additionally you can provide a
`projectionFunction` to access the current state object on every emission of your connected `Observable`.
Any change emitted by the source will get merged into the state.
Subscription handling is done automatically.

_Example_

```Typescript
const myTimer$ = interval(250);
state.connect('timer', myTimer$, (state, timerChange) => state.timer += timerChange);
// every 250ms the property timer will get updated
```

### select

##### () => Observable&#60;T&#62;

returns the state as cached and distinct `Observable<T>`. This way you don't have to think about **late
subscribers**,
**multiple subscribers** or **multiple emissions** of the same value

_Example_

```Typescript
const state$ = state.select();
state$.subscribe(state => doStuff(state));
```

### select

##### (op: OperatorFunction&#60;T, A&#62;) => Observable&#60;A&#62;

returns the state as cached and distinct `Observable<A>`. Accepts arbitrary
[rxjs operators](https://rxjs-dev.firebaseapp.com/guide/operators) to enrich the selection with reactive composition.

_Example_

```Typescript
const profilePicture$ = state.select(
 pluck('profilePicture'),
 switchMap(profilePicture => mapImageAsync(profilePicture))
);
```

### select

##### (k1: K1) => Observable&#60;T[K1]&#62;

Access a single property of the state by providing keys.
Returns a single property of the state as cached and distinct `Observable<T[K1]>`.

_Example_

**Access a single property**

```Typescript
const bar$ = state.select('bar');
```

**Access a nested property**

```Typescript
const foo$ = state.select('bar', 'foo');
```

### hold

##### (obsOrObsWithSideEffect: Observable&#60;S&#62;, sideEffectFn?: (arg: S) =&#62; void) => void

Manages side-effects of your state. Provide an `Observable<any>` **side-effect** and an optional
`sideEffectFunction`.
Subscription handling is done automatically.

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
