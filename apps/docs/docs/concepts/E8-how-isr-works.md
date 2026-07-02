---
id: E8-how-isr-works
title: "How ISR works"
diataxis_type: explanation
package: _site
legacy_guard: false
sidebar_label: "How ISR works"
tags: [isr, content]
---

# How ISR works

Incremental Static Regeneration (ISR) caches server-rendered Angular pages and
serves them from that cache until they are explicitly revalidated. The mechanism
that matters is _how a route opts into caching_. Angular SSR
(`@angular/ssr`) does not expose an API to hand route data to the rendering
pipeline, so `@rx-angular/isr` bridges that gap by round-tripping the route's
`revalidate` value **through the rendered HTML itself**.

## The idea

The mechanism is a four-step round trip between the router and the cache:

1. **Route-data capture.** The moment you register the ISR providers with
   `provideISR()` (or, on the legacy NgModule path, `IsrModule.forRoot()`), the
   ISR service starts listening to router events on the server. When the route
   settles and will not change again, ISR reads that route's `data`, in
   particular its `revalidate` value.
2. **JSON embed.** The captured route data is serialized to JSON and attached
   to the page's HTML as it renders. The value now travels _inside the rendered
   document_, which is the only channel that survives the SSR pipeline.
3. **Extraction.** As server-side rendering is about to finish, ISR reads
   the rendered HTML back and extracts that embedded JSON by locating the script
   tag with `indexOf` and slicing it out with `substring`, then parses it.
4. **Cache decision.** From the parsed data ISR knows whether the page opted
   into caching. If a `revalidate` value is present, the page is stored in the
   cache and served from there on subsequent requests until the revalidation
   window expires; if it is absent, the page is passed straight through and
   never cached.

This is why caching is **opt-in per route**: a route with no `revalidate` in its
`data` produces no embedded value, so the cache decision resolves to
"pass-through." You mark the routes you want cached, and everything else renders
normally.

## Trade-offs / context

Embedding the decision in the HTML and re-extracting it with string index operations is a
deliberate trade-off. It lets ISR work **without changes to your build process**
and without a private Angular API; the cost is a serialize/parse round trip on
every server render. That round trip is cheap relative to a full re-render, which
is exactly what the cache avoids on a hit.

`provideISR()` is the current, standalone-first way to register ISR on the
server. `IsrModule.forRoot()` is the older NgModule equivalent, kept only for
applications that have not yet moved to a standalone server configuration; it
performs the same route-listening and embedding described above. New code should
prefer `provideISR()`.

## Further reading

- [ng-India 2023 — Incremental Static Regeneration for Angular](https://www.youtube.com/embed/gIqyTp36NJ0)
- [Incremental Static Regeneration for Angular (itnext)](https://itnext.io/incremental-static-regeneration-for-angular-42b0a8440e53)

## Referenced by

- [`@rx-angular/isr` overview](../packages/isr/index.md)
- [ISR introduction](../packages/isr/introduction.md)

<!--
  Keep this list current as ISR How-to pages land in Phase A. Add backlinks once
  the target pages exist on disk (onBrokenLinks: 'throw'):
    - Set up ISR            → /packages/isr/how-to/set-up-isr
    - Invalidate on demand  → /packages/isr/how-to/invalidate-on-demand
    - Write a custom cache handler → /packages/isr/how-to/write-a-custom-cache-handler
-->

