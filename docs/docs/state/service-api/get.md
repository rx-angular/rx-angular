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
