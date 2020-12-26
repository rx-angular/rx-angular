import { getZoneUnPatchedApi } from '../utils/zone-checks';

export function requestIdleCallback(cb: () => void): void {
  return getZoneUnPatchedApi('requestIdleCallback')(cb);
}

export function cancelIdleCallback(id: number): void {
  return getZoneUnPatchedApi('cancelIdleCallback')(id);
}
