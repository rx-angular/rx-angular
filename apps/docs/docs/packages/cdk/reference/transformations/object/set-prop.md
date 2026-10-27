---
id: set-prop
title: setProp
diataxis_type: reference
package: cdk
legacy_guard: false
tags: [cdk, api-reference, state]
---

## setProp

Accepts an object of type `T`, a key of type `K extends keyof T`, and a value of
type `T[K]`. Sets the property and returns a new, updated object without mutating
the original one.

Immutability is explained in the [immutability & serializable state](../../../../../concepts/E7-immutability-and-serializable-state.md) concept.

_Example_

```typescript
const cat = { id: 1, type: 'cat', name: 'Fluffy' };

const renamedCat = setProp(cat, 'name', 'Bella');

// renamedCat will be:
// {id: 1, type: 'cat', name: 'Bella'};
```

_Example — with `rxState()`_

```typescript
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { rxState } from '@rx-angular/state';
import { setProp } from '@rx-angular/cdk/transformations';

@Component({
  /* ... */
})
export class ProfileComponent {
  readonly changeName$ = new Subject<string>();

  private readonly state = rxState<ComponentState>(({ connect }) => {
    connect(this.changeName$, (state, name) => setProp(state, 'name', name));
  });

  // Imperative alternative
  changeName(name: string): void {
    this.state.set(setProp(this.state.get(), 'name', name));
  }
}
```

_Example — signals-first_

```typescript
import { signal } from '@angular/core';
import { setProp } from '@rx-angular/cdk/transformations';

const profile = signal<Profile>({ id: 1, type: 'cat', name: 'Fluffy' });

profile.update((state) => setProp(state, 'name', 'Bella'));
```

### Edge cases

```typescript
setProp(nonObject, 'prop' as any, 42) > { prop: 42 };
setProp(null as any, 'prop', 42) > { prop: 42 };
setProp(null as any, null as any, 42) > null;
setProp([state], 'concat', () => []) > { concat: () => [] };
setProp(state, 'nonExisting' as any, 42) > { ...state, nonExisting: 42 };
setProp(state, null as any, 42) > state;
```

### Signature

```typescript
function setProp<T extends object, K extends keyof T>(object: T, key: K, value: T[K]): T;
```

### Parameters

#### object

###### typeof: T

#### key

###### typeof: K

#### value

###### typeof: T[K]
