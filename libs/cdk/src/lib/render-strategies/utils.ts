import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  RxCompleteNotification,
  RxErrorNotification,
  RxNotificationKind,
  StrategyCredentials,
  StrategyCredentialsMap,
} from '../model';

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
