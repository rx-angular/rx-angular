import { APP_BASE_HREF } from '@angular/common';
import { Provider, StaticProvider } from '@angular/core';
import { ɵSERVER_CONTEXT as SERVER_CONTEXT } from '@angular/platform-server';
import {
  AngularNodeAppEngine,
  CommonEngine,
  CommonEngineRenderOptions,
} from '@angular/ssr/node';
import { Request, Response } from 'express';

export interface RenderUrlConfig {
  req: Request;
  res: Response;
  url: string;
  indexHtml: string;
  providers?: Provider[];
  commonEngine?: CommonEngine;
  angularAppEngine?: AngularNodeAppEngine;
  bootstrap?: CommonEngineRenderOptions['bootstrap'];
  browserDistFolder?: string;
  inlineCriticalCss?: boolean;
}

export interface RenderUrlRedirect {
  status: number;
  location: string;
}

/**
 * The rendered html, or the redirect the render ended in. The Angular app
 * engine answers router redirects with a 3xx response without a body.
 */
export type RenderUrlResult =
  | { html: string; redirect?: never }
  | { html?: never; redirect: RenderUrlRedirect };

const EXTRA_PROVIDERS: Provider[] = [
  { provide: SERVER_CONTEXT, useValue: 'isr' },
];

// helper method that generates html of an url
export const renderUrl = async (
  options: RenderUrlConfig,
): Promise<RenderUrlResult> => {
  const {
    req,
    res,
    url,
    indexHtml,
    providers,
    commonEngine,
    angularAppEngine,
    bootstrap,
    browserDistFolder,
    inlineCriticalCss,
  } = options;

  // we need to override url of req with the one we have in parameters,
  // because during invalidate process, the url is not from the request
  req.url = url;
  req.originalUrl = url;

  const { protocol, originalUrl, baseUrl, headers } = req;
  const BASE_URL_PROVIDER: Provider = {
    provide: APP_BASE_HREF,
    useValue: baseUrl,
  };

  return new Promise((resolve, reject) => {
    const allProviders = providers
      ? [...providers, ...EXTRA_PROVIDERS] // if providers are provided, we add them to the list
      : [...EXTRA_PROVIDERS, BASE_URL_PROVIDER]; // if not, we add the default providers

    if (angularAppEngine) {
      angularAppEngine
        .handle(req)
        .then(async (response) => {
          if (!response) {
            throw new Error('No response from Angular App Engine');
          }
          const location = response.headers.get('Location');
          if (location && response.status >= 300 && response.status < 400) {
            resolve({ redirect: { status: response.status, location } });
          } else {
            resolve({ html: await response.text() });
          }
        })
        .catch((err) => {
          reject(err);
        });
    } else if (commonEngine) {
      commonEngine
        .render({
          bootstrap,
          documentFilePath: indexHtml,
          url: `${protocol}://${headers.host}${originalUrl}`,
          publicPath: browserDistFolder,
          inlineCriticalCss: inlineCriticalCss ?? true,
          providers: [...allProviders] as StaticProvider[], // we need to cast to StaticProvider[] because of a bug in the types
        })
        .then((html) => {
          resolve({ html });
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      res.render(
        indexHtml,
        { req, providers: allProviders },
        (err: Error, html: string) => {
          if (err) {
            reject(err);
          } else {
            resolve({ html });
          }
        },
      );
    }
  });
};
