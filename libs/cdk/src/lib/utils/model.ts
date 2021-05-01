import { Observable } from 'rxjs';

export type ExtractObservableValue<T> = T extends Observable<infer R>
  ? R
  : never;
export type PropName<T> = keyof T;
export type PropType<T> = T[PropName<T>];

/**
 * Type specifying and objects keys types
 */
export type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<any> | string
  ? string[]
  : never;

/**
 * typed Object constructor (ATM only for the key method)
 *
 * @example
 * const keys: 'prop1' | 'prop2' = (Object as ObjectConstructor).keys({prop1: 1, prop2: 2});
 */
export interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;
}

/**
 * Typed reducer function for the `Array#reduce` method.
 */
export type ArrayReducerFn<T extends Record<string, any>> = (
  acc: T,
  cur?: PropType<T>,
  idx?: number
) => T;
