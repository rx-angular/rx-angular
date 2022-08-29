// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CompareFn, isKeyOf } from '@rx-angular/state/selections';
import { ComparableData } from '../interfaces/comparable-data-type';

const defaultCompareFn = <T>(a: T, b: T) => a === b;

/**
 * @deprecated moved to `@rx-angular/cdk/transformations`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
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
