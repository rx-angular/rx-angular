import {
  RxSuspenseNotification,
  RxNotificationKind,
  RxErrorNotification,
  RxCompleteNotification,
} from './model';

export function toRxErrorNotification<T>(
  error?: any,
  value?: T
): RxErrorNotification<T> {
  return {
    value,
    kind: RxNotificationKind.Error,
    hasValue: !!value || false,
    complete: false,
    error: error || true,
  };
}

export function toRxSuspenseNotification<T>(
  value?: T
): RxSuspenseNotification<T> {
  return {
    value,
    kind: RxNotificationKind.Suspense,
    hasValue: !!value || false,
    complete: false,
    error: false,
  };
}

export function toRxCompleteNotification<T>(
  value?: T
): RxCompleteNotification<T> {
  return {
    value,
    kind: RxNotificationKind.Complete,
    hasValue: !!value || false,
    complete: true,
    error: false,
  };
}
