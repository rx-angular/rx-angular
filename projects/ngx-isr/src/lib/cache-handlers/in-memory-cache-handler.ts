import { CacheData, CacheHandler, ISROptions } from "../models";

export class InMemoryCacheHandler implements CacheHandler {
  private cache = new Map<string, CacheData>();

  add(url: string, html: string, options: ISROptions = { revalidate: null }): Promise<void> {

    const htmlWithMsg = html + cacheMsg(options.revalidate);

    return new Promise((resolve, reject) => {
      const cacheData: CacheData = {
        html: htmlWithMsg,
        options,
        createdAt: Date.now()
      };
      this.cache.set(url, cacheData);
      resolve();
    })
  }

  get(url: string): Promise<CacheData> {
    return new Promise((resolve, reject) => {
      if(this.cache.has(url)) {
        resolve(this.cache.get(url)!);
      }
      reject('This url does not exist in cache!');
    })
  }

  getAll(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      resolve(Array.from(this.cache.keys()))
    })
  }

  has(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(this.cache.has(url));
    })
  }

  delete(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(this.cache.delete(url));
    })
  }
}

const cacheMsg = (revalidateTime?: number | null): string => {
  const time = new Date().toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '')

  let msg = '<!-- ';

  msg += `\n🚀 NgxISR: Served from cache! \n⌛ Last updated: ${time}. `;

  if (revalidateTime) {
    msg += `\n⏭️ Next refresh is after ${revalidateTime} seconds. `;
  }

  msg += ' \n-->';

  return msg;
}
