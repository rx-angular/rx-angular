---
id: update
title: update
diataxis_type: reference
package: cdk
legacy_guard: false
tags: [cdk, api-reference, state]
---

## update

Updates one or multiple items in an array `T[]`. For comparison you can provide a
key, an array of keys, or a custom comparison function that returns `true` when
items match. If no comparison is provided, an equality check is used by default.
Returns a new array `T[]` with the updated items and does not mutate the original
array.

Immutability is explained in the [immutability & serializable state](../../../../../concepts/E7-immutability-and-serializable-state.md) concept.

_Example — update with a comparison function_

```typescript
const creatures = [
  { id: 1, type: 'cat' },
  { id: 2, type: 'dog' },
];

const newCat = { id: 1, type: 'lion' };

const updatedCreatures = update(creatures, newCat, (a, b) => a.id === b.id);

// updatedCreatures will be:
// [{id: 1, type: 'lion'}, {id: 2, type: 'dog'}];
```

_Example — update with a key_

```typescript
const updatedCreatures = update(creatures, newCat, 'id');

// updatedCreatures will be:
// [{id: 1, type: 'lion'}, {id: 2, type: 'dog'}];
```

_Example — update with an array of keys_

```typescript
const creatures = [
  { id: 1, type: 'cat', name: 'Bella' },
  { id: 2, type: 'dog', name: 'Sparky' },
];

const newCat = { id: 1, type: 'lion', name: 'Bella' };

const updatedCreatures = update(creatures, newCat, ['id', 'name']);

// updatedCreatures will be:
// [{id: 1, type: 'lion', name: 'Bella'}, {id: 2, type: 'dog', name: 'Sparky'}];
```

_Example — with `rxState()`_

```typescript
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { rxState } from '@rx-angular/state';
import { update } from '@rx-angular/cdk/transformations';

@Component({
  /* ... */
})
export class ListComponent {
  readonly updateCreature$ = new Subject<Creature>();

  private readonly state = rxState<ComponentState>(({ connect }) => {
    connect(
      'creatures',
      this.updateCreature$,
      ({ creatures }, creatureToUpdate) =>
        update(creatures, creatureToUpdate, (a, b) => a.id === b.id),
    );
  });

  readonly creatures = this.state.signal('creatures');

  // Imperative alternative
  updateCreature(creatureToUpdate: Creature): void {
    this.state.set({
      creatures: update(
        this.state.get('creatures'),
        creatureToUpdate,
        (a, b) => a.id === b.id,
      ),
    });
  }
}
```

_Example — signals-first_

```typescript
import { signal } from '@angular/core';
import { update } from '@rx-angular/cdk/transformations';

const creatures = signal<Creature[]>([]);

creatures.update((current) =>
  update(current, creatureToUpdate, (a, b) => a.id === b.id),
);
```

> `update` only touches items that already exist. To update existing items **and**
> insert new ones in a single keyed operation, use [`upsert`](./upsert.md). There
> is no native array equivalent for keyed update/upsert, so these helpers remain
> the recommended approach.

### Edge cases

```typescript
update(null as any, items) > null;
update(items, null as any) > items;
update(null as any, null as any) > null;
update(undefined as any, undefined as any) > undefined;
update(nonArray as any, items) > nonArray;
```

### Signature

```typescript
function update<T extends object>(
  source: T[],
  updates: Partial<T>[] | Partial<T>,
  compare?: ComparableData<T>
): T[];
```

### Parameters

#### source

###### typeof: T[]

#### updates

###### typeof: Partial&#60;T&#62;[] | Partial&#60;T&#62;

#### compare

###### typeof: ComparableData&#60;T&#62;
