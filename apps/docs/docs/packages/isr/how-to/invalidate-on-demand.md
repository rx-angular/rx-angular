---
id: invalidate-on-demand
title: "Invalidate the cache on demand"
diataxis_type: how-to
package: isr
legacy_guard: false
sidebar_label: "Invalidate on demand"
sidebar_position: 6
tags: [isr, guides]
---

# Invalidate the cache on demand

On-demand revalidation lets you refresh a cached page the moment its data changes (for example after a CMS update) instead of waiting for the scheduled `revalidate` window to expire.

> **When to reach for it:** best paired with a CMS or backend that updates content on a webhook. See [How ISR works](../../../concepts/E8-how-isr-works.md) for how invalidation regenerates and re-caches a page.

## Preconditions

- A working ISR setup with an `ISRHandler` instance and an `invalidateSecretToken` configured.
- A JSON body parser on the server (`express.json()`).

## Steps

1. **Expose an invalidate endpoint.** Wire a `POST` route to [`ISRHandler.invalidate`](../reference/api.md#isrhandler). Make sure the JSON body parser is registered so the token and URLs can be read.

   ```typescript title="server.ts"
   export function app(): express.Express {
     // ...other configuration
     server.use(express.json());

     server.post('/api/invalidate', (req, res) => isr.invalidate(req, res));

     return server;
   }
   ```

2. **Send a POST request** to `/api/invalidate` with the secret token and the URLs to invalidate.

   ```json
   {
     "token": "your-secret-token",
     "urlsToInvalidate": ["/", "/docs/on-demand-revalidation"]
   }
   ```

   `token` must match the `invalidateSecretToken` set on the `ISRHandler` config; `urlsToInvalidate` is the list of URLs to regenerate.

:::tip
Set `revalidate: 0` on a route to disable scheduled (automatic) revalidation entirely. The cache then only refreshes when you invalidate it on demand.
:::

## Result

Each URL in `urlsToInvalidate` (and its variants) is regenerated and re-cached immediately, and `invalidate` returns a JSON summary of what was invalidated, not in the cache, or errored. Content stays fresh without waiting for the `revalidate` window.

## See also

- Reference: [`ISRHandler.invalidate`](../reference/api.md#isrhandler) · [`InvalidateConfig`](../reference/isr-handler-config.md#invalidateconfig)
- Reference: [`invalidateSecretToken`](../reference/isr-handler-config.md) and [`revalidate`](../reference/isr-handler-config.md#routeisrconfig) semantics
- How-to: [Serve cache variants](./serve-cache-variants.md)
