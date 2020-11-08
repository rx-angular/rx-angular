## extract

Accepts an object of type T and single key or array of keys (K extends keyof T).
Constructs new object based on provided keys.

_Example_

```typescript
const cat = { id: 1, type: 'cat', name: 'Fluffy' };

const catWithoutType = extract(cat, ['name', 'id']);

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
             return animals.map(animal => extract(animal, ['id', 'name']));
         }
       );
     }
}
```

### Edge cases

```typescript
extract(nonObject, 'prop' as any) > undefined;
extract(null as any, 'prop') > undefined;
extract(null as any, null as any) > undefined;
extract([state], 'concat') > undefined;
extract(state, 'nonExisting' as any) > undefined;
extract(state, null as any) > undefined;
extract(state, ['stateProp1', 'nonExistingProp']) >
  { stateProp1: stateProp1Value };
```

### Signature

```typescript
function extract<T extends object, K extends keyof T>(
  object: T,
  keys: K | K[]
): Pick<T, K>;
```

### Parameters

#### object

###### typeof: T

#### keys

###### typeof: K
