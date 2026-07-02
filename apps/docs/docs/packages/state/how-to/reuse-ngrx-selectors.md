---
sidebar_position: 10
id: reuse-ngrx-selectors
title: "Reuse NgRx selectors to compose RxState"
diataxis_type: how-to
package: state
legacy_guard: "existing NgRx-selector users"
sidebar_label: "Reuse NgRx selectors"
tags: [state, guides, migration]
concepts: [E3]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LegacyGuard from '@site/src/components/LegacyGuard';

# Reuse NgRx selectors to compose RxState

<LegacyGuard audience="existing NgRx-selector users" native="Angular's native way to compose derived state is computed() — and @ngrx/signals exposes the same idea as withComputed()" conceptSlug="E3-reactive-state-global-vs-local" conceptLabel="Reactive state: global vs local, RxState + signals">

This recipe exists for its **one unique value: reusing `createSelector` selectors you
already have**. If your app already composes state with NgRx selectors, you can plug
them straight into an RxState container instead of rewriting the derivation logic. For
**new** derivations, prefer the native path below.

</LegacyGuard>

## Goal / when to use

You already have memoized [NgRx selectors](https://ngrx.io/guide/store/selectors) built
with `createSelector` and want to reuse them to derive slices of an
[`rxState`](../reference/rx-state-functional.md) container, without porting the
derivation logic.

:::note Native path for new code
For a new derivation, reach for `computed()`: it is glitch-free and auto-memoized,
covering what `createSelector` did in-component. In a `@ngrx/signals` `signalStore()`
the equivalent is `withComputed()`. Use the recipe below when the value is reusing an
**existing** selector library. See [Reactive state: global vs local, RxState +
signals](../../../concepts/E3-reactive-state-global-vs-local.md).
:::

## Setup: the state shape

```ts
interface Item {
  id: string;
  name: string;
}

interface ComponentState {
  items: { [id: string]: Item };
  visibleIds: string[];
}
```

We want the visible items, derived from all `items` and the `visibleIds` array. Compose
that with `createSelector`:

```ts
import { createSelector } from '@ngrx/store';

const selectItems = (state: ComponentState) => state.items;
const selectVisibleIds = (state: ComponentState) => state.visibleIds;

const selectVisibleItems = createSelector(
  selectVisibleIds,
  selectItems,
  (visibleIds, items) => visibleIds.map((id) => items[id]),
);
```

## Using the selector in a component

Pass the reused selector through RxState's `select`:

<Tabs>

<TabItem value="functional" label="Functional (rxState)" default>

```ts
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { rxState } from '@rx-angular/state';
import { select } from '@ngrx/store';

@Component({ selector: 'item-list' })
export class ItemListComponent {
  private readonly state = rxState<ComponentState>();
  readonly visibleItems$ = this.state.select(select(selectVisibleItems));
  // for the template, bridge the selection into a signal:
  readonly visibleItems = toSignal(this.visibleItems$, { initialValue: [] as Item[] });
}
```

</TabItem>

<TabItem value="class" label="Class (Classic)">

```ts
import { Component } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { select } from '@ngrx/store';

@Component({ selector: 'item-list' })
export class ItemListComponent extends RxState<ComponentState> {
  readonly visibleItems$ = this.select(select(selectVisibleItems));

  constructor() {
    super();
  }
}
```

</TabItem>

</Tabs>

## Result

`selectVisibleItems` is reused verbatim (the same memoized selector your NgRx code
already relies on) and now feeds an RxState selection, as an observable or a signal via
`computed`, with no rewrite.

## See also

- Reference: [`rxState`](../reference/rx-state-functional.md) · [`select`](../reference/select.md)
- Concept: [Reactive state: global vs local, RxState + signals](../../../concepts/E3-reactive-state-global-vs-local.md)

_Author: [@Phhansen](https://github.com/Phhansen)_
