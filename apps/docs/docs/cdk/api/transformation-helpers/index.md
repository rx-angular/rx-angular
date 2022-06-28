---
title: Transformation helpers
sidebar_position: 1
# Moved from libs/cdk/transformations/docs/
---

# Transformation helpers

Transformation helpers provides a set of tools that simplifies the management of data structures in an immutable way.

Currently transformation helpers support the management of objects and arrays.

You can use the transformation helpers without RxState but expect the behavior to be opinionated since in the first place this package is designed to optimize state management with RxState.

## Principles

**Helpers that initialize or modify state property**

```
Array: insert, update,
Object: patch, setProp, toggle
```

If original property not matching expected type (expected array, got string) or original property is null/undefined. Provided updates will be returned.

**Helpers that should remove something from non-primitive state property or remove state property**

```
Array: remove
Object: deleteProp
```

If the original property not matching the expected type (expected array, got string) an empty array or object will be returned.
If the original property is null or undefined helper will return null or undefined.

**Helpers that converting one structure to another**

```
Array: dictionaryToArray
Object: toDictionary
```

If the original structure not matching the expected type empty target structure will be returned.
If the original structure is null or undefined helper will return null or undefined.
