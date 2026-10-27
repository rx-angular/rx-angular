import { InjectionToken, Provider } from '@angular/core';

/**
 * Configuration for the `HydrationTracker` service.
 */
export interface HydrationTrackerConfig {
  /**
   * The timeout in milliseconds after which the hydration tracker will consider the application hydrated.
   * If not provided, defaults to 10 seconds (10000 milliseconds).
   */
  timeout?: number;

  /**
   * Whether to log the hydration tracker events to the console.
   * If not provided, defaults to false.
   */
  logging?: boolean;
}

const defaultConfig: HydrationTrackerConfig = {
  timeout: 10000,
  logging: false,
};

/**
 * Injection token for the `HydrationTracker` service configuration.
 */
export const HYDRATION_TRACKER_CONFIG_TOKEN =
  new InjectionToken<HydrationTrackerConfig>('HYDRATION_TRACKER_CONFIG_TOKEN', {
    providedIn: 'root',
    factory: () => defaultConfig,
  });

/**
 * Provides a configuration object for the `HydrationTracker` service.
 *
 * @param config - The configuration object.
 *
 * Example usage:
 * ```ts
 * import { provideHydrationTracker } from '@rx-angular/cdk/ssr';
 *
 * const appConfig: ApplicationConfig = {
 *   providers: [provideHydrationTracker({ timeout: 10000 })],
 * };
 * ```
 */
export function provideHydrationTracker(
  config: HydrationTrackerConfig = defaultConfig,
): Provider {
  return {
    provide: HYDRATION_TRACKER_CONFIG_TOKEN,
    useValue: { ...defaultConfig, ...config },
  } satisfies Provider;
}
