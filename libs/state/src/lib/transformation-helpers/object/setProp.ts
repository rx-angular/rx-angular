import { isObjectGuard, isKeyOf } from '../../core/utils/typing';

export function setProp<T extends object, K extends keyof T>(
  object: T,
  key: K,
  value: T[K]
): T {
  if (isObjectGuard(object) && isKeyOf<T>(key)) {
    return {
      ...object,
      [key]: value
    };
  }

  throw new Error(`wrong params to 'setProp'`);
}
