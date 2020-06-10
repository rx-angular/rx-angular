export function toggle<T extends object, K extends keyof T>(
  object: T,
  key: K
): T {
  if (typeof object[key] === 'boolean') {
    return { ...object, [key]: !object[key] };
  } else {
    console.error(`RxState toggle: ${key} (${object[key]}) is not a boolean`);
    return object;
  }
}
