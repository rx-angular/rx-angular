---
title: CompareFn
# Extracted from libs/state/selections/docs/operators/interfaces.md
---

## CompareFn

The function which is used by `KeyCompareMap` to determine if changes are distinct or not.
Should return true if values are equal.

### Signature

```typescript
type CompareFn<T> = (oldVal: T, newVal: T) => boolean;
```
