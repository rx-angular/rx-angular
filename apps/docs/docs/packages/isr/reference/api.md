---
id: isr-api
title: '@rx-angular/isr API'
diataxis_type: reference
package: isr
legacy_guard: false
sidebar_label: 'API'
sidebar_position: 1
tags: [isr, api-reference]
---

# `@rx-angular/isr` API

Complete export surface of `@rx-angular/isr`, split by entry point: `@rx-angular/isr/server`, `@rx-angular/isr/browser`, and `@rx-angular/isr/models`. Every signature is source-derived (package `21.0.1`).

> **Config types:** `ISRHandlerConfig` and its sub-config interfaces (`InvalidateConfig`, `RenderConfig`, `ServeFromCacheConfig`, `RouteISRConfig`, `CacheKeyGeneratorFn`, `ModifyHtmlCallbackFn`) are documented on their own page; see [ISR Handler Config](./isr-handler-config.md).

---

## Server — `@rx-angular/isr/server`

### `ISRHandler`

The server-side entry point. Instantiated once in your server bundle and wired into three request middlewares: serve-from-cache, render, and invalidate.

```ts
class ISRHandler {
  constructor(isrConfig: ISRHandlerConfig);

  serveFromCache(req: Request, res: Response, next: NextFunction, config?: ServeFromCacheConfig): Promise<Response | void>;

  render(req: Request, res: Response, next: NextFunction, config?: RenderConfig): Promise<Response | void>;

  invalidate(req: Request, res: Response, config?: InvalidateConfig): Promise<Response>;

  getVariantUrlsToInvalidate(urlsToInvalidate: string[]): VariantRebuildItem[];
}
```

`Request`, `Response`, `NextFunction` are from `express`.

| Member                       | Signature                                         | Returns                     | Meaning                                                                                                                                                                                                                                                                                                    |
| ---------------------------- | ------------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `constructor`                | `(isrConfig: ISRHandlerConfig)`                   | `ISRHandler`                | Throws `Error('Provide ISRHandlerConfig!')` if `isrConfig` is falsy. Applies defaults (`skipCachingOnHttpError` → `true`, `buildId` → `null`, `invalidateSecretToken` → `null`) and selects the cache handler (`config.cache` if it is a `CacheHandler` instance, otherwise a new `InMemoryCacheHandler`). |
| `serveFromCache`             | `(req, res, next, config?: ServeFromCacheConfig)` | `Promise<Response \| void>` | Looks up the cache key for the request; sends cached HTML if present (regenerating first when `revalidate` has expired, unless `backgroundRevalidation` is set). Calls `next()` on a cache miss or build-id mismatch.                                                                                      |
| `render`                     | `(req, res, next, config?: RenderConfig)`         | `Promise<Response \| void>` | Renders the page, stores it in cache per the route's `revalidate`, and sends it. Calls `next()` on error.                                                                                                                                                                                                  |
| `invalidate`                 | `(req, res, config?: InvalidateConfig)`           | `Promise<Response>`         | On-demand cache invalidation. Reads `{ token, urlsToInvalidate }` from the request body; rejects if `token !== invalidateSecretToken`. Regenerates each URL (including its variants) and returns a JSON summary `{ status, notInCache, urlWithErrors, invalidatedUrls }`.                                  |
| `getVariantUrlsToInvalidate` | `(urlsToInvalidate: string[])`                    | `VariantRebuildItem[]`      | Expands a list of URLs into the full set of cache keys (base + every configured variant) to be regenerated.                                                                                                                                                                                                |

**Import**

```ts
import { ISRHandler } from '@rx-angular/isr/server';
```

**Minimal example**

```ts
import { ISRHandler } from '@rx-angular/isr/server';
import { CommonEngine } from '@angular/ssr/node';

const isr = new ISRHandler({
  indexHtml,
  invalidateSecretToken: process.env['ISR_TOKEN'] ?? null,
  commonEngine: new CommonEngine(),
  browserDistFolder,
  bootstrap,
});

server.get('*', (req, res, next) => isr.serveFromCache(req, res, next));
server.get('*', (req, res, next) => isr.render(req, res, next));
```

