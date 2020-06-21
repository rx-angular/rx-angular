import { isObjectGuard, isKeyOf } from '../../core/utils/typing';
/**
 * @description
 * Accepts object of type T, key of type K extends keyof T, and value of type T[K].
 * Sets the property and returns new updated object.
 * Not mutating original object.
 *
 * @example
 *
 * const cat = {id: 1, type: 'cat', name: 'Fluffy'};
 *
 * const renamedCat = setProp(cat, 'name', 'Bella');
 *
 * // renamedCat will be:
 * // {id: 1, type: 'cat', name: 'Bella'};
 *
 * @returns T
 *
 * @docsPage setProp
 * @docsCategory transformation-helpers
 */
export function setProp<T extends object, K extends keyof T>(
  object: T,
  key: K,
  value: T[K]
): T {
  if (!isObjectGuard(object)) {
    return {} as T;
  }

  if (isKeyOf<T>(key)) {
    return {
      ...object,
      [key]: value
    };
  }

  return object;
}
