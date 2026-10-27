---
id: serve-cache-variants
title: 'Serve cache variants'
diataxis_type: how-to
package: isr
legacy_guard: false
sidebar_label: 'Serve cache variants'
sidebar_position: 3
tags: [isr, guides]
---

# Serve cache variants

When a page renders differently depending on request state (for example logged-in vs. anonymous users), a single cached copy would be served to everyone, causing a content shift after hydration. Cache variants let ISR store and serve a distinct cached copy per request state.

> **When to use this:** any time the rendered HTML depends on a request signal (cookie, header) rather than the URL alone. See [How ISR works](../../../concepts/E8-how-isr-works.md) for how variants extend the cache key.

## Preconditions

- A working ISR setup with an `ISRHandler` instance.
- A per-request signal you can inspect (this recipe uses an `access_token` cookie).

## Steps

1. **Register your variants** on the `variants` field of the `ISRHandler` config. Each entry is a [`RenderVariant`](../reference/api.md#rendervariant): an `identifier` (added to the cache key), a `detectVariant` predicate, and an optional `simulateVariant` used during on-demand invalidation.

   ```typescript title="server.ts"
   const isr = new ISRHandler({
     // ...other config
     variants: [
       {
         identifier: 'logged-in', // key used to cache this variant
         detectVariant: (req) => Boolean(req.cookies?.access_token),
         // For on-demand revalidation, inject a placeholder cookie so the
         // authenticated variant can be re-rendered.
         simulateVariant: (req) => {
           req.cookies['access_token'] = 'isr';
           return req;
         },
       },
     ],
   });
   ```

2. **Order combined variants before their single variants.** ISR uses the first variant whose `detectVariant` returns `true`. If a combination (A **and** B) must be its own cached page, register it ahead of the single A and B variants.

   ```typescript title="server.ts"
   const isr = new ISRHandler({
     // ...other config
     variants: [
       {
         identifier: 'A_AND_B',
         detectVariant: (req) => Boolean(req.cookies?.is_A && req.cookies?.is_B),
         simulateVariant: (req) => {
           req.cookies['is_A'] = true;
           req.cookies['is_B'] = true;
           return req;
         },
       },
       {
         identifier: 'A',
         detectVariant: (req) => Boolean(req.cookies?.is_A),
         simulateVariant: (req) => {
           req.cookies['is_A'] = true;
           return req;
         },
       },
       {
         identifier: 'B',
         detectVariant: (req) => Boolean(req.cookies?.is_B),
         simulateVariant: (req) => {
           req.cookies['is_B'] = true;
           return req;
         },
       },
     ],
   });
   ```

3. **Guard against placeholder values.** When `simulateVariant` injects placeholder cookies, make sure the application tolerates them so the simulated render does not throw on an invalid value.

:::caution
Each registered variant is cached as a separate copy **per page**. Depending on the cache handler, this can increase disk or RAM usage substantially.
:::

## Result

Requests matching a variant's `detectVariant` predicate are served the variant's own cached HTML, so authenticated and anonymous users each get the correct pre-rendered page with no post-hydration content shift.

## See also

- Reference: [`RenderVariant`](../reference/api.md#rendervariant) · [`VariantRebuildItem`](../reference/api.md#variantrebuilditem)
- Reference: [`variants`](../reference/isr-handler-config.md) field on `ISRHandlerConfig`
- How-to: [Invalidate on demand](./invalidate-on-demand.md)
