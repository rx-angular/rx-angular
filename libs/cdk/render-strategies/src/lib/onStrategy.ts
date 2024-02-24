import { NgZone } from '@angular/core';
import { RxCoalescingOptions } from '@rx-angular/cdk/coalescing';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
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
  return new Observable<T>((subscriber) => {
    subscriber.next(value);
  }).pipe(
    strategy.behavior({
      work: () => workFactory(value, strategy.work, options),
      scope: (options.scope as Record<string, unknown>) || {},
      ngZone: options.ngZone,
    }),
    catchError((error) => throwError(() => [error, value])),
    map(() => value),
    take(1)
  );
}
