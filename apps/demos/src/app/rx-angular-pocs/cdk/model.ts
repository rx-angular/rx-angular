import { Notification } from 'rxjs';
import { PartialObserver } from 'rxjs/internal/types';

export type rxBaseTemplateNames = 'rxError' | 'rxComplete' | 'rxSuspense';

export enum RxBaseTemplateNames {
  error = 'rxError',
  complete = 'rxComplete',
  suspense = 'rxSuspense'
};

export interface RxViewContext<T> {
  // to enable `let` syntax we have to use $implicit (var; let v = var)
  $implicit: T;
  // set context var complete to true (var$; let e = $error)
  $error: false | Error;
  // set context var complete to true (var$; let c = $complete)
  $complete: boolean;
  // set context var suspense to true (var$; let s = $suspense)
  $suspense: any;
}

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
