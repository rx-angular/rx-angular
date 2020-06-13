import { isObjectGuard } from '../../core/utils/typing';

export function dictionaryToArray<T>(dictionary: { [key: string]: T }): T[] {
  if (isObjectGuard(dictionary)) {
    return Object.values(dictionary);
  }

  throw new Error(`wrong params to 'dictionaryToArray'`);
}
