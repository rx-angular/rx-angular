import { InjectionToken, Provider } from '@angular/core';
import { RxStrategyNames } from '@rx-angular/cdk/render-strategies';

export const VIRTUAL_VIEW_CONFIG_TOKEN =
  new InjectionToken<RxVirtualViewConfig>('VIRTUAL_VIEW_CONFIG_TOKEN', {
    providedIn: 'root',
    factory: () => VIRTUAL_VIEW_CONFIG_DEFAULT,
  });

export interface RxVirtualViewConfig {
  keepLastKnownSize: boolean;
  useContentVisibility: boolean;
  useContainment: boolean;
  placeholderStrategy: RxStrategyNames<string>;
  templateStrategy: RxStrategyNames<string>;
  cacheEnabled: boolean;
  startWithPlaceholderAsap: boolean;
  cache: {
    /**
     * The maximum number of templates that can be stored in the cache.
     * Defaults to 20.
     */
    maxTemplates: number;

    /**
     * The maximum number of placeholders that can be stored in the cache.
     * Defaults to 20.
     */
    maxPlaceholders: number;
  };
}

export const VIRTUAL_VIEW_CONFIG_DEFAULT: RxVirtualViewConfig = {
  keepLastKnownSize: false,
  useContentVisibility: false,
  useContainment: true,
  placeholderStrategy: 'low',
  templateStrategy: 'normal',
  startWithPlaceholderAsap: false,
  cacheEnabled: true,
  cache: {
    maxTemplates: 20,
    maxPlaceholders: 20,
  },
};

/**
 * Provides a configuration object for the `VirtualView` service.
 *
 * Can be used to customize the behavior of the `VirtualView` service.
 *
 * Default configuration:
 * - maxTemplates: 20
 * - maxPlaceholders: 20
 *
 * Example usage:
 *
 * ```ts
 * import { provideVirtualViewConfig } from '@rx-angular/template/virtual-view';
 *
 * const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideVirtualViewConfig({
 *       maxTemplates: 50,
 *       maxPlaceholders: 50,
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
  config: Partial<
    RxVirtualViewConfig & { cache?: Partial<RxVirtualViewConfig['cache']> }
  >,
): Provider {
  return {
    provide: VIRTUAL_VIEW_CONFIG_TOKEN,
    useValue: {
      ...VIRTUAL_VIEW_CONFIG_DEFAULT,
      ...config,
      cache: { ...VIRTUAL_VIEW_CONFIG_DEFAULT.cache, ...(config?.cache ?? {}) },
    },
  } satisfies Provider;
}
