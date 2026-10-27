---
id: isr-introduction
title: 'Introduction'
diataxis_type: explanation
package: isr
legacy_guard: false
sidebar_label: 'Introduction'
sidebar_position: 1
tags: [isr, content]
concepts: [E8]
---

# Introduction

## Welcome 🙌

`@rx-angular/isr` manages caching of server-rendered Angular pages built with
Angular SSR (`@angular/ssr`). It gives you an easy way to cache pages on the
server and to invalidate that cache when you need to.

You register it on the server with `provideISR()` (standalone, recommended);
`IsrModule.forRoot()` is the legacy NgModule equivalent.

## Why?

Angular SSR does not provide an API to pass route data or information directly
into the server-side rendering pipeline. `@rx-angular/isr` fills that gap so a
route can declare whether, and for how long, it should be cached.

## How?

ISR round-trips each route's `revalidate` value through the rendered HTML to
decide what to cache. See the mechanism in
[How ISR works](../../concepts/E8-how-isr-works.md).

## What's next?

- [Overview](./index.md): features, benefits, and where to go next.
- [`@rx-angular/isr` API](./reference/api.md): the full export surface.

- [Set up ISR](./how-to/set-up-isr.md): wire ISR into an existing SSR app.
