import { getGlobalThis } from './get-global-this';
import { apiZonePatched } from './zone-checks';

/**
 * getZoneUnPatchedApi
 *
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
export function getZoneUnPatchedApi(name: string, elem?: any): Function {
  elem = elem || getGlobalThis();
  return apiZonePatched(name) ? elem['__zone_symbol__' + name] : elem[name];
}
