import { map, materialize, tap } from 'rxjs/operators';
import { Notification, Observable, of, OperatorFunction } from 'rxjs';
import {
  RenderWork,
  StrategyCredentials,
  StrategyCredentialsMap,
  RxNotification,
  RxNotificationKind,
  RxErrorNotification,
  RxCompleteNotification
} from './model';
import { CoalescingOptions } from '../model';


const rxJsToRxA = {
  'C': RxNotificationKind.complete,
  'E': RxNotificationKind.error,
  'N': RxNotificationKind.next,
};

const toRxErrorNotification = (error?: any, value?: any): RxErrorNotification => ({kind: RxNotificationKind.error, hasValue: value || false, value: value || undefined, complete: false, error: error || true});
// const toRxSuspenseNotification = (value?: any): RxSuspenseNotification => ({kind: RxNotificationKind.suspense, hasValue: value || false, value, complete: false, error: false});
const toRxCompleteNotification = (value?: any): RxCompleteNotification => ({kind: RxNotificationKind.complete, hasValue: value || false, value, complete: true, error: false});

const notificationToRxNotification = <T>(notification: Notification<T>): RxNotification<T> => {
  const kind = rxJsToRxA[notification.kind];
  if(kind === RxNotificationKind.error) {
    return toRxErrorNotification(notification.error)
  }
  if(kind === RxNotificationKind.complete) {
    return toRxCompleteNotification(notification.value)
  }

  return {
    ...notification,
    error: false,
    complete: false,
    kind
  };

};

export function rxMaterialize<T>(): OperatorFunction<T, RxNotification<T>> {
  return (o$: Observable<T>): Observable<RxNotification<T>> => o$.pipe(
    materialize(),
    tap(({ kind, error }) => {
      if (kind === 'E') {
        console.error(error);
      }
    }),
    map(notificationToRxNotification)
  );
}

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

export function onStrategy<T>(
  value: T,
  strategy: StrategyCredentials,
  workFactory: (value: T, work: RenderWork, options: CoalescingOptions) => void,
  options: CoalescingOptions = {}
) {
  return of(value).pipe(
    strategy.behavior(
      () => workFactory(value, strategy.work, options),
      options.scope || {}
    )
  );
}
