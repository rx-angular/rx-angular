import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import {
  convertCacheKeyToFileName,
  convertFileNameToCacheKey,
  FileSystemCacheHandler,
  getCacheFilePath,
  isFileInsideFolder,
} from './filesystem-cache-handler';

// Use the functions as needed
describe('Route and File Name Conversion', () => {
  describe('convertCacheKeyToFileName', () => {
    it('should convert a simple route without query parameters', () => {
      const route = '/users/profile';
      const expectedFileName = '__users__profile';
      expect(convertCacheKeyToFileName(route)).toEqual(expectedFileName);
    });

    it('should convert a route with query parameters', () => {
      const route = '/search?query=test';
      const expectedFileName = '__search++query=test';
      expect(convertCacheKeyToFileName(route)).toEqual(expectedFileName);
    });

    it('should keep colons so existing variant and query file names stay valid', () => {
      expect(
        convertCacheKeyToFileName('/page?param=value<variantId:variant123>'),
      ).toEqual('__page++param=value<variantId:variant123>');
      expect(convertCacheKeyToFileName('/time?at=10:00')).toEqual(
        '__time++at=10:00',
      );
    });

    it('should encode backslashes so they are not path separators', () => {
      expect(convertCacheKeyToFileName('/a\\..\\b')).toEqual('__a%5C..%5Cb');
      expect(convertCacheKeyToFileName('/x\\..\\..\\index')).toEqual(
        '__x%5C..%5C..%5Cindex',
      );
    });

    it('should encode NUL so the file name cannot be truncated before ..', () => {
      expect(convertCacheKeyToFileName('/x\0\\..\\..\\index')).toEqual(
        '__x%00%5C..%5C..%5Cindex',
      );
    });

    it('should keep forward-slash dot segments inside a single file name', () => {
      expect(convertCacheKeyToFileName('/../../index')).toEqual(
        '__..__..__index',
      );
    });
  });

  describe('convertFileNameToCacheKey', () => {
    it('should convert a simple file name back to a route', () => {
      const fileName = '__users__profile';
      const expectedRoute = '/users/profile';
      expect(convertFileNameToCacheKey(fileName)).toEqual(expectedRoute);
    });

    it('should convert a file name with "++" back to a route with a query parameter', () => {
      const fileName = '__search++query=test';
      const expectedRoute = '/search?query=test';
      expect(convertFileNameToCacheKey(fileName)).toEqual(expectedRoute);
    });

    it('should leave an encoded backslash in the file name', () => {
      const fileName = convertCacheKeyToFileName('/a\\..\\b');
      expect(convertFileNameToCacheKey(fileName)).toEqual('/a%5C..%5Cb');
    });
  });
});

describe('getCacheFilePath', () => {
  describe('posix', () => {
    const cacheFolder = '/app/isr-cache';
    const getPath = (cacheKey: string) =>
      getCacheFilePath(cacheFolder, cacheKey, path.posix);

    it('should keep the existing file names', () => {
      expect(getPath('/')).toEqual('/app/isr-cache/__.html');
      expect(getPath('/details/user/1')).toEqual(
        '/app/isr-cache/__details__user__1.html',
      );
      expect(getPath('/search?query=test')).toEqual(
        '/app/isr-cache/__search++query=test.html',
      );
      expect(getPath('/time?at=10:00')).toEqual(
        '/app/isr-cache/__time++at=10:00.html',
      );
    });

    it('should keep traversal sequences inside the cache folder', () => {
      expect(getPath('/../../index')).toEqual(
        '/app/isr-cache/__..__..__index.html',
      );
      expect(getPath('/x\\..\\..\\index')).toEqual(
        '/app/isr-cache/__x%5C..%5C..%5Cindex.html',
      );
      expect(getPath('..')).toEqual('/app/isr-cache/...html');
    });
  });

  describe('win32', () => {
    const cacheFolder = 'C:\\app\\isr-cache';
    const getPath = (cacheKey: string, folder = cacheFolder) =>
      getCacheFilePath(folder, cacheKey, path.win32);

    it('should keep the existing file names', () => {
      expect(getPath('/')).toEqual('C:\\app\\isr-cache\\__.html');
      expect(getPath('/details/user/1')).toEqual(
        'C:\\app\\isr-cache\\__details__user__1.html',
      );
      expect(getPath('/search?query=test')).toEqual(
        'C:\\app\\isr-cache\\__search++query=test.html',
      );
      expect(getPath('/time?at=10:00')).toEqual(
        'C:\\app\\isr-cache\\__time++at=10:00.html',
      );
    });

    it('should not resolve backslash traversal outside of the cache folder', () => {
      expect(getPath('/x\\..\\..\\index')).toEqual(
        'C:\\app\\isr-cache\\__x%5C..%5C..%5Cindex.html',
      );
      expect(getPath('..\\index')).toEqual(
        'C:\\app\\isr-cache\\..%5Cindex.html',
      );
      expect(path.win32.dirname(getPath('/x\\..\\..\\index'))).toEqual(
        cacheFolder,
      );
    });

    it('should not resolve deep backslash traversal outside of the cache folder', () => {
      const cacheKey = '/x' + '\\..'.repeat(10) + '\\Windows\\win';
      const filePath = getPath(cacheKey);

      expect(path.win32.dirname(filePath)).toEqual(cacheFolder);
      expect(filePath).toEqual(
        'C:\\app\\isr-cache\\__x' +
          '%5C..'.repeat(10) +
          '%5CWindows%5Cwin.html',
      );
    });

    it('should not resolve a NUL-truncated traversal outside of the cache folder', () => {
      const filePath = getPath('/x\0\\..\\..\\index');

      expect(path.win32.dirname(filePath)).toEqual(cacheFolder);
      expect(filePath).toEqual(
        'C:\\app\\isr-cache\\__x%00%5C..%5C..%5Cindex.html',
      );
    });

    it('should not resolve mixed separators outside of the cache folder', () => {
      const filePath = getPath('/x/..\\../..\\index');
      expect(path.win32.dirname(filePath)).toEqual(cacheFolder);
    });

    it('should work with lower case drive letters', () => {
      expect(getPath('/details/1', 'c:\\app\\isr-cache')).toEqual(
        'c:\\app\\isr-cache\\__details__1.html',
      );
      expect(
        path.win32.dirname(getPath('/x\\..\\..\\index', 'c:\\app\\isr-cache')),
      ).toEqual('c:\\app\\isr-cache');
    });
  });
});

