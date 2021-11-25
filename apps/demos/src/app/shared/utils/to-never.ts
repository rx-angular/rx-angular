import { concat, NEVER, Observable } from 'rxjs';

export function toNever<T>(o: Observable<T>): Observable<T> {
  return concat(o, NEVER);
}
