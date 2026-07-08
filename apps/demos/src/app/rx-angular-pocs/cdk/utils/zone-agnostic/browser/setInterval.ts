import { getZoneUnPatchedApi } from '../zone-checks';

export function setInterval(cb: () => void, ms = 0): void {
  return getZoneUnPatchedApi('setInterval')(cb, ms);
}

export function clearInterval(id: number): void {
  return getZoneUnPatchedApi('clearInterval')(id);
}
