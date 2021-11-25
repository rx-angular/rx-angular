import { Observable } from 'rxjs';
import { RxNotificationKind } from '../Notification';
import { rxMaterialize } from './rx-materialize';
import { filter, map } from 'rxjs/operators';

export function observableToRxTemplateName<T>() {
  return (o$: Observable<T>): Observable<RxNotificationKind> =>
    o$.pipe(
      rxMaterialize(),
      map((n) => n.kind)
    );
}
