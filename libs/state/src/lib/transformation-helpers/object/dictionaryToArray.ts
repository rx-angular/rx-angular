import { isObjectGuard } from '../../core/utils/typing';

/**
 * @description
 * Converts dictionary of type {[key: string]: T} to array T[].
 *
 * @example
 *
 * const creaturesDictionary = {
 *   '1': {id: 1, type: 'cat'},
 *   '2': {id: 2, type: 'dog'},
 *   '3': {id: 3, type: 'parrot'}
 * };
 *
 * const creaturesArray = dictionaryToArray(creaturesDictionary);
 *
 * // creaturesArray will be:
 * // [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}, {id: 3, type: 'parrot'}];
 *
 * @returns T[];
 *
 * @docsPage dictionaryToArray
 * @docsCategory transformation-helpers
 */
export function dictionaryToArray<T>(dictionary: { [key: string]: T }): T[] {
  if (isObjectGuard(dictionary)) {
    return Object.values(dictionary);
  }

  throw new Error(`wrong params to 'dictionaryToArray'`);
}
