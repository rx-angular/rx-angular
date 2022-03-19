export interface ISROptions {
  /*
  * TODO: add comments here
  */
  revalidate: number | null; // null, 0, > 0
}

export interface CacheData {
  html: string;
  options: ISROptions;
  createdAt: number;
  deployId?: string; // TODO: this doesn't exist for Angular builds
}

export abstract class CacheHandler {
  abstract add(url: string, html: string, options?: ISROptions): Promise<void>
  abstract get(url: string): Promise<CacheData>
  abstract has(url: string): Promise<boolean>
  abstract delete(url: string): Promise<boolean>
  abstract getAll(): Promise<string[]>
  abstract clearCache?(): Promise<boolean>
}