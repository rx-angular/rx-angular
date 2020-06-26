import { isKeyOf } from './typing';

export function objectDiver<T>(
  obj: T | Partial<T>,
  keys: string[]
): T | Partial<T> {
  const key = keys.shift();
  const value = isKeyOf(key) ? obj[key] : null;
  return !!value ? (keys.length > 0 ? objectDiver(value, keys) : value) : obj;
}
