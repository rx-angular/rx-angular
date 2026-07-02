---
id: delete-prop
title: deleteProp
diataxis_type: reference
package: cdk
legacy_guard: false
tags: [cdk, api-reference, state]
---

## deleteProp

Accepts an object of type `T` and a key of type `K extends keyof T`. Removes the
property and returns a new object without the specified property. If the property
is not found, returns a copy of the original object. Does not mutate the original
object.

Immutability is explained in the [immutability & serializable state](../../../../../concepts/E7-immutability-and-serializable-state.md) concept.

_Example_

```typescript
const cat = { id: 1, type: 'cat', name: 'Fluffy' };

const anonymousCat = deleteProp(cat, 'name');

// anonymousCat will be:
// {id: 1, type: 'cat'};
```

_Example — with `rxState()`_

```typescript
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { rxState } from '@rx-angular/state';
import { deleteProp } from '@rx-angular/cdk/transformations';

@Component({
  /* ... */
})
export class ProfileComponent {
  readonly removeName$ = new Subject<void>();

  private readonly state = rxState<ComponentState>(({ connect }) => {
    connect(this.removeName$, (state) => deleteProp(state, 'name'));
  });

  // Imperative alternative
  removeName(): void {
    this.state.set(deleteProp(this.state.get(), 'name'));
  }
}
```

_Example — signals-first_

```typescript
import { signal } from '@angular/core';
import { deleteProp } from '@rx-angular/cdk/transformations';

const profile = signal<Profile>({ id: 1, type: 'cat', name: 'Fluffy' });

profile.update((state) => deleteProp(state, 'name'));
```

### Edge cases

```typescript
deleteProp(state, null as any) > state;
deleteProp(null as any, null as any) > null;
deleteProp(undefined as any, undefined as any) > undefined;
deleteProp(nonObject, 'prop') > nonObject;
```

### Signature

```typescript
function deleteProp<T extends object, K extends keyof T>(
  object: T,
  key: K
): Omit<T, K>;
```

### Parameters

#### object

###### typeof: T

#### key

###### typeof: K
