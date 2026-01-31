import { InjectionToken, Provider, Signal } from '@angular/core';
import { RxStrategyNames } from '@rx-angular/cdk/render-strategies';

export const VIRTUAL_VIEW_CONFIG_TOKEN =
  new InjectionToken<RxVirtualViewConfig>('VIRTUAL_VIEW_CONFIG_TOKEN', {
    providedIn: 'root',
    factory: () => VIRTUAL_VIEW_CONFIG_DEFAULT,
  });

export interface RxVirtualViewConfig {
  enabled: boolean | Signal<boolean>;
  keepLastKnownSize: boolean;
  useContentVisibility: boolean;
  useContainment: boolean;
  placeholderStrategy: RxStrategyNames<string>;
  contentStrategy: RxStrategyNames<string>;
  cacheEnabled: boolean;
  startWithPlaceholderAsap: boolean;

  /**
   * Whether to enable the visibility after hydration. (DEFAULT: true)
   *
   * If `false`, the elements that were hydrated, won't go back to render placeholder anymore on hydration.
   * You can disable this to avoid destroying components that were just hydrated.
   */
  enableAfterHydration: boolean;

  cache: {
    /**
     * The maximum number of contents that can be stored in the cache.
     * Defaults to 20.
     */
    contentCacheSize: number;

    /**
     * The maximum number of placeholders that can be stored in the cache.
     * Defaults to 20.
     */
    placeholderCacheSize: number;
  };
}

export const VIRTUAL_VIEW_CONFIG_DEFAULT: RxVirtualViewConfig = {
  enabled: true,
  keepLastKnownSize: false,
  useContentVisibility: false,
  useContainment: true,
  placeholderStrategy: 'low',
  contentStrategy: 'normal',
  startWithPlaceholderAsap: false,
  cacheEnabled: true,
  enableAfterHydration: true,

  cache: {
    contentCacheSize: 20,
    placeholderCacheSize: 20,
  },
};

/**
 * Provides a configuration object for the `VirtualView` service.
 *
 * Can be used to customize the behavior of the `VirtualView` service.
 *
 * Default configuration:
 * - contentCacheSize: 20
 * - placeholderCacheSize: 20
 *
 * Example usage:
 *
 * ```ts
 * import { provideVirtualViewConfig } from '@rx-angular/template/virtual-view';
 *
 * const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideVirtualViewConfig({
 *       contentCacheSize: 50,
 *       placeholderCacheSize: 50,
 *     }),
 *   ],
 * };
 * ```
 *
 * @developerPreview
 *
 * @param config - The configuration object.
 * @returns An object that can be provided to the `VirtualView` service.
 */
export function provideVirtualViewConfig(
  config: VVConfig | (() => VVConfig),
): Provider {
  if (typeof config === 'function') {
    return {
      provide: VIRTUAL_VIEW_CONFIG_TOKEN,
      useFactory: () => {
        const cfg = config();
        return {
          ...VIRTUAL_VIEW_CONFIG_DEFAULT,
          ...cfg,
          cache: {
            ...VIRTUAL_VIEW_CONFIG_DEFAULT.cache,
            ...(cfg?.cache ?? {}),
          },
        };
      },
    } satisfies Provider;
  }

  return {
    provide: VIRTUAL_VIEW_CONFIG_TOKEN,
    useValue: {
      ...VIRTUAL_VIEW_CONFIG_DEFAULT,
      ...config,
      cache: { ...VIRTUAL_VIEW_CONFIG_DEFAULT.cache, ...(config?.cache ?? {}) },
    },
  } satisfies Provider;
}

type VVConfig = Partial<
  RxVirtualViewConfig & { cache?: Partial<RxVirtualViewConfig['cache']> }
>;
