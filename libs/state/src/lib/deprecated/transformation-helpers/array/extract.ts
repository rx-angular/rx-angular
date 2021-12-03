import { isDefined, isKeyOf } from '../../utils';

/**
 * @deprecated moved to `@rx-angular/cdk/transformations`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
 export function extract<T extends object, K extends keyof T>(
  array: T[],
  keys: K | K[]
): Pick<T, K>[] {
  const arrayIsArray = isDefined(array) && Array.isArray(array);

  if (!arrayIsArray) {
    console.warn(`extract: original value (${array}) is not an array.`);
    return undefined as any;
  }

  const sanitizedKeys = (Array.isArray(keys) ? keys : [keys]).filter(
    k => isKeyOf<T>(k) && array.some(i => k in i)
  );
  const length = sanitizedKeys.length;

  if (!sanitizedKeys.length) {
    console.warn(`extract: provided keys not found`);
    return undefined as any;
  }

  return array.map(item => {
    let i = 0;
    const result = {} as Pick<T, K>;

    for(i; i < length; i++) {
      result[sanitizedKeys[i]] = item[sanitizedKeys[i]];
    }

    return result;
  }
  );
}
