import { CacheHandler, ISROptions, CacheData } from 'ngx-isr';
import Redis from 'ioredis';

export class RedisCacheHandler extends CacheHandler {
  private redis: Redis;

  constructor(private readonly redisConnectionString: string) {
    super();
    
    this.redis = new Redis(this.redisConnectionString);
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
      this.redis.set(url, JSON.stringify(cacheData)).then(() => {
        resolve();
      });
    });
  }

  get(url: string): Promise<CacheData> {
    return new Promise((resolve, reject) => {
      this.redis.get(url, (err, result) => {
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
      resolve(this.redis.exists(url).then((exists) => exists === 1));
    });
  }

  delete(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(this.redis.del(url).then((deleted) => deleted === 1));
    });
  }

  clearCache?(): Promise<boolean> {
    throw new Error('Method not implemented.');
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
