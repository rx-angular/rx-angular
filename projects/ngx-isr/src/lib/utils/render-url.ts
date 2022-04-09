import { APP_BASE_HREF } from '@angular/common';
import { Provider } from '@angular/core';

export interface RenderUrlConfig {
  req: any;
  res: any;
  url: string;
  indexHtml: string;
  providers?: Provider[];
}

// helper method that generates html of an url
export const renderUrl = async (options: RenderUrlConfig): Promise<string> => {
  const { req, res, url, indexHtml, providers } = options;

  // we need to override url of req with the one we have in parameters
  req.url = url;
  req.originalUrl = url;

  return new Promise((resolve, reject) => {
    res.render(
      indexHtml,
      {
        req,
        providers: providers ?? [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
      },
      async (err: Error, html: string) => {
        if (err) {
          reject(err);
        }
        resolve(html);
      }
    );
  });
};
