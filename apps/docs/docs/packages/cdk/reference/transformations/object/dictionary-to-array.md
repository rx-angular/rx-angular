---
id: dictionary-to-array
title: dictionaryToArray
diataxis_type: reference
package: cdk
legacy_guard: false
tags: [cdk, api-reference, state]
---

## dictionaryToArray

Converts a dictionary of type `{ [key: string]: T }` to an array `T[]`. Returns a
new array and does not mutate the original dictionary.

Immutability is explained in the [immutability & serializable state](../../../../../concepts/E7-immutability-and-serializable-state.md) concept.

_Example_

```typescript
const creaturesDictionary = {
  '1': { id: 1, type: 'cat' },
  '2': { id: 2, type: 'dog' },
  '3': { id: 3, type: 'parrot' },
};

const creaturesArray = dictionaryToArray(creaturesDictionary);

// creaturesArray will be:
// [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}, {id: 3, type: 'parrot'}];
```

_Example — with `rxState()`_

```typescript
import { Component, inject } from '@angular/core';
import { rxState } from '@rx-angular/state';
import { dictionaryToArray } from '@rx-angular/cdk/transformations';

@Component({
  /* ... */
})
export class ListComponent {
  private readonly api = inject(ApiService);

  private readonly state = rxState<ComponentState>(({ connect }) => {
    connect('creatures', this.api.creaturesDictionary$, (_, creatures) =>
      dictionaryToArray(creatures),
    );
  });

  readonly creatures = this.state.signal('creatures');

  // Imperative alternative
  convertToArray(): void {
    this.api.creaturesDictionary$
      .pipe(/* subscription-handling logic */)
      .subscribe((dictionary) =>
        this.state.set({ creatures: dictionaryToArray(dictionary) }),
      );
  }
}
```

_Example — signals-first_

```typescript
import { signal, computed } from '@angular/core';
import { dictionaryToArray } from '@rx-angular/cdk/transformations';

const creaturesDictionary = signal<Record<string, Creature>>({});

const creaturesArray = computed(() => dictionaryToArray(creaturesDictionary()));
```

### Edge cases

```typescript
dictionaryToArray({}) > [];
dictionaryToArray(null as any) > null;
dictionaryToArray(undefined as any) > undefined;
dictionaryToArray(nonObject) > [];
dictionaryToArray([1, 2, 3] as any) > [];
```

### Signature

```typescript
function dictionaryToArray<T>(dictionary: { [key: string]: T }): T[];
```

### Parameters

#### dictionary

###### typeof: { [key: string]: T }
