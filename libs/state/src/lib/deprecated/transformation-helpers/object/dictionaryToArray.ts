// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { isDefined, isObjectGuard } from '@rx-angular/state/selections';

/**
 * @deprecated moved to `@rx-angular/cdk/transformations`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function dictionaryToArray<T>(dictionary: { [key: string]: T }): T[] {
  if (!isDefined(dictionary)) {
    return dictionary as any;
  }

  if (!isObjectGuard(dictionary)) {
    console.warn(`DictionaryToArray: unexpected input.`);
    return [];
  }

  return Object.values(dictionary);
}
