export function objectDiver<T, K>(
  obj: T | Partial<T>,
  keys: Array<K | Partial<K>>
): Partial<T> {
  const key = keys.shift();
  if (!!key && !!obj) {
    const value = obj[key];
    return !!value && keys.length > 0 ? objectDiver(value, keys) : value;
  }
  return obj;
}
