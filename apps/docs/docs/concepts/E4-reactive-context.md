---
id: E4-reactive-context
sidebar_position: 4
title: 'The reactive context'
diataxis_type: explanation
package: _site
legacy_guard: false
sidebar_label: 'Reactive context'
tags: [template, cdk, content]
---

# The reactive context

An asynchronous source is more than the values it emits. A stream that fetches a
list, a `Promise` that resolves a user, an `Observable` wired to a websocket:
each one moves through **phases** before, during, and after it produces data. It
starts out with nothing to show, it may fail, and it may finish. The **reactive
context** is the name RxAngular gives to that fuller picture: the emitted value
_together with_ the phase the source is currently in.

A UI has to render every one of those phases, not only the happy value. Users
expect a spinner while data loads, an error message when a request fails, and an
"empty" state when a completed stream produced nothing. These are states the
source itself tells you about, if you model it as a context rather than as a bare
value, rather than after-thoughts bolted onto the value channel.

## The idea

Beyond the value channel (`next`), any reactive source exposes three further
contexts you can derive from it:

- **`suspense`**: the source has not emitted a usable value yet (initial load, or
  a refresh in flight).
- **`error`**: the source threw; it will not emit again.
- **`complete`**: the source finished; it will not emit another value.

Mapping a source to these four states is what turns "a value that might not be
here yet" into a set of template outcomes you can render deterministically:

| Source phase                  | Reactive context | Typical UI                |
| ----------------------------- | ---------------- | ------------------------- |
| not yet emitted / `undefined` | `suspense`       | loading spinner, skeleton |
| emitted a value               | `next`           | the data                  |
| threw                         | `error`          | error message, retry      |
| completed                     | `complete`       | done / empty state        |

The mechanism underneath is **stream materialization**: a notification stream
that carries _which phase_ each emission represents, instead of only the value.
In `@rx-angular/cdk/notifications` this is the `RxNotification` type (a value
tagged with its kind: `suspense` / `next` / `error` / `complete`) and the
`rxMaterialize` operator, which lifts an ordinary `Observable<T>` into an
`Observable<RxNotification<T>>` so the phase travels alongside the value:

```ts
import { rxMaterialize, RxNotification } from '@rx-angular/cdk/notifications';

const source$: Observable<number> = interval(3000);
const materialized$: Observable<RxNotification<number>> = source$.pipe(rxMaterialize());
```

Once a source is expressed this way, a directive can read the tag and pick the
right piece of template: no hand-rolled flags, no juggling three parallel
booleans. That is what the reactive template directives do. `rxLet` and
`rxIf` derive the context and surface it two ways:

- **Context templates**: a dedicated `ng-template` per phase, which the directive
  swaps in as the phase changes. Conceptually, one source drives four slots:

  ```html
  <ng-container *rxLet="value$; let value; suspense: loading; error: error; complete: done"> {{ value }} </ng-container>

  <ng-template #loading>Loading…</ng-template>
  <ng-template #error>Something went wrong.</ng-template>
  <ng-template #done>Nothing to show.</ng-template>
  ```

- **Context variables**: the phase exposed as a flag to branch on inline. The
  shape is `RxViewContext<T>`: the value under `$implicit`, plus `suspense`,
  `complete`, and `error` (the last carrying either a boolean or the thrown
  `Error`).

The two surfaces differ in one subtlety: on **initial
render**, a bare `undefined` shows the `suspense` _template_ but renders _nothing_
for the `suspense` _variable_. A value wrapped in a source that has not emitted
(for example an `Observable` that started with `undefined`, or a pending
`Promise`) resolves to `suspense` in both. The exact per-value behaviour belongs
to the directive reference pages, not here.

## Trade-offs / context

The reactive context is the piece of RxAngular's template layer with the clearest
independent value, and the _why_ is worth being precise about, because modern
Angular has narrowed the gap.

Native control flow now covers a large part of this. `@if`/`@switch` handle the
value-vs-empty branching cleanly, and `@defer` ships built-in `@loading`,
`@error`, and `@placeholder` blocks for deferred content. `AsyncPipe` works under
zoneless change detection (the default since Angular v21): it notifies change
detection on emission, so the old "the `async` pipe is broken without zones"
framing is no longer true. For a simple load-or-show case, native control flow
plus `AsyncPipe` (or `toSignal()`) is the right default; see
[Understanding change detection in Angular](./E1-change-detection.md) for how that
rendering works.

What the reactive context still buys you is a **single, uniform model for all four
phases of one source**. Instead of composing `*ngIf`/`@if` chains, a nested
`@switch` on a separate "is it loading or errored" stream, and a manual
`startWith(undefined)`, you bind one source and get `suspense` → `error` →
`complete` → `next` as named, typed outcomes, with the phase derived from the
stream itself rather than reconstructed from side channels. That uniformity is the
mental model; the typed `RxNotification` / `RxViewContext` surface and the
`rxMaterialize` operator are the machinery that makes it hold. It earns its place
where a component juggles reactive, multi-phase sources, not where a
single `@if` would do.

## Referenced by

The following pages lean on this concept and link in to it:

- **`rxIf` directive**: derives the reactive context to pick a per-phase template
  or variable.
- **`rxLet` directive**: the canonical consumer of the suspense/error/complete
  context.
- **Notifications (`@rx-angular/cdk/notifications`)**: the `RxNotification` /
  `rxMaterialize` primitives this context is built on.
- **Tutorial: Loading / error / empty states the reactive way (T4)**: teaches
  wiring one async source to all four states.
