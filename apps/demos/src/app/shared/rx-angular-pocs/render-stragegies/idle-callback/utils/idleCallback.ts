import { CancelIdleCallback, IdleId, RequestIdleCallback } from './model';

export const cancelIdleCallback: CancelIdleCallback =
  typeof window !== 'undefined'
    ? (window as any).cancelIdleCallback ||
    function(idleId: IdleId): void {
      console.warn('Fake cancelIdleCallback used');
      clearTimeout(idleId);
    }
    : () => {
    };

export const requestIdleCallback: RequestIdleCallback =
  typeof window !== 'undefined'
    ? (window as any).requestIdleCallback ||
    function(cb: Function) {
      console.warn('Fake requestIdleCallback used');
      const start = Date.now();
      return setTimeout(function() {
        cb({
          didTimeout: false,
          timeRemaining: function() {
            return Math.max(0, 50 - (Date.now() - start));
          }
        });
      }, 1);
    }
    : () => {
    };
