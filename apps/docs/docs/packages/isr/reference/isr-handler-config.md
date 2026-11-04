---
title: 'ISRHandlerConfig'
package: isr
sidebar_label: 'ISR Handler Config'
sidebar_position: 2
tags: [isr, api-reference]
---

# `ISRHandlerConfig`

`ISRHandlerConfig` is the configuration object passed to the [`ISRHandler`](./api.md#isrhandler) constructor. Every field is listed below. Defaults are applied in the `ISRHandler` constructor / render pipeline, not on the interface itself.

**Import**

```ts
import { ISRHandlerConfig } from '@rx-angular/isr/models';
```

## Fields

| Field                    | Type                                              | Default                                                         | Meaning                                                                                                                                                                              |
| ------------------------ | ------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `indexHtml`              | `string`                                          | — (required)                                                    | Path to the HTML file served for any incoming request (the Angular `index.html`).                                                                                                    |
| `invalidateSecretToken`  | `string \| null`                                  | `null` (coerced via `\|\| null` in the constructor)             | Secret token sent in the request body to authorize on-demand cache invalidation. Required (may be `null` to disable).                                                                |
| `cache`                  | `CacheHandler`                                    | `new InMemoryCacheHandler()`                                    | Cache handler for storing/retrieving cached responses; defaults to in-memory. See [`CacheHandler`](./api.md#cachehandler).                                                           |
| `commonEngine`           | `CommonEngine` (from `@angular/ssr/node`)         | —                                                               | `CommonEngine` instance used to render the application HTML.                                                                                                                         |
| `angularAppEngine`       | `AngularNodeAppEngine` (from `@angular/ssr/node`) | —                                                               | `AngularNodeAppEngine` instance used to render the application HTML (modern `@angular/ssr` path).                                                                                    |
| `bootstrap`              | `CommonEngineRenderOptions['bootstrap']`          | `null`                                                          | Application bootstrap function used by the render engine.                                                                                                                            |
| `serverDistFolder`       | `string`                                          | `null`                                                          | Path to the server dist folder (server bundle).                                                                                                                                      |
| `browserDistFolder`      | `string`                                          | `null`                                                          | Path to the browser dist folder (browser bundle).                                                                                                                                    |
| `inlineCriticalCss`      | `boolean`                                         | `true`                                                          | Inline critical CSS to reduce render-blocking requests.                                                                                                                              |
| `buildId`                | `string \| null`                                  | `null` (coerced via `\|\| null` in the constructor)             | Build ID used to generate unique cache keys; a mismatch bypasses a cached entry.                                                                                                     |
| `enableLogging`          | `boolean`                                         | `false`                                                         | When `true`, logs additional debug information.                                                                                                                                      |
| `skipCachingOnHttpError` | `boolean`                                         | `true` (coerced via `!== false` in the constructor)             | When `true`, skips caching any response that returns an HTTP error status code.                                                                                                      |
| `variants`               | `RenderVariant[]`                                 | —                                                               | Defines multiple page variants (each with `identifier` + `detectVariant`, optional `simulateVariant`) to cache separate versions. See [`RenderVariant`](./api.md#rendervariant).     |
| `allowedQueryParams`     | `string[]`                                        | `undefined` (all query params part of the cache key)            | Query params allowed in the cache key. `undefined` = all included; `[]` = none included; an array = only the listed params.                                                          |
| `modifyGeneratedHtml`    | `ModifyHtmlCallbackFn`                            | `defaultModifyGeneratedHtml` (adds a generated-at HTML comment) | Callback to modify generated HTML on-the-fly before caching/serving. Use with caution (per-serve performance cost).                                                                  |
| `nonBlockingRender`      | `boolean`                                         | —                                                               | When `true`, returns rendered HTML without waiting for the cache write to complete. This avoids client-side waiting times if the remote cache storage is down.                       |
| `backgroundRevalidation` | `boolean`                                         | —                                                               | When `true`, serves cached HTML immediately and revalidates the cache in the background. This lets sites serve stale content when live backend APIs are down, slow, or rate-limited. |
| `cacheKeyGenerator`      | `CacheKeyGeneratorFn`                             | default cache-key generation logic                              | Custom cache-key generation callback.                                                                                                                                                |

## Signature

```ts
interface ISRHandlerConfig {
  indexHtml: string;
  invalidateSecretToken: string | null;
  cache?: CacheHandler;
  commonEngine?: CommonEngine;
  angularAppEngine?: AngularNodeAppEngine;
  bootstrap?: CommonEngineRenderOptions['bootstrap'];
  serverDistFolder?: string;
  browserDistFolder?: string;
  inlineCriticalCss?: boolean;
  buildId?: string | null;
  enableLogging?: boolean;
  skipCachingOnHttpError?: boolean;
  variants?: RenderVariant[];
  allowedQueryParams?: string[];
  modifyGeneratedHtml?: ModifyHtmlCallbackFn;
  nonBlockingRender?: boolean;
  backgroundRevalidation?: boolean;
  cacheKeyGenerator?: CacheKeyGeneratorFn;
}
```

---

## Sub-config interfaces

Types consumed by `ISRHandler` methods and by config fields.

### `InvalidateConfig`

`InvalidateConfig` is the `config` argument of [`ISRHandler.invalidate`](./api.md#isrhandler).

```ts
interface InvalidateConfig {
  providers?: Provider[];
}
```

| Field       | Type         | Meaning                                                            |
| ----------- | ------------ | ------------------------------------------------------------------ |
| `providers` | `Provider[]` | Extra DI providers used while handling the `invalidate()` request. |

### `RenderConfig`

`RenderConfig` is the `config` argument of [`ISRHandler.render`](./api.md#isrhandler).

```ts
interface RenderConfig {
  providers?: Provider[];
  /** @deprecated superseded by ISRHandlerConfig.modifyGeneratedHtml */
  modifyGeneratedHtml?: (req: Request, html: string) => string;
}
```

| Field                 | Type                                     | Meaning                                                                                                                                      |
| --------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `providers`           | `Provider[]`                             | Extra DI providers used while rendering.                                                                                                     |
| `modifyGeneratedHtml` | `(req: Request, html: string) => string` | **`@deprecated`**, superseded by `ISRHandlerConfig.modifyGeneratedHtml`; marked for removal in a future major. Use the config field instead. |

### `ServeFromCacheConfig`

`ServeFromCacheConfig` is the `config` argument of [`ISRHandler.serveFromCache`](./api.md#isrhandler).

```ts
interface ServeFromCacheConfig {
  providers?: Provider[];
  modifyCachedHtml?: (req: Request, html: string) => string;
}
```

| Field              | Type                                     | Meaning                                                                                                                                                      |
| ------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `providers`        | `Provider[]`                             | Extra DI providers used while serving from cache.                                                                                                            |
| `modifyCachedHtml` | `(req: Request, html: string) => string` | Modify cached HTML per-request on serve (e.g. inject webp/avif support classes based on the `accept` header). Use with caution (per-serve performance cost). |

### `RouteISRConfig`

Per-route data config. Attached to a route via `data: { revalidate } as RouteISRConfig`. This is a peer models export (not a nested field of `ISRHandlerConfig`).

```ts
interface RouteISRConfig {
  revalidate?: number | null;
}
```

| Field        | Type             | Meaning                                                                                                                                                                                                   |
| ------------ | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `revalidate` | `number \| null` | Revalidation window for the route. `null` = never cache (regenerate every request); `0` = cache forever until manual invalidation; `N` = cache `N` seconds, then regenerate on the next hit after expiry. |

**Example**

```ts
import { Routes } from '@angular/router';
import { RouteISRConfig } from '@rx-angular/isr/models';

export const routes: Routes = [
  {
    path: 'my-page',
    component: MyPageComponent,
    data: { revalidate: 60 } as RouteISRConfig,
  },
];
```

### `CacheKeyGeneratorFn`

Function type for `ISRHandlerConfig.cacheKeyGenerator`.

```ts
type CacheKeyGeneratorFn = (url: string, allowedQueryParams: string[] | null | undefined, variant: RenderVariant | null) => string;
```

| Param                | Type                            | Meaning                                                     |
| -------------------- | ------------------------------- | ----------------------------------------------------------- |
| `url`                | `string`                        | The request URL.                                            |
| `allowedQueryParams` | `string[] \| null \| undefined` | The configured allow-list (see `allowedQueryParams` above). |
| `variant`            | `RenderVariant \| null`         | The matched variant, or `null` for the base page.           |
| _returns_            | `string`                        | The computed cache key.                                     |

### `ModifyHtmlCallbackFn`

Function type for `ISRHandlerConfig.modifyGeneratedHtml`.

```ts
type ModifyHtmlCallbackFn = (req: Request, html: string, revalidateTime?: number | null) => string;
```

| Param            | Type             | Meaning                                 |
| ---------------- | ---------------- | --------------------------------------- |
| `req`            | `Request`        | The Express request.                    |
| `html`           | `string`         | The generated HTML.                     |
| `revalidateTime` | `number \| null` | Optional. The route's revalidate value. |
| _returns_        | `string`         | The modified HTML.                      |

---

## See also

- API reference: [`@rx-angular/isr` API](./api.md)
