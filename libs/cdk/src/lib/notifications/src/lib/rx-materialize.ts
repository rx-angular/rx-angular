import { OperatorFunction, Notification } from 'rxjs';
import { map, materialize, tap } from 'rxjs/operators';

import { RxNotification, RxNotificationKind } from './model';

export function rxMaterialize<T>(): OperatorFunction<T, RxNotification<T>> {
  return (o$) =>
    o$.pipe(
      materialize(),
      tap(({ kind, error }) => {
        if (kind === 'E') {
          console.error(error);
        }
      }),
      map(({ value, hasValue, error, kind }) => {
        const rxNotificationKind = notificationKindToRxNotificationKind(kind);
        return {
          value,
          hasValue,
          error,
          kind: rxNotificationKind,
          complete: rxNotificationKind === RxNotificationKind.Complete,
        };
      })
    );
}

export function notificationKindToRxNotificationKind(
  kind: Notification<unknown>['kind']
): RxNotificationKind {
  switch (kind) {
    case 'C':
      return RxNotificationKind.Complete;
    case 'E':
      return RxNotificationKind.Error;
    case 'N':
    default:
      return RxNotificationKind.Next;
  }
}
