import {
  CacheHandler,
  ILogger,
  InvalidateConfig,
  ISRHandlerConfig,
  ModifyHtmlCallbackFn,
  RenderConfig,
  ServeFromCacheConfig,
  VariantRebuildItem,
} from '@rx-angular/isr/models';
import { NextFunction, Request, Response } from 'express';
import { CacheGeneration } from './cache-generation';
import { InMemoryCacheHandler } from './cache-handlers/in-memory-cache-handler';
import { ISRLogger } from './isr-logger';
import { getVariant } from './utils/cache-utils';
import { setCompressHeader, stringToBuffer } from './utils/compression-utils';

export class ISRHandler {
  protected cache!: CacheHandler;
  protected cacheGeneration!: CacheGeneration;
  protected logger: ILogger;

  constructor(protected isrConfig: ISRHandlerConfig) {
    if (!isrConfig) {
      throw new Error('Provide ISRHandlerConfig!');
    }

    this.logger = this.isrConfig.logger
      ? this.isrConfig.logger
      : new ISRLogger(
          this.isrConfig?.enableLogging || false,
          this.isrConfig?.logLevel,
        );
    // if skipCachingOnHttpError is not provided it will default to true
    isrConfig.skipCachingOnHttpError =
      isrConfig.skipCachingOnHttpError !== false;
    // if buildId is not provided it will default to null
    isrConfig.buildId = isrConfig.buildId || null;
    // if invalidateSecretToken is not provided it will default to null
    isrConfig.invalidateSecretToken = isrConfig.invalidateSecretToken || null;

    if (isrConfig.cache && isrConfig.cache instanceof CacheHandler) {
      this.logger.info('Using custom cache handler!');
      this.cache = isrConfig.cache;
    } else {
      this.logger.info('Using in memory cache handler!');
      this.cache = new InMemoryCacheHandler();
    }

    this.cacheGeneration = new CacheGeneration(
      this.isrConfig,
      this.cache,
      this.logger,
    );
  }

