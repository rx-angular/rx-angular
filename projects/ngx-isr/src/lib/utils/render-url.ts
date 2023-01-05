import { APP_BASE_HREF } from '@angular/common';
import { Provider } from '@angular/core';
import { ɵSERVER_CONTEXT as SERVER_CONTEXT } from '@angular/platform-server';

export interface RenderUrlConfig {
  req: any;
  res: any;
  url: string;
  indexHtml: string;
  providers?: Provider[];
}

const EXTRA_PROVIDERS: Provider[] = [
  { provide: SERVER_CONTEXT, useValue: 'ngx-isr' },
];

// helper method that generates html of an url
export const renderUrl = async (options: RenderUrlConfig): Promise<string> => {
  const { req, res, url, indexHtml, providers } = options;

  // we need to override url of req with the one we have in parameters
  req.url = url;
  req.originalUrl = url;

  const BASE_URL_PROVIDER: Provider = {
    provide: APP_BASE_HREF,
    useValue: req.baseUrl,
  };

  return new Promise((resolve, reject) => {
    const allProviders = providers
      ? [...providers, ...EXTRA_PROVIDERS] // if providers are provided, we add them to the list
      : [...EXTRA_PROVIDERS, BASE_URL_PROVIDER]; // if not, we add the default providers

    res.render(
      indexHtml,
      { req, providers: allProviders },
      async (err: Error, html: string) => {
        if (err) {
          reject(err);
        }
        resolve(html);
      }
    );
  });
};
