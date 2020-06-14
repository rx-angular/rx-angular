/**
 * @description
 * Inserts one or multiple items to array T[].
 * Returns new updated array T[].
 * Not mutating original array.
 *
 * @example
 * // Inseting single value
 *
 * const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}];
 *
 * const updatedCreatures = insert(items, {id: 3, type: 'parrot'});
 *
 * // updatedCreatures will be:
 * //  [{id: 1, type: 'cat'}, {id: 2, type: 'dog}, {id: 3, type: 'parrot}];
 *
 * @example
 * // Inseting multiple values
 *
 * const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}];
 *
 * const updatedCreatures = insert(items, [{id: 3, type: 'parrot'}, {id: 4, type: 'hamster'}]);
 *
 * // updatedCreatures will be:
 * // [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}, {id: 3, type: 'parrot'}, {id: 4, type: 'hamster'}];
 *
 * @returns T[]
 *
 * @docsPage insert
 * @docsCategory transformation-helpers
 */

export function insert<T, I extends T>(array: T[], itemsOrItem: I[] | I): T[] {
  if (array && itemsOrItem) {
    const items = Array.isArray(itemsOrItem) ? itemsOrItem : [itemsOrItem];
    return [...array, ...items];
  }

  throw new Error(`wrong params to 'insert'`);
}
