import { isObjectGuard, isKeyOf } from '../../core/utils/typing';
/**
 * @description
 * Accepts an object of type T, key of type K extends keyof T, and value of type T[K].
 * Sets the property and returns a newly updated shallow copy of an object while not mutating the original one
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
  const initialObject = isObjectGuard(object) ? object : ({} as T);

  if (isKeyOf<T>(key)) {
    return {
      ...initialObject,
      [key]: value
    };
  }

  return { ...initialObject };
}
