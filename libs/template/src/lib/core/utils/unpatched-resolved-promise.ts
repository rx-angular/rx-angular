/** A shared promise instance to cause a delay of one microtask */
import { getGlobalThis } from './get-global-this';
import { getZoneUnPatchedApi, isApiZonePatched } from './zone-checks';

let resolvedPromise: Promise<void> | null = null;

export function getUnpatchedResolvedPromise(): Promise<void> {
  resolvedPromise = resolvedPromise || getZoneUnPatchedApi<PromiseConstructor>('Promise').resolve();
  return resolvedPromise;
}
