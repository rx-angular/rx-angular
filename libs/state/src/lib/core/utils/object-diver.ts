export function objectDiver<T, K>(
  obj: T | Partial<T>,
  keys: Array<K | Partial<K>>
): T | Partial<T> {
  const key = keys.shift();
  const value = obj[key];
  if (!!key) {
    return !!value && keys.length > 0 ? objectDiver(value, keys) : value;
  }
  return obj;
}
