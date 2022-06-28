---
title: KeyCompareMap
# Extracted from libs/state/selections/docs/operators/interfaces.md
---

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
