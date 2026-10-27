---
id: upsert
title: upsert
diataxis_type: reference
package: cdk
legacy_guard: false
tags: [cdk, api-reference, state]
---

## upsert

Updates or inserts (if it does not yet exist) one or multiple items in an array
`T[]`. For comparison you can provide a key, an array of keys, or a custom
comparison function that returns `true` when items match. If no comparison is
provided, an equality check is used by default. Returns a new array `T[]` and
does not mutate the original one.

Immutability is explained in the [immutability & serializable state](../../../../../concepts/E7-immutability-and-serializable-state.md) concept.

_Example — upsert (update) with a key_

```typescript
const creatures = [
  { id: 1, type: 'cat' },
  { id: 2, type: 'dog' },
];

const newCat = { id: 1, type: 'lion' };

const updatedCreatures = upsert(creatures, newCat, 'id');

// updatedCreatures will be:
// [{id: 1, type: 'lion'}, {id: 2, type: 'dog'}];
```

_Example — upsert (insert) with a key_

```typescript
const creatures = [
  { id: 1, type: 'cat' },
  { id: 2, type: 'dog' },
];

const newCat = { id: 3, type: 'lion' };

const updatedCreatures = upsert(creatures, newCat, 'id');

// updatedCreatures will be:
// [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}, {id: 3, type: 'lion'}];
```

_Example — upsert (update) with an array of keys_

```typescript
const creatures = [
  { id: 1, type: 'cat', name: 'Bella' },
  { id: 2, type: 'dog', name: 'Sparky' },
];

const newCat = { id: 1, type: 'lion', name: 'Bella' };

const updatedCreatures = upsert(creatures, newCat, ['id', 'name']);

// updatedCreatures will be:
// [{id: 1, type: 'lion', name: 'Bella'}, {id: 2, type: 'dog', name: 'Sparky'}];
```

_Example — upsert (insert) with a comparison function_

```typescript
const creatures = [
  { id: 1, type: 'cat' },
  { id: 2, type: 'dog' },
];

const newCat = { id: 3, type: 'lion' };

const updatedCreatures = upsert(creatures, newCat, (a, b) => a.id === b.id);

// updatedCreatures will be:
// [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}, {id: 3, type: 'lion'}];
```

_Example — with `rxState()`_

```typescript
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { rxState } from '@rx-angular/state';
import { upsert } from '@rx-angular/cdk/transformations';

@Component({
  /* ... */
})
export class ListComponent {
  // trigger called on add/update (reactive implementation)
  readonly addOrUpdateCreature$ = new Subject<Creature>();

  private readonly state = rxState<ComponentState>(({ set, connect }) => {
    set({
      creatures: [
        { id: 1, type: 'cat', name: 'Bella' },
        { id: 2, type: 'dog', name: 'Sparky' },
      ],
    });
    connect('creatures', this.addOrUpdateCreature$, ({ creatures }, creatureToUpsert) => upsert(creatures, creatureToUpsert, 'id'));
  });

  readonly creatures = this.state.signal('creatures');

  // Imperative alternative
  updateCreature(creatureToUpdate: Creature): void {
    this.state.set({
      creatures: upsert(this.state.get('creatures'), creatureToUpdate, 'id'),
    });
  }
}
```

_Example — signals-first_

```typescript
import { signal } from '@angular/core';
import { upsert } from '@rx-angular/cdk/transformations';

const creatures = signal<Creature[]>([]);

creatures.update((current) => upsert(current, creatureToUpsert, 'id'));
```

> There is no native array equivalent for a keyed update-or-insert, so `upsert`
> remains the recommended approach for this pattern.

### Edge cases

```typescript
upsert(null as any, items) > items;
upsert(items, null as any) > items;
upsert(null as any, null as any) > null;
upsert(undefined as any, undefined as any) > undefined;
upsert(nonArray as any, items) > items;
```

### Signature

```typescript
function upsert<T>(source: T[], update: Partial<T>[] | Partial<T>, compare?: ComparableData<T>): T[];
```

### Parameters

#### source

###### typeof: T[]

#### update

###### typeof: Partial&#60;T&#62;[] | Partial&#60;T&#62;

#### compare

###### typeof: ComparableData&#60;T&#62;
