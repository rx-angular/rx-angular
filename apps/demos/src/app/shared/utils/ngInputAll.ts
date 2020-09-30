import { distinctUntilChanged, map, switchAll } from 'rxjs/operators';
import { isObservable, of } from 'rxjs';

export function ngInputAll() {
  return o$ => o$.pipe(
    map(o => isObservable(o) ? o : of(o)),
    distinctUntilChanged(),
    switchAll(),
    distinctUntilChanged()
  );
}
