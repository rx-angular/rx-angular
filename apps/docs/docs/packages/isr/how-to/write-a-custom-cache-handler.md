---
id: write-a-custom-cache-handler
title: "Write a custom cache handler"
diataxis_type: how-to
package: isr
legacy_guard: false
sidebar_label: "Write a custom cache handler"
sidebar_position: 2
tags: [isr, guides]
---

# Write a custom cache handler

Cache handling in ISR is pluggable: the default [`InMemoryCacheHandler`](../reference/api.md#inmemorycachehandler) keeps rendered pages in RAM, and the built-in [`FileSystemCacheHandler`](../reference/api.md#filesystemcachehandler) persists them to disk. When you need a different backing store (Redis, a database, an object store), you supply your own handler by extending the [`CacheHandler`](../reference/api.md#cachehandler) abstract class.

> **Why swap the handler?** The in-memory cache is lost on restart and is not shared across serverless instances. See [How ISR works](../../../concepts/E8-how-isr-works.md) for how the cache decision fits into the render pipeline.

## Preconditions

- A working ISR setup with an `ISRHandler` instance in your server bundle.
- A reachable backing store (this recipe uses Redis via `ioredis`).

## Steps

1. **Create a class that extends `CacheHandler`.** Implement every abstract method against your store. Keys are opaque strings supplied by ISR; store and look up HTML verbatim.

   ```typescript title="redis-cache-handler.ts"
   import Redis from 'ioredis';
   import { CacheData, CacheHandler, CacheISRConfig } from '@rx-angular/isr/models';

   type RedisCacheHandlerOptions = {
     /** Redis connection string, e.g. "redis://localhost:6379" */
     connectionString: string;
     /** Redis key prefix, defaults to "isr:" */
     keyPrefix?: string;
   };

   export class RedisCacheHandler extends CacheHandler {
     private redis: Redis;

     constructor(private readonly options: RedisCacheHandlerOptions) {
       super();
       this.redis = new Redis(this.options.connectionString);
     }

     async add(
       cacheKey: string,
       html: string,
       config: CacheISRConfig = { revalidate: null },
     ): Promise<void> {
       const cacheData: CacheData = {
         html,
         options: config,
         createdAt: Date.now(),
       };
       await this.redis.set(this.createKey(cacheKey), JSON.stringify(cacheData));
     }

     async get(cacheKey: string): Promise<CacheData> {
       const result = await this.redis.get(this.createKey(cacheKey));
       if (result === null) {
         throw new Error('This key does not exist in cache!');
       }
       return JSON.parse(result) as CacheData;
     }

     async has(cacheKey: string): Promise<boolean> {
       return (await this.redis.exists(this.createKey(cacheKey))) === 1;
     }

     async delete(cacheKey: string): Promise<boolean> {
       return (await this.redis.del(this.createKey(cacheKey))) === 1;
     }

     async getAll(): Promise<string[]> {
       // Return every cache key you track; keep it consistent with createKey().
       return [];
     }

     async clearCache(): Promise<boolean> {
       await this.redis.flushdb();
       return true;
     }

     private createKey(cacheKey: string): string {
       const prefix = this.options.keyPrefix || 'isr';
       return `${prefix}:${cacheKey}`;
     }
   }
   ```

2. **Register the handler** by passing an instance to the `cache` field of your `ISRHandler` config.

   ```typescript title="server.ts"
   const redisCacheHandler = new RedisCacheHandler({
     connectionString: process.env['REDIS_CONNECTION_STRING'] ?? 'redis://localhost:6379',
   });

   const isr = new ISRHandler({
     // ...other config
     cache: redisCacheHandler,
   });
   ```

3. **Separate cache entries by build.** With an external store, a redeploy leaves stale HTML that references JavaScript bundles from the previous build, causing chunk-load errors in the browser. Set a `buildId` so entries from an old build are bypassed and regenerated.

   ```typescript title="environment.ts"
   export const environment = {
     // ...
     buildTimestamp: new Date().getTime().toString(),
   };
   ```

   ```typescript title="server.ts"
   const isr = new ISRHandler({
     // ...other config
     cache: redisCacheHandler,
     buildId: environment.buildTimestamp,
   });
   ```

## Result

Rendered pages are stored in and served from Redis, surviving server restarts and shared across instances. On the next deploy, the changed `buildId` invalidates entries from prior builds, so a first request after a deploy is server-rendered and re-cached rather than serving a broken page.

## See also

- Reference: [`CacheHandler`](../reference/api.md#cachehandler) · [`CacheData`](../reference/api.md#cachedata) · [`CacheISRConfig`](../reference/api.md#cacheisrconfig-aliased-isroptions)
- Reference: [`InMemoryCacheHandler`](../reference/api.md#inmemorycachehandler) · [`FileSystemCacheHandler`](../reference/api.md#filesystemcachehandler)
- Reference: [`buildId`](../reference/isr-handler-config.md) field on `ISRHandlerConfig`
