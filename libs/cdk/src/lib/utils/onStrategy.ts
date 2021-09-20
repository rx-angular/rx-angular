import { NgZone } from '@angular/core';
import { RxCoalescingOptions } from '@rx-angular/cdk/coalescing';
import { switchMap } from 'rxjs/operators';
import {
  RxRenderWork,
  RxStrategyCredentials,
} from '../model';
import { Observable, Observer, of, throwError } from 'rxjs';
import {
  RxRenderError,
  RxRenderErrorFactory,
} from '../template-management/render-error';

/**
 * @internal
 *
 * @param value
 * @param strategy
 * @param workFactory
 * @param options
 */
/*export function onStrategy<T>(
  value: T,
  strategy: RxStrategyCredentials,
  workFactory: (
    value: T,
    work: RxRenderWork,
    options: RxCoalescingOptions
  ) => void,
  options: RxCoalescingOptions = {}
): Observable<T> {
  return of(value).pipe(
    strategy.behavior(
      () => workFactory(value, strategy.work, options),
      options.scope || {}
    )
  );
}*/

/**
 * @internal
 *
 * @param value
 * @param strategy
 * @param workFactory
 * @param options
 * @param errorFactory
 */
export function onStrategy<T>(
  value: T,
  strategy: RxStrategyCredentials,
  workFactory: (
    value: T,
    work: RxRenderWork,
    options: RxCoalescingOptions
  ) => void,
  options: RxCoalescingOptions & { ngZone?: NgZone } = {},
  errorFactory: RxRenderErrorFactory<T, any> = (e, v) => [e, v]
): Observable<T> {
  let error: Error;
  return of(value).pipe(
    strategy.behavior(() => {
      try {
        workFactory(value, strategy.work, options);
      } catch (e) {
        error = e;
      }
    }, options.scope || {}, options.ngZone),
    switchMap(() =>
      error ? throwError(errorFactory(error, value)) : of(value)
    )
  );
}
