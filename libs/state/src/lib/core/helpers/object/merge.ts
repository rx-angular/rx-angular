export function merge<T extends object>(object: T, upd: Partial<T>): T {
  return { ...object, ...upd };
}
