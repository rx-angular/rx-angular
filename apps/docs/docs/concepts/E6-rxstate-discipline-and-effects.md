---
id: E6-rxstate-discipline-and-effects
sidebar_position: 6
title: 'RxState reactive discipline & effects'
diataxis_type: explanation
package: _site
legacy_guard: false
sidebar_label: 'RxState discipline & effects'
tags: [state, eslint-plugin, content]
---

# RxState reactive discipline & effects

RxState comes with a discipline about _how_ state is read, derived, and acted
upon, beyond being a place to put state. Most of the friction people hit with it
comes from ignoring that discipline: setting a value inside a stream that could
have connected it, storing a derived number that a selection would have computed,
running a side effect from a click handler that a declared effect would have owned.
This page explains the reasoning underneath those rules, the "why" that the
[`no-rxstate-*` lint rules](../packages/eslint-plugin/reference/no-rxstate-imperative-in-reactive.md)
enforce and the [`rxEffects`](../packages/state/reference/rx-effects-api.md) API
embodies. It is conceptual: no step-by-step, no API surface. Once the
mental model is in place, the individual guides and rules read as consequences of it.

## The idea

### Pure functions and side effects: the split everything rests on

Two terms carry the whole model.

A function is **pure** when its return value depends only on its arguments and its
evaluation produces no observable change anywhere else. `add(a, b) => a + b` is
pure: same inputs, same output, and nothing in the world is different afterward. A
function is **referentially transparent** when you could replace a call to it with
its result and the program would behave identically, which is what purity
buys you.

A **side effect** is the opposite: a modification of state _outside_ the local
function scope, or any interaction with the world beyond returning a value, such as
writing to the DOM, issuing a network request, logging, navigating, or persisting to
storage. Side effects are not bad; an application that never touched the outside
world would do nothing. The discipline is not "avoid side effects"; it is **keep
the pure part pure and make the impure part explicit**, so you always know which
is which and where each one lives.

Modern Angular already gives you the pure side by construction. A `computed()`
signal is pure and auto-memoized: it derives a value from other signals, re-runs
only when they change, and is glitch-free by design. RxState's job is to be honest
about the _other_ side: to give the impure work a declared, torn-down home instead
of letting it scatter across constructors, click handlers, and stray
subscriptions. The rest of this page is one question applied in three
places, **is this work pure derivation, or is it an effect?**, and then routing
each to the tool built for it.

### Derive, don't store

The first place the split shows up is derivation. If a value can be computed from
state you already hold, it is derived data, and derived data should be _derived_,
not _stored_. Storing it duplicates a source of truth: now two keys can disagree,
and every update has to remember to keep them in sync. Deriving it means there is
exactly one place the value comes from, and it can never drift.

Concretely: keep only source-of-truth state in the container, and produce the rest
on read. In-component, that read is a native `computed()` over a signal. In the
reactive pipeline, when the derivation composes several observable sources or
feeds a `connect`, it is a selection operator like
[`select` / `selectSlice`](../packages/state/reference/select-slice.md) or
[`stateful`](../packages/state/reference/stateful.md). The choice between them is
not stylistic: use the signal read when the derivation is a plain in-component
value, and stay in the RxJS pipeline when you are merging multiple streams. Either
way the principle is the same: **there is one source of truth, and derived values
are functions of it, never copies of it.**

### The pipeline is disciplined by construction

When derivation does live in the reactive pipeline, RxState does not leave the
guarantees to you. The accumulation pipeline that `connect` feeds enforces two of
these invariants directly (distinct via `distinctUntilChanged`, shared-and-replayed
via `publishReplay`). The third — the **defined** guarantee that filters
`undefined` — is enforced by the `stateful` operator, which `select` applies on the
read path. So the full set of invariants is only in effect when you read state
through `select`:

- **distinct**: consecutive duplicate states are dropped, so downstream work does
  not re-run for a value that did not change;
- **defined**: `undefined` is filtered out, which keeps state lazy: consumers see
  a value only once there is one;
- **shared and replayed**: one execution is reused across all subscribers, and a
  late subscriber immediately receives the current value.

This is the pipeline-side equivalent of what signals give you in-component. A
signal is glitch-free and auto-memoized; connected RxState is distinct, lazy, and
shared. In both worlds the framework guarantees that reads are
consistent and cheap, which is _why_ connecting a source is preferable to
manually subscribing and setting: connected state is disciplined the moment it
exists, and hand-rolled subscriptions are not.

### Effects belong in `rxEffects`, not in state and not in the template

The impure side needs a home too, and that home is
[`rxEffects`](../packages/state/reference/rx-effects-api.md), not the state
container, and not the template.

The reasoning is about ownership of a lifecycle. A side effect triggered by a
stream (a delete request fired on a click, a navigation on a route change, a write
to `localStorage` on a preference change) has a subscription that must be created
once and torn down exactly when its host is destroyed. Scatter those subscriptions
across click handlers and lifecycle hooks and you own that bookkeeping by hand:
`subscribe`, `takeUntil(destroy$)`, `ngOnDestroy`. `rxEffects` owns it for you. You
`register` a source and its effect in one place, and the subscription is bound to
the injection context's `DestroyRef`: created at init, cleaned up on destroy, with
no manual teardown. An error in one effect is forwarded to Angular's `ErrorHandler`
and does not tear down its siblings.

