import {
  CacheData,
  CacheHandler,
  CacheISRConfig,
} from '@rx-angular/isr/models';
import * as fs from 'node:fs';
import { join } from 'node:path';
import { getRouteISRDataFromHTML } from '../utils/get-isr-options';

export interface FileSystemCacheOptions {
  cacheFolderPath: string;
  prerenderedPagesPath?: string;
  addPrerenderedPagesToCache?: boolean;
}

interface FileSystemCacheData {
  htmlFilePath: string; // full path to file
  options: CacheISRConfig;
  isBuffer: boolean;
  createdAt: number;
}

export class FileSystemCacheHandler extends CacheHandler {
  protected cache = new Map<string, FileSystemCacheData>();

  private get cacheFolderPath(): string {
    return this.options.cacheFolderPath;
  }

  constructor(public options: FileSystemCacheOptions) {
    super();

    if (!options.cacheFolderPath)
      throw new Error('Cache folder path is required!');

    if (options.addPrerenderedPagesToCache && !options.prerenderedPagesPath) {
      throw new Error(
        'Prerendered pages path is required when `addPrerenderedPagesToCache` is enabled!',
      );
    }

    this.populateCacheFromFilesystem();
  }

  async add(
    route: string,
    html: string | Buffer,
    config?: CacheISRConfig,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      // ex: route is like: / or /details/user/1

      // convert route to file name (replace / with __)
      // ex. /details/user/1 => /details__user__1.html
      const fileName = convertRouteToFileName(route) + '.html';
      const filePath = getFileFullPath(fileName, this.cacheFolderPath);

      fs.writeFile(filePath, html, 'utf-8', (err) => {
        if (err) reject('Error: 💥 The request was not cached!');

        this.cache.set(route, {
          htmlFilePath: filePath,
          options: config || { revalidate: null },
          createdAt: Date.now(),
          isBuffer: Buffer.isBuffer(html),
        });

        resolve();
      });
    });
  }

  get(route: string): Promise<CacheData> {
    return new Promise((resolve, reject) => {
      // ex: route is like: / or /details/user/1
      // cachedUrl is like: { html: 'full-path-to-cache/__filename.html', options: { revalidate: 60 } }
      const cachedRoute = this.cache.get(route);

      if (cachedRoute) {
        // on html field we have saved path to file
        this.readFromFile(cachedRoute.htmlFilePath, cachedRoute.isBuffer)
          .then((html) => {
            const cacheData: CacheData = {
              html,
              options: cachedRoute.options,
              createdAt: cachedRoute.createdAt,
            };
            resolve(cacheData);
          })
          .catch((err) => {
            reject(
              `Error: 💥 Cannot read cache file for route ${route}: ${cachedRoute.htmlFilePath}, ${err}`,
            );
          });
      } else {
        reject('Error: 💥 Url is not cached.');
      }
    });
  }

  has(route: string): Promise<boolean> {
    return Promise.resolve(this.cache.has(route));
  }

  delete(route: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const cacheData = this.cache.get(route);

      if (cacheData) {
        fs.unlink(cacheData.htmlFilePath, (err) => {
          if (err) {
            reject(
              'Error: 💥 Cannot delete cache file for route ' +
                route +
                `: ${cacheData.htmlFilePath}`,
            );
          } else {
            this.cache.delete(route);
            resolve(true);
          }
        });
      } else {
        reject(`Error: 💥 Route: ${route} is not cached.`);
      }
    });
  }

  getAll(): Promise<string[]> {
    return Promise.resolve(Array.from(this.cache.keys()));
  }

  private populateCacheFromFilesystem(): void {
    if (!fs.existsSync(this.cacheFolderPath)) {
      console.log('Cache folder does not exist. Creating...');

      fs.mkdir(this.cacheFolderPath, (err) => {
        if (!err) console.log('Cache folder was created.');
      });
    }

    if (this.options.addPrerenderedPagesToCache) {
      console.log('Adding prerendered pages to cache...');
      this.addPrerenderedPagesToCache();
    }
  }

  override clearCache(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.rm(this.cacheFolderPath, { recursive: true, force: true }, (err) => {
        if (err) {
          reject('Error: 💥 Cannot delete cache folder.');
        } else {
          this.cache.clear();
          resolve(true);
        }
      });
    });
  }

  private addPrerenderedPagesToCache() {
    // move all prerendered pages to cache folder
    this.transferPrerenderedPagesToCacheFolder();

    // read all files in cache folder and add them to cache
    const files: string[] = fs.readdirSync(this.cacheFolderPath);

    // '__.html',
    // '__details.html',
    // '__details__1.html',

    for (const file of files) {
      const filePath = join(this.cacheFolderPath, file);

      const fileName = file.replace('.html', ''); // remove .html extension
      const route = convertFileNameToRoute(fileName);

      const html = fs.readFileSync(filePath, 'utf-8');
      const { revalidate, errors } = getRouteISRDataFromHTML(html);

      this.cache.set(route, {
        htmlFilePath: filePath, // full path to file
        options: { revalidate, errors },
        createdAt: Date.now(),
        isBuffer: false,
      });

      console.log('The request was stored in cache! Route: ', route);
    }
  }

  private transferPrerenderedPagesToCacheFolder() {
    // read all folders in browser folder and check if they have index.html inside
    // if yes add the folder name to cache as url and index.html as html
    // then remove the found files because they will be handled by ISR

    const folderPath = this.options.prerenderedPagesPath || '';

    // path is full path to file
    const pathsToCache: Array<{ path: string; html: string }> = [];

    try {
      // read all files in folder
      const files: string[] = fs.readdirSync(folderPath);

      for (const file of files) {
        const filePath = join(folderPath, file);
        const isDirectory = fs.statSync(filePath).isDirectory();

        if (file === 'index.html') {
          const html = fs.readFileSync(filePath, 'utf-8');
          pathsToCache.push({ path: filePath, html });
          continue;
        }

        // if file is directory, read all files inside it
        if (isDirectory) {
          // find all index.html files in folder
          const indexHtmlFiles = findIndexHtmlFilesRecursively(filePath);

          // add all found index.html files to cache
          pathsToCache.push(...indexHtmlFiles);
        }
      }
    } catch (err) {
      console.error('ERROR! 💥 ! Cannot read folder: ' + folderPath);
    }

    for (const { path } of pathsToCache) {
      // from: '/Users/enea/Documents/GitHub/ngx-isr/dist/ngx-isr-demo/browser/details/1/index.html
      // to: '/details/1/index.html'
      const pathWithoutPrerenderedPagesPath = path.replace(
        this.options.prerenderedPagesPath || '',
        '',
      );

      let route = '';
      if (pathWithoutPrerenderedPagesPath === '/index.html') {
        route = '/';
      } else {
        route = pathWithoutPrerenderedPagesPath
          .substring(0)
          .replace('/index.html', '');
      }

      const newFileName = convertRouteToFileName(route);
      const newFilePath =
        getFileFullPath(newFileName, this.cacheFolderPath) + '.html';

      // console.log({ path, pathWithoutPrerenderedPagesPath, route, newFileName, newFilePath });
      // this will log:
      // {
      //   path: '/Users/enea/Documents/GitHub/ngx-isr/dist/ngx-isr-demo/browser/details/1/index.html',
      //   pathWithoutPrerenderedPagesPath: '/details/1/index.html',
      //   route: '/details/1',
      //   newFileName: '__details__1',
      //   newFilePath: '/Users/enea/Documents/GitHub/ngx-isr/dist/ngx-isr-demo/browser/cache/__details__1.html'
      // }

      // copy file to cache folder
      fs.copyFileSync(path, newFilePath);

      // remove file from the browser folder so that it can be handled by ISR
      fs.rmSync(path);
    }

    console.log(
      `${pathsToCache.length} Prerendered pages were moved to cache folder.`,
    );
  }

  private async readFromFile(
    filePath: string,
    isBuffer: boolean,
  ): Promise<string | Buffer> {
    const options = isBuffer ? undefined : 'utf-8';
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, options, (err, data) => {
        if (err) {
          console.error('ERROR! 💥 ! Cannot read file: ' + filePath);
          reject(err);
        }
        resolve(data);
      });
    });
  }
}

