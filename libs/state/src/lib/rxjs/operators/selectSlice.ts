import { KeyCompareMap } from '../interfaces';
import { Observable, OperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { distinctUntilSomeChanged } from './distinctUntilSomeChanged';

/**
 * @description
 *
 * Returns an Observable that emits only the provided `keys` emitted by the source Observable. Each key will get
 * filtered to only emit _defined_ values as well as checked for distinct emissions.
 * Comparison will be done for each set key in the `keys` array.
 *
 * If a comparator function is provided, then it will be called for each item to test for whether or not that value
 *  should be emitted.
 *
 * @example
 *
 * // An example with a custom comparison applied to each key
 * import { of } from 'rxjs';
 * import { selectSlices } from 'rxjs/operators';
 * import { isDeepEqual } from 'custom/is-equal';
 *
 *
 *  const customCompare = (oldVal, newVal) => isDeepEqual(oldVal, newVal);
 *
 * const state$: Observable<MyState> = of(
 *  { title: 'myTitle', items: ['foo'],  panelOpen: true},
 *  { title: 'myTitle2', items: ['foo', 'bar'],  panelOpen: true},
 *  { title: 'newTitle', items: ['foo', 'baz'],  panelOpen: true},
 *  { title: 'newTitle', items: ['foo', 'baz'],  panelOpen: true}
 * )
 * .pipe(
 *     selectSlices(['title', 'items'], customCompare),
 *   )
 *   .subscribe(x => console.log(x));
 *
 * // displays:
 * //  { title: 'myTitle', items: ['foo'] },
 * //  { title: 'myTitle2', items: ['foo', 'bar'] },
 * //  { title: 'newTitle', items: ['foo', 'baz'] },
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
 * // Select title and panelOpen.
 * // compare the first letters of the `title` property and use the default comparison for `panelOpen`
 * const customComparison: KeyCompareMap<MyState> = {
 *   title: (oldTitle, newTitle) => oldTitle.substring(0, 3) === newTitle.substring(0, 3)
 * };
 * const state$: Observable<MyState> = of({
 *   title: 'myTitle',
 *   items: ['foo', 'bar'],
 *   panelOpen: true
 * });
 * const slice$ = state$.pipe(selectSlice(['items', 'panelOpen']), tap(console.log)).subscribe();
 *
 * // displays:
 * // { items: ['foo', 'bar'], panelOpen: true }
 *
 * @param {(K)[]} keys - the array of keys which should be selected
 * @param {KeyCompareMap<{ [P in K]: T[P] }>} [keyCompareMap] Optional KeyCompareMap to provide custom compare logic
 * for some the keys
 * @docsPage selectSlice
 * @docsCategory operators
 */
export function selectSlice<T extends object, K extends keyof T>(
  keys: K[],
  keyCompareMap?: KeyCompareMap<{ [P in K]: T[P] }>
): OperatorFunction<T, PickStrict<T, K> | null> {
  return (o$: Observable<T>): Observable<PickStrict<T, K> | null> =>
    o$.pipe(
      filter(state => state !== undefined),
      map(state => {
        // forward null
        if (state === null) {
          return null;
        }

        const definedKeys = keys
          // filter out undefined properties e. g. {}, { str: undefined }
          .filter(k => state.hasOwnProperty(k) && state[k] !== undefined);

        // this will get filtered out in the next operator
        // {str: 'test'} => selectSlice([]) => no emission
        // {str: 'test'} => selectSlice(['notPresent']) => no emission
        // {str: 'test'} => state.select(selectSlice([])) => no emission
        // {str: 'test'} => state.select(selectSlice(['notPresent'])) => no emission
        if (!definedKeys.length) {
          return undefined;
        }

        // create view-model
        return definedKeys
          .filter(k => state.hasOwnProperty(k) && state[k] !== undefined)
          .reduce((vm, key) => {
            vm[key] = state[key];
            return vm;
          }, {} as PickStrict<T, K>);
      }),
      filter(v => v !== undefined),
      distinctUntilSomeChanged(keys, keyCompareMap)
    );
}

type PickStrict<T extends object, K extends keyof T> = Pick<
  T,
  {
    [I in keyof T]: I;
  }[K]
>;
