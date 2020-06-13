import { CompareFn } from '../../rxjs/interfaces/compare-fn';

export function remove<T, I extends T>(
  array: NonNullable<NonNullable<T>[]>,
  itemsOrItem: NonNullable<NonNullable<I>[]> | NonNullable<I>,
  compare?: CompareFn<T>
): T[] {
  if (array && itemsOrItem) {
    const items = Array.isArray(itemsOrItem) ? itemsOrItem : [itemsOrItem];
    const defaultCompare = (a: T, b: T) => a === b;
    const innerCompare = compare || defaultCompare;

    return array.filter(existingItem => {
      return !items.some(item => innerCompare(item, existingItem));
    });
  }

  throw new Error(`wrong params to 'remove'`);
}
