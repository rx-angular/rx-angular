---
id: transformations
title: 'Transformations'
diataxis_type: reference
package: cdk
legacy_guard: false
sidebar_label: 'Transformations'
sidebar_position: 1
hide_title: true
tags: [cdk, api-reference, state]
---

# @rx-angular/cdk/transformations

[![npm](https://img.shields.io/npm/v/%40rx-angular%2Fcdk.svg)](https://www.npmjs.com/package/%40rx-angular%2Fcdk)

> A set of pure functions to update objects and collections immutably.

`@rx-angular/cdk/transformations` provides tree-shakeable, type-safe helpers for
manipulating arrays and objects. Every helper returns a new value and never
mutates its input, so the results are safe to feed into any state container that
assumes immutable updates.

## Key features

- ✅ Manage objects and collections with an immutability guarantee
- ✅ Reduce boilerplate for state changes
- ✅ Type-safe and tree-shakeable functions
- ✅ Produce serializable objects and arrays

The helpers are framework-agnostic. They pair naturally with `rxState()`, but
because they are plain immutable updates they also work directly with an Angular
`signal`, for example `mySignal.update((s) => patch(s, update))` or
`myArray.update((a) => insert(a, item))`.

Immutability is explained in the [immutability & serializable state](../../../../concepts/E7-immutability-and-serializable-state.md) concept.

## Import path

```typescript
import { insert, update, remove, upsert, extract, toDictionary, patch, setProp, deleteProp, slice, toggle, dictionaryToArray } from '@rx-angular/cdk/transformations';
```

## Install

```bash
npm install --save @rx-angular/cdk
# or
yarn add @rx-angular/cdk
```

## See also

- Array helpers: [`insert`](./array/insert.md), [`update`](./array/update.md), [`upsert`](./array/upsert.md), [`remove`](./array/remove.md), [`extract`](./array/extract.md), [`toDictionary`](./array/to-dictionary.md)
- Object helpers: [`patch`](./object/patch.md), [`setProp`](./object/set-prop.md), [`deleteProp`](./object/delete-prop.md), [`slice`](./object/slice.md), [`toggle`](./object/toggle.md), [`dictionaryToArray`](./object/dictionary-to-array.md)
- [Edge cases overview](./edge-cases.md)
