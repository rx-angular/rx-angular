import { Notification } from 'rxjs';

export const enum RxNotificationKind {
  Suspense = 'suspense',
  Next = 'next',
  Error = 'error',
  Complete = 'complete',
}

export type RxNotificationValue = 'value' | 'hasValue';

export interface RxNextNotification<T>
  extends Pick<Notification<T>, RxNotificationValue> {
  kind: RxNotificationKind;
  error: boolean;
  complete: boolean;
}

export interface RxSuspenseNotification<T>
  extends Pick<Notification<T>, RxNotificationValue> {
  kind: RxNotificationKind.Suspense;
  error: false;
  complete: false;
}

export interface RxErrorNotification<T>
  extends Pick<Notification<T>, RxNotificationValue> {
  kind: RxNotificationKind.Error;
  error: any;
  complete: false;
}

export interface RxCompleteNotification<T>
  extends Pick<Notification<T>, RxNotificationValue> {
  kind: RxNotificationKind.Complete;
  complete: boolean;
  error: false;
}

export type RxNotification<T> =
  | RxNextNotification<T>
  | RxSuspenseNotification<T>
  | RxErrorNotification<T>
  | RxCompleteNotification<T>;
