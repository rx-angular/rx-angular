import { MonoTypeOperatorFunction } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { CompareFn, KeyCompareMap } from '../interfaces';
import { safePluck } from '../../utils';

/**
 * @deprecated moved to `@rx-angular/cdk/state`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
function defaultCompare<T>(oldVal: T, newVal: T): boolean {
  return oldVal === newVal;
}

/**
 * @deprecated moved to `@rx-angular/cdk/state`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function distinctUntilSomeChanged<T extends object, K extends keyof T>(
  keys: K[],
  keyCompareMap?: KeyCompareMap<T>
): MonoTypeOperatorFunction<T> {
  // default compare function applying === to every key
  let distinctCompare: CompareFn<T> = (oldState, newState) =>
    keys.some(
      (key) =>
        !defaultCompare(safePluck(oldState, [key]), safePluck(newState, [key]))
    );

  // generate compare function respecting every case of provided keyCompareMap
  if (keyCompareMap !== undefined) {
    const compare = (key: K) => {
      return keyCompareMap.hasOwnProperty(key) &&
      keyCompareMap[key] !== undefined
        ? (keyCompareMap[key] as CompareFn<T[K]>)
        : defaultCompare;
    };
    distinctCompare = (oldState, newState) => {
      return keys.some(
        (key) =>
          !compare(key)(safePluck(oldState, [key]), safePluck(newState, [key]))
      );
    };
  }
  return distinctUntilChanged((oldV, newV) => !distinctCompare(oldV, newV));
}
