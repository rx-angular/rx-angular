import { OnlyKeysOfSpecificType } from '../interfaces/only-keys-of-specific-type';
import { isKeyOf, isObjectGuard } from '../../core/utils/typing';
/**
 * @description
 * Toggles a boolean property in the object.
 * Accepts object of type T and key value of which is boolean.
 * Toggles the property and returns a new object, while not mutating the original one.
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
  if (!isObjectGuard(object)) {
    return {} as T;
  }

  if (
    isKeyOf<T>(key) &&
    (typeof object[key] === 'boolean' || !object.hasOwnProperty(key))
  ) {
    return { ...object, [key]: !object[key] };
  }

  return object;
}
