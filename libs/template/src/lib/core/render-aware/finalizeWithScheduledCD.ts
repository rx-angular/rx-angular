import { MonoTypeOperatorFunction, Observable, Subscriber } from 'rxjs';
import { RenderStrategy } from './interfaces';

/**
 * Operator that handles scheduling change detection on error and complete observable notifications
 * for the view and cancellation of this scheduled CD on teardown.
 *
 * @param strategy
 * @param config determines whether change detection should be triggered on error and/or complete
 */
export function finalizeWithScheduledCD<T>(
  strategy: RenderStrategy,
  config = { scheduleOnError: true, scheduleOnComplete: true }
): MonoTypeOperatorFunction<T> {
  return (o$: Observable<T>) =>
    new Observable((subscriber: Subscriber<T>) => {
      let abortController: AbortController;
      const subscription = o$.subscribe({
        error: (err) => {
          subscriber.error(err);
          if (config.scheduleOnError) {
            abortController = strategy.scheduleCD();
          }
        },
        complete: () => {
          subscriber.complete();
          if (config.scheduleOnComplete) {
            abortController = strategy.scheduleCD();
          }
        },
      });
      return () => {
        subscription.unsubscribe();
        // cancel any scheduled CD on teardown
        abortController?.abort();
      };
    });
}
