import { CacheHandler } from "./cache-handler";

export interface ISRHandlerConfig {
  cache?: CacheHandler; // instance of CacheHandler, default will be InMemoryCacheHandler
  indexHtml: string; // indexHtml path,
  invalidateSecretToken: string;
  enableLogging?: boolean; // defaults to false
}