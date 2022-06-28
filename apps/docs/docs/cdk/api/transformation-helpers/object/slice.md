---
title: slice
# Moved from libs/cdk/transformations/docs/object/
---

## slice

Accepts an object of type T and a single key or an array of keys (`K extends keyof T`).
Constructs new object based on provided keys.

_Example_

```typescript
const cat = { id: 1, type: 'cat', name: 'Fluffy' };

const catWithoutType = slice(cat, ['name', 'id']);

// catWithoutType will be:
// {id: 1, name: 'Fluffy'};
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
         (state, animals) => {
             return animals.map(animal => slice(animal, ['id', 'name']));
         }
       );
     }
}
```

### Edge cases

```typescript
slice(nonObject, 'prop' as any) > undefined;
slice(null as any, 'prop') > undefined;
slice(null as any, null as any) > undefined;
slice([state], 'concat') > undefined;
slice(state, 'nonExisting' as any) > undefined;
slice(state, null as any) > undefined;
slice(state, ['stateProp1', 'nonExistingProp']) >
  { stateProp1: stateProp1Value };
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
