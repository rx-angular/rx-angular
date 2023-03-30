---
title: Edge cases overview
sidebar_position: 2
# Moved from libs/cdk/transformations/docs/
---

# Edge cases overview

## Array

### Insert

```typescript
insert(null as any, items) > items;
insert(items, null as any) > items;
insert(null as any, null as any) > null;
insert(undefined as any, undefined as any) > undefined;
insert(nonArray as any, items) > items;
```

### update

```typescript
update(items, null as any) > items;
update(null as any, null as any) > null;
update(undefined as any, undefined as any) > undefined;
update(nonArray as any, items) > nonArray;
```

### remove

```typescript
remove(null as any, items) > null;
remove(items, null as any) > items;
remove(null as any, null as any) > null;
remove(undefined as any, undefined as any) > undefined;
remove(nonArray as any, items) > nonArray;
```

### toDictionary

```typescript
toDictionary([] as any, 'nonExistingKey') > {};
toDictionary(items, 'nonExistingKey') > {};
toDictionary(items, 'nonPrimitiveKey' as any) > {};
toDictionary(items, null as any) > {};
toDictionary(nonObject as any, '') > nonObject;
toDictionary(null as any, '') > null;
toDictionary(undefined as any, '') > undefined;
```

## Object

### deleteProp

```typescript
deleteProp(state, null as any) > state;
deleteProp(null as any, null as any) > null;
deleteProp(undefined as any, undefined as any) > undefined;
deleteProp(nonObject, 'prop') > nonObject;
```

### setProp

```typescript
setProp(nonObject, 'prop' as any, 42) > { prop: 42 };
setProp(null as any, 'prop', 42) > { prop: 42 };
setProp(null as any, null as any, 42) > null;
setProp([state], 'concat', () => []) > { concat: () => [] };
setProp(state, 'nonExisting' as any, 42) > { ...state, nonExisting: 42 };
setProp(state, null as any, 42) > state;
```

### toggle

```typescript
toggle(state, null as any) > state;
toggle(null as any, null as any) > null;
toggle(state, 'str' as any) > state;
toggle(state, 'nonExistingBooleanKey' as any) >
  { ...state, nonExistingBooleanKey: true };
```

### patch

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

### dictionaryToArray

```typescript
dictionaryToArray({}) > [];
dictionaryToArray(null as any) > null;
dictionaryToArray(undefined as any) > undefined;
dictionaryToArray(nonObject) > [];
dictionaryToArray([1, 2, 3] as any) > [];
```