  async invalidate(
    req: Request,
    res: Response,
    config?: InvalidateConfig,
  ): Promise<Response> {
    const { token, urlsToInvalidate } = extractDataFromBody(req);

    if (token !== this.isrConfig.invalidateSecretToken) {
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
    const urlWithErrors: Record<string, string[]> = {};

    // Include all possible variants in the list of URLs to be invalidated including
    // their modified request to regenerate the pages
    const variantUrlsToInvalidate =
      this.getVariantUrlsToInvalidate(urlsToInvalidate);

    for (const variantUrl of variantUrlsToInvalidate) {
      const { cacheKey, url, reqSimulator } = variantUrl;

      // check if the url is in cache
      const urlExists = await this.cache.has(cacheKey);

      if (!urlExists) {
        notInCache.push(cacheKey);
        continue;
      }
      // override url of req with the one in parameters,
      req.url = url;
      try {
        const result = await this.cacheGeneration.generateWithCacheKey(
          reqSimulator(req),
          res,
          cacheKey,
          config?.providers,
          'generate',
        );

        if (result && result.errors?.length) {
          urlWithErrors[cacheKey] = result.errors;
        }
      } catch (err) {
        urlWithErrors[cacheKey] = err as string[];
      }
    }

    const invalidatedUrls = variantUrlsToInvalidate
      .map((val) => val.cacheKey)
      .filter(
        (cacheKey) =>
          !notInCache.includes(cacheKey) && !urlWithErrors[cacheKey],
      );

    if (notInCache.length) {
      this.logger.warn(
        `Urls: ${notInCache.join(', ')} does not exist in cache.`,
      );
    }

    if (Object.keys(urlWithErrors).length) {
      this.logger.warn(
        `Urls: ${Object.keys(urlWithErrors).join(', ')} had errors while regenerating!`,
      );
    }

    if (invalidatedUrls.length) {
      this.logger.warn(`Urls: ${invalidatedUrls.join(', ')} were regenerated!`);
    }

    const response = {
      status: 'success',
      notInCache,
      urlWithErrors,
      invalidatedUrls,
    };
    return res.json(response);
  }

  getVariantUrlsToInvalidate(urlsToInvalidate: string[]): VariantRebuildItem[] {
    const variants = this.isrConfig.variants || [];
    const result: VariantRebuildItem[] = [];

    const defaultVariant = (req: Request) => req;

    for (const url of urlsToInvalidate) {
      result.push({ url, cacheKey: url, reqSimulator: defaultVariant });
      for (const variant of variants) {
        result.push({
          url,
          cacheKey: this.cacheGeneration.getCacheKey(
            url,
            this.isrConfig.allowedQueryParams,
            variant,
          ),
          reqSimulator: variant.simulateVariant
            ? variant.simulateVariant
            : defaultVariant,
        });
      }
    }

    return result;
  }

  async serveFromCache(
    req: Request,
    res: Response,
    next: NextFunction,
    config?: ServeFromCacheConfig,
  ): Promise<Response | void> {
    try {
      const variant = getVariant(req, this.isrConfig.variants);
      const cacheKey = this.cacheGeneration.getCacheKey(
        req.url,
        this.isrConfig.allowedQueryParams,
        variant,
      );
      const cacheData = await this.cache.get(cacheKey);
      const { html, options: cacheConfig, createdAt } = cacheData;

      const cacheHasBuildId =
        cacheConfig.buildId !== null && cacheConfig.buildId !== undefined;

      if (cacheHasBuildId && cacheConfig.buildId !== this.isrConfig.buildId) {
        // Cache is from a different build. Serve user using SSR
        next();
        return;
      }

      // Cache exists. Send it.
      this.logger.info(`Page was retrieved from cache: `, cacheKey);
      let finalHtml: string | Buffer = html;

      if (this.isrConfig.compressHtml) {
        finalHtml = stringToBuffer(finalHtml);
      }

      // if the cache is expired, we will regenerate it
      if (cacheConfig.revalidate && cacheConfig.revalidate > 0) {
        const lastCacheDateDiff = (Date.now() - createdAt) / 1000; // in seconds

        if (lastCacheDateDiff > cacheConfig.revalidate) {
          const generate = () => {
            return this.cacheGeneration.generateWithCacheKey(
              req,
              res,
              cacheKey,
              config?.providers,
              'regenerate',
            );
          };

          try {
            // regenerate the page without awaiting, so the user gets the cached page immediately
            if (this.isrConfig.backgroundRevalidation) {
              generate();
            } else {
              const result = await generate();
              if (result?.html) {
                finalHtml = result.html;
              }
            }
          } catch (error) {
            console.error('Error generating html', error);
            next();
          }
        }
      }

      if (!this.isrConfig.compressHtml) {
        // Apply the callback if given
        // It doesn't work with compressed html
        if (config?.modifyCachedHtml) {
          const timeStart = performance.now();
          finalHtml = config.modifyCachedHtml(req, finalHtml as string);
          const totalTime = (performance.now() - timeStart).toFixed(2);
          finalHtml += `<!--\nℹ️ ISR: This cachedHtml has been modified with modifyCachedHtml()\n❗️
          This resulted into more ${totalTime}ms of processing time.\n-->`;
        }
      } else {
        setCompressHeader(res, this.isrConfig.htmlCompressionMethod);
      }

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
    config?: RenderConfig,
  ): Promise<Response | void> {
    // TODO: remove this in a major as a BREAKING CHANGE
    if (config?.modifyGeneratedHtml) {
      if (this.isrConfig.modifyGeneratedHtml !== undefined) {
        console.warn(
          'You can only specify `modifyGeneratedHtml` once. The one in render function will be removed in the next version.',
        );
      }
      const patchedModifyFn: ModifyHtmlCallbackFn = (
        req: Request,
        html: string,
      ) => {
        return config.modifyGeneratedHtml?.(req, html) || html;
      };
      this.isrConfig['modifyGeneratedHtml'] = patchedModifyFn;
    }

    try {
      const result = await this.cacheGeneration.generate(
        req,
        res,
        config?.providers,
        'generate',
      );
      if (!result?.html) {
        throw new Error('Error while generating the page!');
      } else {
        if (this.isrConfig.compressHtml) {
          setCompressHeader(res, this.isrConfig.htmlCompressionMethod);
        }
        return res.send(result.html);
      }
    } catch (error) {
      next();
    }
  }
}

const extractDataFromBody = (
  req: Request,
): { token: string | null; urlsToInvalidate: string[] } => {
  const { urlsToInvalidate, token } = req.body as {
    urlsToInvalidate: string[];
    token: string;
  };
  return { urlsToInvalidate, token };
};
