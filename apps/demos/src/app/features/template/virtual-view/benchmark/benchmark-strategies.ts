import { Provider } from '@angular/core';
import {
  provideRxRenderStrategies,
  RX_CONCURRENT_STRATEGIES,
  RxStrategyCredentials,
  RxStrategyProvider,
} from '@rx-angular/cdk/render-strategies';
import { Observable } from 'rxjs';
import { benchmarkStats, SwapStats } from './benchmark.model';

/**
 * Wraps a strategy so every scheduled task is timed: the directive's work
 * (create / reuse / destroy / cache the views) plus the synchronous follow-up
 * in the same task (`detectChanges` of the new view).
 */
function timed(
  strategy: RxStrategyCredentials,
  stats: SwapStats,
): RxStrategyCredentials {
  return {
    ...strategy,
    behavior:
      <T>(config: Parameters<RxStrategyCredentials['behavior']>[0]) =>
      (o$: Observable<T>) =>
        new Observable<T>((subscriber) => {
          let start = 0;
          return strategy
            .behavior<T>({
              ...config,
              work: () => {
                start = performance.now();
                config.work();
              },
            })(o$)
            .subscribe({
              next: (value) => {
                subscriber.next(value);
                if (start) {
                  const end = performance.now();
                  stats.count++;
                  stats.ms += end - start;
                  stats.lastEndAt = end;
                  start = 0;
                }
              },
              error: (error) => subscriber.error(error),
              complete: () => subscriber.complete(),
            });
        }),
  };
}

/**
 * Component-level strategy provider for the benchmark list. `rxVirtualView`
 * renders content with `normal` and placeholders with `low` by default, so
 * overriding those two measures every swap without touching the directive.
 */
export function provideBenchmarkStrategies(): Provider[] {
  return [
    RxStrategyProvider,
    provideRxRenderStrategies({
      customStrategies: {
        normal: timed(RX_CONCURRENT_STRATEGIES.normal, benchmarkStats.swapIn),
        low: timed(RX_CONCURRENT_STRATEGIES.low, benchmarkStats.swapOut),
      },
    }),
  ];
}
