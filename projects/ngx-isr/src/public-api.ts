/*
 * Public API Surface of ngx-isr
 */

export * from './lib/ngx-isr.service';
export * from './lib/isr-handler';

export {
  InMemoryCacheHandler,
  FileSystemCacheHandler,
} from './lib/cache-handlers';

export { NgxIsrModule } from './lib/ngx-isr.module';

export {
  ISRHandlerConfig,
  InvalidateConfig,
  RenderConfig,
  ServeFromCacheConfig,
  RouteISRConfig,
} from './lib/models/isr-handler-config';

export {
  CacheHandler,
  CacheISRConfig,
  CacheISRConfig as ISROptions,
  CacheData,
} from './lib/models/cache-handler';

export { provideISR } from './lib/provide-isr';
