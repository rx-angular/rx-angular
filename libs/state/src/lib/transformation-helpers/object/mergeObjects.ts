import { isObjectGuard } from '../../core/utils/typing';

export function mergeObjects<T extends object>(object: T, upd: Partial<T>): T {
  if (isObjectGuard(object) && isObjectGuard(upd)) {
    return { ...object, ...upd };
  }

  throw new Error(`wrong params to 'mergeObjects'`);
}
