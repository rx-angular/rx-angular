---
id: E7-immutability-and-serializable-state
sidebar_position: 7
title: 'Immutability & serializable state'
diataxis_type: explanation
package: _site
legacy_guard: false
sidebar_label: 'Immutability & serializable state'
tags: [cdk, state, content]
---

# Immutability & serializable state

When you update state in modern Angular, _how_ you produce the new value matters as
much as _what_ the new value is. Change detection under signals and `OnPush`, the
safety of the `@rx-angular/cdk/transformations` helpers, and your ability to
serialize, log, and time-travel through state all rest on one discipline: never
mutate state in place. Replace it with a new value. This page explains why that
discipline matters and how the transformation helpers embody it, so the individual
helper pages can state their guarantee in one line and point here for the reasoning.

## The idea

### Why immutability matters

Angular decides whether a view needs re-rendering by comparing references. Under
`OnPush` change detection and under signals (the zoneless-by-default model of modern
Angular, v21) a value is considered "changed" when it is a **different object than
before**, not when its contents happen to differ. Signal equality works the same way:
`signal.set()` and `signal.update()` skip notification when the new value is
referentially equal to the old one.

That model has a sharp consequence. If you mutate an object or array in place
(`state.items.push(item)`, `state.user.name = 'new'`) the reference does not change.
As far as change detection and signal equality are concerned, _nothing happened_: the
view does not update, `computed()` values do not recompute, and effects do not fire.
The bug is silent, because the data did change; only the signal that a change
occurred was lost. The reliable way to avoid it is to treat state as **immutable**:
each update returns a new container, so a new reference always flows through, and
change detection always sees it.

Immutability also underpins a second property the docs lean on: **serializable
state**. State is serializable when it is a plain tree of data (objects, arrays, and
primitives) with no hidden mutation, no shared mutable references escaping into
places that can change them behind your back, and no non-serializable members
(functions, class instances, circular links). Serializable state is what makes it
possible to `JSON.stringify()` a snapshot for logging, persist it to storage, send it
across a boundary, compare two snapshots for equality, or replay a sequence of states
in a debugger. Every in-place mutation erodes that property; every immutable update
preserves it.

### The transformation helpers are the ready-made immutable operations

Writing immutable updates by hand is repetitive and easy to get subtly wrong:
spreading the wrong level, forgetting to copy a nested array, mutating during a map.
The `@rx-angular/cdk/transformations` helpers exist to do it correctly and once. Every
helper, the array operations (`insert`, `update`, `remove`, `upsert`, `extract`,
`toDictionary`) and the object operations (`patch`, `setProp`, `deleteProp`, `slice`,
`toggle`, `dictionaryToArray`), is **pure and immutable**: it performs a **shallow
copy** of the container it touches and returns that new value, and it never mutates the
input you passed in.

Because a helper always returns a fresh reference and never disturbs the original, its
output is exactly what change detection wants and exactly what a signal or `RxState`
update expects. That is why the same operation reads cleanly in both worlds:

```typescript
// With a signal — update() receives the old state, returns a new one
profile.update((state) => patch(state, { name: 'Fluffy' }));

// With rxState() — the same pure helper folds a source into new state
connect(changeName$, (state, name) => patch(state, { name }));
```

In both cases the helper hands back a new object; the surrounding machinery sees a new
reference and re-renders. The transformation Reference pages carry the operation-specific
detail and link back to this concept for the _why_.

### The shallow boundary: the load-bearing caveat

The copy the helpers make is **shallow**. Only the container they touch is cloned: the
array itself, or the top level of the object. **Nested references are shared between the
input and the output.** After `const next = patch(state, { name })`, `next` is a new
object, but `next.address` is the _same_ address object as `state.address`.

This is the single most important correctness note on the page, because it is where the
immutability guarantee can be defeated. If you reach _through_ the returned
value and mutate a nested member (`next.address.city = 'Berlin'`) you have mutated the
original too, and you are back to the silent-no-update bug: the top-level reference
changed, but the nested object it points at was altered in place. Immutable updates have
to go **all the way down** to whatever level you are changing. To change a nested slice,
transform that slice and thread the new reference upward:

```typescript
// ✅ new object at every level you change
patch(state, { address: patch(state.address, { city: 'Berlin' }) });

// ❌ shares state.address, then mutates it in place
const next = patch(state, { name });
next.address.city = 'Berlin';
```

