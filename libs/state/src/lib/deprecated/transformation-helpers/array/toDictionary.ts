import { OnlyKeysOfSpecificType } from '../interfaces/only-keys-of-specific-type';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { isDefined, isKeyOf } from '@rx-angular/state/selections';

/**
 * @deprecated moved to `@rx-angular/cdk/transformations`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function toDictionary<T extends object>(
  source: T[],
  key:
    | OnlyKeysOfSpecificType<T, number>
    | OnlyKeysOfSpecificType<T, string>
    | OnlyKeysOfSpecificType<T, symbol>
): { [key: string]: T } {
  if (!isDefined(source)) {
    return source as any;
  }

  const sourceEmpty = !source.length;

  if (!Array.isArray(source) || sourceEmpty || !isKeyOf<T>(source[0][key])) {
    if (!sourceEmpty) {
      console.warn('ToDictionary: unexpected input params.');
    }
    return {};
  }

  const dictionary: { [key: string]: T } = {};
  const length = source.length;
  let i = 0;

  for (i; i < length; i++) {
    dictionary[`${source[i][key]}`] = Object.assign({}, source[i]);
  }

  return dictionary;
}
