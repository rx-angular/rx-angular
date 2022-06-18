/*
 * Public API Surface of ngx-isr
 */

export * from './lib/ngx-isr.service';
export * from './lib/isr-handler';

export { InMemoryCacheHandler, FileSystemCacheHandler } from './lib/cache-handlers';

export { NgxIsrModule } from './lib/ngx-isr.module';

export {
  ISRHandlerConfig,
  InvalidateConfig,
  RenderConfig,
  ServeFromCacheConfig,
} from './lib/models/isr-handler-config';
