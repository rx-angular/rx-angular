import { OnlyKeysOfSpecificType } from '../interfaces/only-keys-of-specific-type';
import { isKeyOf } from '../../core/utils';

export function toDictionary<T extends object>(
  array: T[],
  key:
    | OnlyKeysOfSpecificType<T, number>
    | OnlyKeysOfSpecificType<T, string>
    | OnlyKeysOfSpecificType<T, symbol>
): { [key: string]: T } {
  if (isKeyOf<T>(array[0][key])) {
    return array.reduce(
      (acc, entity) => ({
        ...acc,
        [entity[key] as any]: entity
      }),
      {}
    );
  }

  throw new Error(`${key} is not a string, number or symbol`);
}
