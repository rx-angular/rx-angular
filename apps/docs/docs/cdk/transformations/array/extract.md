---
title: extract
# Moved from libs/cdk/transformations/docs/array/
---

## extract

Accepts an array of T `extends object` and a single key or an array of keys (`K extends keyof T`).
Returns a new array of objects constructed from provided key or keys.

_Example_

```typescript
const cats = [
  { id: 1, type: 'cat', name: 'Fluffy' },
  { id: 2, type: 'cat', name: 'Emma' },
];

const catsWithoutTypes = extract(cats, ['name', 'id']);

// catsWithoutTypes will be:
// [{id: 1, name: 'Fluffy'}, {id: 2, name: 'Emma'}];
```

_Example_

```typescript
// Usage with RxState

// Usage with RxState

export class AnimalsListComponent {
     constructor(private state: RxState<ComponentState>, private api: ApiService) {
       state.connect(
         'animals'
         this.api.getAnimals(),
         (state, animals) => extract(animals, ['id', 'name'])
       );
     }
}
```

### Edge cases

```typescript
extract(
  [
    { id: 1, type: 'cat', name: 'Emma' },
    { id: 2, type: 'dog' },
  ],
  ['name', 'id', 'type']
) >
  [
    { id: 1, type: 'cat', name: 'Emma' },
    { id: 2, type: 'dog', name: undefined },
  ]; // dog has no name
extract(
  [{ id: 1, type: 'cat', name: 'Emma' }, 1, 'string'] as any,
  ['id', 'name'] as any
) >
  [
    { id: 1, name: 'Emma' },
    { id: undefined, name: undefined },
    { id: undefined, name: undefined },
  ]; // cat had properties but they are not found in 1 and 'string'
extract(null as any, 'prop') > undefined;
extract(items, {} as any) > undefined;
extract(items, [] as any) > undefined;
extract(items, 1 as any) > undefined;
extract(items, undefined as any) > undefined;
```

### Signature

```typescript
function slice<T extends object, K extends keyof T>(
  object: T,
  keys: K | K[]
): Pick<T, K>;
```

### Parameters

#### object

###### typeof: T

#### keys

###### typeof: K
