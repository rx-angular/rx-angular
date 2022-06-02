import { isObservable, Observable, ObservableInput, of } from 'rxjs';

/**
 * This Observable factory creates an Observable out of a static value or ObservableInput.
 *
 * @param o - the value to coerce
 */
export function coerceObservable<T>(
  o: ObservableInput<T> | T
): Observable<T> {
  return isObservable(o) ? o : of(o as T);
}
