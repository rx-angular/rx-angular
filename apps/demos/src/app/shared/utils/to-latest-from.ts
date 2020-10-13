import { Observable } from 'rxjs';
import { map, startWith, withLatestFrom } from 'rxjs/operators';

export function toLatestFrom<S, I>(secondary$: Observable<S>, initialValue?: S) {
  return (o$: Observable<I>): Observable<S> =>  {
    const _secondary$ = initialValue !== undefined ? secondary$ : secondary$.pipe(startWith(initialValue))
    return o$.pipe(withLatestFrom(_secondary$), map(v => v[1]));
  }
}
