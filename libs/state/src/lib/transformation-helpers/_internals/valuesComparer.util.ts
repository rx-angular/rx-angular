import { CompareFn } from '../../rxjs/interfaces';
import { ComparableData } from '../interfaces/comparable-data-type';
import { isKeyOf } from '../../core';

const defaultCompareFn = <T>(a: T, b: T) => a === b;

export function valuesComparer<T>(
  original: T,
  incoming: T,
  compare?: ComparableData<T>
): boolean {

  if (isKeyOf<T>(compare)) {
    return original[compare] === incoming[compare];
  }

  if (Array.isArray(compare)) {
    const sanitizedKeys = compare.filter((k) => isKeyOf<T>(k));
    return sanitizedKeys.length > 0
      ? sanitizedKeys.every((k) => original[k] === incoming[k])
      : defaultCompareFn(original, incoming);
  }

  return ((compare as CompareFn<T>) || defaultCompareFn)(original, incoming);
}
