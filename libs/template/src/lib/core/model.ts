import { NextObserver, Notification } from 'rxjs';

export interface RxViewContext<T> {
  // to enable `let` syntax we have to use $implicit (var; let v = var)
  $implicit: T;
  // set context var complete to true (var$; let e = $error)
  $rxError: false | Error;
  // set context var complete to true (var$; let c = $complete)
  $rxComplete: boolean;
  // set context var suspense to true (var$; let c = $suspense)
  $rxSuspense: boolean;
}

/**
 * @description
 *
 * Callbacks for the templates main states: suspense, next, error, complete
 */
export interface RxTemplateObserver<T> extends NextObserver<T> {
  suspense?: () => void;
}

export type RxNotificationKind = 'rxSuspense' | 'rxNext' | 'rxError' | 'rxComplete';
type NotificationExtract = 'value' | 'hasValue' | 'error';
export type RxNotification<T> = Pick<Notification<T>, NotificationExtract> & { kind: RxNotificationKind };
