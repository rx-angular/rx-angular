---
id: transform-cached-html
title: "Transform cached HTML"
diataxis_type: how-to
package: isr
legacy_guard: false
sidebar_label: "Transform cached HTML"
sidebar_position: 5
tags: [isr, guides]
---

# Transform cached HTML

Sometimes you need to alter the HTML ISR handles, for example injecting a tracking script into pages served from cache, or stamping generated pages before they are stored. ISR exposes two hooks for this: [`modifyCachedHtml`](../reference/isr-handler-config.md#servefromcacheconfig) (runs on serve-from-cache, on every request) and [`modifyGeneratedHtml`](../reference/isr-handler-config.md) (runs once, on the fresh render, before the page is cached).

> **Which hook to pick:** transform on serve when the change is per-request; transform on generate when it can be baked into the cached copy. See [How ISR works](../../../concepts/E8-how-isr-works.md) for the serve-vs-generate split.

## Preconditions

- A working ISR setup with an `ISRHandler` instance and the serve/render middlewares wired.

## Steps

1. **Transform generated HTML** by passing `modifyGeneratedHtml` on the `ISRHandler` config. It runs once, before the page is stored in the cache.

   ```typescript title="server.ts"
   const isr = new ISRHandler({
     indexHtml,
     invalidateSecretToken: process.env['ISR_TOKEN'] ?? null,
     enableLogging: true,
     browserDistFolder,
     bootstrap,
     commonEngine,
     modifyGeneratedHtml: (req, html) =>
       `${html}<!-- Modified before caching -->`,
   });
   ```

2. **Transform cached HTML** by passing `modifyCachedHtml` on the [`serveFromCache`](../reference/api.md#isrhandler) config. It runs on every cache hit, so keep the logic lightweight.

   ```typescript title="server.ts"
   server.get('*', (req, res, next) =>
     isr.serveFromCache(req, res, next, {
       modifyCachedHtml: (req, cachedHtml) =>
         `${cachedHtml}<!-- Served from cache, modified per request -->`,
     }),
   );

   // Fresh render + cache write for cache misses:
   server.get('*', (req, res, next) => isr.render(req, res, next));
   ```

:::caution
Both hooks run inside the request path, and `modifyCachedHtml` runs on every serve. Heavy logic here increases response time.
:::

## Result

Pages served from the cache carry your per-request modifications, and freshly generated pages are stamped before they are stored, so the transformation is baked into every subsequent cache hit.

## See also

- Reference: [`modifyGeneratedHtml`](../reference/isr-handler-config.md) field on `ISRHandlerConfig` · [`ModifyHtmlCallbackFn`](../reference/isr-handler-config.md#modifyhtmlcallbackfn)
- Reference: [`ServeFromCacheConfig.modifyCachedHtml`](../reference/isr-handler-config.md#servefromcacheconfig)
