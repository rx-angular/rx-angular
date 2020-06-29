import { OnlyKeysOfSpecificType } from '../interfaces/only-keys-of-specific-type';
import { isKeyOf, isObjectGuard } from '../../core/utils/typing';
/**
 * @description
 * Toggles a boolean property in the object.
 * Accepts object of type T and key value of which is boolean.
 * Toggles the property and returns a shallow copy of an object, while not mutating the original one.
 *
 * @example
 *
 * const state = {items: [1,2,3], loading: true};
 *
 * const updatedState = toggle(state, 'loading');
 *
 * // updatedState will be:
 * // {items: [1,2,3], loading: false};
 *
 * @returns T
 *
 * @docsPage toggle
 * @docsCategory transformation-helpers
 */

export function toggle<T extends object>(
  object: T,
  key: OnlyKeysOfSpecificType<T, boolean>
): T {
  const initialObject = isObjectGuard(object) ? object : ({} as T);

  if (
    isKeyOf<T>(key) &&
    (typeof initialObject[key] === 'boolean' ||
      !initialObject.hasOwnProperty(key))
  ) {
    return { ...initialObject, [key]: !initialObject[key] };
  }

  return { ...initialObject };
}