There is a matching boundary with signals. When the trigger is an **Observable or
Promise**, the effect belongs in `rxEffects`. When it reacts to a **`signal()`**,
Angular's native `effect()` is the right tool. The dividing line is the shape of
the trigger, not a preference; the two are complements, exactly as RxState and
signals are on the state side ([see E3](./E3-reactive-state-global-vs-local.md)).

### One declared channel per event

The same "make it explicit, own its lifecycle" instinct applies to the events that
_drive_ state and effects. The undisciplined pattern is a scatter of raw `Subject`s
across a component, each subscribed and cleaned up ad hoc, with value-extraction
logic ( `$event.target.value`, and the like) repeated at every call site: once in
the template, once again where the class triggers the same channel programmatically.

The disciplined pattern is a single **declared action channel** per event. One
declaration turns each event into both a dispatchable setter _and_ a readable
stream, so template events and programmatic calls flow through the same channel;
input transforms normalize the raw event into its meaningful value in **one place**,
the way an Angular `Input` transform does; and cleanup is automatic. The payoff is
not terseness for its own sake; it is that there is now exactly one place where
every event, its transform, and any effect bound to it are declared, rather than a
diffuse web of subjects you have to trace by hand.

### Imperative and reactive can mix, but usually shouldn't

RxState deliberately supports both an imperative surface (`get`, `set`) and a
reactive one (`connect`, and the class-era `hold`). Both are legitimate. What is a
smell is **mixing them in the wrong direction**: reaching for the imperative
methods _inside_ a reactive context. Calling `set` inside a stream, for instance,
is almost always a `connect` written the long way: you have a source Observable and
you are manually pushing each emission into state instead of declaring the
connection once. The declarative form is not merely tidier; it inherits the
distinct/lazy/shared guarantees above, which the imperative version throws away.

This is the point the linter mechanizes. It is a judgment call (there
are cases where an imperative `set` in a stream is the honest expression of intent)
but the default should be declarative, and the rule flags the default violations
so the exceptions are conscious ones.

## Trade-offs / context

The discipline has a cost, and it is worth naming. Routing everything through
declared channels, connected sources, and registered effects is more ceremony than
a handful of `Subject`s and an `ngOnDestroy`; for a trivial component it can feel
like overhead with no payoff. It earns its keep as a component's reactivity grows:
the point at which you are tracking several subscriptions by hand, syncing a
derived value you forgot to update, or chasing a leak from a subscription that
outlived its view is exactly the point the discipline was designed for. On a
two-field form it is overkill; on a data-heavy, stream-fed component it is what
keeps the thing tractable.

It is also worth being clear that these are guidelines with escape hatches, not
laws. The
[`no-rxstate-subscriptions-outside-constructor`](../packages/eslint-plugin/reference/no-rxstate-subscriptions-outside-constructor.md)
rule, for example, ships an `allowedMethods` option precisely because a residual
case sometimes needs to subscribe from `ngOnInit`. The rules encode the _default_,
and a good default is one you override deliberately and rarely, not one you
disable because it was inconvenient once.

Finally, a note on where this sits relative to modern Angular. Everything here
assumes the same rendering model as the rest of the docs: signals drive change
detection, `computed()` owns pure in-component derivation, `effect()` owns
signal-triggered effects. RxState's discipline is not a competing paradigm; it is
the same pure/impure split, applied to the observable-and-shared-state cases where
signals alone are an awkward fit ([see E1 for the change-detection ground beneath
both](./E1-change-detection.md)). Read that way, the `no-rxstate-*` rules and the
`rxEffects` API are not arbitrary house style; they are what "keep the pure part
pure and make the impure part explicit" looks like once it is written down.

## Referenced by

- [Manage actions with `rxActions`](../packages/state/how-to/manage-actions.md):
  the how-to for declaring event channels.
- [Manage side effects with `rxEffects`](../packages/state/how-to/manage-effects.md):
  the how-to for registering and tearing down effects.
- [Derive a view model](../packages/state/how-to/derive-a-view-model.md): pipeline
  vs. `computed()` derivation.
- [Refactor to `rxEffects`](../packages/state/how-to/refactor-to-rx-effects.md):
  the `Observable`-vs-`signal` effect boundary in practice.
- [RxState best practices](../packages/state/how-to/best-practices.md): where the
  reactive-discipline rationale is summarized.
- [`rxActions` Reference](../packages/state/reference/rx-actions-api.md): the
  actions API this concept explains the reasoning for.
- [`rxEffects` Reference](../packages/state/reference/rx-effects-api.md): the
  effects API this concept explains the reasoning for.
- [`stateful` Reference](../packages/state/reference/stateful.md): the operator
  whose distinct/lazy/shared guarantees are described here.
- [`no-rxstate-imperative-in-reactive`](../packages/eslint-plugin/reference/no-rxstate-imperative-in-reactive.md):
  the lint rule mechanizing the imperative-in-reactive smell.
- [`no-rxstate-subscriptions-outside-constructor`](../packages/eslint-plugin/reference/no-rxstate-subscriptions-outside-constructor.md):
  the lint rule mechanizing the subscribe-once-at-init discipline.
- [Tutorial T1 — Your first reactive state with RxState](../tutorials/T1-your-first-rxstate.md):
  links here as a Next-step.

## See also

- [Reactive state: global vs local, RxState + signals](./E3-reactive-state-global-vs-local.md):
  when to reach for RxState over signals at all; the derive-don't-store and
  effect-boundary lines meet the state-shape question there.
- [Understanding change detection in Angular](./E1-change-detection.md): the
  rendering model beneath both signals and RxState, and why derived reads need to
  stay consistent and cheap.
