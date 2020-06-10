export function setProp<T extends object, K extends keyof T>(
  object: T,
  key: K,
  value: T[K]
): T {
  return {
    ...object,
    [key]: value
  };
}
