import { isObjectGuard } from '../../core/utils/typing';
/**
 * @description
 * Merges an object of type T with updates of type Partial<T>.
 * Returns a new object where updates override original values while not mutating the original one.

 * @example
 * interface Creature {
 *  id: number,
 *  type: string,
 *  name: string
 * }
 *
 * const cat = {id: 1, type: 'cat'};
 *
 * const catWithname = mergeObjects(cat, {name: 'Fluffy'});
 *
 * // anonymusCat will be:
 * // {id: 1, type: 'cat', name: 'Fluffy'};
 *
 * @returns T
 *
 * @docsPage mergeObjects
 * @docsCategory transformation-helpers
 */
export function mergeObjects<T extends object>(object: T, upd: Partial<T>): T {
  const update = isObjectGuard(upd) ? upd : {};

  if (!isObjectGuard(object)) {
    return update as T;
  }

  return { ...object, ...update };
}