### `provideISR`

Registers the environment providers ISR needs on the server (the `IsrServerService`, the ISR error interceptor provider, and the serialization hook). Activates the ISR service on the server platform only.

```ts
const provideISR: () => EnvironmentProviders;
```

| Returns                | Meaning                                                                                                                                                                           |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `EnvironmentProviders` | Provider bundle for `IsrServerService` (bound to `IsrService`), the HTTP error provider, and a `BEFORE_APP_SERIALIZED` factory that embeds ISR route data into the rendered HTML. |

**Import**

```ts
import { provideISR } from '@rx-angular/isr/server';
```

**Minimal example** (standalone server config)

```ts
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/ssr';
import { provideISR } from '@rx-angular/isr/server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), provideISR()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
```

### `isrHttpInterceptors`

A ready-made array of ISR HTTP interceptors (`HttpInterceptorFn[]`), for use with `withInterceptors`. Currently contains the ISR HTTP-error interceptor, which records failed responses so `skipCachingOnHttpError` can act on them.

```ts
const isrHttpInterceptors: HttpInterceptorFn[]; // = [httpErrorInterceptorISR]
```

**Import**

```ts
import { isrHttpInterceptors } from '@rx-angular/isr/server';
```

**Minimal example**

```ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { isrHttpInterceptors } from '@rx-angular/isr/server';

providers: [provideHttpClient(withInterceptors(isrHttpInterceptors))];
```

### `IsrServerService`

