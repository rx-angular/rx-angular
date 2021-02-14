import { map, share, startWith } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import {
  RxCompleteNotification,
  RxErrorNotification,
  RxNotificationKind, StrategyCredentials, StrategyCredentialsMap
} from '../model';
import { coerceDistinctWith } from '../template-management';

const rxJsToRxA: Record<'N' | 'E' | 'C', RxNotificationKind> = {
  C: RxNotificationKind.complete,
  E: RxNotificationKind.error,
  N: RxNotificationKind.next,
};

const toRxErrorNotification = (
  error?: any,
  value?: any
): RxErrorNotification => ({
  kind: RxNotificationKind.error,
  hasValue: value || false,
  value: value || undefined,
  complete: false,
  error: error || true,
});
// const toRxSuspenseNotification = (value?: any): RxSuspenseNotification => ({kind: RxNotificationKind.suspense, hasValue: value || false, value, complete: false, error: false});
const toRxCompleteNotification = (value?: any): RxCompleteNotification => ({
  kind: RxNotificationKind.complete,
  hasValue: value || false,
  value,
  complete: true,
  error: false,
});

export function nameToStrategyCredentials(
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
  const strategyName$ = new ReplaySubject<string | Observable<string>>(1);
  const strategy$: Observable<StrategyCredentials> = strategyName$.pipe(
    coerceDistinctWith(),
    startWith(defaultStrategyName),
    nameToStrategyCredentials(strategies, defaultStrategyName),
    share()
  );
  return {
    strategy$,
    next(name: string | Observable<string>) {
      strategyName$.next(name);
    },
  };
}
