/**
 * Use the `revalidate` key in route data in order to define the time interval
 * that the ISR Handler should use in order to know when to regenerate a specific route.
 *
 *
 * Options:
 *
 * - Don't specify anything:
 *    The route won't be cached and will always be server-rendered. (Like SSR)
 *
 * - 0:
 *    First serve will be server-rendered and all the other ones will be served from cache. (Like SSG).
 *
 * - More than 0 (ex.: 5):
 *    First serve will be server-rendered and the cache will be regenerated every 5 seconds (after the last request).
 *
 * ### Example
 * ```typescript
 * const routes: Routes = [
 *   {
 *     path: "one",
 *     component: PageOneComponent
 *   },
 *   {
 *     path: "two",
 *     component: PageTwoComponent,
 *     data: { revalidate: 5 }
 *   },
 *   {
 *     path: "three",
 *     component: PageThreeComponent,
 *     data: { revalidate: 0 }
 *   }
 * ];
 * ```

 * - Path `one`:
 *    It won't be cached and will always be server-rendered before being served to the user.
 *
 * - Path `two`:
 *    The first request will be server-rendered and then will be cached.
 *    On the second request, it will be served from the cache that was saved on the first request.
 *    The url will be added to a regeneration queue, in order to re-generate the cache after `5` seconds.
 *    On the third request, if the regeneration was finished successfully
 *    the user will be served the regenerated page, otherwise he will be served with the old cached page.
 *
 * - Path `three`:
 *    The first request will be server-rendered and then will be cached.
 *    After the first request, all the other ones will be served from cache.
 *    So, the cache will never be refreshed automatically.
 *    The only way to refresh the cache is to make a request to /invalidate api route.
 */
export interface ISROptions {
  revalidate: number | null; // none, 0, > 0
  errors?: Error[];
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
