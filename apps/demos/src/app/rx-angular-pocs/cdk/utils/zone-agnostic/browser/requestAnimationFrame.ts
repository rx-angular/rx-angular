import { getZoneUnPatchedApi } from '../zone-checks';

export function requestAnimationFrame(cb: () => void): number {
  return getZoneUnPatchedApi('requestAnimationFrame')(cb);
}

export function cancelAnimationFrame(id: number): void {
   getZoneUnPatchedApi('cancelAnimationFrame')(id);
}
