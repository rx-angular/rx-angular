import { Provider } from '@angular/core';
import { CacheHandler } from './cache-handler';
import { Request } from 'express';

export interface ISRHandlerConfig {
  /**
   * Path to the HTML file that should be served for any incoming HTTP request.
   * Most of the time this will be the indexHtml file that Angular Universal has setup for you.
   */
  indexHtml: string;

  /**
   * A secret token used to invalidate the cache. This token is used to prevent
   * unauthorized users from invalidating the cache. It will be sent as a field in
   * the request body when invalidating the cache. If not provided, defaults to null.
   *
   * Used together with the `invalidate` method for `On-Demand Cache Invalidation`.
   */
  invalidateSecretToken: string | null;

  /**
   * An optional instance of a cache handler. This handler is responsible for
   * storing and retrieving cached responses. If not provided, an instance of
   * the default `In-Memory Cache Handler` will be used.
   */
  cache?: CacheHandler;

  /**
   * The build ID of the application. This value is used to generate unique cache keys.
   * If not provided, defaults to null.
   */
  buildId?: string | null;

  /**
   * When set to true, the server will log additional information for debugging purposes.
   * If not provided, defaults to false.
   */
  enableLogging?: boolean;

  /**
   * When set to true, the server will skip caching any response that returns an HTTP error status code.
   * If not provided, defaults to true.
   */
  skipCachingOnHttpError?: boolean;
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

/**
 * This interface is used to configure the  config field of the `invalidate` method of the `ISRHandler`.
 */
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

/**
 * This interface is used to configure the revalidate time of a route.
 *
 * The revalidate time is the time in seconds after which the page will be regenerated.
 * - If set to null, the page will not be cached and will be regenerated on every request.
 * - If set to 0, the page will be cached forever and never regenerated (until the cache is invalidated manually with `On-Demand Cache Invalidation`)
 * - If set to a number, the page will be cached for that amount of seconds and then regenerated if the cache has expired and the next user tries to access it
 *
 * @example
 * export const routes: Routes = [{
 *   path: 'my-page',
 *   component: MyPageComponent,
 *   data: { revalidate: 60 } as RouteISRConfig
 * }];
 */
export interface RouteISRConfig {
  revalidate?: number | null;
}
