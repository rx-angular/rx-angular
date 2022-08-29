import { Observable, ReplaySubject } from 'rxjs';
import { map, share, startWith, switchAll } from 'rxjs/operators';

import { coerceAllFactory } from '@rx-angular/cdk/coercing';
import { RxCustomStrategyCredentials, RxStrategyCredentials } from './model';

export interface RxStrategyHandler {
  strategy$: Observable<RxStrategyCredentials>;
  next(name: string | Observable<string>): void;
}

/**
 * @internal
 *
 * A factory function returning an object to handle the process of turning strategy names into `RxStrategyCredentials`
 * You can next a strategy name as Observable or string and get an Observable of `RxStrategyCredentials`
 *
 * @param defaultStrategyName
 * @param strategies
 */
export function strategyHandling(
  defaultStrategyName: string,
  strategies: RxCustomStrategyCredentials<string>
): RxStrategyHandler {
  const hotFlattened = coerceAllFactory<string>(
    () => new ReplaySubject<string | Observable<string>>(1),
    switchAll()
  );
  return {
    strategy$: hotFlattened.values$.pipe(
      startWith(defaultStrategyName),
      nameToStrategyCredentials(strategies, defaultStrategyName),
      share()
    ) as Observable<RxStrategyCredentials>,
    next(name: string | Observable<string>) {
      hotFlattened.next(name);
    },
  };
}

/**
 * @internal
 */
function nameToStrategyCredentials(
  strategies: RxCustomStrategyCredentials<string>,
  defaultStrategyName: string
) {
  return (
    o$: Observable<string | null | undefined>
  ): Observable<RxStrategyCredentials> =>
    o$.pipe(
      map((name) =>
        name && Object.keys(strategies).includes(name)
          ? strategies[name]
          : strategies[defaultStrategyName]
      )
    );
}
