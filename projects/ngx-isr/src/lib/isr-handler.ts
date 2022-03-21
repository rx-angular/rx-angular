import { CacheHandler, ISRHandlerConfig } from './models';
import { InMemoryCacheHandler } from './cache-handlers';
import { renderUrl } from './utils/render-url';
import { getISROptions } from './utils/get-isr-options';
import { CacheRegeneration } from './cache-regeneration';
import { APP_BASE_HREF } from '@angular/common';

export class ISRHandler {
  private cache!: CacheHandler;
  private indexHtml!: string;
  private invalidateSecretToken!: string;
  private cacheRegeneration!: CacheRegeneration;

  private showLogs: boolean = false;

  constructor(config?: ISRHandlerConfig) {
    if (!config) {
      throw new Error('Provide ISRHandlerConfig!');
    }

    this.indexHtml = config.indexHtml;
    this.invalidateSecretToken = config.invalidateSecretToken;
    this.showLogs = config?.enableLogging ?? false;

    if (config.cache && config.cache instanceof CacheHandler) {
      this.cache = config.cache;
    } else {
      this.cache = new InMemoryCacheHandler()
    }

    this.cacheRegeneration = new CacheRegeneration(this.cache, config.indexHtml);
  }

  async invalidate(req: any, res: any): Promise<any> {
    const { secretToken, urlToInvalidate } = extractData(req);

    if (secretToken !== this.invalidateSecretToken) {
      res.json({ status: 'error', message: 'Your secret token is wrong!!!' });
    }

    if (!urlToInvalidate) {
      res.json({
        status: 'error',
        message: 'Please add `urlToInvalidate` query param in your url',
      });
    }

    if (urlToInvalidate) {
      if (!this.cache.has(urlToInvalidate)) {
        res.json({
          status: 'error',
          message: "The url you provided doesn't exist in cache!",
        });
      }

      try {
        // re-render the page again
        const html = await renderUrl(req, res, urlToInvalidate, this.indexHtml);
        // get revalidate data in order to set it to cache data
        const { revalidate } = getISROptions(html);
        // add the regenerated page to cache
        await this.cache.add(req.url, html, { revalidate });

        this.showLogs && console.log(`Url: ${urlToInvalidate} was regenerated!`);

        res.json({ status: 'success', message: `Url: ${urlToInvalidate} was regenerated!` });
      } catch (err) {
        res.json({ status: 'error', message: 'Error while regenerating url!!' });
      }
    }
  }

  async serveFromCache(req: any, res: any, next: any): Promise<any> {
    try {
      const cacheData = await this.cache.get(req.url);
      const { html, options, createdAt } = cacheData;

      // const lastCacheDateDiff = (Date.now() - createdAt) / 1000; // in seconds
      if (options.revalidate && options.revalidate > 0) {
        await this.cacheRegeneration.regenerate(req, res, cacheData, this.showLogs);
      }

      // Cache exists. Send it.
      this.showLogs && console.log("Page was retrieved from cache: ", req.url);
      res.send(html);
    } catch (error) {
      // Cache does not exist. Serve user using SSR
      next();
    }
  }

  async render(req: any, res: any, next: any): Promise<any> {
    res.render(this.indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }]},
      async (err: Error, html: string) => {
        const { revalidate } = getISROptions(html);

        // if revalidate is null we won't cache it
        // if revalidate is 0, we will never clear the cache automatically
        // if revalidate is x, we will clear cache every x seconds (after the last request) for that url

        if (revalidate === null) {
          res.send(html);
          return;
        }

        // Cache the rendered `html` for this request url to use for subsequent requests
        await this.cache.add(req.url, html, { revalidate });
        res.send(html);
      }
    );
  }

}


const extractData = (req: any) => {
  return {
    secretToken: req.query["secret"] || null,
    urlToInvalidate: req.query["urlToInvalidate"] || null,
    // urlsToInvalidate: req.body.urls || [],
  };
};
