import { CacheHandler, ISROptions, CacheData } from 'ngx-isr';
import Redis from 'ioredis';

type RedisCacheHandlerOptions = {
  /**
   * Redis connection string, e.g. "redis://localhost:6379"
   */
  connectionString: string;
  /**
   * Redis key prefix, defaults to "ngx-isr"
   */
  keyPrefix?: string;
};

export class RedisCacheHandler extends CacheHandler {
  private redis: Redis;

  constructor(private readonly options: RedisCacheHandlerOptions) {
    super();

    this.redis = new Redis(this.options.connectionString);
    console.log('RedisCacheHandler initialized 🚀');
  }

  add(
    url: string,
    html: string,
    options: ISROptions = { revalidate: null }
  ): Promise<void> {
    const htmlWithMsg = html + cacheMsg(options.revalidate);

    return new Promise((resolve, reject) => {
      const cacheData: CacheData = {
        html: htmlWithMsg,
        options,
        createdAt: Date.now(),
      };
      const key = this.createKey(url);
      this.redis.set(key, JSON.stringify(cacheData)).then(() => {
        resolve();
      });
    });
  }

  get(url: string): Promise<CacheData> {
    return new Promise((resolve, reject) => {
      const key = this.createKey(url);
      this.redis.get(key, (err, result) => {
        if (err || result === null || result === undefined) {
          reject('This url does not exist in cache!');
        } else {
          resolve(JSON.parse(result));
        }
      });
    });
  }

  getAll(): Promise<string[]> {
    console.log('getAll() is not implemented for RedisCacheHandler');
    return Promise.resolve([]);
  }

  has(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const key = this.createKey(url);
      resolve(this.redis.exists(key).then((exists) => exists === 1));
    });
  }

  delete(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const key = this.createKey(url);
      resolve(this.redis.del(key).then((deleted) => deleted === 1));
    });
  }

  clearCache?(): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  private createKey(url: string): string {
    const prefix = this.options.keyPrefix || 'ngx-isr';
    return `${prefix}:${url}`;
  }
}

const cacheMsg = (revalidateTime?: number | null): string => {
  const time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

  let msg = '<!-- ';

  msg += `\n🚀 NgxISR: Served from Redis Cache! \n⌛ Last updated: ${time}. `;

  if (revalidateTime) {
    msg += `\n⏭️ Next refresh is after ${revalidateTime} seconds. `;
  }

  msg += ' \n-->';

  return msg;
};
