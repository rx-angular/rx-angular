const hasIdleCallback =
  'window' in globalThis && typeof window.requestIdleCallback === 'function';

const schedule = !hasIdleCallback
  ? (cb: () => void, options?: IdleRequestOptions) =>
      globalThis.setTimeout(cb, options?.timeout ?? 0)
  : window.requestIdleCallback;

export default schedule;
