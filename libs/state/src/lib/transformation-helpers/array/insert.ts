export function insert<T>(
  array: NonNullable<NonNullable<T>[]>,
  itemsOrItem: NonNullable<NonNullable<T>[]> | NonNullable<T>
): T[] {
  if (array && itemsOrItem) {
    const items = Array.isArray(itemsOrItem) ? itemsOrItem : [itemsOrItem];
    return [...array, ...items];
  }

  throw new Error(`wrong params to 'insert'`);
}
