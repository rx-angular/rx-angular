import { isDefined, isKeyOf, isObjectGuard } from '../../utils';

/**
 * @deprecated moved to `@rx-angular/cdk/transformations`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function slice<T extends object, K extends keyof T>(
  object: T,
  keys: K | K[]
): Pick<T, K> {
  const objectIsObject = isDefined(object) && isObjectGuard(object);

  if (!objectIsObject) {
    console.warn(`slice: original value (${object}) is not an object.`);
    return undefined as any;
  }

  const sanitizedKeys = (Array.isArray(keys) ? keys : [keys]).filter(
    (k) => isKeyOf<T>(k) && k in object
  );

  if (!sanitizedKeys.length) {
    console.warn(`slice: provided keys not found`);
    return undefined as any;
  }

  return sanitizedKeys.reduce(
    (acc, k) => ({ ...acc, [k]: object[k] }),
    {} as Pick<T, K>
  );
}
