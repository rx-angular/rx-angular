import { CompareFn } from '../../rxjs/interfaces/compare-fn';

/**
 * @description
 * Updates one or multiple items in an array T[].
 * You can provide a custom comparison function that should return true if items match.
 * If no comparison is provided, an equality check is used by default.
 * Returns a new instance of the updated array T[], and does not mutate the original one.
 *
 * @example
 *
 * const creatures = [{id: 1, type: 'cat'}, {id: 2, type: 'dog'}];
 *
 * const newCat = {id: 1, type: 'lion'};
 *
 * const updatedCreatures = update(creatures, newCat, (a, b) => a.id === b.id);
 *
 * // updatedCreatures will be:
 * // [{id: 1, type: 'lion'}, {id: 2, type: 'dog'}];
 *
 * @returns T[]
 *
 * @docsPage update
 * @docsCategory transformation-helpers
 */
export function update<T extends object>(
  array: T[],
  itemsOrItem: T[] | T,
  compare?: CompareFn<T>
): T[] {
  const items = itemsOrItem
    ? Array.isArray(itemsOrItem)
      ? itemsOrItem
      : [itemsOrItem]
    : [];
  const defaultCompare = (a: T, b: T) => a === b;
  const innerCompare = compare || defaultCompare;

  if (!array || !Array.isArray(array)) {
    return [...items];
  }

  return array.map(existingItem => {
    return items.find(item => innerCompare(item, existingItem)) || existingItem;
  });
}
