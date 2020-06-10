export function deleteProp<T extends object, K extends keyof T>(
  object: T,
  key: K
): Omit<T, K> {
  const copy = { ...object };
  delete copy[key];
  return copy;
}
