---
id: selections-api
title: '@rx-angular/state/selections'
diataxis_type: reference
package: state
legacy_guard: false
sidebar_label: 'Selections operators'
tags: [state, api-reference]
concepts: [E3]
---

# `@rx-angular/state/selections`

A set of RxJS operators for selecting state in an efficient, distinct way. They are the building blocks RxState uses internally for its `select` surface, and they are exported so you can use them directly inside your own RxJS pipelines.

## Motivation

For reading state **inside a component**, prefer native signals (`state.signal('key')` and `computed()`) over these operators. A `computed()` is glitch-free and distinct-by-value with no operator plumbing, and it does not require an `| async` subscription.

These operators are for **RxJS pipelines**: composing multiple `Observable` sources, gating a stream on a subset of keys before it reaches state, or feeding a `connect`. That is the residual niche where distinct-checked, replayed selection still earns its place. See [Reactive state: global vs local, RxState + signals](../../../concepts/E3-reactive-state-global-vs-local.md) for when in-component derivation belongs in a signal versus a pipeline.

## Operators

| Operator                                                       | Purpose                                                                                                                                                         |
| -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`select`](./select.md)                                        | Read a slice of state as a shared, replayed, distinct `Observable`. Overloads for whole-state, operator composition, deep-key access, and key/slice projection. |
| [`selectSlice`](./select-slice.md)                             | Emit only the provided keys, filtered to defined values and checked distinct, always a complete slice.                                                          |
| [`distinctUntilSomeChanged`](./distinct-until-some-changed.md) | Emit items that are distinct by comparison across the given keys (via `Array.prototype.some`), with an optional per-key compare map.                            |
| [`stateful`](./stateful.md)                                    | Turn a plain `Observable` into a stateful one: filtered to defined values, distinct, and shared/replayed.                                                       |

## Interfaces

| Interface                               | Purpose                                                     |
| --------------------------------------- | ----------------------------------------------------------- |
| [`CompareFn`](./compare-fn.md)          | Signature of a custom equality comparator.                  |
| [`KeyCompareMap`](./key-compare-map.md) | Map of per-key `CompareFn`s used by the distinct operators. |

## Import

```ts
import { select, selectSlice, distinctUntilSomeChanged, stateful } from '@rx-angular/state/selections';
```

## See also

- Concept: [Reactive state: global vs local, RxState + signals](../../../concepts/E3-reactive-state-global-vs-local.md)
- Reference: [`RxState` (functional)](./rx-state-functional.md)
