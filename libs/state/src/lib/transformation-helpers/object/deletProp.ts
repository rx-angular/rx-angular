import { isKeyOf } from '../../core/utils';

export function deleteProp<T extends object, K extends keyof T>(
  object: T,
  key: K
): Omit<T, K> {
  if (isKeyOf<T>(key) && !Array.isArray(object)) {
    const copy = { ...object };
    delete copy[key];
    return copy;
  }

  throw new Error('RxState deleteProp: provided key is not valid');
}
