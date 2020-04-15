/** A shared promise instance to cause a delay of one microtask */
import { apiZonePatched, getGlobalThis } from '@ts-etc';

let resolvedPromise: Promise<void> | null = null;

export function getUnpatchedResolvedPromise(): Promise<void> {
  resolvedPromise =
    resolvedPromise || apiZonePatched('Promise')
      ? (getGlobalThis().__zone_symbol__Promise.resolve() as Promise<void>)
      : Promise.resolve();
  return resolvedPromise;
}

