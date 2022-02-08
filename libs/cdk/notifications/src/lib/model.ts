export const enum RxNotificationKind {
  Suspense = 'suspense',
  Next = 'next',
  Error = 'error',
  Complete = 'complete',
}

export type RxNotificationValue = 'value' | 'hasValue';

export interface RxNextNotification<T> {
  value: T;
  /**
   * @deprecated Instead just check if RxNotificationKind is Next
   */
  hasValue: boolean;
  kind: RxNotificationKind;
  error: boolean;
  complete: boolean;
}

export interface RxSuspenseNotification<T> {
  value: T;
  /**
   * @deprecated Instead just check if RxNotificationKind is Next
   */
  hasValue: boolean;
  kind: RxNotificationKind.Suspense;
  error: false;
  complete: false;
}

export interface RxErrorNotification<T> {
  value: T;
  /**
   * @deprecated Instead just check if RxNotificationKind is Next
   */
  hasValue: boolean;
  kind: RxNotificationKind.Error;
  error: any;
  complete: false;
}

export interface RxCompleteNotification<T> {
  value: T;
  /**
   * @deprecated Instead just check if RxNotificationKind is Next
   */
  hasValue: boolean;
  kind: RxNotificationKind.Complete;
  complete: boolean;
  error: false;
}

export type RxNotification<T> =
  | RxNextNotification<T>
  | RxSuspenseNotification<T>
  | RxErrorNotification<T>
  | RxCompleteNotification<T>;
