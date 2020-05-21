import { MonoTypeOperatorFunction } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { CompareFn, KeyCompareMap } from '../interfaces';

/**
 * @internal
 */
const defaultCompare = <T, K extends keyof T>(oldVal: any, newVal: any) =>
  oldVal === newVal;

/**
 * @description
 *
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from
 * the previous item. You can provide a custom comparison for each key individually by setting a `KeyCompareMap<T>`.
 * If no comparison is provided for a specified key, an equality check is used by default.
 *
 * If properties of the source change, which are not specified for comparison, no change will be emitted.
 *
 * The name `distinctUntilSomeChanged` was picked since it internally iterates over the `keys` and utilizes the
 * [some](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/some) method in order to
 * compute if values are distinct or not.
 *
 * @example
 * // An example comparing the first letters of just the name property.
 *
 * import { of } from 'rxjs';
 * import { distinctUntilSomeChanged } from 'rx-angular/state';
 *
 * interface Person {
 *    age: number;
 *    name: string;
 * }
 * // compare the first letters of the name property
 * const customComparison: KeyCompareMap<Person> = {
 *   name: (oldName, newName) => oldName.substring(0, 3) === newName.substring(0, 3)
 * };
 *
 * of<Person>(
 *   { age: 4, name: 'Foo1'},
 *   { age: 7, name: 'Bar'},
 *   { age: 5, name: 'Foo2'},
 *   { age: 6, name: 'Foo3'},
 * ).pipe(
 *   distinctUntilSomeChanged(customComparison),
 * )
 * .subscribe(x => console.log(x));
 *
 * // displays:
 * // { age: 4, name: 'Foo1' }
 * // { age: 7, name: 'Bar' }
 * // { age: 5, name: 'Foo2' }
 *
 * @see {@link KeyCompareMap}
 *
 * @param {KeyCompareMap<T>} keyCompareMap
 * @docsPage distinctUntilSomeChanged
 * @docsCategory operators
 */
export function distinctUntilSomeChanged<T extends object, K extends keyof T>(
  keyCompareMap: KeyCompareMap<T>
): MonoTypeOperatorFunction<T>;
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
 * @see {@link distinctUntilChanged}
 * @see {@link distinctUntilKeyChanged}
 * @see {@link CompareFn}
 *
 * @param {K[]} keys String key for object property lookup on each item.
 * @param {CompareFn<T[K]>} [compare] Optional comparison function called to test if an item is distinct from the
 * previous item in the source. (applied to each specified key)
 * @docsPage distinctUntilSomeChanged
 * @docsCategory operators
 */
export function distinctUntilSomeChanged<T extends object, K extends keyof T>(
  keys: K[],
  compare?: CompareFn<T[K]>
): MonoTypeOperatorFunction<T>;
/**
 * @internal
 */
export function distinctUntilSomeChanged<T extends object, K extends keyof T>(
  keysOrMap: K[] | KeyCompareMap<T>,
  compare?: CompareFn<T[K]>
): MonoTypeOperatorFunction<T> {
  let distinctCompare: CompareFn<T>;
  if (Array.isArray(keysOrMap)) {
    const keys = keysOrMap;
    const innerCompare: CompareFn<T[K]> = compare ? compare : defaultCompare;
    distinctCompare = (oldState, newState) =>
      keys.some(key => !innerCompare(oldState[key], newState[key]));
  } else {
    const keyComparatorMap = keysOrMap;
    const innerCompare = (a: T[K], b: T[K], customCompFn?: CompareFn<T[K]>) =>
      customCompFn ? customCompFn(a, b) : defaultCompare(a, b);
    distinctCompare = (oldState, newState) => {
      return Object.keys(keyComparatorMap).some(
        key =>
          !innerCompare(
            (oldState as any)[key],
            (newState as any)[key],
            (keyComparatorMap as any)[key]
          )
      );
    };
  }
  return distinctUntilChanged((oldV, newV) => !distinctCompare(oldV, newV));
}