The shallow copy is a deliberate performance choice (deep-cloning every update would be
wasteful when most of the tree is unchanged) and it is correct as long as you never
mutate through a shared reference. Structural sharing of the untouched parts is a
feature, not a leak; the discipline is to produce a new reference for every level
you actually touch.

### Where deep clone and deep equality fit

Occasionally you genuinely need a fully independent copy: a true snapshot with no shared
nested references. For serializable state, the native
[`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)
covers most deep-clone needs, and a targeted spread (`{ ...orig }`, or mapping nested
arrays) covers the rest. Deep-cloning tools from general-purpose libraries (Lodash's
`cloneDeep` is the common one) are a costly operation and worth avoiding when a native
path exists; the `prefer-no-lodash-clone-deep` lint rule flags them for exactly that
reason.

The mirror image is comparison. Because state is serializable, you rarely need a
general deep-equality routine over arbitrary objects. Prefer comparing the fields that
matter, or a `JSON.stringify` comparison for serializable state, over
deep-structural equality, again a costly operation on arbitrary graphs, which the
`prefer-no-lodash-is-equal` rule flags. This dovetails with the custom equality functions
that signals and `RxState` accept: a cheap, purpose-built comparison keyed to your state
shape is almost always the right tool over a generic deep walk.

## Trade-offs / context

Immutability is a discipline, not a guarantee the language enforces. TypeScript will not
stop you from writing `state.items.push(...)`; nothing at runtime freezes the objects the
helpers return. The value of routing every update through a pure helper, or through
`signal.update()` and `RxState.set()` with a pure transform, is that the discipline
becomes the default path rather than something you have to remember on each edit. The cost
is a habit shift for developers used to mutating objects freely, and a small amount of
copying on each update. In exchange you get change detection that never silently misses an
update, state you can serialize and compare cheaply, and a debugging story where every
past state still exists because nothing overwrote it in place.

This concept sits underneath [reactive state](./E3-reactive-state-global-vs-local.md):
whether a piece of state is a plain signal or an `RxState`-derived signal, it is driven by
reference-based change detection, so both depend on updates producing new references. The
transformation helpers are _implemented_ in `@rx-angular/cdk`, the low-level helper layer,
but users almost always meet them while updating State (folding a source into `rxState()`
or updating a signal) which is why this concept is documented from the State journey even
though its machinery lives in the CDK.

## Referenced by

- [Transformations overview](../packages/cdk/reference/transformations/index.md): the
  `@rx-angular/cdk/transformations` landing.
- [Edge cases](../packages/cdk/reference/transformations/edge-cases.md): the shared
  edge-case behavior of the helpers.
- Array helpers:
  [`insert`](../packages/cdk/reference/transformations/array/insert.md),
  [`update`](../packages/cdk/reference/transformations/array/update.md),
  [`remove`](../packages/cdk/reference/transformations/array/remove.md),
  [`upsert`](../packages/cdk/reference/transformations/array/upsert.md),
  [`extract`](../packages/cdk/reference/transformations/array/extract.md),
  [`toDictionary`](../packages/cdk/reference/transformations/array/to-dictionary.md).
- Object helpers:
  [`patch`](../packages/cdk/reference/transformations/object/patch.md),
  [`setProp`](../packages/cdk/reference/transformations/object/set-prop.md),
  [`deleteProp`](../packages/cdk/reference/transformations/object/delete-prop.md),
  [`slice`](../packages/cdk/reference/transformations/object/slice.md),
  [`toggle`](../packages/cdk/reference/transformations/object/toggle.md),
  [`dictionaryToArray`](../packages/cdk/reference/transformations/object/dictionary-to-array.md).
- [`prefer-no-lodash-clone-deep`](../packages/eslint-plugin/reference/prefer-no-lodash-clone-deep.md):
  the eslint rule that flags costly deep clones in favor of `structuredClone` /
  targeted spreads.
- [`prefer-no-lodash-is-equal`](../packages/eslint-plugin/reference/prefer-no-lodash-is-equal.md):
  the eslint rule that flags costly deep-equality checks in favor of field or
  `JSON.stringify` comparison.

## See also

- [Reactive state: global vs local, RxState + signals](./E3-reactive-state-global-vs-local.md):
  where immutable updates are applied: signals and `RxState` both drive rendering off
  reference-based change detection.
