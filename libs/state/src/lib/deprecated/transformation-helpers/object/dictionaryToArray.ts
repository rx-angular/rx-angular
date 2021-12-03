import { isDefined, isObjectGuard } from '../../utils';

/**
 * @deprecated moved to `@rx-angular/cdk/transformations`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function dictionaryToArray<T>(dictionary: { [key: string]: T }): T[] {
  if (!isDefined(dictionary)) {
    return dictionary;
  }

  if (!isObjectGuard(dictionary)) {
    console.warn(`DictionaryToArray: unexpected input.`);
    return [];
  }

  return Object.values(dictionary);
}
