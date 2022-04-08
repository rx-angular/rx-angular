/*
 * Public API Surface of ngx-isr
 */

export * from './lib/ngx-isr.service';
export * from './lib/isr-handler';

export { InMemoryCacheHandler } from './lib/cache-handlers';

export {
  ISRHandlerConfig,
  InvalidateConfig,
  RenderConfig,
  ServeFromCacheConfig,
} from './lib/models/isr-handler-config';
