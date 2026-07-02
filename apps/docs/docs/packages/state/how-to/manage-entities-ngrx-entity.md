---
sidebar_position: 9
id: manage-entities-ngrx-entity
title: "Manage entities with @ngrx/entity and RxState"
diataxis_type: how-to
package: state
legacy_guard: "existing @ngrx/entity users"
sidebar_label: "Manage entities (@ngrx/entity)"
tags: [state, guides, migration]
concepts: [E3]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import LegacyGuard from '@site/src/components/LegacyGuard';

# Manage entities with `@ngrx/entity` and RxState

<LegacyGuard audience="existing @ngrx/entity users" native="Angular's native path for entity collections in local state is @ngrx/signals — a signalStore() with withEntities()" conceptSlug="E3-reactive-state-global-vs-local" conceptLabel="Reactive state: global vs local, RxState + signals">

This recipe exists for its **one unique value: reusing entity code you already have**.
If your app already depends on `@ngrx/entity` adapters, you can drive an RxState
container with them and avoid rewriting collection logic. For a **new** codebase there
is a more idiomatic native path; see the note below.

</LegacyGuard>

## Goal / when to use

Managing collections in component state means writing the same add / update / remove
plumbing over and over. `@ngrx/entity` provides an [entity
adapter](https://ngrx.io/guide/entity/adapter) that hides that plumbing behind a small
API. **Use this recipe when you already have `@ngrx/entity` adapters and selectors and
want to reuse them** with an [`rxState`](../reference/rx-state-functional.md) container.

:::note Native path for new code
For entity collections in local state on a greenfield codebase, prefer
[`@ngrx/signals`](https://ngrx.io/guide/signals): a `signalStore()` with
`withEntities()` gives you a signal-native adapter with no bridging. Reach for the
recipe below when the pull is reusing an **existing** `@ngrx/entity` investment. See
[Reactive state: global vs local, RxState +
signals](../../../concepts/E3-reactive-state-global-vs-local.md).
:::

## Setup: the state shape

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

Adding one item immutably means replacing the `items` array with a new reference:

<Tabs>

<TabItem value="functional" label="Functional (rxState)" default>

```ts
import { Component } from '@angular/core';
import { rxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

@Component({ selector: 'my-component' })
export class MyComponent {
  private readonly state = rxState<ComponentState>();
  readonly addItem$ = new Subject<string>();

  constructor() {
    this.state.connect(this.addItem$, (oldState, itemName) => {
      const newItem = { id: uuid(), name: itemName };
      return { ...oldState, items: [...oldState.items, newItem] };
    });
  }
}
```

</TabItem>

<TabItem value="class" label="Class (Classic)">

```ts
import { Component } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

@Component({ selector: 'my-component' })
export class MyComponent extends RxState<ComponentState> {
  readonly addItem$ = new Subject<string>();

  constructor() {
    super();
    this.connect(this.addItem$, (oldState, itemName) => {
      const newItem = { id: uuid(), name: itemName };
      return { ...oldState, items: [...oldState.items, newItem] };
    });
  }
}
```

</TabItem>

</Tabs>

Updating an item means querying the array first, then rebuilding it; deleting means
the same again. It is a lot of repetitive code, and it grows with every collection
type you add. That is what the adapter removes.

## Using `@ngrx/entity`

Model the state on `EntityState<Item>` and create an adapter:

```ts
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

interface Item {
  id: string;
  name: string;
}

interface ComponentState extends EntityState<Item> {
  loading: boolean;
}

const adapter: EntityAdapter<Item> = createEntityAdapter<Item>({
  selectId: (item: Item) => item.id,
});
```

The adapter's `selectId` tells it how to key items within the collection. Now the
component's mutation logic collapses to adapter calls:

<Tabs>

<TabItem value="functional" label="Functional (rxState)" default>

```ts
import { Component } from '@angular/core';
import { rxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

@Component({ selector: 'my-component' })
export class MyComponent {
  private readonly state = rxState<ComponentState>();
  readonly addItem$ = new Subject<string>();

  constructor() {
    this.state.connect(this.addItem$, (oldState, itemName) =>
      adapter.addOne({ id: uuid(), name: itemName }, oldState),
    );
  }
}
```

</TabItem>

<TabItem value="class" label="Class (Classic)">

```ts
import { Component } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';

@Component({ selector: 'my-component' })
export class MyComponent extends RxState<ComponentState> {
  readonly addItem$ = new Subject<string>();

  constructor() {
    super();
    this.connect(this.addItem$, (oldState, itemName) =>
      adapter.addOne({ id: uuid(), name: itemName }, oldState),
    );
  }
}
```

</TabItem>

</Tabs>

`addOne()` is one of many adapter methods. Deleting an item is
`adapter.removeOne(item.id, oldState)`. See the [full list of adapter collection
methods](https://ngrx.io/guide/entity/adapter#adapter-collection-methods).

## Selecting state with `@ngrx/entity`

The adapter ships default selectors (`selectIds`, `selectEntities`, `selectAll`,
`selectTotal`) you can compose into RxState selections:

<Tabs>

<TabItem value="functional" label="Functional (rxState)" default>

```ts
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { rxState } from '@rx-angular/state';
import { select } from '@ngrx/store';

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

@Component({ selector: 'my-component' })
export class MyComponent {
  private readonly state = rxState<ComponentState>();
  readonly items$ = this.state.select(select(selectAll));
  // for the template, bridge the selection into a signal:
  readonly items = toSignal(this.items$, { initialValue: [] as Item[] });
}
```

</TabItem>

<TabItem value="class" label="Class (Classic)">

```ts
import { Component } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { select } from '@ngrx/store';

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();

@Component({ selector: 'my-component' })
export class MyComponent extends RxState<ComponentState> {
  readonly items$ = this.select(select(selectAll));

  constructor() {
    super();
  }
}
```

</TabItem>

</Tabs>

## Result

Add / update / remove and the default selectors all come from the adapter, so the
component holds almost no collection plumbing, while reusing the `@ngrx/entity` code
you already had.

## See also

- Reference: [`rxState`](../reference/rx-state-functional.md) · [`select`](../reference/select.md)
- Concept: [Reactive state: global vs local, RxState + signals](../../../concepts/E3-reactive-state-global-vs-local.md)

_Author: [@Phhansen](https://github.com/Phhansen)_
