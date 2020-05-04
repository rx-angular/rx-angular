import { MonoTypeOperatorFunction } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

// compareFn should return true if oldVal and newVal are equal
export type CompareFn<T> = (x: T, y: T) => boolean;
export type KeyCompareMap<T extends object> = {
  [K in keyof T]: CompareFn<T[K]>;
};

export function distinctUntilKeysChanged<T extends object>(
  keyCompareMap: KeyCompareMap<T>
): MonoTypeOperatorFunction<T>;
export function distinctUntilKeysChanged<T extends object, K extends keyof T>(
  keys: K[],
  compare?: CompareFn<T[K]>
): MonoTypeOperatorFunction<T>;
export function distinctUntilKeysChanged<T extends object, K extends keyof T>(
  keysOrMap: K[] | KeyCompareMap<T>,
  compare?: CompareFn<T[K]>
): MonoTypeOperatorFunction<T> {
  let distinctCompare: CompareFn<T>;
  const defaultCompare: CompareFn<T[K]> = (oldVal, newVal) => oldVal === newVal;
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
          !innerCompare(oldState[key], newState[key], keyComparatorMap[key])
      );
    };
  }
  return distinctUntilChanged((oldV, newV) => !distinctCompare(oldV, newV));
}
