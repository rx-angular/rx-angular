import { getZoneUnPatchedApi } from '../zone-checks';
import { Promise } from './Promise';
import { setTimeout } from './setTimeout';

// Source: Feross Aboukhadijeh <https://feross.org/opensource>
let promise
const _queueMicrotask = typeof queueMicrotask === 'function'
  ? getZoneUnPatchedApi('queueMicrotask').bind(globalThis)
  // reuse resolved promise, and allocate it lazily
  : cb => (promise || (promise = Promise.resolve()))
    .then(cb)
    .catch(err => setTimeout(() => { throw err }, 0))

export function queueMicrotask(cb: () => void): void {
  return _queueMicrotask(cb);
}
