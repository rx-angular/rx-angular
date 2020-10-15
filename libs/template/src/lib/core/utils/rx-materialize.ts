import { OperatorFunction } from 'rxjs';
import { map, materialize, tap } from 'rxjs/operators';
import { RxNotification, RxNotificationKind } from '../model';

export function rxMaterialize<T>(): OperatorFunction<T, RxNotification<T>> {
  return o$ => o$.pipe(
    materialize(),
    tap(({ kind, error }) => {
      if (kind === 'E') {
        console.error(error);
      }
    }),
    map(({ value, hasValue, error, kind }) => ({
      value,
      hasValue,
      error,
      kind: notificationKindToRxNotificationKind(kind)
    })),
  );
}
export function notificationKindToRxNotificationKind(kind: 'N' | 'E' | 'C'): RxNotificationKind {
  switch (kind) {
    case 'C':
      return 'rxComplete';
    case 'E':
      return 'rxError';
    case 'N':
    default:
      return 'rxNext';
  }
}
