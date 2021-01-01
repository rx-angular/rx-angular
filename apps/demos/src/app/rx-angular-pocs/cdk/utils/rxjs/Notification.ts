import { PartialObserver } from 'rxjs/internal/types';
import { Notification } from 'rxjs';

/**
 * @description
 *
 * Callbacks for the templates main states: suspense, next, error, complete
 */
export type RxTemplateObserver<T> = {
  suspense?: (value?: any) => void;
} & PartialObserver<T>

export type rxNotificationKind = 'rxSuspense' | 'rxNext' | 'rxError' | 'rxComplete';

export enum RxNotificationKind {
  suspense = 'rxSuspense',
  next = 'rxNext',
  error = 'rxError',
  complete = 'rxComplete'
}

type NotificationExtract = 'value' | 'hasValue' | 'error';
export type RxNotification<T> = Pick<Notification<T>, NotificationExtract> & { kind: rxNotificationKind };

export const toRxErrorNotification = (error) => ({kind: 'rxError', hasValue: true, error});
export const toRxSuspenseNotification = (value) => ({kind: 'rxSuspense', hasValue: true, value});
export const toRxCompleteNotification = () => ({kind: 'rxComplete', hasValue: false, complete: true});
