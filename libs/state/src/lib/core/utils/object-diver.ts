export function objectDiver<T>(
  obj: T | Partial<T>,
  keys: string[]
): T | Partial<T> {
  const key = keys.shift();
  const value = obj[key];
  if (!!key) {
    return !!value && keys.length > 0 ? objectDiver(value, keys) : value;
  }
  return obj;
}
