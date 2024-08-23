import { Provider } from '@angular/core';
import { CommonEngine, CommonEngineRenderOptions } from '@angular/ssr';
import {
  CacheData,
  CacheHandler,
  ISRHandlerConfig,
} from '@rx-angular/isr/models';
import { Request, Response } from 'express';
import { ISRLogger } from './isr-logger';
import { getCacheKey, getVariant } from './utils/cache-utils';
import { getRouteISRDataFromHTML } from './utils/get-isr-options';
import { renderUrl } from './utils/render-url';

export class CacheGeneration {
  // TODO: make this pluggable because on serverless environments we can't share memory between functions
  // so we need to use a database or redis cache to store the urls that are on hold if we want to use this feature
  private urlsOnHold: string[] = []; // urls that have regeneration loading

  constructor(
    public isrConfig: ISRHandlerConfig,
    public cache: CacheHandler,
    public indexHtml: string,
    public commonEngine?: CommonEngine,
    public bootstrap?: CommonEngineRenderOptions['bootstrap'],
    public browserDistFolder?: string,
  ) {}

  async generate(
    req: Request,
    res: Response,
    cacheData: CacheData,
    logger: ISRLogger,
    providers?: Provider[],
  ): Promise<void> {
    const { url } = req;
    const variant = getVariant(req, this.isrConfig);
    const cacheKey = getCacheKey(
      url,
      this.isrConfig.allowedQueryParams,
      variant,
    );

    if (this.urlsOnHold.includes(cacheKey)) {
      logger.log('Another regeneration is on-going for this url...');
      return;
    }

    const { revalidate } = cacheData.options;

    logger.log(`The url: ${cacheKey} is being regenerated.`);

    this.urlsOnHold.push(cacheKey);

    try {
      const html = await renderUrl({
        req,
        res,
        url,
        indexHtml: this.indexHtml,
        providers,
        commonEngine: this.commonEngine,
        bootstrap: this.bootstrap,
        browserDistFolder: this.browserDistFolder,
      });

      const { errors } = getRouteISRDataFromHTML(html);

      // if there are errors, don't add the page to cache
      if (errors?.length && this.isrConfig.skipCachingOnHttpError) {
        // remove url from urlsOnHold because we want to try to regenerate it again
        this.urlsOnHold = this.urlsOnHold.filter((x) => x !== cacheKey);
        logger.log(
          '💥 ERROR: Url: ' + cacheKey + ' was not regenerated!',
          errors,
        );
        return;
      }

      // add the regenerated page to cache
      await this.cache.add(cacheKey, html, {
        revalidate,
        buildId: this.isrConfig.buildId,
      });
      // remove from urlsOnHold because we are done
      this.urlsOnHold = this.urlsOnHold.filter((x) => x !== cacheKey);
      logger.log('Url: ' + cacheKey + ' was regenerated!');
    } catch (error) {
      logger.log(`Error regenerating url: ${cacheKey}`, error);
      // Ensure removal from urlsOnHold in case of error
      this.urlsOnHold = this.urlsOnHold.filter((x) => x !== cacheKey);
    }
  }
}
