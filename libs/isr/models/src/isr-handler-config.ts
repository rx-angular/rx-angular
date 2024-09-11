import { Provider } from '@angular/core';
import { CommonEngine, CommonEngineRenderOptions } from '@angular/ssr';
import { Request } from 'express';
import { CacheHandler, RenderVariant } from './cache-handler';
import { ILogger, LogLevelString } from './logger';

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
   * An instance of a common engine. This engine is responsible for
   * rendering the HTML of the application.
   */
  commonEngine?: CommonEngine;

  /**
   * The bootstrap function of the application. This function is responsible for
   * bootstrapping the application. If not provided, defaults to null.
   */
  bootstrap?: CommonEngineRenderOptions['bootstrap'];

  /**
   * The path to the server  dist folder. This folder contains the server bundle
   * of the application. If not provided, defaults to null.
   */
  serverDistFolder?: string;

  /**
   * The path to the browser dist folder. This folder contains the browser bundle
   * of the application. If not provided, defaults to null.
   */
  browserDistFolder?: string;

  /**
   * Reduce render blocking requests by inlining critical CSS.
   * If not provided, defaults to true.
   */
  inlineCriticalCss?: boolean;

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

  /**
   * An optional way to define multiple variants of a page.
   * This can be useful if the appearance page differs, for example,
   * based on a cookie and the cached variant would thus lead to a content shift.
   * Each variant needs an identifier and a callback function
   * to identify the variant. It is also possible to modify the request
   * to recreate the variant in case of on-demand cache invalidation.
   *
   * @example
   * variants: [
   *     {
   *         identifier: 'logged-in',
   *         detectVariant: (req) => {
   *             return req.cookies && req.cookies.access_token;
   *         },
   *         simulateVariant: (req) => {
   *             req.cookies['access_token'] = 'isr';
   *             return req;
   *         },
   *     },
   * ],
   */
  variants?: RenderVariant[];

  /**
   * This array of query params will be allowed to be part of the cache key.
   * If not provided, which is undefined, all query params will be part of the cache key.
   * If provided as an empty array, no query params will be part of the cache key.
   */
  allowedQueryParams?: string[];

  /**
   * This callback lets you hook into the generated html and provide any modifications
   * necessary on-the-fly.
   * Use with caution as this may lead to a performance loss on serving the html.
   * If null, it will use `defaultModifyGeneratedHtml` function,
   * which only add commented text to the html to indicate when it was generated.
   */
  modifyGeneratedHtml?: ModifyHtmlCallbackFn;

  /**
   * If set to true, the server will not wait for storing the rendered page to the cache storage first and will return the rendered HTML as soon as possible.
   * This can avoid client-side waiting times if the remote cache storage is down.
   */
  nonBlockingRender?: boolean;

  /**
   * If set to true, the server will provide the cached HTML as soon as possible and will revalidate the cache in the background.
   */
  backgroundRevalidation?: boolean;

  /**
   * compression callback to compress the html before storing it in the cache.
   * If not provided, the html will not be compressed.
   * If provided, the html will be compressed before storing it as base64 in the cache,
   * also this will disable the modifyCachedHtml callback, because html is compressed and can't be modified.
   */
  compressHtml?: CompressHtmlFn;

  /**
   * Cached Html compression method, it will use gzip by default if not provided.
   */
  htmlCompressionMethod?: string;

  /**
   * This callback lets you use custom cache key generation logic. If not provided, it will use the default cache key generation logic.
   */
  cacheKeyGenerator?: CacheKeyGeneratorFn;

  /**
   * This is for custom logger, if undefined, it will use the default logger
   */
  logger?: ILogger;

  /**
   * This is for logger level, if undefined, it will use the default logger level, INFO
   */
  logLevel?: LogLevelString;
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

export type CacheKeyGeneratorFn = (
  url: string,
  allowedQueryParams: string[] | null | undefined,
  variant: RenderVariant | null,
) => string;

export type ModifyHtmlCallbackFn = (
  req: Request,
  html: string,
  revalidateTime?: number | null,
) => string;

export interface RenderConfig {
  providers?: Provider[];

  // TODO: remove this in a major as a BREAKING CHANGE (we can provide some schematics to fix the breaking change maybe)
  /**
   * This callback lets you hook into the generated html and provide any modifications
   * necessary on-the-fly.
   * Use with caution as this may lead to a performance loss on serving the html.
   * @deprecated
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

export type CompressHtmlFn = (html: string) => Promise<Buffer>;
