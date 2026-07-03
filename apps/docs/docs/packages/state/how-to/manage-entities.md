---
sidebar_position: 9
id: manage-entities
title: 'Manage entities with RxState'
diataxis_type: how-to
package: state
legacy_guard: false
sidebar_label: 'Manage entities with RxState'
tags: [state, cdk, guides]
concepts: [E3, E7]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Manage entities with RxState

Managing a collection in component state means writing the same add / update / remove
plumbing over and over: find the item in the array, rebuild the array immutably, put it
back. RxAngular ships that plumbing as a set of pure, immutable helpers in
[`@rx-angular/cdk/transformations`](../../cdk/reference/transformations/index.md) —
`insert`, `update`, `upsert`, `remove`, and the `toDictionary` / `dictionaryToArray`
pair. Each returns a **new** array (or object) and never mutates its input, so it drops
straight into an [`rxState`](../reference/rx-state-functional.md) container: the component
holds almost no collection code, and you pull in no entity library to get it.

## Goal / when to use

Use this recipe whenever a component owns a list of keyed records — todos, users, cart
lines, search results — and needs to add, change, and drop them reactively. The helpers
key into the collection by a field you name (`'id'`), a list of fields, or a custom
comparator, so they fit any shape of record.

## Setup: the state shape

Keep the collection as a plain array:

```ts
interface Item {
  id: string;
  name: string;
}

interface ComponentState {
  items: Item[];
  loading: boolean;
}
```

## Add, update, and remove

Connect each user action to a helper inside the `rxState` initializer. The three-argument
`connect(key, source$, (state, value) => newValue)` overload hands you the current slice
and takes back the next one:

<Tabs>
<TabItem value="functional" label="Functional (rxState)" default>

```ts
import { Component } from '@angular/core';
import { rxState } from '@rx-angular/state';
import { insert, update, remove } from '@rx-angular/cdk/transformations';
import { Subject } from 'rxjs';

@Component({ selector: 'my-component' })
export class MyComponent {
  readonly addItem$ = new Subject<Item>();
  readonly updateItem$ = new Subject<Item>();
  readonly removeItem$ = new Subject<Item>();

  private readonly state = rxState<ComponentState>(({ set, connect }) => {
    set({ items: [], loading: false });
    connect('items', this.addItem$, ({ items }, item) => insert(items, item));
    connect('items', this.updateItem$, ({ items }, item) => update(items, item, 'id'));
    connect('items', this.removeItem$, ({ items }, item) => remove(items, item, 'id'));
  });

  readonly items = this.state.signal('items');
}
```

</TabItem>
<TabItem value="class" label="Class (RxState)">

```ts
import { Component } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { insert, update, remove } from '@rx-angular/cdk/transformations';
import { Subject } from 'rxjs';

@Component({ selector: 'my-component' })
export class MyComponent extends RxState<ComponentState> {
  readonly addItem$ = new Subject<Item>();
  readonly updateItem$ = new Subject<Item>();
  readonly removeItem$ = new Subject<Item>();

  readonly items = this.signal('items');

  constructor() {
    super();
    this.set({ items: [], loading: false });
    this.connect('items', this.addItem$, ({ items }, item) => insert(items, item));
    this.connect('items', this.updateItem$, ({ items }, item) => update(items, item, 'id'));
    this.connect('items', this.removeItem$, ({ items }, item) => remove(items, item, 'id'));
  }
}
```

</TabItem>
</Tabs>

- **`insert(items, itemOrItems)`** — append one item, or several at once.
- **`update(items, item, 'id')`** — replace the item whose `id` matches. The third
  argument can be a key, a list of keys (`['id', 'name']`), or a comparator
  `(a, b) => a.id === b.id`.
- **`remove(items, item, 'id')`** — drop matching items. You can also remove by raw value
  when the array holds primitives, e.g. `remove(ids, ['a', 'b'])`.

For an action that should insert when the record is new and replace when it already
exists, use **`upsert`**:

```ts
import { upsert } from '@rx-angular/cdk/transformations';

connect('items', this.saveItem$, ({ items }, item) => upsert(items, item, 'id'));
```

## Imperative updates

Outside a stream, run the same helpers through `set()` — read the current slice with
`get()`, transform it, and write it back:

```ts
addItem(item: Item): void {
  this.state.set({ items: insert(this.state.get('items'), item) });
}
```

## Fast lookups: normalize to a dictionary

When you read records by id far more often than you iterate them, hold the collection as
a keyed dictionary (`Record<string, Item>`) instead of an array. `toDictionary` builds one
from an array; `dictionaryToArray` turns it back for rendering:

```ts
import { computed } from '@angular/core';
import { toDictionary, dictionaryToArray } from '@rx-angular/cdk/transformations';

// build a lookup from an incoming array
connect('itemsById', this.loadItems$, (_, items) => toDictionary(items, 'id'));

readonly itemsById = this.state.signal('itemsById');
// O(1) read by id
getItem = (id: string): Item | undefined => this.itemsById()[id];
// materialize a list only where you iterate
readonly itemList = computed(() => dictionaryToArray(this.itemsById()));
```

Once normalized, update or add a field on a single record by key with
[`patch`](../../cdk/reference/transformations/object/patch.md) /
[`setProp`](../../cdk/reference/transformations/object/set-prop.md), and drop one with
[`deleteProp`](../../cdk/reference/transformations/object/delete-prop.md).

## Selecting and rendering

`state.signal('items')` exposes the collection as a `Signal<Item[]>` for direct template
binding; `state.select('items')` gives the `Observable<Item[]>` when you need to compose
it further. Derived views are plain reads:

```ts
readonly items = this.state.signal('items');
readonly total = computed(() => this.items().length);
```

## Result

Add / update / remove and normalization all come from small pure functions, so the
component carries no bespoke collection logic and no entity-library dependency — just
`@rx-angular/state` for the container and `@rx-angular/cdk/transformations` for the moves.

## See also

- Reference: [Transformation helpers](../../cdk/reference/transformations/index.md) · [`rxState`](../reference/rx-state-functional.md)
- Concept: [Immutability & serializable state](../../../concepts/E7-immutability-and-serializable-state.md) · [Reactive state: global vs local](../../../concepts/E3-reactive-state-global-vs-local.md)
