import { getZoneUnPatchedApi } from '../zone-checks';

export const Promise: PromiseConstructor = getZoneUnPatchedApi('Promise');
