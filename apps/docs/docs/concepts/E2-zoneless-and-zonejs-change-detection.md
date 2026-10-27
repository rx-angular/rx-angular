---
id: E2-zoneless-and-zonejs-change-detection
sidebar_position: 2
title: 'Zoneless & how Zone.js affected change detection'
diataxis_type: explanation
package: _site
legacy_guard: false
sidebar_label: 'Zoneless & Zone.js'
tags: [cdk, eslint-plugin, content]
---

# Zoneless & how Zone.js affected change detection

For most of Angular's history, an application did not decide _when_ to re-render.
Zone.js decided for it. Since Angular v21, change detection is **zoneless by
default** and Zone.js is dropped from the default bundle, which removes the ground
that a large body of RxAngular's zone tooling was built on. This page explains how
Zone.js drove change detection, why the default changed, and what the remaining
zone utilities are _for_ now: a narrow legacy and brownfield audience, not new
work.

## The idea

### How Zone.js drove change detection

Zone.js was loaded as a polyfill early in the bootstrap, and it monkey-patched
almost every asynchronous browser API (`setTimeout`, `setInterval`,
`requestAnimationFrame`, event listeners, XHR) along with the RxJS schedulers
that sit on top of them. Each patched API kept a reference to the original,
un-patched function under a `__zone_symbol__`-prefixed key on `window`; the
patched version wrapped it so that Angular could be notified whenever such an API
fired.

The consequence was a blunt rule: **every time a patched async API
completed, Angular ran change detection**. Any browser event, any timer, any
resolved XHR, was a "something may have changed" signal, and Angular responded by
marking the tree dirty and running `ApplicationRef.tick()` to re-check and
re-render. This is what made the framework feel automatic (you mutated a field in
an event handler and the view updated without you asking), and it is the exact
mechanism [E1 describes as the source of over-rendering](./E1-change-detection.md).

The cost is that the signal is far too broad. In a large application you rarely
need the _whole_ tree re-checked on _every_ event. A stream of high-frequency
events (scroll, mousemove, a timer, a chatty XHR layer) each triggered a full
change-detection pass, most of which produced no visible change. The RxAngular
zone tooling existed to _narrow_ that signal.

### What the zone tooling narrowed, and how

Three related ideas made up the RxAngular answer, and all three are downstream of
the same "Zone.js re-renders on every patched API" premise.

**Zone flags (`@rx-angular/cdk/zone-configurations`).** Rather than turn Zone.js
off wholesale (an all-or-nothing step that tends to break an existing app), zone
flags let you tell Zone.js _not to patch_ specific API families: the XHR flag, the
timer flags, the event flags, `requestAnimationFrame`. Turning a flag off means
that API no longer schedules a change-detection run. The package wrapped the raw
`window`-property configuration that Angular exposed in a typed, asserted,
autocompleting helper, so you could disable patching one controllable API at a
time and verify nothing broke before moving to the next.

**Un-patched APIs (the zone-less utilities).** Where zone flags act globally, the
zone-less utilities act at a single call site. The underlying primitive is
`getZoneUnPatchedApi` (its supported home today is
`@rx-angular/cdk/internals/core`), which reaches through the `__zone_symbol__`
reference to hand you the _original_ browser function. Calling that original,
rather than injecting `NgZone` and wrapping the call in `runOutsideAngular`, runs
the async work without ever notifying Zone.js, and therefore without triggering
change detection, but with less ceremony and indirection than the `NgZone`
approach.

**Coalescing (`@rx-angular/cdk/coalescing`).** Even when you _do_ want a render,
you rarely want one per emission. Coalescing merges multiple change signals that
land within a short duration into a single render. Angular already used this idea
internally (it delays the `markForCheck` calls that arrive within one animation
frame and runs `ApplicationRef.tick()` once for all of them), and the
`ngZoneEventCoalescing` bootstrap flag applied the same merge to zone-bound
events. RxAngular's `coalesceWith` operator exposed the technique as a general
RxJS operator you could apply anywhere, scoped (via a per-subscription flag keyed
to, for example, a component) so that many sources feeding the same component
still produce exactly one render. `coalesceWith` takes a `durationSelector`
`Observable` whose first emission closes the coalescing window; you supply any
Observable as the durationSelector, a common choice being a microtask-based
Observable such as `from(Promise.resolve())`.

