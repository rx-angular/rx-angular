---
id: best-practices
title: "How to structure a component around RxState"
diataxis_type: how-to
package: state
legacy_guard: false
sidebar_label: "Best practices"
sidebar_position: 6
tags: [state, guides]
concepts: [E3]
---

import SignalsFirst from '@site/src/components/SignalsFirst';

# How to structure a component around RxState

<SignalsFirst />

## Goal

Apply a consistent architecture when a component's state is complex or async-heavy enough to warrant `rxState()`. Treat these as conventions rather than hard rules. For the *why* behind local-vs-global state, see the [Reactive state: global vs local](../../../concepts/E3-reactive-state-global-vs-local.md) concept.

## The shell

A component built around RxState follows a small set of conventions:

- **Inputs** feed state: a signal `input()` (or a `connect` for an `Observable` source).
- **Outputs** are state derivations: a `computed()` or a selected `Observable`.
- The state handle is created with **`rxState()`** and held in a private field.
- The template reads state through **signals**: `state.signal('key')` and `computed()`.
- UI interactions are modelled as **`Subject`s** (or `rxActions`) that feed back into state.

## Define the state interface first

A property that should change the view belongs in the state interface. Keep state _normalized_; handle _derived_ state separately (with `computed()`), not by storing it.

```typescript
interface MyState {
  items: string[];
  listExpanded: boolean;
  sortKey: string;
  isAsc: boolean;
}
```

## Wire inputs, state, and the view

Create the state with `rxState()`, feed it from signal inputs, and expose a signal-based view. No `providers: [RxState]`, no constructor DI, no `| async`.

```typescript
import { Component, computed, input } from '@angular/core';
import { rxState } from '@rx-angular/state';

@Component({
  selector: 'app-stateful-component',
  template: `
    @if (vm(); as vm) {
      <div>{{ vm.items.length }} items ({{ vm.sortKey }})</div>
    }
    <button (click)="reset.next()">Reset</button>
  `,
})
export class StatefulComponent {
  // Inputs feed state
  readonly items = input<string[]>([]);

  // UI interactions are Subjects
  readonly reset = new Subject<void>();

  private readonly state = rxState<MyState>(({ set, connect }) => {
    set({ items: [], listExpanded: false, sortKey: 'name', isAsc: true });
    connect('items', toObservable(this.items));
    connect(this.reset, () => ({ items: [], listExpanded: false }));
  });

  // The view is a signal, not an async pipe
  readonly vm = this.state.computed(({ items, sortKey }) => ({
    items: items(),
    sortKey: sortKey(),
  }));

  // Outputs are state derivations
  readonly itemCount = computed(() => this.vm().items.length);
}
```

State is updated with **`set(...)`**; there is no `setState` method on RxState.

## Name transformations by their data shape

Name observables and projection functions so they describe the returned data structure, and think in **source → transform → state/effect**. Extract the transform into a named projection instead of inlining a `switchMap`:

```typescript
private readonly searchResults$ = this.inputChange$.pipe(
  this.toSearchResults,
);

private readonly toSearchResults = (o$: Observable<string>) =>
  o$.pipe(switchMap((query) => this.api.search(query)));
```

## Result

The component reads as: inputs in, one state handle, a signal view out. Change detection stays local and glitch-free because the view is a signal graph.

## See also

- Reference: [`RxState` (functional)](../reference/rx-state-functional.md)
- How-to: [Derive a view model](./derive-a-view-model.md)
- Concept: [Reactive state: global vs local, RxState + signals](../../../concepts/E3-reactive-state-global-vs-local.md)

> The "reactive discipline" rationale (why interactions become `Subject`s/actions and side effects go through `rxEffects` rather than ad-hoc subscriptions) is covered in the [RxState reactive discipline & effects](../../../concepts/E6-rxstate-discipline-and-effects.md) concept.
