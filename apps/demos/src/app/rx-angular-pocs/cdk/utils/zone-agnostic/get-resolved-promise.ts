/** A shared promise instance to cause a delay of one microtask */
import { Promise } from '../zone-agnostic/browser/Promise';

let resolvedPromise: Promise<void> | null = null;
export function getResolvedPromise(): Promise<void> {
  resolvedPromise = resolvedPromise || Promise.resolve();
  return resolvedPromise;
}
