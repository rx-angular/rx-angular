import { CompressHtmlFn } from '@rx-angular/isr/models';
import * as zlib from 'zlib';

export const compressHtml: CompressHtmlFn = (html: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    zlib.gzip(html, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer);
      }
    });
  });
};
