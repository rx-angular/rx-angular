import { OperatorFunction, Notification } from 'rxjs';
import { map, materialize, tap } from 'rxjs/operators';

import { RxNotification, RxNotificationKind } from './model';

export function rxMaterialize<T>(): OperatorFunction<T, RxNotification<T>> {
  return (o$) =>
    o$.pipe(
      materialize(),
      tap(({ kind, error }) => {
        // As we dont want to just swallow errors we log them here
        if (kind === 'E') {
          console.error(error);
        }
      }),
      map(({ value, error, kind, hasValue }) => {
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

/**
 * @internal
 *
 * @description
 * This function is here to turn RxJS notification kind values into RxNotification kind names.
 * The main reason for the naming is the RxNotification kind values map directly to the default
 * template names (`suspense`, `next`, `error` `complete`) in the directives of the template package
 */
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
