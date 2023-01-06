import { Provider } from '@angular/core';
import { CacheData, CacheHandler } from './models';
import { renderUrl } from './utils/render-url';
import { getISROptions } from './utils/get-isr-options';
import { Request, Response } from 'express';
import { ISRLogger } from './isr-logger';

export class CacheRegeneration {
  // TODO: make this pluggable because on serverless environments we can't share memory between functions
  // so we need to use a database or redis cache to store the urls that are on hold if we want to use this feature
  private urlsOnHold: string[] = []; // urls that have regeneration loading

  constructor(public cache: CacheHandler, public indexHtml: string) {}

  async regenerate(
    req: Request,
    res: Response,
    cacheData: CacheData,
    logger: ISRLogger,
    providers?: Provider[]
  ): Promise<void> {
    const { url } = req;

    if (this.urlsOnHold.includes(url)) {
      logger.log('Another regeneration is on-going...');
      return;
    }

    const { options } = cacheData;
    const { revalidate } = options;

    logger.log(`The url: ${url} is being regenerated.`);

    this.urlsOnHold.push(url);

    renderUrl({ req, res, url, indexHtml: this.indexHtml, providers }).then(
      (html) => {
        const { errors } = getISROptions(html);

        if (errors?.length) {
          logger.log('💥 ERROR: Url: ' + url + ' was not regenerated!', errors);
          return;
        }

        // add the regenerated page to cache
        this.cache.add(req.url, html, { revalidate }).then(() => {
          // remove url from urlsOnHold
          this.urlsOnHold = this.urlsOnHold.filter((x) => x !== url);
          logger.log('Url: ' + url + ' was regenerated!');
        });
      }
    );
  }
}
