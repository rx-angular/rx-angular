import { Provider } from '@angular/core';
import { CacheHandler } from "./cache-handler";

export interface ISRHandlerConfig {
  cache?: CacheHandler; // instance of CacheHandler, default will be InMemoryCacheHandler
  indexHtml: string; // indexHtml path,
  invalidateSecretToken: string;
  enableLogging?: boolean; // defaults to false
}

export interface ServeFromCacheConfig {
  providers?: Provider[];
}

export interface InvalidateConfig {
  providers?: Provider[];
}

export interface RenderConfig {
  providers?: Provider[];
}