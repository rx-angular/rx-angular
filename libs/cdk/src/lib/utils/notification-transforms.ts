import {
  RxSuspenseNotification,
  RxNotificationKind,
  RxErrorNotification,
  RxCompleteNotification,
} from '../model';

export const toRxErrorNotification = (
  error?: any,
  value?: any
): RxErrorNotification => ({
  kind: RxNotificationKind.error,
  hasValue: value || false,
  value: value || undefined,
  complete: false,
  error: error || true,
});
export const toRxSuspenseNotification = (
  value?: any
): RxSuspenseNotification => ({
  kind: RxNotificationKind.suspense,
  hasValue: value || false,
  value,
  complete: false,
  error: false,
});
export const toRxCompleteNotification = (
  value?: any
): RxCompleteNotification => ({
  kind: RxNotificationKind.complete,
  hasValue: value || false,
  value,
  complete: true,
  error: false,
});
