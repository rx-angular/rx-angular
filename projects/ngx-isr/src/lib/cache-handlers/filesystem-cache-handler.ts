import { CacheData, CacheHandler, ISROptions } from '../models/cache-handler';
import * as fs from 'fs';
import { join } from 'path';
import { getISROptions } from '../utils/get-isr-options';

export interface FileSystemCacheOptions {
  cacheFolderPath: string;
  prerenderedPagesPath?: string;
  addPrerendedPagesToCache?: boolean;
}

export class FileSystemCacheHandler implements CacheHandler {
  // in cache we will save url and path to file
  private cachedUrls: {
    route: string;
    htmlFilePath: string;
    options: ISROptions;
  }[] = [];

  protected cache = new Map<string, CacheData>();

  private get cacheFolderPath(): string {
    return this.options.cacheFolderPath;
  }

  constructor(public options: FileSystemCacheOptions) {
    if (!options.cacheFolderPath) {
      throw new Error('Cache folder path is required!');
    }

    if (options.addPrerendedPagesToCache && !options.prerenderedPagesPath) {
      throw new Error(
        'Prerendered pages path is required when `addPrerenderedPagesToCache` is enabled!'
      );
    }

    this.options = options;
    this.populateCacheFromFilesystem();
  }

  async add(route: string, html: string, options?: ISROptions): Promise<void> {
    return new Promise((resolve, reject) => {
      route = route.charAt(0) === '/' ? route.slice(1) : route;
      const fileName = convertRouteToFileName(route);
      const filePath = `${this.getFileFullPath(fileName)}.html`;

      fs.writeFile(filePath, html, 'utf-8', (err) => {
        if (err) {
          reject('Error: 💥 The request was not cached!');
        }

        this.cache.set(route, {
          html: filePath,
          options: options || { revalidate: null },
          createdAt: Date.now(),
        });

        console.log('The request was cached!', route);
        resolve();
      });
    });
  }

  get(route: string): Promise<CacheData> {
    return new Promise(async (resolve, reject) => {
      const cachedUrl = this.cache.get(route);
      if (cachedUrl) {
        // on html field we have saved path to file
        const html = await this.readFromFile(cachedUrl.html);
        const cacheData: CacheData = {
          ...cachedUrl,
          html,
        };
        resolve(cacheData);
      } else {
        reject('Error: 💥 Url is not cached.');
      }
    });
  }

  has(url: string): Promise<boolean> {
    return Promise.resolve(this.cache.has(url));
  }

  delete(url: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const cachedUrl = this.cache.get(url);

      if (cachedUrl) {
        const filePath = this.getFileFullPath(url);
        fs.unlink(cachedUrl.html, (err) => {
          if (err) {
            reject('Error: 💥 Cannot delete file' + filePath);
          } else {
            this.cache.delete(url);
            resolve(true);
          }
        });
      } else {
        reject('Error: 💥 Url is not cached.');
      }
    });
  }

  getAll(): Promise<string[]> {
    const data = Array.from(this.cache.keys());
    return Promise.resolve(data);
  }

  private populateCacheFromFilesystem(): void {
    if (!fs.existsSync(this.cacheFolderPath)) {
      console.log('Cache folder does not exist. Creating...');

      fs.mkdir(this.cacheFolderPath, (err) => {
        if (!err) {
          console.log('Cache folder was created.');
        }
      });
    }

    if (this.options.addPrerendedPagesToCache) {
      console.log('Adding prerendered pages to cache...');
      this.addPrerendedPagesToCache();
    }
  }

  private addPrerendedPagesToCache() {
    // read all folders in browser folder and check if they have index.html inside
    // if yes add the folder name to cache as url and index.html as html
    // then remove the found files because they will be handled by ISR

    const folderPath = this.options.prerenderedPagesPath!;

    const pathsToCache: Array<{ path: string; html: string }> = [];

    try {
      const files: string[] = fs.readdirSync(folderPath);

      for (const file of files) {
        const filePath = join(folderPath, file);
        const isDirectory = fs.statSync(filePath).isDirectory();

        if (isDirectory) {
          const directoryFiles: string[] = fs.readdirSync(filePath);

          // if (directoryFiles.includes('index.html')) {
          //   const html = fs.readFileSync(join(filePath, 'index.html'), 'utf-8');
          //   pathsToCache.push({ path: file, html });
          // }

          const indexHtmlFiles = findIndexHtmlFilesRecuresively(filePath);

          pathsToCache.push(
            ...indexHtmlFiles.map(({ path, html }) => ({
              path: path.replace(folderPath, ''),
              html,
            }))
          );
        }
      }
    } catch (err) {
      console.error('ERROR! 💥 ! Cannot read folder: ' + folderPath);
    }

    for (const { path, html } of pathsToCache) {
      const routePath = path.substring(0).replace('/index.html', '');
      const { revalidate, errors } = getISROptions(html);
      this.add(routePath, html, { revalidate, errors });
    }

    for (const { path } of pathsToCache) {
      const file = join(this.options.prerenderedPagesPath!, path);
      fs.rmSync(file, { recursive: true, force: true });
    }
  }

  private async readFromFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          console.error('ERROR! 💥 ! Cannot read file: ' + filePath);
          reject(err);
        }
        resolve(data);
      });
    });
  }

  private getFileFullPath(fileName: string): string {
    // fileName may have a / in the beginning, so we want to remove it first
    if (fileName.charAt(0) === '/') {
      fileName = fileName.slice(1);
    }

    return join(this.cacheFolderPath, '/', fileName);
  }
}

function findIndexHtmlFilesRecuresively(
  path: string
): Array<{ path: string; html: string }> {
  const data: Array<{ path: string; html: string }> = [];

  try {
    const files = fs.readdirSync(path);
    files.forEach((file: string) => {
      const filePath = join(path, file);
      if (fs.statSync(filePath).isDirectory()) {
        data.push(...findIndexHtmlFilesRecuresively(filePath));
      } else if (file.includes('index.html')) {
        const html = fs.readFileSync(filePath, 'utf8');
        data.push({ path: filePath, html });
      }
    });
  } catch (err) {
    console.error('ERROR! 💥 ! Cannot read folder: ' + path);
    return [];
  }

  return data;
}

function convertRouteToFileName(route: string): string {
  return route.replace(new RegExp('/', 'g'), '__');
}

function convertFileNameToRoute(filename: string): string {
  return filename.replace(new RegExp('__', 'g'), '/');
}
