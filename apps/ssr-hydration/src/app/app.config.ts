import {
  ApplicationConfig,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideRxRenderStrategies,
  RX_CONCURRENT_STRATEGIES,
} from '@rx-angular/cdk/render-strategies';
import { switchMap, tap } from 'rxjs';
import { HydrationTrackerService } from './hydration-tracker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRxRenderStrategies(() => {
      const hydrationTracker = inject(HydrationTrackerService);
      const strategyFactory = (name: string) => {
        return {
          [name]: {
            name,
            work: hydrationTracker.isFullyHydrated()
              ? RX_CONCURRENT_STRATEGIES[name].work
              : (cdRef) => cdRef.markForCheck(),
            behavior: ({ work, scope, ngZone }) => {
              return (o$) =>
                o$.pipe(
                  switchMap(() =>
                    hydrationTracker.isFullyHydrated$.pipe((o$) =>
                      hydrationTracker.isFullyHydrated()
                        ? RX_CONCURRENT_STRATEGIES[name].behavior({
                            work,
                            scope,
                            ngZone,
                          })(o$)
                        : o$.pipe(tap(work)),
                    ),
                  ),
                );
            },
          },
        };
      };
      return {
        customStrategies: {
          ...['immediate', 'userBlocking', 'normal', 'low', 'idle'].reduce(
            (previousValue, currentValue) => {
              return { ...previousValue, ...strategyFactory(currentValue) };
            },
            {},
          ),
        },
      };
    }),
  ],
};