/**
 * This function recursively searches for files named 'index.html' in the specified directory and its subdirectories.
 * It returns an array of objects containing the path to each file and its contents as a string.
 * @internal
 * @param {string} path - The string representing the path to the directory to search in.
 * @returns {Array<{ path: string; html: string }>} An array of objects, where each object contains the path and contents of an 'index.html' file found in the specified directory or its subdirectories.
 */
function findIndexHtmlFilesRecursively(
  path: string,
): Array<{ path: string; html: string }> {
  // Initialize an empty array to hold the data for each file found
  const data: Array<{ path: string; html: string }> = [];

  try {
    // Read the contents of the specified directory
    const files = fs.readdirSync(path);
    // For each file in the directory...
    files.forEach((file: string) => {
      const filePath = join(path, file);
      // If the file is a directory, recursively search it for 'index.html' files
      if (fs.statSync(filePath).isDirectory()) {
        data.push(...findIndexHtmlFilesRecursively(filePath));
      }
      // If the file is a file named 'index.html', add it to the 'data' array
      else if (file.includes('index.html')) {
        const html = fs.readFileSync(filePath, 'utf8');
        data.push({ path: filePath, html });
      }
    });
  } catch (err) {
    // If an error occurs, log an error message and return an empty array
    console.error('ERROR! 💥 ! Cannot read folder: ' + path);
    return [];
  }

  // Return the array of data for each 'index.html' file found
  return data;
}

