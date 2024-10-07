import { Request } from 'express';

/**
 * CacheISRConfig is the configuration object that is used to store the
 * cache data in the cache handler.
 */
export interface CacheISRConfig {
  revalidate: number | null; // none, 0, > 0
  buildId?: string | null; // the id of the current build
  errors?: string[];
}

export interface CacheData {
  html: string | Buffer;
  options: CacheISRConfig;
  createdAt: number;
}

export interface RenderVariant {
  identifier: string;
  detectVariant: (req: Request) => boolean;
  simulateVariant?: (req: Request) => Request;
}

export interface VariantRebuildItem {
  url: string;
  cacheKey: string;
  reqSimulator: (req: Request) => Request;
}

export abstract class CacheHandler {
  abstract add(
    url: string,
    html: string | Buffer,
    config?: CacheISRConfig,
  ): Promise<void>;

  abstract get(url: string): Promise<CacheData>;

  abstract has(url: string): Promise<boolean>;

  abstract delete(url: string): Promise<boolean>;

  abstract getAll(): Promise<string[]>;

  abstract clearCache?(): Promise<boolean>;
}
