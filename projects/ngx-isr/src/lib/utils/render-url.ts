import { APP_BASE_HREF } from '@angular/common';

// helper method that generates html of a url
export const renderUrl = async (
  req: any,
  res: any,
  url: string,
  indexHtml: string
): Promise<string> => {
  // we need to override url of req with the one we have in parameters
  req.url = url;
  req.originalUrl = url;

  return new Promise((resolve, reject) => {
    res.render(
      indexHtml,
      {
        req,
        providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
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
