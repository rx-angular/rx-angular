import { NgZone } from '@angular/core';
import { RxCoalescingOptions } from '@rx-angular/cdk/coalescing';
import { switchMap, take } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { RxRenderWork, RxStrategyCredentials } from './model';

/**
 * @internal
 *
 * @param value
 * @param strategy
 * @param workFactory
 * @param options
 */
export function onStrategy<T>(
  value: T,
  strategy: RxStrategyCredentials,
  workFactory: (
    value: T,
    work: RxRenderWork,
    options: RxCoalescingOptions
  ) => void,
  options: RxCoalescingOptions & { ngZone?: NgZone } = {}
): Observable<T> {
  let error: Error;
  return new Observable<T>((subscriber) => {
    subscriber.next(value);
  }).pipe(
    strategy.behavior({
      work: () => {
        try {
          workFactory(value, strategy.work, options);
        } catch (e) {
          error = e;
        }
      },
      scope: (options.scope as Record<string, unknown>) || {},
      ngZone: options.ngZone,
    }),
    switchMap(() => (error ? throwError([error, value]) : of(value))),
    take(1)
  );
}
