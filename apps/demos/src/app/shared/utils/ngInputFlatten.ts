import { Observable } from 'rxjs/internal/Observable';
import { MonoTypeOperatorFunction } from 'rxjs/internal/types';
import { distinctUntilChanged, map, switchAll } from 'rxjs/operators';
import { isObservable, of, OperatorFunction } from 'rxjs';

export function ngInputFlatten<T>(): OperatorFunction<T | Observable<T>, T> {
  return o$ => o$.pipe(
    map(o => isObservable(o) ? o : of(o)),
    distinctUntilChanged(),
    switchAll(),
    distinctUntilChanged()
  );
}
