import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompareFn, KeyCompareMap } from '../interfaces';
import { distinctUntilSomeChanged } from './distinctUntilSomeChanged';

function safePluck<T extends object>(key: keyof T) {
  return (val: T) => (val !== undefined && val !== null ? val[key] : undefined);
}

/**
 * @description
 *
 * Returns an Observable that emits a distinct subset of the received object.
 * You can provide a custom comparison for each key individually by setting a `KeyCompareMap<T>`.
 * If no comparison is provided for a specified key, an equality check is used by default.
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
 *
 * // Select title and panelOpen.
 * // compare the first letters of the `title` property and use the default comparison for `panelOpen`
 * const customComparison: KeyCompareMap<MyState> = {
 *   title: (oldTitle, newTitle) => oldTitle.substring(0, 3) === newTitle.substring(0, 3),
 *   panelOpen: undefined
 * };
 *
 * const state$: Observable<MyState> = of(
 *  { title: 'myTitle', items: ['foo', 'bar'],  panelOpen: true},
 *  { title: 'myTitle2', items: ['foo', 'bar'],  panelOpen: true},
 *  { title: 'newTitle', items: ['foo', 'bar'],  panelOpen: true},
 *  { title: 'newTitle', items: ['foo', 'bar'],  panelOpen: false}
 * );
 * const viewModel$ = state$.pipe(
 *  selectSlice(customComparison),
 *  tap(console.log)
 * ).subscribe();
 *
 * // displays:
 * // { panelOpen: true, title: 'myTitle' }
 * // { panelOpen: true, title: 'newTitle' }
 * // { panelOpen: false, title: 'newTitle' }
 *
 * @param {KeyCompareMap<T>} keyCompareMap* @docsPage selectSlice
 * @docsCategory operators
 * @docsPage selectSlice
 * @docsCategory operators
 */
export function selectSlice<T extends object, K extends keyof T, R>(
  keyCompareMap: KeyCompareMap<T>
): OperatorFunction<T, R>;

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
 * const slice$ = state$.pipe(selectSlice(['items', 'panelOpen'])).pipe(tap(console.log)).subscribe();
 *
 * // displays:
 * // { items: ['foo', 'bar'], panelOpen: true }
 *
 *
 * @param {(keyof T)[]} keys - the array of keys which should be selected
 * @docsPage selectSlice
 * @docsCategory operators
 */
export function selectSlice<T extends object, K extends keyof T, R>(
  keys: K[],
  compare?: CompareFn<T[K]>
): OperatorFunction<T, R>;
/**
 * @internal
 */
export function selectSlice<T extends object, K extends keyof T, R>(
  keysOrMap: K[] | KeyCompareMap<T>,
  compare?: CompareFn<T[K]>
): OperatorFunction<T, Partial<T>> {
  const keys = Array.isArray(keysOrMap)
    ? keysOrMap
    : (Object.keys(keysOrMap) as K[]);
  const distinctOperator = Array.isArray(keysOrMap)
    ? distinctUntilSomeChanged(keysOrMap, compare)
    : distinctUntilSomeChanged(keysOrMap);

  return (o$: Observable<T>) =>
    o$.pipe(
      distinctOperator,
      map(s =>
        keys.reduce((vm, key) => {
          vm[key] = s[key];
          return vm;
        }, {} as Partial<T>)
      )
    );
}
