import { isKeyOf } from '../../core/utils';

export function setProp<T extends object, K extends keyof T>(
  object: T,
  key: K,
  value: T[K]
): T {
  if (isKeyOf<T>(key) && !Array.isArray(object)) {
    return {
      ...object,
      [key]: value
    };
  }

  throw new Error(`wrong params to 'setProp'`);
}
