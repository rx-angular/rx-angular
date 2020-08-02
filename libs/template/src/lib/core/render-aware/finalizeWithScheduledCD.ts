import {
  MonoTypeOperatorFunction,
  NextObserver,
  Observable,
  Subscriber,
} from 'rxjs';
import { RenderStrategy } from './interfaces';

/**
 * Operator that handles scheduling change detection on error and complete observable notifications
 * for the view and cancellation of this scheduled CD on teardown.
 *
 * @param strategy
 * @param viewUpdateObserver observer defining logic for the view update on observable notification(s)
 */
export function finalizeWithScheduledCD<T>(
  strategy: RenderStrategy,
  viewUpdateObserver: NextObserver<T>
): MonoTypeOperatorFunction<T> {
  return (o$: Observable<T>) =>
    new Observable((subscriber: Subscriber<T>) => {
      let abortController: AbortController;
      const subscription = o$.subscribe({
        error: (err) => {
          subscriber.error(err);
          if (viewUpdateObserver.error) {
            abortController = strategy.scheduleCD();
          }
        },
        complete: () => {
          subscriber.complete();
          if (viewUpdateObserver.complete) {
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
