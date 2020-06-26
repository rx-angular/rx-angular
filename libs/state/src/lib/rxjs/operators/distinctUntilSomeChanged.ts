import { MonoTypeOperatorFunction } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { CompareFn, KeyCompareMap } from '../interfaces';

/**
 * @internal
 */
function safePluck<T extends object, K extends keyof T>(
  obj: T | null | undefined,
  key: K
): T[K] | null | undefined {
  return obj != null ? obj[key] : obj;
}

/**
 * @internal
 */
const defaultCompare = <V>(oldVal: V, newVal: V) => oldVal === newVal;

/**
 * @description
 *
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from
 * the previous item. Comparison will be done for each set key in the `keys` array.
 *
 * If a comparator function is provided, then it will be called for each item to test for whether or not that value should be emitted.
 * If properties of the source change which are not specified for comparison, no change will be emitted.
 *
 * The name `distinctUntilSomeChanged` was picked since it internally iterates over the `keys` and utilizes the
 * [some](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/some) method in order to
 * compute if values are distinct or not.
 *
 * @example
 *
 * import { of } from 'rxjs';
 * import { distinctUntilSomeChanged } from 'rx-angular/state';
 *
 * interface Person {
 *    age: number;
 *    name: string;
 * }
 *
 * of(
 *   { age: 4, name: 'Foo'},
 *   { age: 7, name: 'Bar'},
 *   { age: 5, name: 'Foo'},
 *   { age: 6, name: 'Foo'},
 * ).pipe(
 *   distinctUntilSomeChanged(['age', 'name']),
 * )
 * .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Foo' }
 * // { age: 7, name: 'Bar' }
 * // { age: 5, name: 'Foo' }
 * // { age: 6, name: 'Foo' }
 *
 * @example
 * // An example with a custom comparison applied to each key
 * import { of } from 'rxjs';
 * import { distinctUntilSomeChanged } from 'rxjs/operators';
 * import { isDeepEqual } from 'custom/is-equal';
 *
 * interface Person {
 *     age: number;
 *     name: string;
 *  }
 *
 *  const customCompare = (oldVal, newVal) => isDeepEqual(oldVal, newVal);
 *
 * of(
 *     { age: 4, name: 'Foo1'},
 *     { age: 7, name: 'Bar'},
 *     { age: 5, name: 'Foo2'},
 *     { age: 6, name: 'Foo3'},
 *   ).pipe(
 *     distinctUntilSomeChanged(['age', 'name'], customCompare),
 *   )
 *   .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Foo1' }
 * // { age: 7, name: 'Bar' }
 * // { age: 5, name: 'Foo2' }
 * // { age: 6, name: 'Foo3' }
 *
 * @param {K[]} keys String key for object property lookup on each item.
 * @param {CompareFn<T[K]>} [compare] Optional comparison function called to test if an item is distinct from the
 * previous item in the source. (applied to each specified key)
 * @docsPage distinctUntilSomeChanged
 * @docsCategory operators
 */
export function distinctUntilSomeChanged<T extends object, K extends keyof T>(
  keys: K[],
  keyCompareMap?: KeyCompareMap<T>
): MonoTypeOperatorFunction<T> {
  // default compare function applying === to every key
  let distinctCompare: CompareFn<T> = (oldState, newState) =>
    keys.some(
      key => !defaultCompare(safePluck(oldState, key), safePluck(newState, key))
    );

  // generate compare function respecting every case of provided keyCompareMap
  if (keyCompareMap) {
    const compare: (key: K) => CompareFn<T[K]> = key =>
      keyCompareMap[key] || defaultCompare;
    distinctCompare = (oldState, newState) => {
      return keys.some(
        key => !compare(key)(safePluck(oldState, key), safePluck(newState, key))
      );
    };
  }
  return distinctUntilChanged((oldV, newV) => !distinctCompare(oldV, newV));
}
