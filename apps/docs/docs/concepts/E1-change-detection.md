---
id: E1-change-detection
title: "Understanding change detection in Angular"
diataxis_type: explanation
package: _site
legacy_guard: false
sidebar_label: "Change detection"
tags: [template, cdk, content]
---

# Understanding change detection in Angular

Change detection is the process Angular uses to decide _which parts of the DOM
to update_ after something in your application changes. Most of the time it is
invisible. RxAngular's template and render-strategy tooling exists because, for
interaction-rich and data-heavy UIs, the default process does far more work than
the change requires: it _over-renders_. This page explains why that happens and
where signals, `OnPush`, and RxAngular's fine-grained rendering fit.

## The idea

Angular's change detection is organized as a **tree of components**. When a
change happens, Angular walks that tree and, for each component it visits,
re-evaluates the component's template bindings and updates the DOM where a bound
value differs. The unit of this work is a **whole component template**: the
smallest thing Angular can re-check is one component's view, not an individual
binding inside it.

The historically important detail is _what triggered the walk_ and _how much of
the tree it covered_.

- **The default check is coarse.** When change detection runs without `OnPush`,
  Angular re-evaluates the component where the change was introduced **and every
  component on the path down**, marking a dirty path and re-checking each view on
  it. A single value change high in the tree can cause a large subtree to be
  re-evaluated, even though most of those components had nothing change.
- **The unit is the template, not the binding.** Even a targeted
  `ChangeDetectorRef.detectChanges()` re-evaluates the _entire_ template of that
  component. For a component that renders a large list or an interactive
  surface, re-checking the whole template on every update is often more work than
  the frame budget allows, and it shows up as jank or a poor
  [INP (Interaction to Next Paint)](https://web.dev/articles/inp) score.

The consequence is **over-rendering**: components get re-evaluated (and sometimes
re-rendered) far more often than their own data changed. On fast hardware this is
invisible; on lower-end devices, or in dynamic UIs with frequent updates, it is
the difference between a smooth application and an unusable one.

### Where the "async pipe is broken" story came from

A related, widely-repeated framing is that binding reactive sources with the
`async` pipe is inefficient, and that developers are pushed toward an
`*ngIf`/`async` workaround to read a stream's value in the template. The kernel of
truth is real: reading the same observable through multiple `async` pipes creates
redundant subscriptions, and, under the older Zone.js-driven model, an
emission marked the component _and all its ancestors_ dirty, then waited for a
global `ApplicationRef.tick()` to re-check the tree top-to-bottom. That global,
brute-force re-check is the over-rendering described above, surfacing through the
pipe.

The modern correction: this is a **change-detection** problem, not an
`AsyncPipe` defect. `AsyncPipe` calls `markForCheck` on emission and is a valid
notifier even under zoneless change detection. RxAngular's `rxLet`, `rxFor`, and
`rxIf` earn their place by changing the _granularity_ of the update (see below)
and adding a [reactive context](./E4-reactive-context.md) (suspense / error /
complete) that the plain pipe has no notion of.

## How it works, and what modern Angular changed

Two shifts in modern Angular reshape this picture, and RxAngular is now positioned
_relative to them_ rather than as a workaround for the old model.

**Zoneless is the default.** As of v21, Angular runs change detection
**zoneless by default** and Zone.js is dropped from the default bundle. Instead of
Zone.js monkey-patching every event, timer, and promise to guess "something might
have changed, re-check everything," notification is now explicit: signals that are
read in a template register a dependency and schedule a check when they change;
`markForCheck` (called for you by `AsyncPipe`, `rxLet`, and friends) flags a view
as needing a check. Notification became **push-based and targeted**, where a change
announces itself to exactly the views that depend on it, rather than a global
Zone-driven sweep. The history of _why_ Zone.js drove change detection and
what the residual zone tooling is for is covered in
[Zoneless & how Zone.js affected change detection](./E2-zoneless-and-zonejs-change-detection.md).

**Signals and `OnPush` narrow the walk.** `OnPush` tells Angular to skip a
component's subtree unless it is explicitly marked dirty (an input reference
changed, an event fired in it, or `markForCheck` was called). Signals go further:
a signal read in a template ties that specific binding to that specific signal, so
when the signal changes Angular knows _which_ views depend on it. Together they
turn the default "re-check the dirty path" into "re-check only what depends on the
change." For **local component state, signals are the default tool**: reach for
`signal()` and `computed()` first; RxAngular's state layer complements them for
shared, derived, and async-heavy cases
(see [Reactive state: global vs local](./E3-reactive-state-global-vs-local.md)).

**Where RxAngular still moves the needle.** Even with zoneless + signals + `OnPush`,
the smallest unit Angular checks is a component template. RxAngular's template
directives push the unit down to the **`EmbeddedView`**, the individual row or
branch a structural directive owns, so an update to one item in a large live list
re-renders _that item_, not the whole list's template. On top of that, render
strategies let that work be **scheduled**: sliced across frames and prioritized
against the frame budget, instead of run synchronously in one blocking pass. That
scheduling capability has no native Angular equivalent and is explained in
[Concurrent scheduling & the frame budget](./E5-concurrent-scheduling.md).

The mental model for a modern app is layered: **signals + `OnPush`** decide
_whether_ a view is checked; **RxAngular's directives** shrink the _unit_ of the
check to the `EmbeddedView`; **render strategies** decide _when_ that work runs.

## Trade-offs / context

- **Default change detection trades control for convenience.** The old
  Zone-driven, re-check-everything model was convenient (you rarely had to think
  about _when_ rendering happened) at the cost of doing far too much work. The
  modern zoneless/signals model reverses that trade: notification is explicit, so
  the framework does much less unrequested work, but you (and your reactive
  primitives) are now responsible for signalling change correctly.
- **Reach for fine-grained rendering when the template unit is too coarse.**
  Signals and `OnPush` are enough for most components. The `EmbeddedView`-level
  directives and render strategies earn their complexity when a single template
  re-check is too expensive: large frequently-updating lists, virtualized
  viewports, and surfaces where you must stay within a frame budget. For a simple
  component, they are over-engineering.
- **Over-rendering is a measurement problem first.** Whether the default check is
  "too much" depends on template size, update frequency, and target hardware, so
  the fix is a set of tools you apply where the profiler points, not a blanket
  replacement of Angular's rendering.

## Referenced by

The following pages lean on this concept as their shared "why is this slow / why
does Angular over-render" hub _(back-links wired in Phase C)_:

- CDK render-strategies overview
- CDK basic strategies _(page retired; its salvage pointer resolves here)_
- CDK strategies (custom strategies)
- CDK concurrent strategies
- Template `rxFor` directive
- Template `rxIf` directive
- Template `rxLet` directive
- Template virtual scrolling
- Template push pipe
- Tutorial: Render a large live list without jank (T2)
- Tutorial: Loading / error / empty states the reactive way (T4)

## See also

- [Zoneless & how Zone.js affected change detection](./E2-zoneless-and-zonejs-change-detection.md)
- [Reactive state: global vs local, RxState + signals](./E3-reactive-state-global-vs-local.md)
- [The reactive context (suspense / error / complete)](./E4-reactive-context.md)
- [Concurrent scheduling & the frame budget](./E5-concurrent-scheduling.md)
