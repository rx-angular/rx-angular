## CompareFn

The function which is used by `KeyCompareMap` to determine if changes are distinct or not.
Should return true if values are equal.

### Signature

```typescript
type CompareFn<T> = (oldVal: T, newVal: T) => boolean;
```

## KeyCompareMap

The `KeyCompareMap` is used to configure custom comparison for defined keys.

_Example_

```typescript
const keyCompareMap = {
  myKey: (o, n) => customCompare(o, n),
};
const o$ = of({
  myKey: 5,
  myOtherKey: 'bar',
}).pipe(distinctUntilSomeChanged(['myKey', 'myOtherKey'], keyCompareMap));

//or

const o$ = of({
  myKey: 5,
  myOtherKey: 'bar',
}).pipe(selectSlice(['myKey', 'myOtherKey'], keyCompareMap));
```

### Signature

```typescript
type KeyCompareMap<T extends object> = {
  [K in keyof Partial<T>]: CompareFn<T[K]>;
};
```
