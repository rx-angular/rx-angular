import { Provider } from '@angular/core';
import { CacheData, CacheHandler } from './models';
import { renderUrl } from './utils/render-url';
import { getISROptions } from './utils/get-isr-options';

export class CacheRegeneration {
  private urlsOnHold: string[] = []; // urls that have regeneration loading

  constructor(public cache: CacheHandler, public indexHtml: string) {}

  async regenerate(
    req: any,
    res: any,
    cacheData: CacheData,
    showLogs = false,
    providers?: Provider[]
  ): Promise<void> {
    const { url } = req;

    if (this.urlsOnHold.includes(url)) {
      showLogs && console.log('Another regeneration is on-going...');
      return;
    }

    const { options } = cacheData;
    const { revalidate } = options;

    showLogs &&
      console.log(`The url: ${url} will be regenerated after ${revalidate} s.`);

    this.urlsOnHold.push(url);

    setTimeout(() => {
      // re-render the page again
      renderUrl({ req, res, url, indexHtml: this.indexHtml, providers }).then(
        (html) => {
          const { errors } = getISROptions(html);

          if (errors?.length) {
            showLogs && console.error('💥 ERROR: Url: ' + url + ' was not regenerated!', errors);
            return;
          }

          // add the regenerated page to cache
          this.cache.add(req.url, html, { revalidate }).then(() => {
            // remove url from urlsOnHold
            this.urlsOnHold = this.urlsOnHold.filter((x) => x !== url);
            showLogs && console.log('Url: ' + url + ' was regenerated!');
          });
        }
      );
    }, revalidate! * 1000); // revalidate value is in seconds, so we convert it in milliseconds
  }
}
