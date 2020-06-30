/**
 * @description
 * The function which is used by `KeyCompareMap` to determine if changes are distinct or not.
 * Should return true if values are equal.
 *
 * @param {T | null | undefined} oldVal
 * @param {T | null | undefined} newVal
 *
 * @return boolean
 *
 * @docsPage interfaces
 * @docsCategory operators
 */
export type CompareFn<T> = (
  oldVal: T | null | undefined,
  newVal: T | null | undefined
) => boolean;
