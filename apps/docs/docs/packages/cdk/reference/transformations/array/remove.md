---
id: remove
title: remove
diataxis_type: reference
package: cdk
legacy_guard: false
tags: [cdk, api-reference, state]
---

## remove

Removes one or multiple items from an array `T[]`. For comparison you can provide
a key, an array of keys, or a custom comparison function that returns `true` when
items match. If no comparison data is provided, an equality check is used by
default. Returns a new array `T[]` and does not mutate the original one.

Immutability is explained in the [immutability & serializable state](../../../../../concepts/E7-immutability-and-serializable-state.md) concept.

_Example — removing values without comparison data_

```typescript
const items = [1, 2, 3, 4, 5];

const updatedItems = remove(items, [1, 2, 3]);

// updatedItems will be: [4, 5];
```

_Example — removing values with a comparison function_

```typescript
const creatures = [
  { id: 1, type: 'cat' },
  { id: 2, type: 'unicorn' },
  { id: 3, type: 'kobold' },
];

const nonExistingCreatures = [
  { id: 2, type: 'unicorn' },
  { id: 3, type: 'kobold' },
];

const realCreatures = remove(creatures, nonExistingCreatures, (a, b) => a.id === b.id);

// realCreatures will be: [{id: 1, type: 'cat'}];
```

_Example — removing values with a key_

```typescript
const realCreatures = remove(creatures, nonExistingCreatures, 'id');

// realCreatures will be: [{id: 1, type: 'cat'}];
```

_Example — removing values with an array of keys_

```typescript
const realCreatures = remove(creatures, nonExistingCreatures, ['id', 'type']);

// realCreatures will be: [{id: 1, type: 'cat'}];
```

_Example — with `rxState()`_

```typescript
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { rxState } from '@rx-angular/state';
import { remove } from '@rx-angular/cdk/transformations';

@Component({
  /* ... */
})
export class ListComponent {
  readonly removeCreature$ = new Subject<Creature>();

  private readonly state = rxState<ComponentState>(({ connect }) => {
    connect('creatures', this.removeCreature$, ({ creatures }, creatureToRemove) => remove(creatures, creatureToRemove, (a, b) => a.id === b.id));
  });

  readonly creatures = this.state.signal('creatures');

  // Imperative alternative
  removeCreature(creatureToRemove: Creature): void {
    this.state.set({
      creatures: remove(this.state.get('creatures'), creatureToRemove, (a, b) => a.id === b.id),
    });
  }
}
```

_Example — signals-first_

```typescript
import { signal } from '@angular/core';
import { remove } from '@rx-angular/cdk/transformations';

const creatures = signal<Creature[]>([]);

creatures.update((current) => remove(current, creatureToRemove, (a, b) => a.id === b.id));
```

### Edge cases

```typescript
remove(null as any, items) > null;
remove(items, null as any) > items;
remove(null as any, null as any) > null;
remove(undefined as any, undefined as any) > undefined;
remove(nonArray as any, items) > nonArray;
```

### Signature

```typescript
function remove<T>(source: T[], scrap: Partial<T>[] | Partial<T>, compare?: ComparableData<T>): T[];
```

### Parameters

#### source

###### typeof: T[]

#### scrap

###### typeof: Partial&#60;T&#62;[] | Partial&#60;T&#62;

#### compare

###### typeof: ComparableData&#60;T&#62;
