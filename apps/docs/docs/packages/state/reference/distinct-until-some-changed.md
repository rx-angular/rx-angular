---
id: distinct-until-some-changed
title: 'distinctUntilSomeChanged'
diataxis_type: reference
package: state
legacy_guard: false
sidebar_label: 'distinctUntilSomeChanged'
tags: [state, api-reference]
concepts: [E3]
---

# `distinctUntilSomeChanged`

RxJS operator that emits items from the source `Observable` that are distinct by comparison from the previous item, comparing each key in the `keys` array. It is named `distinctUntilSomeChanged` because it iterates the `keys` and uses `Array.prototype.some` to decide whether values are distinct.

Pass a `KeyCompareMap` to fine-grain the distinct check for specific keys.

> **Why distinct-checking matters:** see [Reactive state: global vs local, RxState + signals](../../../concepts/E3-reactive-state-global-vs-local.md).

## Signature

```ts
function distinctUntilSomeChanged<T extends object, K extends keyof T>(keys: K[], keyCompareMap?: KeyCompareMap<T>): MonoTypeOperatorFunction<T>;
```

## Parameters

| Parameter       | Type               | Meaning                                                                                                           |
| --------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `keys`          | `K[]`              | String keys for object-property lookup on each item.                                                              |
| `keyCompareMap` | `KeyCompareMap<T>` | Optional. Custom compare functions for specific keys; keys without an entry fall back to strict equality (`===`). |

## Returns

`MonoTypeOperatorFunction<T>`. The source type is preserved; only the emission cadence changes.

## Import

```ts
import { distinctUntilSomeChanged } from '@rx-angular/state/selections';
```

## Example

```ts
import { of } from 'rxjs';
import { distinctUntilSomeChanged, KeyCompareMap } from '@rx-angular/state/selections';

interface Person {
  age: number;
  name: string;
}

const customComparison: KeyCompareMap<Person> = {
  name: (oldName, newName) => oldName.substring(0, 2) === newName.substring(0, 2),
};

of({ age: 4, name: 'Hans' }, { age: 7, name: 'Sophie' }, { age: 5, name: 'Han Solo' }, { age: 5, name: 'HanSophie' })
  .pipe(distinctUntilSomeChanged(['age', 'name'], customComparison))
  .subscribe((x) => console.log(x));

// displays:
// { age: 4, name: 'Hans' }
// { age: 7, name: 'Sophie' }
// { age: 5, name: 'Han Solo' }
```

## Signal alternative

Signal graphs are already distinct-by-value: a `computed()` recomputes only when a read signal changes, so a component reading `state.signal(...)` / `computed(...)` does not need this operator. Keep `distinctUntilSomeChanged` for **RxJS pipelines** where you are gating an `Observable` on a subset of keys before it reaches state.

## See also

- Concept: [Reactive state: global vs local, RxState + signals](../../../concepts/E3-reactive-state-global-vs-local.md)
- Reference: [`selectSlice`](./select-slice.md) · [`select`](./select.md) · [`stateful`](./stateful.md)
