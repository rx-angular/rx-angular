import { Observable, OperatorFunction } from 'rxjs';
import { map, materialize, tap } from 'rxjs/operators';
import { notificationToRxNotification, RxNotification } from '../Notification';

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
