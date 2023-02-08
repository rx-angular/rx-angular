import { Provider } from '@angular/core';
import { CacheHandler } from "./cache-handler";
import {Request} from 'express';

export interface ISRHandlerConfig {
  cache?: CacheHandler; // instance of CacheHandler, default will be InMemoryCacheHandler
  indexHtml: string; // indexHtml path,
  invalidateSecretToken: string;
  enableLogging?: boolean; // defaults to false
  skipCachingOnHttpError?: boolean; // defaults to true
}

export interface ServeFromCacheConfig {
  providers?: Provider[];
  /**
   * This callback lets you hook into the cached html and provide any modifications
   * necessary on-the-fly. This idea came with the need to listen to 'accept' header and
   * modify the <html> tag to include classes that indicates support for webp/avif image formats, per-request.
   * Use with caution as this may lead to a performance loss on serving the html.
   */
  modifyCachedHtml?: (req: Request, html: string) => string;
}

export interface InvalidateConfig {
  providers?: Provider[];
}

export interface RenderConfig {
  providers?: Provider[];
  /**
   * This callback lets you hook into the generated html and provide any modifications
   * necessary on-the-fly.
   * Use with caution as this may lead to a performance loss on serving the html.
   */
  modifyGeneratedHtml?: (req: Request, html: string) => string;
}
