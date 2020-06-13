import { OnlyKeysOfSpecificType } from '../interfaces/only-keys-of-specific-type';
import { isKeyOf } from '../../core/utils/typing';

export function toDictionary<T extends object>(
  array: T[],
  key:
    | OnlyKeysOfSpecificType<T, number>
    | OnlyKeysOfSpecificType<T, string>
    | OnlyKeysOfSpecificType<T, symbol>
): { [key: string]: T } {
  if (!array.length) {
    return {};
  }

  if (isKeyOf<T>(array[0][key])) {
    return array.reduce(
      (acc, entity) => ({
        ...acc,
        [entity[key] as any]: entity
      }),
      {}
    );
  }

  throw new Error(`wrong params to 'toDictionary'`);
}
