---
id: compare-fn
title: "CompareFn"
diataxis_type: reference
package: state
legacy_guard: false
sidebar_label: "CompareFn"
sidebar_position: 3
tags: [state, api-reference]
---

# `CompareFn`

The function which is used by [`KeyCompareMap`](./key-compare-map.md) to determine if changes are distinct or not. Should return `true` if values are equal.

## Signature

```typescript
type CompareFn<T> = (oldVal: T, newVal: T) => boolean;
```

## See also

- Reference: [`KeyCompareMap`](./key-compare-map.md), where `CompareFn` is used per key.
