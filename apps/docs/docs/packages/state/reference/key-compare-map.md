---
id: key-compare-map
title: "KeyCompareMap"
diataxis_type: reference
package: state
legacy_guard: false
sidebar_label: "KeyCompareMap"
sidebar_position: 4
tags: [state, api-reference]
---

# `KeyCompareMap`

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

## Signature

```typescript
type KeyCompareMap<T extends object> = {
  [K in keyof Partial<T>]: CompareFn<T[K]>;
};
```

## See also

- Reference: [`CompareFn`](./compare-fn.md), the per-key comparison function type.
