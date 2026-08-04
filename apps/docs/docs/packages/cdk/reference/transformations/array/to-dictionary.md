---
id: to-dictionary
title: toDictionary
diataxis_type: reference
package: cdk
legacy_guard: false
tags: [cdk, api-reference, state]
---

## toDictionary

Converts an array of objects to a dictionary `{ [key: string]: T }`. Accepts an
array `T[]` and a key of type `string`, `number`, or `symbol`, or a selector
function returning the key for a given item. Returns a new dictionary and does
not mutate the original array.

Immutability is explained in the [immutability & serializable state](../../../../../concepts/E7-immutability-and-serializable-state.md) concept.

_Example_

```typescript
const creatures = [
  { id: 1, type: 'cat' },
  { id: 2, type: 'dog' },
  { id: 3, type: 'parrot' },
];

const creaturesDictionary = toDictionary(creatures, 'id');

// creaturesDictionary will be:
// {
//  1: {id: 1, type: 'cat'},
//  2: {id: 2, type: 'dog'},
//  3: {id: 3, type: 'parrot'}
// };
```

_Example — nested property as key_

```typescript
const creatures = [
  { id: 1, meta: { name: 'cat' } },
  { id: 2, meta: { name: 'dog' } },
];

const creaturesDictionary = toDictionary(creatures, (creature) => creature.meta.name);

// creaturesDictionary will be:
// {
//  cat: {id: 1, meta: {name: 'cat'}},
//  dog: {id: 2, meta: {name: 'dog'}}
// };
```

_Example — with `rxState()`_

```typescript
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { rxState } from '@rx-angular/state';
import { toDictionary } from '@rx-angular/cdk/transformations';

@Component({
  /* ... */
})
export class ListComponent {
  readonly convertToDictionary$ = new Subject<void>();

  private readonly state = rxState<ComponentState>(({ connect }) => {
    connect('creaturesDictionary', this.convertToDictionary$, ({ creatures }) => toDictionary(creatures, 'id'));
  });

  readonly creaturesDictionary = this.state.signal('creaturesDictionary');

  // Imperative alternative
  convertToDictionary(): void {
    this.state.set({
      creaturesDictionary: toDictionary(this.state.get('creatures'), 'id'),
    });
  }
}
```

_Example — signals-first_

```typescript
import { signal, computed } from '@angular/core';
import { toDictionary } from '@rx-angular/cdk/transformations';

const creatures = signal<Creature[]>([]);

const creaturesDictionary = computed(() => toDictionary(creatures(), 'id'));
```

### Edge cases

```typescript
toDictionary([] as any, 'nonExistingKey') > {};
toDictionary(items, 'nonExistingKey') > {};
toDictionary(items, 'nonPrimitiveKey' as any) > {};
toDictionary(items, (item) => item.nonPrimitiveKey as any) > {};
toDictionary(items, null as any) > {};
toDictionary(nonObject as any, '') > {};
toDictionary(null as any, '') > null;
toDictionary(undefined as any, '') > undefined;
```

### Signature

```typescript
function toDictionary<T extends object>(source: T[], key: OnlyKeysOfSpecificType<T, number> | OnlyKeysOfSpecificType<T, string> | OnlyKeysOfSpecificType<T, symbol> | ((item: T) => number | string | symbol)): { [key: string]: T };
```

### Parameters

#### source

###### typeof: T[]

#### key

###### typeof: | OnlyKeysOfSpecificType&#60;T, number&#62;

     | OnlyKeysOfSpecificType&#60;T, string&#62;
     | OnlyKeysOfSpecificType&#60;T, symbol&#62;
     | ((item: T) =&#62; number | string | symbol)
