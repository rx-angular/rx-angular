import { OnlyKeysOfSpecificType } from '../interfaces/only-keys-of-specific-type';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
  isDefined,
  isKeyOf,
  isObjectGuard,
} from '@rx-angular/state/selections';

/**
 * @deprecated moved to `@rx-angular/cdk/transformations`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function toggle<T extends object>(
  object: T,
  key: OnlyKeysOfSpecificType<T, boolean>
): T {
  const objectIsObject = isObjectGuard(object);
  const keyIsValid = isKeyOf<T>(key);
  const initialObject = objectIsObject ? object : ({} as T);

  if (!objectIsObject) {
    console.warn(`Toggle: original value (${object}) is not an object.`);
  }

  if (!keyIsValid) {
    console.warn(`Toggle: key argument (${key}) is invalid.`);
  }

  if (keyIsValid && typeof initialObject[key] !== 'boolean') {
    console.warn(`Toggle: value of the key (${String(key)}) is not a boolean.`);
  }

  if (!isDefined(object) && !keyIsValid) {
    return object;
  }

  if (
    keyIsValid &&
    (typeof initialObject[key] === 'boolean' ||
      !initialObject.hasOwnProperty(key))
  ) {
    return { ...initialObject, [key]: !initialObject[key] };
  }

  return { ...initialObject };
}
