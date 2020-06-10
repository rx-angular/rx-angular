export function insert<T>(
  array: NonNullable<NonNullable<T>[]>,
  items: NonNullable<NonNullable<T>[]> | NonNullable<T>
): T[] {
  if (Array.isArray(items)) {
    return [...array, ...items];
  } else {
    return [...array, items];
  }
}
