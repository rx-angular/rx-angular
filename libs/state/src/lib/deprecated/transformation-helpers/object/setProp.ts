import { isDefined, isKeyOf, isObjectGuard } from '../../utils';

/**
 * @deprecated moved to `@rx-angular/cdk/transformations`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function setProp<T extends object, K extends keyof T>(
  object: T,
  key: K,
  value: T[K]
): T {
  const objectIsObject = isObjectGuard(object);
  const keyIsValid = isKeyOf<T>(key);
  const initialObject = objectIsObject ? object : ({} as T);

  if (!objectIsObject) {
    console.warn(`SetProp: original value (${object}) is not an object.`);
  }

  if (!keyIsValid) {
    console.warn(`SetProp: key argument (${key}) is invalid.`);
  }

  if (!isDefined(object) && !keyIsValid) {
    return object;
  }

  if (keyIsValid) {
    return {
      ...initialObject,
      [key]: value
    };
  }

  return { ...initialObject };
}
