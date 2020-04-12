import { from, of, Observable, ObservableInput } from 'rxjs';

export function toObservableValue<T>(
  p: ObservableInput<T> | undefined | null
): Observable<T | undefined | null> {
  // @ts-ignore
  return p == null ? of(p) : from(p);
}
