import { CacheISRConfig, ISRHandlerConfig } from '@rx-angular/isr/models';
import { NextFunction, Request, Response } from 'express';
import { CacheGeneration } from './cache-generation';
import { InMemoryCacheHandler } from './cache-handlers/in-memory-cache-handler';
import { ISRHandler } from './isr-handler';
import { ISRLogger } from './isr-logger';

const URL = '/foo';
const CACHED_HTML = '<html>cached</html>';
const GENERATED_HTML = '<html>generated</html>';

const setup = (config: Partial<ISRHandlerConfig> = {}) => {
  const cache = new InMemoryCacheHandler();
  const handler = new ISRHandler({
    indexHtml: 'index.html',
    invalidateSecretToken: null,
    cache,
    ...config,
  });
  // the handler creates its collaborators internally, so we reach for them to
  // stub the rendering and to observe the logs without bootstrapping Angular
  const internals = handler as unknown as {
    cacheGeneration: CacheGeneration;
    logger: ISRLogger;
  };

  return {
    handler,
    cache,
    cacheGeneration: internals.cacheGeneration,
    logger: internals.logger,
  };
};

const createReq = (url = URL): Request =>
  ({ url, headers: { host: 'localhost' } }) as unknown as Request;

const createRes = (): Response =>
  ({ send: jest.fn(), headersSent: false }) as unknown as Response;

const createNext = (): NextFunction => jest.fn() as unknown as NextFunction;

/**
 * The in memory cache handler stamps `createdAt` with the current time, so an
 * already expired entry can only be simulated by stubbing the cache read.
 */
const seedExpiredCache = (
  cache: InMemoryCacheHandler,
  html: string,
  options: CacheISRConfig = { revalidate: 1, buildId: null },
): void => {
  jest.spyOn(cache, 'get').mockResolvedValue({
    html,
    options,
    createdAt: Date.now() - 10_000,
  });
};

// gives node a chance to report unhandled promise rejections
const flushMacrotasks = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 0));
  await new Promise((resolve) => setTimeout(resolve, 0));
};

describe('ISRHandler', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('render', () => {
    it('should propagate the generation error to next()', async () => {
      const { handler, cacheGeneration } = setup();
      const error = new Error('rendering exploded');
      jest.spyOn(cacheGeneration, 'generate').mockRejectedValue(error);

      const res = createRes();
      const next = createNext();
      await handler.render(createReq(), res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(error);
      expect(res.send).not.toHaveBeenCalled();
    });

    it('should call next() with an error when no html was generated', async () => {
      const { handler, cacheGeneration } = setup();
      jest.spyOn(cacheGeneration, 'generate').mockResolvedValue(undefined);

      const res = createRes();
      const next = createNext();
      await handler.render(createReq(), res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
      expect(res.send).not.toHaveBeenCalled();
    });

    it('should send the generated html', async () => {
      const { handler, cacheGeneration } = setup();
      jest
        .spyOn(cacheGeneration, 'generate')
        .mockResolvedValue({ html: GENERATED_HTML });

      const res = createRes();
      const next = createNext();
      await handler.render(createReq(), res, next);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith(GENERATED_HTML);
      expect(next).not.toHaveBeenCalled();
    });

    it('should do nothing when the app already answered the request', async () => {
      const { handler, cacheGeneration } = setup();
      const res = createRes();
      jest.spyOn(cacheGeneration, 'generate').mockImplementation(async () => {
        // e.g. a component that issues a redirect while rendering
        (res as { headersSent: boolean }).headersSent = true;
        return { html: GENERATED_HTML };
      });

      const next = createNext();
      await handler.render(createReq(), res, next);

      expect(res.send).not.toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe('serveFromCache', () => {
    it('should fall through to SSR without an error when the url is not cached', async () => {
      const { handler } = setup();

      const res = createRes();
      const next = createNext();
      await handler.serveFromCache(createReq(), res, next);

      expect(next).toHaveBeenCalledTimes(1);
      // must stay argument-less, otherwise every cold cache request becomes a 500
      expect((next as jest.Mock).mock.calls[0]).toEqual([]);
      expect(res.send).not.toHaveBeenCalled();
    });

    it('should fall through to SSR without an error when the cache is from another build', async () => {
      const { handler, cache } = setup({ buildId: 'build-2' });
      await cache.add(URL, CACHED_HTML, {
        revalidate: 0,
        buildId: 'build-1',
      });

      const res = createRes();
      const next = createNext();
      await handler.serveFromCache(createReq(), res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect((next as jest.Mock).mock.calls[0]).toEqual([]);
      expect(res.send).not.toHaveBeenCalled();
    });

    it('should send the cached html when the cache is still fresh', async () => {
      const { handler, cache } = setup();
      await cache.add(URL, CACHED_HTML, { revalidate: 60, buildId: null });

      const res = createRes();
      const next = createNext();
      await handler.serveFromCache(createReq(), res, next);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith(CACHED_HTML);
      expect(next).not.toHaveBeenCalled();
    });

    it('should serve the stale cache once when a blocking revalidation fails', async () => {
      const { handler, cache, cacheGeneration } = setup();
      seedExpiredCache(cache, CACHED_HTML);
      jest
        .spyOn(cacheGeneration, 'generateWithCacheKey')
        .mockRejectedValue(new Error('rendering exploded'));

      const res = createRes();
      const next = createNext();
      await handler.serveFromCache(createReq(), res, next);

      expect(res.send).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledWith(CACHED_HTML);
      expect(next).not.toHaveBeenCalled();
    });

    it('should not create an unhandled rejection when a background revalidation fails', async () => {
      const { handler, cache, cacheGeneration, logger } = setup({
        backgroundRevalidation: true,
      });
      seedExpiredCache(cache, CACHED_HTML);
      const error = new Error('rendering exploded');
      jest
        .spyOn(cacheGeneration, 'generateWithCacheKey')
        .mockRejectedValue(error);
      const logSpy = jest.spyOn(logger, 'log');

      const unhandledRejection = jest.fn();
      process.on('unhandledRejection', unhandledRejection);

      try {
        const res = createRes();
        const next = createNext();
        await handler.serveFromCache(createReq(), res, next);
        await flushMacrotasks();

        expect(res.send).toHaveBeenCalledTimes(1);
        expect(res.send).toHaveBeenCalledWith(CACHED_HTML);
        expect(next).not.toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith(
          expect.stringContaining('Error regenerating url in the background'),
          error,
        );
        expect(unhandledRejection).not.toHaveBeenCalled();
      } finally {
        process.off('unhandledRejection', unhandledRejection);
      }
    });

    it('should propagate unexpected errors to next()', async () => {
      const error = new Error('cache key generation exploded');
      const { handler } = setup({
        cacheKeyGenerator: () => {
          throw error;
        },
      });

      const res = createRes();
      const next = createNext();
      await handler.serveFromCache(createReq(), res, next);

      expect(next).toHaveBeenCalledTimes(1);
      expect(next).toHaveBeenCalledWith(error);
      expect(res.send).not.toHaveBeenCalled();
    });
  });
});
