import { Notification, Observable, OperatorFunction } from 'rxjs';
import {
  RxCompleteNotification,
  RxErrorNotification,
  RxNotification,
  RxNotificationKind,
} from '../model';
import { map, materialize, tap } from 'rxjs/operators';

const notificationToRxNotification = <T>(
  notification: Notification<T>
): RxNotification<T> => {
  const kind = rxJsToRxA[notification.kind];
  if (kind === RxNotificationKind.error) {
    return toRxErrorNotification(notification.error);
  }
  if (kind === RxNotificationKind.complete) {
    return toRxCompleteNotification(notification.value);
  }

  return {
    ...notification,
    error: false,
    complete: false,
    kind,
  };
};

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

export function rxMaterialize<T>(): OperatorFunction<T, RxNotification<T>> {
  return (o$: Observable<T>): Observable<RxNotification<T>> =>
    o$.pipe(
      materialize(),
      tap(({ kind, error }) => {
        if (kind === 'E') {
          console.error(error);
        }
      }),
      map(notificationToRxNotification)
    );
}
