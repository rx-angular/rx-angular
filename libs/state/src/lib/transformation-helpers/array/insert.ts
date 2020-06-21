/**
 * @description
 * Inserts one or multiple items to an array T[].
 * Returns a new instance of the updated array T[], and does not mutate the original one.
 *
 * @example
 * // Inserting single value
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
 *
 * @returns T[]
 *
 * @docsPage insert
 * @docsCategory transformation-helpers
 */

export function insert<T, I extends T>(array: T[], itemsOrItem: I[] | I): T[] {
  const items = itemsOrItem
    ? Array.isArray(itemsOrItem)
      ? itemsOrItem
      : [itemsOrItem]
    : [];

  if (!array || !Array.isArray(array)) {
    return items;
  }

  return [...array, ...items];
}
