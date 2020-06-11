import { CompareFn } from '../../rxjs/interfaces/compare-fn';

export function update<T>(
  array: NonNullable<NonNullable<T>[]>,
  itemsOrItem: NonNullable<NonNullable<T>[]> | NonNullable<T>,
  compare?: CompareFn<T>
): T[] {
  if (array && itemsOrItem) {
    const items = Array.isArray(itemsOrItem) ? itemsOrItem : [itemsOrItem];
    const defaultCompare = (a: T, b: T) => a === b;
    const innerCompare = compare || defaultCompare;

    return array.map(existingItem => {
      return (
        items.find(item => innerCompare(item, existingItem)) || existingItem
      );
    });
  }

  throw new Error(`wrong params to 'update'`);
}
