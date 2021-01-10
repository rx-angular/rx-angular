import { PartialObserver } from 'rxjs/internal/types';
import { Notification } from 'rxjs';
import { RxLetTemplateNames } from '../../../template/directives/let/model';

/**
 * @description
 *
 * Callbacks for the templates main states: suspense, next, error, complete
 */
export type RxTemplateObserver<T> = {
  suspense?: (value?: any) => void;
} & PartialObserver<T>

export enum RxNotificationKind {
  suspense = 'rxSuspense',
  next = 'rxNext',
  error = 'rxError',
  complete = 'rxComplete'
}

type NotificationExtract = 'value' | 'hasValue';

export type RxNextNotification<T> = Pick<Notification<T>, NotificationExtract> & { kind: RxNotificationKind } & {error: boolean} & {complete: boolean};
export type RxSuspenseNotification = Pick<Notification<unknown>, NotificationExtract> & { kind: RxNotificationKind.suspense } & {error: false} & {complete: false};
export type RxErrorNotification = Pick<Notification<unknown>, NotificationExtract> & { kind: RxNotificationKind.error } & {error: any} & {complete: false};
export type RxCompleteNotification = Pick<Notification<unknown>, NotificationExtract> & { kind: RxNotificationKind.complete } & {complete: boolean} & {error: false};
export type RxNotification<T> = RxNextNotification<T> | RxSuspenseNotification | RxErrorNotification | RxCompleteNotification;

export const notificationToRxNotification = <T>(notification: Notification<T>): RxNotification<T> => {
  const kind = rxJsToRxA[notification.kind];
  if(kind === RxNotificationKind.error) {
    return toRxErrorNotification(notification.error)
  }
  if(kind === RxNotificationKind.complete) {
    return toRxCompleteNotification(notification.value)
  }

  return {
    ...notification,
    error: false,
    complete: false,
    kind
  };

};


export const toRxErrorNotification = (error?: any, value?: any): RxErrorNotification => ({kind: RxNotificationKind.error, hasValue: value || false, value: value || undefined, complete: false, error: error || true});
export const toRxSuspenseNotification = (value?: any): RxSuspenseNotification => ({kind: RxNotificationKind.suspense, hasValue: value || false, value, complete: false, error: false});
export const toRxCompleteNotification = (value?: any): RxCompleteNotification => ({kind: RxNotificationKind.complete, hasValue: value || false, value, complete: true, error: false});


const rxJsToRxA = {
'C': RxNotificationKind.complete,
'E': RxNotificationKind.error,
'N': RxNotificationKind.next,
}
export function notificationKindToRxNotificationKind(kind: 'N' | 'E' | 'C'): RxNotificationKind {
  return rxJsToRxA[kind] || RxNotificationKind.next;
}
