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

## Edge cases overview

### Array

#### Insert

```typescript
insert(null as any, items) > items;
insert(items, null as any) > items;
insert(null as any, null as any) > null;
insert(undefined as any, undefined as any) > undefined;
insert(nonArray as any, items) > items;
```

#### update

```typescript
update(null as any, items) > items;
update(items, null as any) > items;
update(null as any, null as any) > null;
update(undefined as any, undefined as any) > undefined;
update(nonArray as any, items) > items;
```

#### remove

```typescript
remove(null as any, items) > null;
remove(items, null as any) > items;
remove(null as any, null as any) > null;
remove(undefined as any, undefined as any) > undefined;
remove(nonArray as any, items) > nonArray;
```

#### toDictionary

```typescript
toDictionary([] as any, 'nonExistingKey') > {};
toDictionary(items, 'nonExistingKey') > {};
toDictionary(items, 'nonPrimitiveKey' as any) > {};
toDictionary(items, null as any) > {};
toDictionary(nonObject as any, '') > nonObject;
toDictionary(null as any, '') > null;
toDictionary(undefined as any, '') > undefined;
```

### Object

#### deleteProp

```typescript
deleteProp(state, null as any) > state;
deleteProp(null as any, null as any) > null;
deleteProp(undefined as any, undefined as any) > undefined;
deleteProp(nonObject, 'prop') > nonObject;
```

#### setProp

```typescript
setProp(nonObject, 'prop' as any, 42) > { prop: 42 };
setProp(null as any, 'prop', 42) > { prop: 42 };
setProp(null as any, null as any, 42) > null;
setProp([state], 'concat', () => []) > { concat: () => [] };
setProp(state, 'nonExisting' as any, 42) > { ...state, nonExisting: 42 };
setProp(state, null as any, 42) > state;
```

#### toggle

```typescript
toggle(state, null as any) > state;
toggle(null as any, null as any) > null;
toggle(state, 'str' as any) > state;
toggle(state, 'nonExistingBooleanKey' as any) >
  { ...state, nonExistingBooleanKey: true };
```

#### patch

```typescript
patch({}, state) > state;
patch(null as any, state) > state;
patch(state, null as any) > state;
patch(null as any, null as any) > null;
patch(undefined as any, undefined as any) > undefined;
patch(state, nonObject) > state;
patch(nonObject, state) > state;
patch(nonObject, nonObjectUpdate) > nonObject;
```

#### dictionaryToArray

```typescript
dictionaryToArray({}) > [];
dictionaryToArray(null as any) > null;
dictionaryToArray(undefined as any) > undefined;
dictionaryToArray(nonObject) > [];
dictionaryToArray([1, 2, 3] as any) > [];
```
