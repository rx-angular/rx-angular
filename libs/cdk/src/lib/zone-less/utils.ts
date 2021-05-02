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
  name: N,
  target: T
): T[N];
export function getZoneUnPatchedApi<T extends object, N extends keyof T>(
  name: N,
  target: T = ɵglobal
): T[N] {
  return target['__zone_symbol__' + name] ?? target[name];
}
