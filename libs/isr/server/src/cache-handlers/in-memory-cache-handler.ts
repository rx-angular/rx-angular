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
    url: string,
    html: string | Buffer,
    config: CacheISRConfig = defaultCacheISRConfig,
  ): Promise<void> {
    return new Promise((resolve) => {
      const cacheData: CacheData = {
        html,
        options: config,
        createdAt: Date.now(),
      };
      this.cache.set(url, cacheData);
      resolve();
    });
  }

  get(url: string): Promise<CacheData> {
    return new Promise((resolve, reject) => {
      if (this.cache.has(url)) {
        resolve(this.cache.get(url) as CacheData);
      }
      reject('This url does not exist in cache!');
    });
  }

  getAll(): Promise<string[]> {
    return new Promise((resolve) => {
      resolve(Array.from(this.cache.keys()));
    });
  }

  has(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(this.cache.has(url));
    });
  }

  delete(url: string): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(this.cache.delete(url));
    });
  }

  override clearCache?(): Promise<boolean> {
    return new Promise((resolve) => {
      this.cache.clear();
      resolve(true);
    });
  }
}
