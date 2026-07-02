---
id: select-slice
title: "selectSlice"
diataxis_type: reference
package: state
legacy_guard: false
sidebar_label: "selectSlice"
tags: [state, api-reference]
concepts: [E3]
---

# `selectSlice`

RxJS operator that emits only the provided `keys` from the source `Observable`. Each key is filtered to emit only **defined** values and checked for **distinct** emissions; comparison is done for each key in the `keys` array. A selection is only emitted when it is *valid* (every selected key must exist and be defined in the source), so the operator always yields a complete slice with all values present.

You can fine-grain the distinct checks by passing a `KeyCompareMap` for the keys you want to compare explicitly.

## Signature

```ts
function selectSlice<T extends object, K extends keyof T>(
  keys: K[],
  keyCompareMap?: KeyCompareMap<{ [P in K]: T[P] }>,
): OperatorFunction<T, PickSlice<T, K>>;
```

The result type is `PickSlice<T, K>`; there is **no** `| null` in the emitted type. Invalid selections are not emitted at all (they are filtered out upstream) rather than surfaced as `null`.

## Parameters

| Parameter | Type | Meaning |
| --- | --- | --- |
| `keys` | `K[]` | The keys to select from the state object. |
| `keyCompareMap` | `KeyCompareMap<{ [P in K]: T[P] }>` | Optional. Custom compare functions for specific keys. |

## Returns

`OperatorFunction<T, PickSlice<T, K>>`, an operator that emits distinct, complete slices of the selected keys.

## Import

```ts
import { selectSlice } from '@rx-angular/state/selections';
```

## Example

```ts
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { selectSlice, KeyCompareMap } from '@rx-angular/state/selections';

interface MyState {
  title: string;
  items: string[];
  panelOpen: boolean;
}

// custom compare logic for the items array
const customComparison: KeyCompareMap<MyState> = {
  items: (oldItems, newItems) => compareItems(oldItems, newItems),
};

const state$: Observable<MyState> = of(
  { title: 'myTitle', items: ['foo', 'bar'], panelOpen: true },
  { title: 'myTitle', items: ['foo', 'bar'], panelOpen: false },
  { title: 'nextTitle', items: ['foo', 'baR'], panelOpen: true },
  { title: 'nextTitle', items: ['fooRz', 'boo'], panelOpen: false },
);

state$
  .pipe(selectSlice(['title', 'items'], customComparison), tap(console.log))
  .subscribe();

// displays:
// { title: 'myTitle', items: ['foo', 'bar'] }
// { title: 'nextTitle', items: ['foo', 'baR'] }
// { title: 'nextTitle', items: ['fooRz', 'boo'] }
```

## Signal alternative

For reading a slice **inside a component**, prefer a native `computed()` over `selectSlice` + the async pipe; assemble the slice from the individual `state.signal(...)` reads:

```ts
protected readonly slice = computed(() => ({
  title: this.title(),
  items: this.items(),
}));
```

Keep `selectSlice` for **RxJS pipelines** where you are composing `Observable` sources before they reach state.

## See also

- Concept: [Reactive state: global vs local, RxState + signals](../../../concepts/E3-reactive-state-global-vs-local.md)
- Reference: [`select`](./select.md) · [`distinctUntilSomeChanged`](./distinct-until-some-changed.md) · [`stateful`](./stateful.md)
