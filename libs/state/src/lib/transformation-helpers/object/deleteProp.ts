import { isObjectGuard, isKeyOf } from '../../core/utils/typing';

/**
 * @description
 * Accepts an object of type T and key of type K extends keyof T.
 * Removes property from an object and returns a shallow copy of the updated object without specified property.
 * If property not found returns copy of the original object.
 * Not mutating original object.
 *
 * @example
 *
 * const cat = {id: 1, type: 'cat', name: 'Fluffy'};
 *
 * const anonymusCat = deleteProp(cat, 'name');
 *
 * // anonymusCat will be:
 * // {id: 1, type: 'cat'};
 *
 * @returns Omit<T, K>
 *
 * @docsPage deleteProp
 * @docsCategory transformation-helpers
 */
export function deleteProp<T extends object, K extends keyof T>(
  object: T,
  key: K
): Omit<T, K> {
  if (object === undefined || object === null) {
    return object;
  }

  if (!isObjectGuard(object)) {
    return {} as Omit<T, K>;
  }

  if (!isKeyOf<T>(key)) {
    return { ...object };
  }

  const copy = { ...object };
  delete copy[key];
  return copy;
}
