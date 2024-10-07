---
sidebar_label: Cache Handlers
sidebar_position: 6
title: Cache Handlers
---

## Cache Handlers

Cache handlers are classes that extend the `CacheHandler` abstract class. They are responsible for handling the cache of the pages.

### InMemoryCacheHandler (default)

The default cache handler is the `InMemoryCacheHandler`. It stores the cached pages in memory (RAM). It uses the `Map` data structure to store the pages.

### FileSystemCacheHandler (pre-rendering on steroids)

There are cases where you want to store the cached pages in the file system. For example, if you want to deploy your app to a serverless environment, you can't use the `InMemoryCacheHandler` because the memory is not persistent. In this case, you can use the `FileSystemCacheHandler`.

The `FileSystemCacheHandler` stores the cached pages in the file system. It uses the `fs` module to read and write files. It stores the cached pages in the directory that you provide in the `cacheFolderPath` field.

The `FileSystemCacheHandler` has a field called `addPrerenderedPagesToCache`. If you set it to `true`, it will add the prerendered pages (from the path that you provide in the `prerenderedPagesPath` field) to the cache. If you set it to `false`, it will only add the pages that are cached using normal ISR. The default value is `false`.

```typescript
const fsCacheHandler = new FileSystemCacheHandler({
  cacheFolderPath: join(distFolder, '/cache'),
  prerenderedPagesPath: distFolder,
  addPrerenderedPagesToCache: true,
});
```

And then, to register the cache handler, you need to pass it to the `cache` field in ISRHandler:

```typescript
const isr = new ISRHandler({
  ...
  // highlight-next-line
  cache: fsCacheHandler,
});
```

Now, the prerendered pages will be added to the cache. This means that the first request to a page will be served from the cache. And then, ISR will take over and revalidate the cache based on the `revalidate` field in the routes.

### Custom Cache Handler

The cache handling in ISR is **pluggable**. This means that you can use any cache handler that you want. You can also create your own cache handler.

To do that, you need to extend the `CacheHandler` abstract class.

To give you an idea of how to create a custom cache handler, let's take a look at this example of a custom cache handler that stores the cached pages in **redis**:

```typescript
import Redis from 'ioredis';
import { CacheData, CacheHandler, ISROptions } from '@rx-angular/isr/models';

type RedisCacheHandlerOptions = {
  /**
   * Redis connection string, e.g. "redis://localhost:6379"
   */
  connectionString: string;
  /**
   * Redis key prefix, defaults to "isr:"
   */
  keyPrefix?: string;
};

export class RedisCacheHandler extends CacheHandler {
  private redis: Redis;

  constructor(private readonly options: RedisCacheHandlerOptions) {
    super();

    this.redis = new Redis(this.options.connectionString);
    console.log('RedisCacheHandler initialized 🚀');
    options.keyPrefix = options.keyPrefix || 'isr';
  }

  add(url: string, html: string | Buffer, options: ISROptions = { revalidate: null }): Promise<void> {
    const key = this.createKey(cacheKey);
    const createdAt = Date.now().toString();
    await this.redis.hmset(key, {
      html,
      revalidate: config.revalidate ? config.revalidate.toString() : '',
      buildId: config.buildId || '',
      createdAt,
    });
  }

  // in this example, it is assumed that the html is stored as a buffer, use hgetall if it is stored as a string
  async get(cacheKey: string): Promise<CacheData> {
    const key = this.createKey(cacheKey);
    const data = await this.redis.hgetallBuffer(key);
    if (Object.keys(data).length > 0) {
      const revalidate = data['revalidate'] ? parseInt(data['revalidate'].toString(), 10) : null;
      return {
        html: data['html'],
        options: {
          revalidate,
          buildId: data['buildId'].toString() || null,
        },
        createdAt: parseInt(data['createdAt'].toString(), 10),
      } as CacheData;
    } else {
      this.logger.info(`Cache with key ${cacheKey} not found`);
      throw new Error(`Cache with key ${cacheKey} not found`);
    }
  }

  async getAll(): Promise<string[]> {
    return await this.redis.keys(`${this.redisCacheOptions.keyPrefix}:*`);
  }

  async has(cacheKey: string): Promise<boolean> {
    const key = this.createKey(cacheKey);
    return (await this.redis.exists(key)) === 1;
  }

  async delete(cacheKey: string): Promise<boolean> {
    const key = this.createKey(cacheKey);
    return (await this.redis.del(key)) === 1;
  }

  async clearCache(): Promise<boolean> {
    await this.redis.flushdb();
    return true;
  }

  private createKey(cacheKey: string): string {
    return `${this.redisCacheOptions.keyPrefix}:${cacheKey}`;
  }
}

const cacheMsg = (revalidateTime?: number | null): string => {
  const time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

  let msg = '<!-- ';

  msg += `\n🚀 ISR: Served from Redis Cache! \n⌛ Last updated: ${time}. `;

  if (revalidateTime) {
    msg += `\n⏭️ Next refresh is after ${revalidateTime} seconds. `;
  }

  msg += ' \n-->';

  return msg;
};
```

And then, to register the cache handler, you need to pass it to the `cache` field in ISRHandler:

```typescript title="server.ts"
const redisCacheHandler = new RedisCacheHandler({
  connectionString: process.env['REDIS_CONNECTION_STRING'] || '' // e.g. "redis://localhost:6379"
});

const isr = new ISRHandler({
  ...
  // highlight-next-line
  cache: redisCacheHandler, // 👈 register the cache handler
});
```

And that's it! Now you have a custom cache handler that stores the cached pages in redis.

## Gotchas

When using ISR, you need to be aware of the following gotcha. When storing the cached pages in a redis storage, you need to separate cache pages based on the build id. This is because the build id is different for each build. If you don't do that, you will get javascript loading errors in the browser. This is because the browser will try to load the javascript files from the previous build, which don't exist anymore.

To solve this issue, we can use the `buildId` field in the `ISRHandler` options. This field is used to separate the cached pages based on the build id.

Where can we get the build id? We can add it in our `environment.ts` (for dev/prod) file:

```typescript
export const environment = {
  ...
  buildTimestamp: new Date().getTime(), // 👈 add this
};
```

And then, we can use it in our `ISRHandler` options:

```typescript
const isr = new ISRHandler({
  ...
  // highlight-next-line
  buildId: environment.buildTimestamp, // 👈 use it here
});
```

The buildId will help us separate the cached pages based on the build id. The moment the user ask for a page that we had cached in the previous build, we check if the build id of the cached page is the same as the current build id. If it's not, we server-side render the page again and cache it. If it's the same, we serve the cached page.

And that's it! Now you have a working ISR with a custom cache handler that stores the cached pages in redis and separates them based on the build id.

## Cache Handler API

The `CacheHandler` abstract class has the following API:

```typescript
export abstract class CacheHandler {
  abstract add(url: string | Buffer, html: string, options: ISROptions): Promise<void>;

  abstract get(url: string): Promise<CacheData>;

  abstract getAll(): Promise<string[]>;

  abstract has(url: string): Promise<boolean>;

  abstract delete(url: string): Promise<boolean>;

  abstract clearCache?(): Promise<boolean>;
}
```

## Cache Data

The `CacheData` interface is used to store the cached pages in the cache handler. It has the following fields:

```typescript
export interface CacheData {
  html: string | Buffer;
  options: ISROptions;
  createdAt: number;
}
```

note: The `html` field can be a string or a buffer. It depends on if you set `compressHtml` function in the `ISRHandler` options.
If it is set, the html will be compressed and stored as a buffer. If it is not set, the html will be stored as a string.
