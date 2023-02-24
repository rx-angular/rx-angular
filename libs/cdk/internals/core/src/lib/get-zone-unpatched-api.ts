import { ɵglobal } from '@angular/core';

/**
 * @description
 *
 * This function returns the zone un-patched API for the a specific Browser API.
 * If no target is passed the window is used instead
 *
 * @param name - The name of the API to check.
 * @param target - The target to get un-patched API from.
 * @return {Function} - The zone un-patched API in question.
 *
 */
export function getZoneUnPatchedApi<
  N extends keyof (Window & typeof globalThis)
>(name: N): (Window & typeof globalThis)[N];

export function getZoneUnPatchedApi<T extends object, N extends keyof T>(
  target: T,
  name: N
): T[N];

export function getZoneUnPatchedApi<T extends object, N extends keyof T>(
  targetOrName: T | string,
  name?: N
) {
  // If the user has provided the API name as the first argument, for instance:
  // `const addEventListener = getZoneUnPatchedApi('addEventListener');`
  // Then we just swap arguments and make `global` or `window` as the default target.
  if (typeof targetOrName === 'string') {
    name = targetOrName as N;
    targetOrName = ɵglobal as T;
  }
  return targetOrName['__zone_symbol__' + String(name)] || targetOrName[name];
}
