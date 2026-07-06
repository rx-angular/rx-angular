---
id: derive-a-view-model
title: 'How to derive a view model from RxState'
diataxis_type: how-to
package: state
legacy_guard: false
sidebar_label: 'Derive a view model'
sidebar_position: 4
tags: [state, guides]
concepts: [E3]
---

# How to derive a view model from RxState

## Goal

Compose the derived view state a template needs (a single "view model" object assembled from several state slices) while keeping change detection glitch-free. Keep the `rxState()` container as the source of truth and derive the view with `computed()`, so the template reads a signal instead of piping an `Observable` through `| async`.

Imagine the following setup:

```typescript
interface Item {
  id: string;
  name: string;
}

interface ComponentState {
  title: string;
  created: string;
  items: Item[];
  visibleItemIds: string[];
}

interface ComponentViewModel {
  title: string;
  created: string;
  visibleItems: Item[];
  total: number;
}
```

You want to render this template. Read the derived `vm()` signal directly and iterate with `@for` (with a mandatory `track`):

```html
@if (vm(); as vm) {
<h1>
  {{ vm.title }}
  <small>{{ vm.created | date }} — <b>total: {{ vm.total }}</b></small>
</h1>
<ul>
  @for (item of vm.visibleItems; track item.id) {
  <li>{{ item.name }}</li>
  }
</ul>
}
```

## Derive the whole view model with `computed()`

The view requires additional and derived information from component state, so transform `ComponentState` into `ComponentViewModel`. A `computed()` recomputes only when the state signals it reads change, so the view model stays distinct by construction, with no `selectSlice` + `distinctUntilChanged` bookkeeping and no `| async` needed.

```typescript
import { Component, computed } from '@angular/core';
import { rxState } from '@rx-angular/state';

@Component({
  /* … */
})
export class ViewModelComponent {
  private readonly state = rxState<ComponentState>(({ set }) => set({ title: '', created: '', items: [], visibleItemIds: [] }));

  private readonly title = this.state.signal('title');
  private readonly created = this.state.signal('created');
  private readonly items = this.state.signal('items');
  private readonly visibleItemIds = this.state.signal('visibleItemIds');

  readonly vm = computed<ComponentViewModel>(() => {
    const items = this.items();
    const visibleItemIds = this.visibleItemIds();
    return {
      title: this.title(),
      created: this.created(),
      total: items.length,
      visibleItems: items.filter((item) => visibleItemIds.some((id) => id === item.id)),
    };
  });
}
```

## Split the view model into independent parts

When you want more control over what renders when (for example, lazy or independent rendering of two regions), derive several smaller `computed()` signals instead of one. Each is its own signal, so each region re-renders only when its own inputs change.

```typescript
@Component({
  /* … */
})
export class ViewModelComponent {
  private readonly state = rxState<ComponentState>(({ set }) => set({ title: '', created: '', items: [], visibleItemIds: [] }));

  private readonly title = this.state.signal('title');
  private readonly created = this.state.signal('created');
  private readonly items = this.state.signal('items');
  private readonly visibleItemIds = this.state.signal('visibleItemIds');

  readonly mainVm = computed(() => ({
    title: this.title(),
    created: this.created(),
  }));

  readonly listVm = computed(() => {
    const items = this.items();
    const visibleItemIds = this.visibleItemIds();
    return {
      total: items.length,
      visibleItems: items.filter((item) => visibleItemIds.some((id) => id === item.id)),
    };
  });
}
```

```html
@if (mainVm(); as vm) {
<h1>
  {{ vm.title }}
  <small>{{ vm.created | date }}</small>
</h1>
} @if (listVm(); as vm) {
<div><b>total: {{ vm.total }}</b></div>
<ul>
  @for (item of vm.visibleItems; track item.id) {
  <li>{{ item.name }}</li>
  }
</ul>
}
```

## Result

The template reads a signal view model; derivation is memoized and glitch-free by construction, and no `| async` subscription is left to manage.

## See also

- Reference: [`RxState` (functional)](../reference/rx-state-functional.md) · [`selectSlice`](../reference/select-slice.md)
- How-to: [Structure a component around RxState](./best-practices.md)
- Concept: [Reactive state: global vs local, RxState + signals](../../../concepts/E3-reactive-state-global-vs-local.md)

> When to keep derivation in an RxJS pipeline (the `select`/`selectSlice` operators) versus lifting it into a `computed()` is covered by the [RxState reactive discipline & effects](../../../concepts/E6-rxstate-discipline-and-effects.md) concept.
