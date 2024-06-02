import { APP_BASE_HREF } from '@angular/common';
import { Provider, StaticProvider } from '@angular/core';
import { ɵSERVER_CONTEXT as SERVER_CONTEXT } from '@angular/platform-server';
import { CommonEngine, CommonEngineRenderOptions } from '@angular/ssr';
import { Request, Response } from 'express';

export interface RenderUrlConfig {
  req: Request;
  res: Response;
  url: string;
  indexHtml: string;
  providers?: Provider[];

  commonEngine?: CommonEngine;
  bootstrap?: CommonEngineRenderOptions['bootstrap'];
  browserDistFolder?: string;
  inlineCriticalCss?: boolean;
}

const EXTRA_PROVIDERS: Provider[] = [
  { provide: SERVER_CONTEXT, useValue: 'isr' },
];

// helper method that generates html of an url
export const renderUrl = async (options: RenderUrlConfig): Promise<string> => {
  const {
    req,
    res,
    url,
    indexHtml,
    providers,
    commonEngine,
    bootstrap,
    browserDistFolder,
    inlineCriticalCss,
  } = options;

  // we need to override url of req with the one we have in parameters
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

    if (commonEngine) {
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
          resolve(html);
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      res.render(
        indexHtml,
        { req, providers: allProviders },
        async (err: Error, html: string) => {
          if (err) {
            reject(err);
          }
          resolve(html);
        },
      );
    }
  });
};
