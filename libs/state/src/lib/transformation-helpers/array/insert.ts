export function insert<T, I extends T>(array: T[], itemsOrItem: I[] | I): T[] {
  if (array && itemsOrItem) {
    const items = Array.isArray(itemsOrItem) ? itemsOrItem : [itemsOrItem];
    return [...array, ...items];
  }

  throw new Error(`wrong params to 'insert'`);
}
