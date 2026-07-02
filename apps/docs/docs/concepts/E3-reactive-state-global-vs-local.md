---
id: E3-reactive-state-global-vs-local
title: "Reactive state: global vs local, RxState + signals"
diataxis_type: explanation
package: _site
legacy_guard: false
sidebar_label: "Reactive state: global vs local"
tags: [state, content]
---

# Reactive state: global vs local, RxState + signals

State is the data your UI reads and reacts to. The first question is not _which
library_ but _what kind of state you have_, because in modern Angular the answer
decides which tool fits. Angular signals are the default for state that lives and
dies with a component; RxState earns its place where state is shared, derived from
many sources, or driven by asynchronous streams. This page explains that split so
the rest of the docs can assume it.

## The idea

### Local state: signals are the default

Local state is **dynamic and bound to a component, directive, or service** that is
created and destroyed over time. When its owner is destroyed, the state is no longer
needed. Local state is only ever shared with children, and it is nearly always fed by
`@Input` bindings, UI events, component-level side effects, or a slice of global state
parsed down for the view.

For this kind of state, **Angular signals are the default**. A writable signal holds a
value, a computed signal derives one, and a locally writable derived value has its own
signal primitive too; the surface stays small because the local case rarely needs more.
Signals are glitch-free, auto-memoized, and auto-tracked by change detection. Under the
zoneless-by-default model of modern Angular (v21), reading a signal in a template is all
the wiring a view needs. A counter, an `isExpanded` flag, a filter box: these are signal
state, and RxState is not required to model them.

### Global state, and the async, multi-source middle

Global state is **static across the app lifetime** and, beyond lazy instantiation,
never gets destroyed. It is shared broadly, in Angular almost always through a
root-provided singleton service, and it typically processes **external sources**:
REST APIs, WebSockets, the browser URL.

Between "trivially local" and "obviously global" sits the state that signals model
awkwardly: several asynchronous sources merged into one shape, loading/error flags
derived from an in-flight request, updates that depend on the previous state, or a
view-model stitched from inputs, streams, and a store. This is where **RxState
complements signals**. Its role is to fold many observable sources into one state
object, to accept direct imperative updates, and to derive across synchronous and
asynchronous work alike, then to expose the result back to the template as a signal, so
the consuming view stays signals-first. Held in a root-provided service, the same
primitive becomes your global store.

The positioning is deliberate: **RxState is not a replacement for signals.** It is the
complement for global or shared state, complex derived state, and async-heavy
orchestration, bridged into signals rather than standing apart from them.

### The two questions that separate the cases

Two questions usually distinguish which kind of state is in play:

- Does this data need to live for the whole lifetime of the application?
- Do other parts of the app (other views, for instance) care about this state?

When both answers are "no," the state is almost certainly local, and signals model it
natively. When either is "yes," or the data arrives as a merge of asynchronous streams,
that is where RxState complements the signal surface.

### A worked example

Consider a todo app with two views. A **To-do** view renders a list of `tasks` still to
complete plus a `counter` of how many are left, and each list can be expanded or
collapsed via an `isExpanded` flag. A **Setup** view renders all existing `tasks` with a
`counter` of the total, and its own `isExpanded`.

- `counter` is **local** to each view; its value is specific to that view. A `signal()`
  (or a `computed()` over the task list) models it.
- `isExpanded` is **local** too. Both lists expand and collapse independently; neither
  cares about the other's state. Again, a signal.
- `tasks` is **global**. Both views need the same array from the same endpoint, and
  loading it twice would be waste. This is the moment to introduce a shared layer: a
  root-provided RxState service that fetches once, holds the array, and exposes it as a
  signal both views read.

The counter and the flag never leave their component; the task list, an async source
shared across views, is exactly the case RxState is built for.

## Trade-offs / context

This split matters now because Angular's own state story has caught up.
Signals cover the local case natively and ergonomically, so reaching for a reactive
state library _by default_ is no longer the right instinct: it adds surface area a
plain `signal()` would not. The value RxState still delivers is concentrated at the
other end: coordinating many asynchronous sources, deriving across them, and sharing the
result app-wide, all while handing a signal back to the view.

Reading it the other way matters as much. If you find yourself using RxState only to
hold a single local value with no async source and no sharing, a signal is the simpler
choice. If you find yourself hand-rolling multi-source merges, loading/error derivation,
or a shared store out of raw signals and RxJS, that is the signal to let RxState carry the
orchestration and bridge the result back into signals.

Both of these live under the same change-detection model. Whether state is a signal or an
RxState-derived signal, it is a signal read that drives rendering under zoneless Angular,
so the [change-detection story](./E1-change-detection.md) is shared ground beneath both.

## Referenced by

_(back-links wired in Phase C; the pages below will link in to this concept once their
REPOSITION / `<SignalsFirst>` edits land.)_

- `state.mdx`: the `@rx-angular/state` landing, via the `<SignalsFirst>` note.
- Getting Started: the state getting-started guide, via the `<SignalsFirst>` note.
- Determine state type: the global-vs-local recipe whose prose this concept absorbs.
- Start Here: the site landing's signals-first positioning section.
- Tutorial T1: "Your first reactive state with RxState (alongside signals)," as a
  Next-step link.
