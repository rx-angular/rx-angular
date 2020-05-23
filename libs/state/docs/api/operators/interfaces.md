# CompareFn

The function which is used by `distinctUntilSomeChanged` and `selectSlice` to determine if changes are distinct or
not.
Should return true if values are equal.

## Signature

```TypeScript
type CompareFn<T> = (oldVal: T, newVal: T) => boolean
```

# KeyCompareMap

The `KeyCompareMap` is used to configure custom comparison for defined keys. You can set the `CompareFn` to
`undefined` in order to utilize the default equality check.

_Example_

```TypeScript
const keyCompareMap = {
   myKey: (o, n) => customCompare(o, n),
   myOtherKey: undefined
 };
 const o$ = of({
   myKey: 5,
   myOtherKey: 'bar'
 }).pipe(distinctUntilSomeChanged(keyCompareMap));

 //or

 const o$ = of({
   myKey: 5,
   myOtherKey: 'bar'
 }).pipe(selectSlice(keyCompareMap));
```

## Signature

```TypeScript
type KeyCompareMap<T extends object> = {
  [K in keyof T]?: CompareFn<T[K]>;
}
```
