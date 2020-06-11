import { OnlyKeysOfSpecificType } from '../interfaces/only-keys-of-specific-type';

export function toggle<T extends object, K extends keyof T>(
  object: T,
  key: NonNullable<OnlyKeysOfSpecificType<T, boolean>>
): T {
  if (typeof object[key] === 'boolean') {
    return { ...object, [key]: !object[key] };
  }

  throw new Error('RxState toggle: value is not boolean');
}
