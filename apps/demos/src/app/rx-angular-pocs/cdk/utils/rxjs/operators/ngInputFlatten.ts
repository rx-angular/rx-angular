import { isObservable, of } from 'rxjs';
import { distinctUntilChanged, map, switchAll } from 'rxjs/operators';

export function ngInputFlatten() {
  return (o$) =>
    o$.pipe(
      map((o) => (isObservable(o) ? o : of(o))),
      distinctUntilChanged(),
      switchAll(),
      distinctUntilChanged(),
    );
}