/**
 * This function takes a string parameter 'fileName' representing a file name and returns the full path to the file.
 * The full path is obtained by joining the 'cacheFolderPath' string and 'fileName' string using the path separator '/'.
 *
 * @param {string} fileName - The string representing the file name to get the full path for.
 * @param cacheFolderPath - The string representing the path to the cache folder.
 * @returns {string} The string representing the full path to the file.
 */
function getFileFullPath(fileName: string, cacheFolderPath: string): string {
  // If fileName starts with '/', remove it to prevent double slashes in the file path
  if (fileName.charAt(0) === '/') {
    fileName = fileName.slice(1);
  }

  // Join the cache folder path and the file name using the path separator '/'
  // Ex. if cacheFolderPath = '/cache' and fileName = 'index.html',
  // then the full path to the file is '/cache/index.html'
  return join(cacheFolderPath, '/', fileName);
}

/**
 * This function takes a string parameter 'route' and replaces all '/' characters in it with '__' and returns the modified string.
 *
 * @internal
 * @param {string} route - The string representing the route to be converted into a file name.
 * @returns {string} The modified string representing the file name obtained by replacing '/' characters with '__'.
 */
export function convertRouteToFileName(route: string): string {
  // replace all occurrences of '/' character in the 'route' string with '__' using regular expression
  return route
    .replace(new RegExp('/', 'g'), '__')
    .replace(new RegExp('\\?', 'g'), '++');
}

/**
 * This function takes a string parameter 'fileName' and replaces all '__' strings in it with '/' and returns the modified string.
 * @param fileName - The string representing the file name to be converted into a route.
 */
export function convertFileNameToRoute(fileName: string): string {
  // replace all occurrences of '__' string in the 'fileName' string with '/' using regular expression
  return fileName
    .replace(new RegExp('\\+\\+', 'g'), '?')
    .replace(new RegExp('__', 'g'), '/');
}
