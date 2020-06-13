import { OnlyKeysOfSpecificType } from '../interfaces/only-keys-of-specific-type';
import { isKeyOf, isObjectGuard } from '../../core/utils/typing';

export function toggle<T extends object>(
  object: T,
  key: NonNullable<OnlyKeysOfSpecificType<T, boolean>>
): T {
  if (isObjectGuard(object)) {
    if (!object[key]) {
      return object;
    }

    if (isKeyOf<T>(key) && typeof object[key] === 'boolean') {
      return { ...object, [key]: !object[key] };
    }
  }

  throw new Error('RxState toggle: value is not boolean');
}
