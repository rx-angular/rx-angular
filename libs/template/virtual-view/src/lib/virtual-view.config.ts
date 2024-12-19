import { InjectionToken, Provider } from '@angular/core';

export const VIRTUAL_VIEW_CONFIG_TOKEN =
  new InjectionToken<RxVirtualViewConfig>('VIRTUAL_VIEW_CONFIG_TOKEN', {
    providedIn: 'root',
    factory: () => VIRTUAL_VIEW_CONFIG_DEFAULT,
  });

export interface RxVirtualViewConfig {
  /**
   * The maximum number of templates that can be stored in the cache.
   * Defaults to 20.
   */
  maxTemplates?: number;

  /**
   * The maximum number of placeholders that can be stored in the cache.
   * Defaults to 20.
   */
  maxPlaceholders?: number;
}

export const VIRTUAL_VIEW_CONFIG_DEFAULT: RxVirtualViewConfig = {
  maxTemplates: 20,
  maxPlaceholders: 20,
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
 * @param config - The configuration object.
 * @returns An object that can be provided to the `VirtualView` service.
 */
export function provideVirtualViewConfig(
  config: RxVirtualViewConfig,
): Provider {
  return {
    provide: VIRTUAL_VIEW_CONFIG_TOKEN,
    useValue: config,
  } satisfies Provider;
}
