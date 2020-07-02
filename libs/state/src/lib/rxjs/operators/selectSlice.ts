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
 * You can fine grain your distinct checks by providing a `KeyCompareMap` with those keys you want to compute
 * explicitly different
 *
 * @example
 *
 * // An example with a custom comparison applied to each key
 * import { of } from 'rxjs';
 * import { selectSlice } from 'rx-angular/state';
 *
 *
 * const state$: Observable<MyState> = of(
 *  { title: 'myTitle', panelOpen: true},
 *  { title: 'myTitle2', panelOpen: true},
 *  { title: 'newTitle', panelOpen: true},
 *  { title: 'newTitle', panelOpen: false}
 * )
 * .pipe(
 *     selectSlice(['title', 'panelOpen']),
 *   )
 *   .subscribe(x => console.log(x));
 *
 * // displays:
 * //  { title: 'myTitle', panelOpen: true },
 * //  { title: 'myTitle2', panelOpen: true },
 * //  { title: 'newTitle', panelOpen: true },
 * //  { title: 'newTitle', panelOpen: false }
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
 * // Select items and title.
 * // apply custom compare logic for the items array
 * const customComparison: KeyCompareMap<MyState> = {
 *   items: (oldItems, newItems) => compareItems(oldItems, newItems)
 * };
 * const state$: Observable<MyState> = of(
 * { title: 'myTitle', items: ['foo', 'bar'], panelOpen: true },
 * { title: 'myTitle', items: ['foo', 'bar'], panelOpen: false },
 * { title: 'nextTitle', items: ['foo', 'baR'], panelOpen: true },
 * { title: 'nextTitle', items: ['fooRz', 'boo'], panelOpen: false },
 * );
 * const slice$ = state$.pipe(selectSlice(['title', 'items']), tap(console.log)).subscribe();
 *
 * // displays:
 * // { title: 'myTitle', items: ['foo', 'bar'] }
 * // { title: 'nextTitle', items: ['foo', 'baR'] }
 * // { title: 'nextTitle', items: ['fooRz', 'boo'] }
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
): OperatorFunction<T, PickSlice<T, K> | null> {
  return (o$: Observable<T>): Observable<PickSlice<T, K> | null> =>
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
          }, {} as PickSlice<T, K>);
      }),
      filter(v => v !== undefined),
      distinctUntilSomeChanged(keys, keyCompareMap)
    );
}

type PickSlice<T extends object, K extends keyof T> = Pick<
  T,
  { [I in keyof T]: I }[K]
>;
