import { isObservable, Observable, of } from 'rxjs';

/**
 * This Observable factory creates an Observable out of a static value or an Observable.
 *
 * @param o - the value to coerce
 */
export function coerceObservable<T>(o: Observable<T> | T): Observable<T> {
  return isObservable(o) ? o : of(o);
}
