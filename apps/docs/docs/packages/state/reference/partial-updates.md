---
id: partial-updates
title: "Partial updates"
diataxis_type: reference
package: state
legacy_guard: false
sidebar_label: "Partial updates"
tags: [state, api-reference]
concepts: [E3]
---

# Partial updates

`RxState` has partial updates built in. Every change sent to the state over `set` or `connect` is treated as a **partial** update: an instance typed with `T` accepts `Partial<T>` on both methods, and the change is merged into the current state.

A partial update can be supplied two ways:

- directly, as a `Partial<T>` object; or
- via a projection function `(oldState) => Partial<T>` (the `set` overload that takes a `ProjectStateFn`). For a two-argument reducer `(oldState, value) => Partial<T>`, use `connect` with an observable source.

## Merge semantics

Internally, updates are accumulated with a shallow merge over the previous state:

```ts
newState$.pipe(
  scan((oldState, newPartialState) => ({ ...oldState, ...newPartialState })),
);
```

Because the merge is **shallow**, a partial update replaces top-level keys wholesale; nested objects are not deep-merged. Keys absent from the partial are left untouched.

## Import

```ts
import { rxState } from '@rx-angular/state';
```

## Example

`rxState()` returns a handle held in a private field; `set` and `connect` are members of that handle, not of the component:

```ts
import { Component } from '@angular/core';
import { rxState } from '@rx-angular/state';

interface ComponentState {
  title: string;
  items: string[];
  loading: boolean;
}

@Component({
  /* … */
})
export class AnyComponent {
  private readonly state = rxState<ComponentState>(({ set }) =>
    set({ title: '', items: [], loading: false }),
  );

  updateTitle() {
    // direct partial update
    this.state.set({ title: 'Hello!' });
  }

  resetList() {
    // partial update over a connected source
    this.state.connect(this.reset$, () => ({ items: [], loading: false }));
  }
}
```

## See also

- Concept: [Reactive state: global vs local, RxState + signals](../../../concepts/E3-reactive-state-global-vs-local.md)
