import {
  CacheHandler,
  InvalidateConfig,
  ISRHandlerConfig,
  RenderConfig,
  ServeFromCacheConfig,
} from './models';
import { InMemoryCacheHandler } from './cache-handlers';
import { renderUrl, RenderUrlConfig } from './utils/render-url';
import { getISROptions } from './utils/get-isr-options';
import { CacheRegeneration } from './cache-regeneration';
import { NextFunction, Request, Response } from 'express';
import { ISRLogger } from './isr-logger';

export class ISRHandler {
  protected cache!: CacheHandler;
  protected cacheRegeneration!: CacheRegeneration;

  protected isrConfig: ISRHandlerConfig;

  protected readonly logger: ISRLogger;

  constructor(config?: ISRHandlerConfig) {
    if (!config) {
      throw new Error('Provide ISRHandlerConfig!');
    }

    this.isrConfig = config;

    this.logger = new ISRLogger(config?.enableLogging ?? false);

    // if skipCachingOnHttpError is not provided it will default to true
    this.isrConfig.skipCachingOnHttpError =
      config?.skipCachingOnHttpError !== false;

    if (config.cache && config.cache instanceof CacheHandler) {
      this.logger.log('Using custom cache handler!');
      this.cache = config.cache;
    } else {
      this.logger.log('Using in memory cache handler!');
      this.cache = new InMemoryCacheHandler();
    }

    this.cacheRegeneration = new CacheRegeneration(
      this.cache,
      config.indexHtml
    );
  }

  async invalidate(
    req: Request,
    res: Response,
    config?: InvalidateConfig
  ): Promise<any> {
    const { secretToken, urlToInvalidate } = extractData(req);

    if (secretToken !== this.isrConfig.invalidateSecretToken) {
      return res.json({
        status: 'error',
        message: 'Your secret token is wrong!!!',
      });
    }

    if (!urlToInvalidate) {
      return res.json({
        status: 'error',
        message: 'Please add `urlToInvalidate` query param in your url',
      });
    }

    const urlExists = await this.cache.has(urlToInvalidate);

    if (!urlExists) {
      return res.json({
        status: 'error',
        message: `Url: ${urlToInvalidate}, does not exist in cache.`,
      });
    }

    try {
      // re-render the page again
      const html = await renderUrl({
        req,
        res,
        url: urlToInvalidate,
        indexHtml: this.isrConfig.indexHtml,
        providers: config?.providers,
      });

      // get revalidate data in order to set it to cache data
      const { revalidate, errors } = getISROptions(html);

      // if there are errors when rendering the site we throw an error
      if (errors?.length && this.isrConfig.skipCachingOnHttpError) {
        throw new Error(
          'The new rendered page had errors: \n' + JSON.stringify(errors)
        );
      }

      // add the regenerated page to cache
      await this.cache.add(req.url, html, { revalidate });

      this.logger.log(`Url: ${urlToInvalidate} was regenerated!`);

      return res.json({
        status: 'success',
        message: `Url: ${urlToInvalidate} was regenerated!`,
      });
    } catch (err) {
      return res.json({
        status: 'error',
        message: 'Error while regenerating url!!',
        err,
      });
    }
  }

  async serveFromCache(
    req: Request,
    res: Response,
    next: NextFunction,
    config?: ServeFromCacheConfig
  ): Promise<any> {
    try {
      const cacheData = await this.cache.get(req.url);
      const { html, options, createdAt } = cacheData;

      // if the cache is expired, we will regenerate it
      if (options.revalidate && options.revalidate > 0) {
        const lastCacheDateDiff = (Date.now() - createdAt) / 1000; // in seconds

        if (lastCacheDateDiff > options.revalidate) {
          await this.cacheRegeneration.regenerate(
            req,
            res,
            cacheData,
            this.logger,
            config?.providers
          );
        }
      }

      // Cache exists. Send it.
      this.logger.log('Page was retrieved from cache: ', req.url);
      return res.send(html);
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
      indexHtml: this.isrConfig.indexHtml,
      providers: config?.providers,
    };

    renderUrl(renderUrlConfig).then(async (html) => {
      const { revalidate, errors } = getISROptions(html);

      // if we have any http errors when rendering the site, and we have skipCachingOnHttpError enabled
      // we don't want to cache it, and, we will fall back to client side rendering
      if (errors?.length && this.isrConfig.skipCachingOnHttpError) {
        this.logger.log('Http errors: \n', errors);
        return res.send(html);
      }

      // if revalidate is null we won't cache it
      // if revalidate is 0, we will never clear the cache automatically
      // if revalidate is x, we will clear cache every x seconds (after the last request) for that url

      if (revalidate === null || revalidate === undefined) {
        // don't do !revalidate because it will also catch "0"
        return res.send(html);
      }

      // Cache the rendered `html` for this request url to use for subsequent requests
      await this.cache.add(req.url, html, { revalidate });
      return res.send(html);
    });
  }
}

const extractData = (
  req: Request
): { secretToken: string | null; urlToInvalidate: string | null } => {
  return {
    secretToken: req.query['secret'] as string || null,
    urlToInvalidate: req.query['urlToInvalidate'] as string || null,
    // urlsToInvalidate: req.body.urls || [],
  };
};
