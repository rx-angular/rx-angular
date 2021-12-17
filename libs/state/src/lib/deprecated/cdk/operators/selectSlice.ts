import { Observable, OperatorFunction } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { KeyCompareMap, PickSlice } from '../interfaces';
import { distinctUntilSomeChanged } from './distinctUntilSomeChanged';

/**
 * @deprecated moved to `@rx-angular/cdk/state`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function selectSlice<T extends object, K extends keyof T>(
  keys: K[],
  keyCompareMap?: KeyCompareMap<{ [P in K]: T[P] }>
): OperatorFunction<T, PickSlice<T, K>> {
  return (o$: Observable<T>): Observable<PickSlice<T, K>> =>
    o$.pipe(
      filter((state) => state !== undefined),
      map((state) => {
        // forward null
        if (state === null) {
          return null;
        }
        // an array of all keys which exist and are _defined_ in the state object
        const definedKeys = keys
          // filter out undefined properties e. g. {}, { str: undefined }
          .filter((k) => state.hasOwnProperty(k) && state[k] !== undefined);

        // we want to ensure to only emit _valid_ selections
        // a selection is _valid_ if every selected key exists and has a value:

        // {} => selectSlice(['foo']) => no emission
        // {str: 'test'} => selectSlice([]) => no emission
        // {str: 'test'} => selectSlice(['notPresent']) => no emission
        // {str: 'test'} => state.select(selectSlice([])) => no emission
        // {str: 'test'} => state.select(selectSlice(['notPresent'])) => no emission
        // {str: undefined} => state.select(selectSlice(['str'])) => no emission
        // {str: 'test', foo: undefined } => state.select(selectSlice(['foo'])) => no emission
        if (definedKeys.length < keys.length) {
          return undefined;
        }

        // create the selected slice
        return definedKeys
          .reduce((vm, key) => {
            vm[key] = state[key];
            return vm;
          }, {} as PickSlice<T, K>);
      }),
      filter((v) => v !== undefined),
      distinctUntilSomeChanged(keys, keyCompareMap)
    );
}

