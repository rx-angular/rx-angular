---
id: slice
title: slice
diataxis_type: reference
package: cdk
legacy_guard: false
tags: [cdk, api-reference, state]
---

## slice

Accepts an object of type `T` and a single key or an array of keys
(`K extends keyof T`). Constructs a new object from the provided keys without
mutating the original object.

Immutability is explained in the [immutability & serializable state](../../../../../concepts/E7-immutability-and-serializable-state.md) concept.

_Example_

```typescript
const cat = { id: 1, type: 'cat', name: 'Fluffy' };

const catWithoutType = slice(cat, ['name', 'id']);

// catWithoutType will be:
// {id: 1, name: 'Fluffy'};
```

_Example — with `rxState()`_

```typescript
import { Component, inject } from '@angular/core';
import { rxState } from '@rx-angular/state';
import { slice } from '@rx-angular/cdk/transformations';

@Component({
  /* ... */
})
export class AnimalsListComponent {
  private readonly api = inject(ApiService);

  private readonly state = rxState<ComponentState>(({ connect }) => {
    connect('animals', this.api.getAnimals(), (_, animals) =>
      animals.map((animal) => slice(animal, ['id', 'name'])),
    );
  });

  readonly animals = this.state.signal('animals');
}
```

_Example — signals-first_

```typescript
import { signal } from '@angular/core';
import { slice } from '@rx-angular/cdk/transformations';

const cat = signal<Cat>({ id: 1, type: 'cat', name: 'Fluffy' });

// no native object-pick equivalent — slice keeps its role
const catWithoutType = computed(() => slice(cat(), ['id', 'name']));
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

###### typeof: K | K[]
