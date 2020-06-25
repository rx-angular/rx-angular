/**
 * @description
 * The function which is used by `distinctUntilSomeChanged` and `selectSlice` to determine if changes are distinct or
 * not.
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
export type CompareFn<T> = (
  oldVal: T | null | undefined,
  newVal: T | null | undefined
) => boolean;
