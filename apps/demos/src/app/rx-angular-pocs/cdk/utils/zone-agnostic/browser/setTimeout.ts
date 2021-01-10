import { getZoneUnPatchedApi } from '../zone-checks';

export function setTimeout(cb: () => void, ms: number = 0): void {
  return getZoneUnPatchedApi('setTimeout')(cb, ms);
}

export function clearTimeout(id: number): void {
  return getZoneUnPatchedApi('clearTimeout')(id);
}
