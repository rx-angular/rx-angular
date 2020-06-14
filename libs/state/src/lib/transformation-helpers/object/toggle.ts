import { OnlyKeysOfSpecificType } from '../interfaces/only-keys-of-specific-type';
import { isKeyOf, isObjectGuard } from '../../core/utils/typing';
/**
 * @description
 * Toggles a boolean property in the object.
 * Accepts object of type T and key value of which is boolean.
 * Toggles the property and returns new object.
 * Not mutating original object.
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
  if (isObjectGuard(object)) {
    if (!object[key]) {
      return object;
    }

    if (isKeyOf<T>(key) && typeof object[key] === 'boolean') {
      return { ...object, [key]: !object[key] };
    }
  }

  throw new Error(`wrong params to 'toggle'`);
}