describe('isFileInsideFolder', () => {
  it('should accept files inside the folder (posix)', () => {
    const inside = (filePath: string) =>
      isFileInsideFolder('/app/isr-cache', filePath, path.posix);

    expect(inside('/app/isr-cache/__.html')).toBe(true);
    expect(inside('/app/isr-cache/sub/__.html')).toBe(true);
    expect(inside('/app/isr-cache/..__index.html')).toBe(true);
  });

  it('should reject files outside the folder (posix)', () => {
    const inside = (filePath: string) =>
      isFileInsideFolder('/app/isr-cache', filePath, path.posix);

    expect(inside('/app/isr-cache')).toBe(false);
    expect(inside('/app/isr-cache/')).toBe(false);
    expect(inside('/app/index.html')).toBe(false);
    expect(inside('/app/isr-cache/../index.html')).toBe(false);
    expect(inside('/app/isr-cache-other/index.html')).toBe(false);
    expect(inside('/etc/passwd')).toBe(false);
  });

  it('should accept files inside the folder (win32)', () => {
    const inside = (filePath: string) =>
      isFileInsideFolder('C:\\app\\isr-cache', filePath, path.win32);

    expect(inside('C:\\app\\isr-cache\\__.html')).toBe(true);
    expect(inside('c:\\APP\\ISR-CACHE\\__.html')).toBe(true);
    expect(inside('C:/app/isr-cache/__.html')).toBe(true);
  });

  it('should reject files outside the folder (win32)', () => {
    const inside = (filePath: string) =>
      isFileInsideFolder('C:\\app\\isr-cache', filePath, path.win32);

    expect(inside('C:\\app\\isr-cache')).toBe(false);
    expect(inside('C:\\app\\browser\\index.html')).toBe(false);
    expect(inside('C:\\app\\isr-cache\\..\\index.html')).toBe(false);
    expect(inside('C:\\app\\isr-cache-other\\index.html')).toBe(false);
    expect(inside('c:\\app\\isr-cache-other\\index.html')).toBe(false);
    expect(inside('D:\\app\\isr-cache\\index.html')).toBe(false);
    expect(inside('\\\\server\\share\\index.html')).toBe(false);
  });
});

describe('FileSystemCacheHandler', () => {
  let parentFolder: string;
  let cacheFolder: string;

  beforeEach(() => {
    parentFolder = fs.mkdtempSync(path.join(os.tmpdir(), 'isr-parent-'));
    cacheFolder = path.join(parentFolder, 'isr-cache');
    fs.mkdirSync(cacheFolder);
  });

  afterEach(() => {
    fs.rmSync(parentFolder, { recursive: true, force: true });
  });

  it('should write cache files inside the cache folder', async () => {
    const handler = new FileSystemCacheHandler({
      cacheFolderPath: cacheFolder,
    });

    await handler.add('/details/1', '<html>details</html>');
    await handler.add('/x\\..\\..\\index', '<html>x</html>');
    await handler.add('/x\0\\..\\..\\index', '<html>nul</html>');

    expect(fs.readdirSync(parentFolder)).toEqual(['isr-cache']);
    expect(fs.readdirSync(cacheFolder).sort()).toEqual([
      '__details__1.html',
      '__x%00%5C..%5C..%5Cindex.html',
      '__x%5C..%5C..%5Cindex.html',
    ]);
    expect((await handler.get('/details/1')).html).toEqual(
      '<html>details</html>',
    );
    expect((await handler.get('/x\\..\\..\\index')).html).toEqual(
      '<html>x</html>',
    );
    expect((await handler.get('/x\0\\..\\..\\index')).html).toEqual(
      '<html>nul</html>',
    );
  });
});
