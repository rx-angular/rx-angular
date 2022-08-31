import { Observable } from 'rxjs';

export { CompareFn } from './compare-fn';
export { KeyCompareMap } from './key-compare-map';
export { NonUndefined } from './non-undefined';
export { PickSlice } from './pick-slice';

export type ObservableMap = Record<string, Observable<any>>;

/**
 * Type to map `ObservableMap` to a static record type
 * the 'in' syntax forces the type specification by key
 */
export type ObservableAccumulation<T extends ObservableMap> = {
  [K in keyof T]: ExtractObservableValue<T[K]>;
};

/**
 * This type avoids empty objects
 */
export type NotEmpty<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type ExtractObservableValue<T> = T extends Observable<infer R>
  ? R
  : never;
export type PropName<T> = keyof T;
export type PropType<T> = T[PropName<T>];

/**
 * Typed reducer function for the `Array#reduce` method.
 */
export type ArrayReducerFn<T extends Record<string, any>> = (
  acc: T,
  cur?: PropType<T>,
  idx?: number
) => T;

