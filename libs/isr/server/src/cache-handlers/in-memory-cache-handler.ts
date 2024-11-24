import {
  CacheData,
  CacheHandler,
  CacheISRConfig,
} from '@rx-angular/isr/models';

const defaultCacheISRConfig: CacheISRConfig = {
  revalidate: null,
  buildId: null,
};

export class InMemoryCacheHandler extends CacheHandler {
  protected cache = new Map<string, CacheData>();
  constructor() {
    super();
  }

  add(
    cacheKey: string,
    html: string | Buffer,
    config: CacheISRConfig = defaultCacheISRConfig,
  ): Promise<void> {
    return new Promise((resolve) => {
      const cacheData: CacheData = {
        html,
        options: config,
        createdAt: Date.now(),
      };
      this.cache.set(cacheKey, cacheData);
      resolve();
    });
  }

  get(cacheKey: string): Promise<CacheData> {
    return new Promise((resolve, reject) => {
      if (this.cache.has(cacheKey)) {
        resolve(this.cache.get(cacheKey) as CacheData);
      }
      reject('This url does not exist in cache!');
    });
  }

  getAll(): Promise<string[]> {
    return new Promise((resolve) => {
      resolve(Array.from(this.cache.keys()));
    });
  }

  has(cacheKey: string): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(this.cache.has(cacheKey));
    });
  }

  delete(cacheKey: string): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(this.cache.delete(cacheKey));
    });
  }

  override clearCache?(): Promise<boolean> {
    return new Promise((resolve) => {
      this.cache.clear();
      resolve(true);
    });
  }
}
