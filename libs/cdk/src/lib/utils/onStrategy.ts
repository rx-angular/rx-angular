import { RenderWork, StrategyCredentials, CoalescingOptions } from '../model';
import { Observable, of } from 'rxjs';

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
  strategy: StrategyCredentials,
  workFactory: (value: T, work: RenderWork, options: CoalescingOptions) => void,
  options: CoalescingOptions = {}
): Observable<T> {
  return of(value).pipe(
    strategy.behavior(
      () => workFactory(value, strategy.work, options),
      options.scope || {}
    )
  );
}
