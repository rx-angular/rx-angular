import { isDefined, isKeyOf, isObjectGuard } from '../../utils/guards';

/**
 * @deprecated moved to `@rx-angular/cdk/transformations`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function deleteProp<T extends object, K extends keyof T>(
  object: T,
  key: K
): Omit<T, K> {
  if (!isDefined(object) || !isObjectGuard(object)) {
    console.warn(`DeleteProp: original value ${object} is not an object.`);
    return object;
  }

  if (!isKeyOf<T>(key)) {
    console.warn(`DeleteProp: provided key is not a string, number or symbol.`);
    return { ...object };
  }

  const copy = { ...object };
  delete copy[key];
  return copy;
}
