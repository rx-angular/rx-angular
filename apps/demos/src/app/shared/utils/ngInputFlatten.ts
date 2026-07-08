import { isObservable, of, OperatorFunction } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { distinctUntilChanged, map, switchAll } from 'rxjs/operators';

export function ngInputFlatten<T>(): OperatorFunction<T | Observable<T>, T> {
  return (o$) =>
    o$.pipe(
      map((o) => (isObservable(o) ? o : of(o))),
      distinctUntilChanged(),
      switchAll(),
      distinctUntilChanged(),
    );
}
