import { NextFunction, Request, Response } from 'express';
import { InMemoryCacheHandler } from './cache-handlers/in-memory-cache-handler';
import { CacheRegeneration } from './cache-regeneration';
import { ISRLogger } from './isr-logger';
import {
  CacheHandler,
  CacheISRConfig,
  InvalidateConfig,
  ISRHandlerConfig,
  RenderConfig,
  ServeFromCacheConfig,
} from 'ngx-isr/models';
import { getRouteISRDataFromHTML } from './utils/get-isr-options';
import { renderUrl, RenderUrlConfig } from './utils/render-url';

export class ISRHandler {
  protected cache!: CacheHandler;
  protected cacheRegeneration!: CacheRegeneration;
  protected logger = new ISRLogger(this.config?.enableLogging || false);

  constructor(protected config: ISRHandlerConfig) {
    if (!config) {
      throw new Error('Provide ISRHandlerConfig!');
    }

    // if skipCachingOnHttpError is not provided it will default to true
    config.skipCachingOnHttpError = config.skipCachingOnHttpError !== false;
    // if buildId is not provided it will default to null
    config.buildId = config.buildId || null;
    // if invalidateSecretToken is not provided it will default to null
    config.invalidateSecretToken = config.invalidateSecretToken || null;

    if (config.cache && config.cache instanceof CacheHandler) {
      this.logger.log('Using custom cache handler!');
      this.cache = config.cache;
    } else {
      this.logger.log('Using in memory cache handler!');
      this.cache = new InMemoryCacheHandler();
    }

    this.cacheRegeneration = new CacheRegeneration(
      this.config,
      this.cache,
      config.indexHtml
    );
  }

  async invalidate(
    req: Request,
    res: Response,
    config?: InvalidateConfig
  ): Promise<any> {
    const { token, urlsToInvalidate } = extractDataFromBody(req);
    const { indexHtml } = this.config;

    if (token !== this.config.invalidateSecretToken) {
      return res.json({
        status: 'error',
        message: 'Your secret token is wrong!!!',
      });
    }

    if (!urlsToInvalidate || !urlsToInvalidate.length) {
      return res.json({
        status: 'error',
        message: 'Please add `urlsToInvalidate` in the payload!',
      });
    }

    const notInCache: string[] = [];
    const urlWithErrors: Record<string, any> = {};

    for (const url of urlsToInvalidate) {
      // check if the url is in cache
      const urlExists = await this.cache.has(url);

      if (!urlExists) {
        notInCache.push(url);
        continue;
      }

      try {
        // re-render the page again
        const html = await renderUrl({
          req,
          res,
          url,
          indexHtml,
          providers: config?.providers,
        });

        // get revalidate data in order to set it to cache data
        const { revalidate, errors } = getRouteISRDataFromHTML(html);

        // if there are errors when rendering the site we throw an error
        if (errors?.length && this.config.skipCachingOnHttpError) {
          urlWithErrors[url] = errors;
        }

        // add the regenerated page to cache
        const cacheConfig: CacheISRConfig = {
          revalidate,
          buildId: this.config.buildId,
        };
        await this.cache.add(req.url, html, cacheConfig);
      } catch (err) {
        urlWithErrors[url] = err;
      }
    }

    const invalidatedUrls = urlsToInvalidate.filter(
      (url) => !notInCache.includes(url) && !urlWithErrors[url]
    );

    if (notInCache.length) {
      this.logger.log(
        `Urls: ${notInCache.join(', ')} does not exist in cache.`
      );
    }

    if (Object.keys(urlWithErrors).length) {
      this.logger.log(
        `Urls: ${Object.keys(urlWithErrors).join(
          ', '
        )} had errors while regenerating!`
      );
    }

    if (invalidatedUrls.length) {
      this.logger.log(`Urls: ${invalidatedUrls.join(', ')} were regenerated!`);
    }

    const response = {
      status: 'success',
      notInCache,
      urlWithErrors,
      invalidatedUrls,
    };
    return res.json(response);
  }

  async serveFromCache(
    req: Request,
    res: Response,
    next: NextFunction,
    config?: ServeFromCacheConfig
  ): Promise<any> {
    try {
      const cacheData = await this.cache.get(req.url);
      const { html, options: cacheConfig, createdAt } = cacheData;

      const cacheHasBuildId =
        cacheConfig.buildId !== null && cacheConfig.buildId !== undefined;

      if (cacheHasBuildId && cacheConfig.buildId !== this.config.buildId) {
        // Cache is from a different build. Serve user using SSR
        next();
        return;
      }

      // if the cache is expired, we will regenerate it
      if (cacheConfig.revalidate && cacheConfig.revalidate > 0) {
        const lastCacheDateDiff = (Date.now() - createdAt) / 1000; // in seconds

        if (lastCacheDateDiff > cacheConfig.revalidate) {
          await this.cacheRegeneration.regenerate(
            req,
            res,
            cacheData,
            this.logger,
            config?.providers
          );
        }
      }

      // Apply the callback if given
      let finalHtml = html;
      if (config?.modifyCachedHtml) {
        const timeStart = performance.now();
        finalHtml = config.modifyCachedHtml(req, html);
        const totalTime = (performance.now() - timeStart).toFixed(2);
        finalHtml += `<!--\nℹ️ NgxISR: This cachedHtml has been modified with modifyCachedHtml()\n❗️
        This resulted into more ${totalTime}ms of processing time.\n-->`;
      }

      // Cache exists. Send it.
      this.logger.log(`Page was retrieved from cache: `, req.url);
      return res.send(finalHtml);
    } catch (error) {
      // Cache does not exist. Serve user using SSR
      next();
    }
  }

  async render(
    req: Request,
    res: Response,
    next: NextFunction,
    config?: RenderConfig
  ): Promise<any> {
    const renderUrlConfig: RenderUrlConfig = {
      req,
      res,
      url: req.url,
      indexHtml: this.config.indexHtml,
      providers: config?.providers,
    };

    renderUrl(renderUrlConfig).then(async (html) => {
      const { revalidate, errors } = getRouteISRDataFromHTML(html);

      // Apply the callback if given
      const finalHtml = config?.modifyGeneratedHtml
        ? config.modifyGeneratedHtml(req, html)
        : html;

      // if we have any http errors when rendering the site, and we have skipCachingOnHttpError enabled
      // we don't want to cache it, and, we will fall back to client side rendering
      if (errors?.length && this.config.skipCachingOnHttpError) {
        this.logger.log('Http errors: \n', errors);
        return res.send(finalHtml);
      }

      // if revalidate is null we won't cache it
      // if revalidate is 0, we will never clear the cache automatically
      // if revalidate is x, we will clear cache every x seconds (after the last request) for that url

      if (revalidate === null || revalidate === undefined) {
        // don't do !revalidate because it will also catch "0"
        return res.send(finalHtml);
      }

      // Cache the rendered `html` for this request url to use for subsequent requests
      await this.cache.add(req.url, finalHtml, {
        revalidate,
        buildId: this.config.buildId,
      });
      return res.send(finalHtml);
    });
  }
}

const extractDataFromBody = (
  req: Request
): { token: string | null; urlsToInvalidate: string[] } => {
  const { urlsToInvalidate, token } = req.body;
  return { urlsToInvalidate, token };
};
