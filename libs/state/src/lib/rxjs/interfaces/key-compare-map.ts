import { CompareFn } from './compare-fn';

/**
 * @description
 * The `KeyCompareMap` is used to configure custom comparison for defined keys. You can set the `CompareFn` to
 * `undefined` in order to utilize the default equality check.
 *
 * @example
 * const keyCompareMap = {
 *    myKey: (o, n) => customCompare(o, n),
 *    myOtherKey: undefined
 *  };
 *  const o$ = of({
 *    myKey: 5,
 *    myOtherKey: 'bar'
 *  }).pipe(distinctUntilSomeChanged(keyCompareMap));
 *
 *  //or
 *
 *  const o$ = of({
 *    myKey: 5,
 *    myOtherKey: 'bar'
 *  }).pipe(selectSlice(keyCompareMap));
 *
 * @docsPage interfaces
 * @docsCategory operators
 */
export type KeyCompareMap<T extends object> = {
  [K in keyof T]?: CompareFn<T[K]>;
};
