import { isObjectGuard } from '../../utils';

/**
 * @deprecated moved to `@rx-angular/cdk/transformations`
 * @see {@link https://www.npmjs.com/package/@rx-angular/cdk}
 */
export function patch<T extends object>(object: T, upd: Partial<T>): T {
  const update = isObjectGuard(upd) ? upd : {};

  if (!isObjectGuard(object) && isObjectGuard(upd)) {
    console.warn(`Patch: original value ${object} is not an object.`);
    return { ...update } as T;
  }

  if (!isObjectGuard(object) && !isObjectGuard(upd)) {
    console.warn(
      `Patch: original value ${object} and updates ${upd} are not objects.`
    );
    return object;
  }

  return { ...object, ...update };
}
