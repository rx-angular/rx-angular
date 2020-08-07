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
