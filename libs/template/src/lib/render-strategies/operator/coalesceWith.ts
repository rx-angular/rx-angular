import {
  MonoTypeOperatorFunction,
  Observable,
  Observer,
  SchedulerLike,
  SubscribableOrPromise,
  Subscriber,
  Subscription,
} from 'rxjs';
import { createCoalesceManager } from '../../core/render-aware/coalescing-manager';

/**
 * @description
 * Limits the number of synchronous emitted a value from the source Observable to
 * one emitted value per
 *   [`AnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame), then repeats
 *   this process for every tick of the browsers event loop.
 *
 * The coalesce operator is based on the [throttle](https://rxjs-dev.firebaseapp.com/api/operators/throttle) operator.
 * In addition to that is provides emitted values for the trailing end only, as well as maintaining a context to scope
 *   coalescing.
 *
 * @param {function(value: T): SubscribableOrPromise} scheduler - A function
 * that receives a value from the source Observable, for computing the silencing
 * duration for each source value, returned as an Observable or a Promise.
 * It defaults to `requestAnimationFrame` as durationSelector.
 * @param {Object} config - A configuration object to define `leading` and `trailing` behavior and the context object.
 * Defaults to `{ leading: false, trailing: true }`. The default scoping is per subscriber.
 * @return {Observable<T>} An Observable that performs the coalesce operation to
 * limit the rate of emissions from the source.
 *
 * @usageNotes
 * Emit clicks at a rate of at most one click per second
 * ```ts
 * import { fromEvent, animationFrames } from 'rxjs';
 * import { coalesce } from 'ngRx/component';
 *
 * const clicks = fromEvent(document, 'click');
 * const result = clicks.pipe(coalesce(ev => animationFrames));
 * result.subscribe(x => console.log(x));
 * ```
 */
export function coalesceWith<T>(
  scheduler: SchedulerLike,
  scope?: object
): MonoTypeOperatorFunction<T> {
  const _scope = scope || {};
  return (source) => {
    // We can use this approach over RxJS internal OOP approach as the browser performance issues
    // from back than do not exist anymore and the code is not that bloated
    const o$ = new Observable<T>((observer) => {
      const rootSubscription = new Subscription();
      rootSubscription.add(
        source.subscribe(createInnerObserver(observer, rootSubscription))
      );
      return rootSubscription;
    });

    return o$;

    function createInnerObserver(
      outerObserver: Subscriber<T>,
      rootSubscription: Subscription
    ): Observer<T> {
      let coalescingDurationSubscription: Subscription;
      let latestValue: T | undefined;
      const coa = createCoalesceManager(_scope);
      const tryEmitLatestValue = () => {
        coa.remove();
        if (!coa.isCoalescing()) {
          outerObserver.next(latestValue);
        }
      };
      return {
        complete: () => {
          if (coalescingDurationSubscription) {
            tryEmitLatestValue();
          }
          outerObserver.complete();
        },
        error: (error) => outerObserver.error(error),
        next: (value) => {
          latestValue = value;
          if (!coalescingDurationSubscription) {
            coa.add();
            coalescingDurationSubscription = scheduler.schedule(() => {
              tryEmitLatestValue();
              coalescingDurationSubscription = undefined;
            });
            // stop coalescing if input subscription ends (error, complete, unsubscribe)
            rootSubscription.add(coalescingDurationSubscription);
          }
        },
      };
    }
  };
}
