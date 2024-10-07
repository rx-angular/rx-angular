import * as compression from 'compression';
import * as express from 'express';

export function setCompressHeader(
  response: express.Response,
  method?: string,
): void {
  response.setHeader('Content-Encoding', method || 'gzip');
  response.setHeader('Content-type', 'text/html; charset=utf-8');
  response.setHeader('Vary', 'Accept-Encoding');
}

export function CompressStaticFilter(
  req: express.Request,
  res: express.Response,
): boolean {
  const isStatic = new RegExp('.(?:js|css)$');
  if (!isStatic.test(req.url)) {
    // don't compress responses with this request header
    return false;
  }
  // fallback to standard filter function
  return compression.filter(req, res);
}
