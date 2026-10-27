---
id: stateful
title: 'stateful'
diataxis_type: reference
package: state
legacy_guard: false
sidebar_label: 'stateful'
tags: [state, api-reference]
concepts: [E3]
---

# `stateful`

RxJS operator that turns an arbitrary source `Observable` into a _stateful_ one: it emits only **distinct** and **defined** values, and shares/replays the result for multiple subscribers. It behaves like the Observable `pipe` method (pass zero or more RxJS operators and they are composed in order) while adding the repetitive state-processing guarantees on top.

Every emission is guaranteed to be:

- **distinct**: duplicate consecutive states are dropped (`distinctUntilChanged` on both the base state and the derived result);
- **defined**: `undefined` is filtered out, which keeps state lazy;
- **shared & replayed**: one execution is reused across subscribers, and late subscribers get the last value (`shareReplay({ bufferSize: 1, refCount: true })`).

`RxState#connect` applies `stateful` under the hood, so state connected into an `RxState` container is already subject to these guarantees.

## Signature

```ts
// no operators — just distinct/defined/shared
function stateful<T>(): OperatorFunction<T, NonUndefined<T>>;

// one or more derivation operators (rest parameter)
function stateful<T, R>(...optionalDerive: OperatorFunction<T, R>[]): OperatorFunction<T, NonUndefined<T> | NonUndefined<R>>;
```

The library also declares intermediate typed overloads for 1–5 chained operators (`stateful<T, A>`, `stateful<T, A, B>`, …) so the composed result type is inferred. All resolve to the rest-parameter implementation above.

## Parameters

| Parameter           | Type                       | Meaning                                                                                                                    |
| ------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `...optionalDerive` | `OperatorFunction<T, R>[]` | Zero or more RxJS operators, passed comma-separated (a **rest** parameter, not an array), composed like `Observable#pipe`. |

## Returns

`OperatorFunction<T, NonUndefined<T>>` for the no-argument form, or `OperatorFunction<T, NonUndefined<T> | NonUndefined<R>>` when derivation operators are supplied. `NonUndefined<T>` is `T extends undefined ? never : T`; the return type reflects that `undefined` is filtered out.

## Import

```ts
import { stateful } from '@rx-angular/state/selections';
```

## Example

```ts
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { stateful } from '@rx-angular/state/selections';

declare const state$: Observable<{ name: string; items: string[] }>;

const derivation$ = state$.pipe(
  stateful(
    map((state) => state.items.length),
    filter((length) => length > 3),
  ),
);
```

## Deriving simple state: signal-era note

When the source is a component-local `RxState` container, prefer Angular's native `computed()` for simple derivations. It is glitch-free, auto-memoized, and integrates directly with the template:

```ts
import { Component, computed } from '@angular/core';
import { rxState } from '@rx-angular/state';

interface ListState {
  items: string[];
}

@Component({
  /* … */
  template: `<p>{{ itemCount() }} items</p>`,
})
export class ListComponent {
  private readonly state = rxState<ListState>(({ set }) => set({ items: [] }));

  // native, in-component derivation — no operator needed
  protected readonly items = this.state.signal('items');
  protected readonly itemCount = computed(() => this.items().length);
}
```

`stateful` (and the related `select`/`selectSlice` operators) remain the right tool for derivation **inside RxJS pipelines**, for example when composing multiple `Observable` sources before they reach state, or when the derived stream feeds a `connect`. The [RxState reactive discipline & effects](../../../concepts/E6-rxstate-discipline-and-effects.md) concept covers when to keep derivation in the reactive pipeline versus lifting it into signals.

## See also

- Concept: [Reactive state: global vs local, RxState + signals](../../../concepts/E3-reactive-state-global-vs-local.md)
- Reference: [`select`](./select.md) · [`selectSlice`](./select-slice.md) · [`distinctUntilSomeChanged`](./distinct-until-some-changed.md)
