import { Observable, OperatorFunction } from 'rxjs';
import { RxNotification } from '../model';
import { map, materialize, tap } from 'rxjs/operators';
import { notificationToRxNotification } from '../../../../../apps/demos/src/app/rx-angular-pocs/cdk/utils/rxjs';

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
