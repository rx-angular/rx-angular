import { ɵglobal as globalThis } from '@angular/core';

/**
 *
 * utils.ts
 *
 * To use zone un-patched versions of the following Window methods:
 *
 * 1. Add import of the function to your component, service, etc.
 *
 * import { setTimeout } from '@cu/perf-utils';
 *
 * 2. Use the it the same way as the original ("zone patched") version
 *
 * triggerAnimation(direction: string): void {
 *   this.animate = direction;
 *   setTimeout(() => (this.animate = 'reset'), 185);
 * }
 *
 */

type obj = Record<string | number | symbol, any>;

/**
 * @description
 *
 * This function returns the zone un-patched API for the a specific Browser API.
 * If no element is passed the window is used instead
 *
 * @param name {string} - The name of the API to check.
 * @param elem {any} - The elem to get un-patched API from.
 * @return {Function} - The zone un-patched API in question.
 *
 */
export function getZoneUnPatchedApi<T = Function>(name: string, elem?: obj): T {
  elem = elem || (globalThis as obj);
  const isPatched = elem['__zone_symbol__' + name] !== undefined;
  return isPatched ? elem['__zone_symbol__' + name] : elem[name];
}