The server-side implementation of `IsrServiceInterface` (see [`IsrServiceInterface`](#isrserviceinterface)). Injectable, `providedIn: 'root'`. On `activate()` it subscribes to router events, reads the deepest activated route's `data`, and captures `revalidate` into ISR state. You normally do not instantiate or inject this directly; `provideISR()` wires it up and binds it to the `IsrService` token.

```ts
@Injectable({ providedIn: 'root' })
class IsrServerService implements IsrServiceInterface {}
```

**Import**

```ts
import { IsrServerService } from '@rx-angular/isr/server';
```

### `InMemoryCacheHandler`

The default cache handler. Stores rendered HTML in an in-process `Map`. Used automatically when `ISRHandlerConfig.cache` is not supplied. Cache is lost on server restart.

```ts
class InMemoryCacheHandler extends CacheHandler {
  constructor();
}
```

**Import**

```ts
import { InMemoryCacheHandler } from '@rx-angular/isr/server';
```

### `FileSystemCacheHandler`

A `CacheHandler` that persists rendered HTML to disk, so the cache survives restarts. Can optionally seed itself from a prerendered-pages folder on startup.

```ts
class FileSystemCacheHandler extends CacheHandler {
  constructor(options: FileSystemCacheOptions);
}
```

| Constructor param | Type                     | Meaning                                                                                                                                                                                           |
| ----------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options`         | `FileSystemCacheOptions` | Filesystem cache configuration. Throws `Error('Cache folder path is required!')` if `cacheFolderPath` is empty, and throws if `addPrerenderedPagesToCache` is set without `prerenderedPagesPath`. |

**Import**

```ts
import { FileSystemCacheHandler } from '@rx-angular/isr/server';
```

**Minimal example**

```ts
import { FileSystemCacheHandler } from '@rx-angular/isr/server';

const cache = new FileSystemCacheHandler({
  cacheFolderPath: join(browserDistFolder, 'cache'),
  prerenderedPagesPath: browserDistFolder,
  addPrerenderedPagesToCache: true,
});
```

### `FileSystemCacheOptions`

Configuration object for [`FileSystemCacheHandler`](#filesystemcachehandler).

```ts
interface FileSystemCacheOptions {
  cacheFolderPath: string;
  prerenderedPagesPath?: string;
  addPrerenderedPagesToCache?: boolean;
}
```

| Field                        | Type      | Default      | Meaning                                                                                                    |
| ---------------------------- | --------- | ------------ | ---------------------------------------------------------------------------------------------------------- |
| `cacheFolderPath`            | `string`  | — (required) | Directory where cached HTML files are written.                                                             |
| `prerenderedPagesPath`       | `string`  | `undefined`  | Directory to read prerendered pages from on startup. Required when `addPrerenderedPagesToCache` is `true`. |
| `addPrerenderedPagesToCache` | `boolean` | `undefined`  | When `true`, seeds the cache from `prerenderedPagesPath` on startup.                                       |

**Import**

```ts
import { FileSystemCacheOptions } from '@rx-angular/isr/server';
```

### `IsrModule`

**Legacy NgModule entry point.** The `NgModule`/`forRoot()` equivalent of `provideISR()`, kept for applications that have not migrated to a standalone server config. Prefer [`provideISR`](#provideisr) in new code.

```ts
@NgModule({ providers: [IsrService] })
class IsrModule {
  static forRoot(): ModuleWithProviders<IsrModule>;
}
```

**Import**

```ts
import { IsrModule } from '@rx-angular/isr/server';
```

---

## Browser — `@rx-angular/isr/browser`

### `IsrService`

The browser-side base implementation of `IsrServiceInterface` (see [`IsrServiceInterface`](#isrserviceinterface)). Injectable, `providedIn: 'root'`. On the browser it is a no-op token: `getState()` returns an empty state, and the mutating methods do nothing. It throws if instantiated on the server, where the token is bound to `IsrServerService` by `provideISR()` / `IsrModule`.

```ts
@Injectable({ providedIn: 'root' })
class IsrService implements IsrServiceInterface {}
```

**Import**

```ts
import { IsrService } from '@rx-angular/isr/browser';
```

---

## Models — `@rx-angular/isr/models`

All types below are imported from `@rx-angular/isr/models`.

### `CacheHandler`

Abstract base class every cache handler extends. Implement this to plug in a custom backing store (Redis, etc.).

```ts
abstract class CacheHandler {
  abstract add(cacheKey: string, html: string, config?: CacheISRConfig): Promise<void>;
  abstract get(cacheKey: string): Promise<CacheData>;
  abstract has(cacheKey: string): Promise<boolean>;
  abstract delete(cacheKey: string): Promise<boolean>;
  abstract getAll(): Promise<string[]>;
  abstract clearCache?(): Promise<boolean>;
}
```

| Method        | Signature                                                   | Returns              | Meaning                                                            |
| ------------- | ----------------------------------------------------------- | -------------------- | ------------------------------------------------------------------ |
| `add`         | `(cacheKey: string, html: string, config?: CacheISRConfig)` | `Promise<void>`      | Store rendered HTML under `cacheKey`.                              |
| `get`         | `(cacheKey: string)`                                        | `Promise<CacheData>` | Retrieve cached data for `cacheKey`. Rejects if the key is absent. |
| `has`         | `(cacheKey: string)`                                        | `Promise<boolean>`   | Whether `cacheKey` exists.                                         |
| `delete`      | `(cacheKey: string)`                                        | `Promise<boolean>`   | Remove `cacheKey`.                                                 |
| `getAll`      | `()`                                                        | `Promise<string[]>`  | All cache keys currently stored.                                   |
| `clearCache?` | `()`                                                        | `Promise<boolean>`   | Optional. Clear the whole cache.                                   |

### `CacheData`

The shape stored/returned by a cache handler.

```ts
interface CacheData {
  html: string;
  options: CacheISRConfig;
  createdAt: number;
}
```

| Field       | Type             | Meaning                                                                         |
| ----------- | ---------------- | ------------------------------------------------------------------------------- |
| `html`      | `string`         | The rendered HTML.                                                              |
| `options`   | `CacheISRConfig` | Revalidation/build metadata stored with the entry.                              |
| `createdAt` | `number`         | Timestamp (ms) when the entry was created; used to compute `revalidate` expiry. |

### `CacheISRConfig` (aliased `ISROptions`)

Per-entry cache metadata. Re-exported under the alias `ISROptions`.

```ts
interface CacheISRConfig {
  revalidate: number | null;
  buildId?: string | null;
  errors?: string[];
}
```

| Field        | Type             | Meaning                                                                                                                  |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `revalidate` | `number \| null` | Revalidation window for this entry (see [`RouteISRConfig`](./isr-handler-config.md#routeisrconfig) for value semantics). |
| `buildId`    | `string \| null` | Build ID the entry was generated under; a mismatch causes the entry to be bypassed.                                      |
| `errors`     | `string[]`       | Errors captured during generation.                                                                                       |

**Import**

```ts
import { CacheISRConfig, ISROptions } from '@rx-angular/isr/models';
```

### `RenderVariant`

Defines one cache variant: a distinct cached version of a page selected per-request (e.g. logged-in vs. anonymous).

```ts
interface RenderVariant {
  identifier: string;
  detectVariant: (req: Request) => boolean;
  simulateVariant?: (req: Request) => Request;
}
```

| Field             | Type                        | Meaning                                                                                         |
| ----------------- | --------------------------- | ----------------------------------------------------------------------------------------------- |
| `identifier`      | `string`                    | Unique variant name; part of the cache key.                                                     |
| `detectVariant`   | `(req: Request) => boolean` | Returns `true` when this request belongs to the variant. First match wins.                      |
| `simulateVariant` | `(req: Request) => Request` | Optional. Rewrites the request so the variant can be regenerated during on-demand invalidation. |

### `VariantRebuildItem`

An expanded rebuild target produced by `ISRHandler.getVariantUrlsToInvalidate`, one entry per (URL × variant) to regenerate.

```ts
interface VariantRebuildItem {
  url: string;
  cacheKey: string;
  reqSimulator: (req: Request) => Request;
}
```

| Field          | Type                        | Meaning                                                                       |
| -------------- | --------------------------- | ----------------------------------------------------------------------------- |
| `url`          | `string`                    | The URL to rebuild.                                                           |
| `cacheKey`     | `string`                    | The cache key for this URL + variant.                                         |
| `reqSimulator` | `(req: Request) => Request` | Request rewriter (the variant's `simulateVariant`, or identity for the base). |

### `IsrState`

The state object held by the ISR service.

```ts
interface IsrState {
  revalidate: number | null;
  errors: Error[];
  extra: Record<string, unknown>;
}
```

| Field        | Type                      | Meaning                                                              |
| ------------ | ------------------------- | -------------------------------------------------------------------- |
| `revalidate` | `number \| null`          | The revalidate value captured from the current route's `data`.       |
| `errors`     | `Error[]`                 | Errors collected during the render (drive `skipCachingOnHttpError`). |
| `extra`      | `Record<string, unknown>` | Arbitrary per-render data embedded into the page.                    |

### `IsrServiceInterface`

The contract implemented by both `IsrService` (browser) and `IsrServerService` (server).

```ts
interface IsrServiceInterface {
  getState(): IsrState;
  patchState(partialState: Partial<IsrState>): void;
  getExtra(): Record<string, unknown>;
  activate(): void;
  addError(error: Error): void;
  addExtra(extra?: Record<string, unknown>): void;
}
```

| Method       | Signature                           | Returns                   | Meaning                                         |
| ------------ | ----------------------------------- | ------------------------- | ----------------------------------------------- |
| `getState`   | `()`                                | `IsrState`                | Current ISR state.                              |
| `patchState` | `(partialState: Partial<IsrState>)` | `void`                    | Merge a partial into ISR state.                 |
| `getExtra`   | `()`                                | `Record<string, unknown>` | The `extra` bag.                                |
| `activate`   | `()`                                | `void`                    | Begin listening to router events (server only). |
| `addError`   | `(error: Error)`                    | `void`                    | Record a render error.                          |
| `addExtra`   | `(extra?: Record<string, unknown>)` | `void`                    | Merge into the `extra` bag.                     |

### Config types

`CacheKeyGeneratorFn`, `InvalidateConfig`, `ISRHandlerConfig`, `ModifyHtmlCallbackFn`, `RenderConfig`, `RouteISRConfig`, and `ServeFromCacheConfig` are also exported from `@rx-angular/isr/models`. They are documented in full on the config reference; see [ISR Handler Config](./isr-handler-config.md).

---

## See also

- Config reference: [ISR Handler Config](./isr-handler-config.md)
- Render config reference: [RenderConfig](./render-config.md)
