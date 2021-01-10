export const noopSchedulingName = 'noop';

// Default Scheduling
export const syncSchedulingName = 'sync';
export const queueMicrotaskSchedulingName = 'queueMicrotask';
export const promiseSchedulingName = 'promise';
export const setTimeoutSchedulingName = 'setTimeout';
export const setIntervalSchedulingName = 'setInterval';
export const requestAnimationFrameSchedulingName = 'requestAnimationFrame';
export const requestIdleCallbackSchedulingName = 'requestIdleCallback';

// Main Tread Scheduling
export const userBlockingSchedulingName = 'userBlocking';
export const userVisibleSchedulingName = 'userVisible';
export const backgroundSchedulingName = 'background';

// ---

export type schedulingNames = 'noop' |
  'sync' |
  'queueMicrotask' | 'promise' |
  'setTimeout' | 'setInterval' |
  'requestAnimationFrame' |
  'requestIdleCallback' |
  'userBlocking' | 'userVisible'| 'background' ;
