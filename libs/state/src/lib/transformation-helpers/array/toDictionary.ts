import { OnlyKeysOfSpecificType } from '../interfaces/only-keys-of-specific-type';
import { isKeyOf } from '../../core/utils/typing';

/**
 * @description
 * Converts an array of objects to a dictionary {[key: string]: T}.
 * Accepts array T[] and key of type string, number or symbol as inputs.
 * Returns dictionary {[key: string]: T};
 *
 *
 * @example
 *
 * const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}, {id: 3, type: 'parrot'}];
 *
 * const creaturesDictionary = toDictionary(creatures, 'id');
 *
 * // creaturesDictionary will be:
 * // {
 * //  1: {id: 1, type: 'cat'},
 * //  2: {id: 2, type: 'dog'},
 * //  3: {id: 3, type: 'parrot'}
 * // };
 *
 * @see {@link OnlyKeysOfSpecificType}
 * @param {OnlyKeysOfSpecificType<T, S>} key
 * @returns { [key: string]: T[] }
 * @docsPage toDictionary
 * @docsCategory transformation-helpers
 */
export function toDictionary<T extends object>(
  array: T[],
  key:
    | OnlyKeysOfSpecificType<T, number>
    | OnlyKeysOfSpecificType<T, string>
    | OnlyKeysOfSpecificType<T, symbol>
): { [key: string]: T } {
  if (array === null || array === undefined) {
    return undefined as any;
  }

  if (!Array.isArray(array) || !array.length || !isKeyOf<T>(array[0][key])) {
    return {};
  }

  return array.reduce(
    (acc, entity) => ({
      ...acc,
      [entity[key] as any]: entity
    }),
    {}
  );
}
