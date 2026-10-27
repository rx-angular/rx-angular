---
id: patch
title: patch
diataxis_type: reference
package: cdk
legacy_guard: false
tags: [cdk, api-reference, state]
---

## patch

Merges an object of type `T` with updates of type `Partial<T>`. Returns a new
object where the updates override the original values and does not mutate the
original one.

Immutability is explained in the [immutability & serializable state](../../../../../concepts/E7-immutability-and-serializable-state.md) concept.

_Example_

```typescript
interface Creature {
  id: number;
  type: string;
  name: string;
}

const cat = { id: 1, type: 'cat' };

const catWithName = patch(cat, { name: 'Fluffy' });

// catWithName will be:
// {id: 1, type: 'cat', name: 'Fluffy'};
```

_Example — with `rxState()`_

```typescript
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { rxState } from '@rx-angular/state';
import { patch } from '@rx-angular/cdk/transformations';

@Component({
  /* ... */
})
export class ProfileComponent {
  readonly changeName$ = new Subject<string>();

  private readonly state = rxState<ComponentState>(({ connect }) => {
    connect(this.changeName$, (state, name) => patch(state, { name }));
  });

  // Imperative alternative
  changeName(name: string): void {
    this.state.set(patch(this.state.get(), { name }));
  }
}
```

_Example — signals-first_

```typescript
import { signal } from '@angular/core';
import { patch } from '@rx-angular/cdk/transformations';

const profile = signal<Profile>({ id: 1, type: 'cat' });

// patch is the central helper for immutable object updates on a signal
profile.update((state) => patch(state, { name: 'Fluffy' }));
```

### Edge cases

```typescript
patch({}, state) > state;
patch(null as any, state) > state;
patch(state, null as any) > state;
patch(null as any, null as any) > null;
patch(undefined as any, undefined as any) > undefined;
patch(state, nonObject) > state;
patch(nonObject, state) > state;
patch(nonObject, nonObjectUpdate) > nonObject;
```

### Signature

```typescript
function patch<T extends object>(object: T, upd: Partial<T>): T;
```

### Parameters

#### object

###### typeof: T

#### upd

###### typeof: Partial&#60;T&#62;
