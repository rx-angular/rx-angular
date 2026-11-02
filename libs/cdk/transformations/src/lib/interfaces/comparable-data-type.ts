/**
 * @description
 * The function which is used by `KeyCompareMap` to determine if changes are distinct or not.
 * Should return true if values are equal.
 *
 * @param {T} oldVal
 * @param {T} newVal
 *
 * @return boolean
 *
 * @docsPage interfaces
 * @docsCategory operators
 */
export type CompareFn<T> = (oldVal: T, newVal: T) => boolean;

export type ComparableData<T> = CompareFn<T> | keyof T | (keyof T)[];
