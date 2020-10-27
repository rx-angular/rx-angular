import { distinctUntilChanged, map, switchAll } from 'rxjs/operators';
import { isObservable, Observable, of } from 'rxjs';

export function ngInputFlatten() {
  return o$ => o$.pipe(
    map(o => isObservable(o) ? o : of(o)),
    distinctUntilChanged(),
    switchAll(),
    distinctUntilChanged()
  );
}
