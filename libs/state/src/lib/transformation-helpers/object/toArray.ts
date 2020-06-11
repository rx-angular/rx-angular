export function toArray<T>(dictionary: { [key: string]: T }): T[] {
  if (dictionary) {
    return Object.values(dictionary);
  }

  throw new Error(`wrong params to 'toArray'`);
}
