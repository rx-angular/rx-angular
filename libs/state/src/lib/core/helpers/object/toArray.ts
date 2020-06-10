export function toArray<T>(object: { [key: string]: T }): T[] {
  return Object.values(object);
}
