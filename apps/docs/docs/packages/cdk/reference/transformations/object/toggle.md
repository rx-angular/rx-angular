---
id: toggle
title: toggle
diataxis_type: reference
package: cdk
legacy_guard: false
tags: [cdk, api-reference, state]
---

## toggle

Toggles a boolean property in an object. Accepts an object of type `T` and a key
whose value is a boolean. Returns a new object with the property flipped, without
mutating the original one.

Immutability is explained in the [immutability & serializable state](../../../../../concepts/E7-immutability-and-serializable-state.md) concept.

_Example_

```typescript
const state = { items: [1, 2, 3], loading: true };

const updatedState = toggle(state, 'loading');

// updatedState will be:
// {items: [1, 2, 3], loading: false};
```

_Example — with `rxState()`_

```typescript
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { rxState } from '@rx-angular/state';
import { toggle } from '@rx-angular/cdk/transformations';

@Component({
  /* ... */
})
export class ListComponent {
  readonly loadingChange$ = new Subject<void>();

  private readonly state = rxState<ComponentState>(({ connect }) => {
    connect(this.loadingChange$, (state) => toggle(state, 'isLoading'));
  });

  // Imperative alternative
  toggleLoading(): void {
    this.state.set(toggle(this.state.get(), 'isLoading'));
  }
}
```

_Example — signals-first_

```typescript
import { signal } from '@angular/core';
import { toggle } from '@rx-angular/cdk/transformations';

const state = signal<State>({ items: [1, 2, 3], isLoading: true });

state.update((current) => toggle(current, 'isLoading'));
```

### Edge cases

```typescript
toggle(state, null as any) > state;
toggle(null as any, null as any) > null;
toggle(state, 'str' as any) > state;
toggle(state, 'nonExistingBooleanKey' as any) >
  { ...state, nonExistingBooleanKey: true };
```

### Signature

```typescript
function toggle<T extends object>(
  object: T,
  key: OnlyKeysOfSpecificType<T, boolean>
): T;
```

### Parameters

#### object

###### typeof: T

#### key

###### typeof: OnlyKeysOfSpecificType&#60;T, boolean&#62;
