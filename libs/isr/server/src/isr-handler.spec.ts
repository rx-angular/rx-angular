/**
 * @jest-environment node
 */
import type { AngularNodeAppEngine } from '@angular/ssr/node';
import type { ISRHandlerConfig } from '@rx-angular/isr/models';
import type {
  NextFunction,
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { InMemoryCacheHandler } from './cache-handlers/in-memory-cache-handler';
import { ISRHandler } from './isr-handler';

const pageHtml = (revalidate: number | null) =>
  revalidate === null
    ? '<html><body>page</body></html>'
    : `<html><body>page<script id="isr-state" type="application/json">{"revalidate":${revalidate},"errors":[]}</script></body></html>`;

const htmlResponse = (html: string) =>
  new Response(html, { status: 200, headers: { 'Content-Type': 'text/html' } });

const redirectResponse = (status: number, location: string) =>
  new Response(null, { status, headers: { Location: location } });

const mockRequest = (url: string) =>
  ({
    url,
    originalUrl: url,
    protocol: 'http',
    baseUrl: '',
    headers: {},
  }) as unknown as ExpressRequest;

const mockResponse = () =>
  ({ send: jest.fn(), redirect: jest.fn() }) as unknown as ExpressResponse & {
    send: jest.Mock;
    redirect: jest.Mock;
  };

const flushBackgroundWork = () =>
  new Promise((resolve) => setTimeout(resolve, 0));

const setup = (config: Partial<ISRHandlerConfig> = {}) => {
  const handle = jest.fn<Promise<Response | null>, [unknown]>();
  const cache = new InMemoryCacheHandler();
  const isr = new ISRHandler({
    indexHtml: '',
    cache,
    angularAppEngine: { handle } as unknown as AngularNodeAppEngine,
    ...config,
  });
  return { isr, cache, handle };
};

/** Adds a cached page and moves the clock past its revalidate window. */
const addExpiredPage = async (cache: InMemoryCacheHandler, url: string) => {
  await cache.add(url, pageHtml(10), { revalidate: 10, buildId: null });
  const later = Date.now() + 20_000;
  jest.spyOn(Date, 'now').mockReturnValue(later);
};

describe('ISRHandler with angularAppEngine', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('render', () => {
    it('should send the redirect the render ended in and not cache it', async () => {
      const { isr, cache, handle } = setup();
      handle.mockImplementation(async () => redirectResponse(302, '/target'));
      const res = mockResponse();
      const next: NextFunction = jest.fn();

      await isr.render(mockRequest('/old'), res, next);

      expect(res.redirect).toHaveBeenCalledWith(302, '/target');
      expect(res.send).not.toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
      expect(await cache.has('/old')).toBe(false);
    });

    it('should send and cache a rendered page', async () => {
      const { isr, cache, handle } = setup();
      handle.mockImplementation(async () => htmlResponse(pageHtml(60)));
      const res = mockResponse();

      await isr.render(mockRequest('/page'), res, jest.fn());

      expect(res.send).toHaveBeenCalledWith(
        expect.stringContaining(pageHtml(60)),
      );
      expect(res.redirect).not.toHaveBeenCalled();
      expect(await cache.has('/page')).toBe(true);
    });
  });

  describe('serveFromCache', () => {
    it('should redirect and drop the cached page when an expired page now redirects', async () => {
      const { isr, cache, handle } = setup({ backgroundRevalidation: false });
      await addExpiredPage(cache, '/moved');
      handle.mockImplementation(async () => redirectResponse(301, '/new'));
      const res = mockResponse();

      await isr.serveFromCache(mockRequest('/moved'), res, jest.fn());

      expect(res.redirect).toHaveBeenCalledWith(301, '/new');
      expect(res.send).not.toHaveBeenCalled();
      expect(await cache.has('/moved')).toBe(false);
    });

    it('should serve the cached page once and drop it in the background when it now redirects', async () => {
      const { isr, cache, handle } = setup({ backgroundRevalidation: true });
      await addExpiredPage(cache, '/moved');
      handle.mockImplementation(async () => redirectResponse(301, '/new'));
      const res = mockResponse();

      await isr.serveFromCache(mockRequest('/moved'), res, jest.fn());
      await flushBackgroundWork();

      expect(res.send).toHaveBeenCalledWith(pageHtml(10));
      expect(res.redirect).not.toHaveBeenCalled();
      expect(await cache.has('/moved')).toBe(false);
    });

    it('should regenerate again after a regeneration returned a page without ISR data', async () => {
      const { isr, cache, handle } = setup({ backgroundRevalidation: false });
      await addExpiredPage(cache, '/page');
      handle.mockImplementation(async () => htmlResponse(pageHtml(null)));

      await isr.serveFromCache(mockRequest('/page'), mockResponse(), jest.fn());
      await isr.serveFromCache(mockRequest('/page'), mockResponse(), jest.fn());

      expect(handle).toHaveBeenCalledTimes(2);
    });
  });
});
