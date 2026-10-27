import { Provider } from '@angular/core';
import { provideRxRenderStrategies } from '@rx-angular/cdk/render-strategies';
import { tap } from 'rxjs';

/**
 * Provider array installing a synchronous `sync` primary render strategy.
 *
 * The `sync` strategy runs `cdRef.detectChanges()` inline so scheduled
 * content/placeholder rendering completes deterministically within a single
 * test tick. Extracted from the pattern used in `virtual-view.directive.spec.ts`.
 */
export function provideSyncRenderStrategies(): Provider[] {
  return [
    provideRxRenderStrategies({
      primaryStrategy: 'sync',
      customStrategies: {
        sync: {
          name: 'sync',
          work: (cdRef) => cdRef.detectChanges(),
          behavior:
            ({ work }) =>
            (o$) =>
              o$.pipe(tap(() => work())),
        },
      },
    }),
  ];
}
