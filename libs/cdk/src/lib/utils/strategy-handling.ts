import { StrategyCredentials, StrategyCredentialsMap } from '../model';
import { Observable, ReplaySubject } from 'rxjs';
import { map, mergeAll, share, startWith } from 'rxjs/operators';
import { hotFlatten } from './hotFlatten';

/**
 * @internal
 *
 * A factory function returning an object to handle the process of turning strategy names into `StrategyCredentials`
 * You can next a strategy name as Observable or string and get an Observable of `StrategyCredentials`
 *
 * @param defaultStrategyName
 * @param strategies
 */
export function strategyHandling(
  defaultStrategyName: string,
  strategies: StrategyCredentialsMap
): {
  strategy$: Observable<StrategyCredentials>;
  next(name: string | Observable<string>): void;
} {
  const hotFlattened = hotFlatten(
    () => new ReplaySubject<string | Observable<string>>(1),
    mergeAll()
  );
  return {
    strategy$: hotFlattened.values$.pipe(
      startWith(defaultStrategyName),
      nameToStrategyCredentials(strategies, defaultStrategyName),
      share()
    ),
    next(name: string | Observable<string>) {
      hotFlattened.next(name);
    },
  };
}

/**
 * @internal
 */
function nameToStrategyCredentials(
  strategies: StrategyCredentialsMap,
  defaultStrategyName: string
) {
  return (
    o$: Observable<string | null | undefined>
  ): Observable<StrategyCredentials> =>
    o$.pipe(
      map((name) =>
        name && Object.keys(strategies).includes(name)
          ? strategies[name]
          : strategies[defaultStrategyName]
      )
    );
}
