---
sidebar_label: Compression
sidebar_position: 12
title: Compression
---

## Why Compression?

Caching pages on the server can lead to high memory usage, especially when caching a large number of pages. Even when caching pages on disk, reading them from disk and sending them to the client can result in high disk I/O usage.

Typically, reverse proxies like Nginx are used to compress responses before sending them to clients. However, if we compress cached pages and serve them as compressed responses, we eliminate the need to compress them every time in Nginx, reducing server load and improving performance.

## How to Use Compression

You can enable compression by setting the `compressHtml` property in `ISRHandlerConfig` to a compression callback function. This function will be called with the HTML content of the page and should return the compressed HTML content. The signature of the function is:

```typescript
export type CompressHtmlFn = (html: string) => Promise<Buffer>;
```

### Example

```typescript
import { ISRHandler } from '@rx-angular/isr';
import { CompressHtmlFn } from '@rx-angular/isr/models';
import * as zlib from 'zlib';

// Example compressHtml function
const compressHtml: CompressHtmlFn = (html: string): Promise<Buffer> => {
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

// ISRHandler configuration
const isr = new ISRHandler({
  indexHtml,
  // other options omitted for brevity
  compressHtml: compressHtml, // compress the HTML before storing in cache
  htmlCompressionMethod: 'gzip', // specify the compression method, default is 'gzip'
});
```

## Important Notes

- **HTML Parameter Type**: With compression enabled, the type of the `html` parameter in `CacheHandler` will be `Buffer` instead of `string`.
- **Content-Encoding Header**: The `htmlCompressionMethod` property is used for the `Content-Encoding` header and should match the compression method used in the `compressHtml` function.
- **Modify Cached HTML**: The `modifyCachedHtml` function will be ignored when `compressHtml` is set, since it is not possible to modify the compressed cached HTML content without decompressing it first.
