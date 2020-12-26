import { getZoneUnPatchedApi } from '../utils/zone-checks';

export function requestAnimationFrame(cb: () => void): void{
  return getZoneUnPatchedApi('requestAnimationFrame')(cb);
}

export function cancelAnimationFrame(id: number): void {
   return getZoneUnPatchedApi('cancelAnimationFrame')(id);
}
