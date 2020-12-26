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
