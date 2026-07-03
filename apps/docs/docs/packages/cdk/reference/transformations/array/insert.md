---
id: insert
title: insert
diataxis_type: reference
package: cdk
legacy_guard: false
tags: [cdk, api-reference, state]
---

## insert

Inserts one or multiple items into an array `T[]`. Returns a new array `T[]` and
does not mutate the original one.

Immutability is explained in the [immutability & serializable state](../../../../../concepts/E7-immutability-and-serializable-state.md) concept.

_Example — inserting a single value_

```typescript
const creatures = [
  { id: 1, type: 'cat' },
  { id: 2, type: 'dog' },
];

const updatedCreatures = insert(creatures, { id: 3, type: 'parrot' });

// updatedCreatures will be:
//  [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}, {id: 3, type: 'parrot'}];
```

_Example — inserting multiple values_

```typescript
const creatures = [
  { id: 1, type: 'cat' },
  { id: 2, type: 'dog' },
];

const updatedCreatures = insert(creatures, [
  { id: 3, type: 'parrot' },
  { id: 4, type: 'hamster' },
]);

// updatedCreatures will be:
// [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}, {id: 3, type: 'parrot'}, {id: 4, type: 'hamster'}];
```

_Example — with `rxState()`_

```typescript
import { Component, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { rxState } from '@rx-angular/state';
import { insert } from '@rx-angular/cdk/transformations';

@Component({
  /* ... */
})
export class ListComponent {
  readonly insertCreature$ = new Subject<void>();

  private readonly state = rxState<ComponentState>(({ connect }) => {
    connect('creatures', this.insertCreature$, ({ creatures }) => {
      const creatureToAdd = {
        id: generateId(),
        name: 'newCreature',
        type: 'dinosaur',
      };
      return insert(creatures, creatureToAdd);
    });
  });

  readonly creatures = this.state.signal('creatures');

  // Imperative alternative
  insertCreature(): void {
    const creatureToAdd = {
      id: generateId(),
      name: 'newCreature',
      type: 'dinosaur',
    };
    this.state.set({
      creatures: insert(this.state.get('creatures'), creatureToAdd),
    });
  }
}
```

_Example — signals-first_

```typescript
import { signal } from '@angular/core';
import { insert } from '@rx-angular/cdk/transformations';

const creatures = signal<Creature[]>([]);

creatures.update((current) => insert(current, { id: 3, type: 'parrot' }));
```

### Edge cases

```typescript
insert(null as any, items) > items;
insert(items, null as any) > items;
insert(null as any, null as any) > null;
insert(undefined as any, undefined as any) > undefined;
insert(nonArray as any, items) > items;
```

### Signature

```typescript
function insert<T>(source: T[], updates: T | T[]): T[];
```

### Parameters

#### source

###### typeof: T[]

#### updates

###### typeof: T | T[]
