import { RxCoalescingOptions } from '@rx-angular/cdk/coalescing';
import { switchMap, take } from 'rxjs/operators';
import {
  RxRenderWork,
  RxStrategyCredentials,
} from '../model';
import { Observable, of, throwError } from 'rxjs';
import {
  RxRenderErrorFactory,
} from '../template-management/render-error';

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
  options: RxCoalescingOptions = {},
  errorFactory: RxRenderErrorFactory<T, any> = (e, v) => [e, v]
): Observable<T> {
  let error: Error;
  return new Observable<T>(subscriber => {
    subscriber.next(value);
  }).pipe(
    strategy.behavior(() => {
      try {
        workFactory(value, strategy.work, options);
      } catch (e) {
        error = e;
      }
    }, options.scope || {}),
    switchMap(() =>
      error ? throwError(errorFactory(error, value)) : of(value)
    ),
    take(1)
  );
}
