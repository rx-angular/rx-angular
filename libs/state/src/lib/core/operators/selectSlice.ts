import { from, Observable, OperatorFunction } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  mergeAll,
  scan
} from 'rxjs/operators';

/**
 * @description
 *
 * Returns an Observable that emits only the provided `keys` emitted by the source Observable. Each key will get
 * filtered to only emit _defined_ values as well as checked for distinct emissions.
 *
 * @example
 *
 * import { of, Observable } from 'rxjs';
 * import { tap } from 'rxjs/operators';
 * import { selectSlice } from 'rx-angular/state';
 *
 * interface MyState {
 *    title: string;
 *    items: string[];
 *    panelOpen: boolean;
 * }
 * const state$: Observable<MyState> = of({
 *   title: 'myTitle',
 *   items: ['foo', 'bar'],
 *   panelOpen: true
 * });
 * const slice$ = state$.pipe(selectSlice('items', 'panelOpen')).pipe(tap(console.log)).subscribe();
 *
 * // displays:
 * // { items: ['foo', 'bar'], panelOpen: true }
 *
 *
 * @param {(keyof T)[]} keys - the array of keys which should be selected
 * @docsPage selectSlice
 * @docsCategory operators
 */
export function selectSlice<T extends object>(
  ...keys: (keyof T)[]
): OperatorFunction<T, Partial<T>> {
  return (o$: Observable<T>) => {
    return from(
      keys.map(key =>
        o$.pipe(
          distinctUntilChanged(),
          map(val =>
            val !== undefined && val !== null ? val[key] : undefined
          ),
          filter(v => v !== undefined),
          distinctUntilChanged(),
          map(v => ({ [key]: v }))
        )
      )
    ).pipe(
      mergeAll(),
      scan((slice1, slice2) => ({ ...slice1, ...slice2 }), {} as Partial<T>)
    );
  };
}
