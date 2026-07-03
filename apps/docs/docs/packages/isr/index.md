---
id: isr-landing
title: '@rx-angular/isr'
diataxis_type: reference
package: isr
legacy_guard: false
sidebar_label: 'Overview'
sidebar_position: 0
tags: [isr, api-reference]
---

# `@rx-angular/isr`

Incremental Static Regeneration (ISR) for Angular SSR (`@angular/ssr`). It caches
server-rendered pages and lets you invalidate that cache on a schedule or on
demand, with no changes to your build process required.

New to ISR? Start with the [introduction](./introduction.md), then read
[how ISR works](../../concepts/E8-how-isr-works.md) for the mechanism.

## What it does

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

## Why use it

- ✅ Improved TTFB (Time To First Byte)
- ✅ Less server resource usage: cached pages skip re-rendering
- ✅ Don't do the same work twice
- ✅ Extendable APIs
- ✅ Good developer experience
- ✅ Open-source (MIT license)

## Explore

- **Learn:** [How ISR works](../../concepts/E8-how-isr-works.md): the caching mechanism.
- **Look up:** [`@rx-angular/isr` API](./reference/api.md),
  [`ISRHandlerConfig`](./reference/isr-handler-config.md), and
  [`RenderConfig`](./reference/render-config.md).

New to ISR? Start with the [introduction](./introduction.md).
