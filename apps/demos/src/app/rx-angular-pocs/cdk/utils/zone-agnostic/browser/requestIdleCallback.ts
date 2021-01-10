import { getZoneUnPatchedApi } from '../zone-checks';

export type IdleId = ReturnType<typeof setTimeout>;

export type RequestIdleCallbackHandle = any;

export interface RequestIdleCallbackOptions {
  timeout: number;
}

export interface RequestIdleCallbackDeadline {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
}

export type RequestIdleCallback = (
  callback: (deadline: RequestIdleCallbackDeadline) => void,
  opts?: RequestIdleCallbackOptions
) => RequestIdleCallbackHandle;

export type CancelIdleCallback = (idleId: IdleId) => void;

export const cancelIdleCallback: CancelIdleCallback =
  typeof window !== 'undefined'
    ? ((window as any).cancelIdleCallback ? getZoneUnPatchedApi('cancelIdleCallback') : false) ||
    function(idleId: IdleId): void {
      console.warn('cancelIdleCallback not implemented. Use clearTimeout as fallback');
      clearTimeout(idleId);
    }
    : () => {
    };

export const requestIdleCallback: RequestIdleCallback =
  typeof window !== 'undefined'
    ? ((window as any).requestIdleCallback ? getZoneUnPatchedApi('requestIdleCallback') : false) ||
    function(cb: Function) {
      console.warn('requestIdleCallback not implemented. Use setTimeout as fallback');
      const start = Date.now();
      return setTimeout(function() {
        cb({
          didTimeout: false,
          timeRemaining() {
            return Math.max(0, 50 - (Date.now() - start));
          }
        });
      }, 1);
    }
    : () => {
    };
