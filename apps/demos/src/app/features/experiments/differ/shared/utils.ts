import { Observable } from 'rxjs';
import { distinctUntilChanged, groupBy, map, mergeAll, mergeMap } from 'rxjs/operators';

export function distinctArray<T>(trackBy: (i: T) => any, distinctBy?: (i: T) => any) {
  return (o$: Observable<T[]>): Observable<T> => o$.pipe(
    mergeMap(arr => arr),
    groupBy(i => trackBy(i)),
    map(o => distinctBy ? o.pipe(distinctUntilChanged((a, b) => distinctBy(a) === distinctBy(b))) : o),
    mergeAll()
  );
}

export function constant(x) {
  return function() {
    return x;
  };
}

export function constantPluck<T>(x) {
  return function(i: T) {
    return i[x];
  };
}


