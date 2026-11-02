import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RxNotificationKind } from '../Notification';
import { rxMaterialize } from './rx-materialize';

export function observableToRxTemplateName<T>() {
  return (o$: Observable<T>): Observable<RxNotificationKind> =>
    o$.pipe(
      rxMaterialize(),
      map((n) => n.kind),
    );
}
