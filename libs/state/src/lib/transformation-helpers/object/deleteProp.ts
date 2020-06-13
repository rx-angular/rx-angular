import { isObjectGuard, isKeyOf } from '../../core/utils/typing';

export function deleteProp<T extends object, K extends keyof T>(
  object: T,
  key: K
): Omit<T, K> {
  if (isObjectGuard(object) && isKeyOf<T>(key)) {
    const copy = { ...object };
    delete copy[key];
    return copy;
  }

  throw new Error(`wrong params to 'deleteProp'`);
}
