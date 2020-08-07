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
