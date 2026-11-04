---
id: overview
title: '@rx-angular/isr'
package: isr
sidebar_label: 'Overview'
sidebar_position: 0
tags: [isr, api-reference]
---

# `@rx-angular/isr`

`@rx-angular/isr` brings Incremental Static Regeneration (ISR) to Angular SSR
(`@angular/ssr`). It caches server-rendered pages and lets you invalidate that
cache on a schedule or on demand, with no changes to your build process required.

- **Scheduled cache invalidation.** Cache pages and revalidate them on a
  per-route schedule. Requests are not cached by default; you explicitly mark
  the routes you want to cache.
- **On-demand cache invalidation.** Revalidate specific routes exactly when you
  need to (for example, after a user action) rather than on a fixed schedule.
- **Pluggable cache handlers.** The cache backing store is pluggable. A default
  in-memory handler is included; swap in a filesystem or custom
  (Redis, etc.) handler.
- **No build changes required.** Set up ISR without changing your build
  process.
- **Angular SSR native.** Built on `@angular/ssr`, supporting both the
  `CommonEngine` and `AngularNodeAppEngine` render paths.
- **Standalone & NgModule compatible.** Register with `provideISR()` (standalone,
  recommended) or `IsrModule.forRoot()` (legacy NgModule).

## When to use it

Angular SSR does not provide an API to pass route data or information directly
into the server-side rendering pipeline. `@rx-angular/isr` fills that gap so a
route can declare whether, and for how long, it should be cached.

- Improved TTFB (Time To First Byte)
- Less server resource usage: cached pages skip re-rendering
- Don't do the same work twice
- Extendable APIs
- Good developer experience
- Open-source (MIT license)

## Install

```bash
npm install @rx-angular/isr
```

The package needs an Angular SSR app. [Set up ISR](./how-to/set-up-isr.md)
walks through the server wiring.

## Entry points

| Entry point               | Contains                                                             |
| ------------------------- | -------------------------------------------------------------------- |
| `@rx-angular/isr/server`  | `ISRHandler`, `provideISR`, the cache handlers and `IsrModule`       |
| `@rx-angular/isr/browser` | `IsrService` for the browser                                         |
| `@rx-angular/isr/models`  | Shared types like `CacheHandler`, `CacheData` and `ISRHandlerConfig` |

The root `@rx-angular/isr` entry point re-exports all three.

## Where to go next

- **How-to:** [Set up ISR](./how-to/set-up-isr.md) wires ISR into an existing
  SSR app. Then [invalidate on demand](./how-to/invalidate-on-demand.md) or
  [write a custom cache handler](./how-to/write-a-custom-cache-handler.md).
- **Reference:** [`@rx-angular/isr` API](./reference/api.md), the full export
  surface, [`ISRHandlerConfig`](./reference/isr-handler-config.md), and
  [`RenderConfig`](./reference/isr-handler-config.md#renderconfig).
- **Concept:** ISR round-trips each route's `revalidate` value through the
  rendered HTML to decide what to cache. [How ISR works](../../concepts/how-isr-works.md)
  explains the caching mechanism.