All three are the same move seen from three distances: **stop letting an
overly-eager zone re-render the whole app on every async event.**

### Why zoneless-by-default changed the ground

Angular's move to signals and, in v21, to **zoneless change detection by default**
replaces the "re-render on every patched async API" model with a targeted one:
reading a signal in a template creates a dependency, and writing that signal marks
_exactly_ the views that read it for check. There is no global "something might
have changed" broadcast to suppress, because the framework no longer emits one.
Zone.js is no longer in the default bundle at all.

This inverts the value of the zone tooling. When over-rendering is caused by
Zone.js patching everything, tools that un-patch, flag, and coalesce that patching
are load-bearing. When the framework tracks changes precisely at the signal level,
there is nothing for those tools to correct: the problem they solve does not
occur. For example, the six [`no-zone-*` ESLint rules](../packages/eslint-plugin/reference/no-zone-run-apis.md)
flag zone-critical scheduling, RxJS, and `NgZone.run` usage on the premise that
those APIs cause avoidable change-detection runs. Under zoneless there is no zone
to run into, so the rule has nothing to catch and no-ops. It still
ships for projects that keep Zone.js on, but it is guidance for a shrinking
audience, not a default.

## Trade-offs / context

**Who still needs this.** The zone tooling is not dead; it is scoped. It remains
relevant to Angular apps still running Zone.js: versions at or below v20, or v21
applications that deliberately opt Zone.js back in, and brownfield migrations that
have not finished moving to signals and zoneless. For those apps the flags,
un-patched APIs, and coalescing operator still do exactly what they always did.
This is **legacy and migration context**, not the recommended path for new code.
New applications should stay on the native, zoneless, signals-first path and reach
for none of this.

**Two paths you should _not_ adopt.** Some of the original surface has been retired
and should never be presented as a current option:

- The `@rx-angular/cdk/zone-less` entry point has been **dropped**. If you need an
  un-patched API in a legacy context, the supported primitive is
  `getZoneUnPatchedApi` from `@rx-angular/cdk/internals/core`, and even then,
  frame it as legacy-only.
- The standalone `rxjs-zone-less` package is **unmaintained** (RxJS 6/7 era) and is
  not part of the shipped checkout. It is not a path forward.

**Coalescing has a native equivalent too.** Angular's own event coalescing
(`provideZoneChangeDetection({ eventCoalescing: true })`, on by CLI default in
recent versions) covers the common case for zone-based apps, and the whole concern
is moot under zoneless. `coalesceWith` keeps a role as a general-purpose RxJS
operator, but not as a change-detection workaround you should be reaching for in
new code.

**A note on hydration, for orientation.** RxAngular's CDK also ships an SSR
surface (`@rx-angular/cdk/ssr`: `HydrationTracker`, `provideHydrationTracker`, and
its config token). That tracker works by watching for the removal of Angular's
`ngh` hydration-boundary markers from the DOM to infer when hydration has
completed. `ngh` is still the boundary marker Angular v21 emits, but relying on its
removal is a **fragile heuristic built on an internal detail, not a public
contract**. Treat it as observational tooling, and prefer Angular's own
incremental-hydration primitives (`@defer (hydrate)`) and DevTools for the modern
path.

## Referenced by

The following pages carry a `<LegacyGuard>` banner (or otherwise document
zone-based behavior) and link back to this concept as their shared explanation.

- The six `no-zone-*` ESLint rules (`no-zone-critical-browser-apis`,
  `no-zone-critical-lodash-apis`, `no-zone-critical-rxjs-creation-apis`,
  `no-zone-critical-rxjs-operators`, `no-zone-critical-rxjs-schedulers`,
  `no-zone-run-apis`) via the shared `<LegacyGuard>`.
- The CDK zone pages: `cdk/zone-configurations/*`, the zone-oriented
  render-strategies material, and `cdk/coalescing/coalescing.mdx`.
- The Template legacy-guard bucket: `push-pipe.md`, `unpatch-directive.md`,
  `performance-issues/ngzone-optimizations.md`,
  `performance-issues/change-detection-over-pipes.md`.

## Links out

- [Understanding change detection in Angular](./E1-change-detection.md): how the
  change-detection cycle works and why the default model over-renders; the "why is
  this slow" hub this page's legacy context builds on.
