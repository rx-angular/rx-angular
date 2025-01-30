export {
  FileSystemCacheHandler,
  FileSystemCacheOptions,
} from './cache-handlers/filesystem-cache-handler';
export { InMemoryCacheHandler } from './cache-handlers/in-memory-cache-handler';
export { compressHtml } from './compress-html';
export { IsrModule } from './isr.module';
export { ISRHandler } from './isr-handler';
export { IsrServerService } from './isr-server.service';
export { isrHttpInterceptors, provideISR } from './provide-isr';
export { CompressStaticFilter } from './utils/compression-utils';
