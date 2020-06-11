export function merge<T extends object>(object: T, upd: Partial<T>): T {
  if (typeof object === 'object' && typeof upd === 'object') {
    return { ...object, ...upd };
  }

  throw new Error(`wrong params to 'merge'`);
}
