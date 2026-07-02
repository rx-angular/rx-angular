---
id: extract
title: extract
diataxis_type: reference
package: cdk
legacy_guard: false
tags: [cdk, api-reference, state]
---

## extract

Accepts an array of `T extends object` and a single key or an array of keys
(`K extends keyof T`). Returns a new array of objects constructed from the
provided key or keys.

Immutability is explained in the [immutability & serializable state](../../../../../concepts/E7-immutability-and-serializable-state.md) concept.

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

_Example — with `rxState()`_

```typescript
import { Component, inject } from '@angular/core';
import { rxState } from '@rx-angular/state';
import { extract } from '@rx-angular/cdk/transformations';

@Component({
  /* ... */
})
export class AnimalsListComponent {
  private readonly api = inject(ApiService);

  private readonly state = rxState<ComponentState>(({ connect }) => {
    connect('animals', this.api.getAnimals(), (_, animals) =>
      extract(animals, ['id', 'name']),
    );
  });

  readonly animals = this.state.signal('animals');
}
```

_Example — signals-first_

```typescript
import { signal } from '@angular/core';
import { extract } from '@rx-angular/cdk/transformations';

const animals = signal<Animal[]>([]);

// project the current value down to the keys you need
const summaries = computed(() => extract(animals(), ['id', 'name']));
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
function extract<T extends object, K extends keyof T>(
  array: T[],
  keys: K | K[]
): Pick<T, K>[];
```

### Parameters

#### array

###### typeof: T[]

#### keys

###### typeof: K | K[]
