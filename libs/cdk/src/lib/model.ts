import { Notification, Observable } from 'rxjs';
import { ChangeDetectorRef, Type } from '@angular/core';

export type coalescingObj =
  | Record<string | number | symbol, unknown>
  | Type<unknown>
  | object;
export interface CoalescingOptions {
  scope?: coalescingObj;
}

export enum RxNotificationKind {
  suspense = 'suspense',
  next = 'next',
  error = 'error',
  complete = 'complete',
}

type NotificationValue = 'value' | 'hasValue';

export type RxNextNotification<T> = Pick<Notification<T>, NotificationValue> & {
  kind: RxNotificationKind;
} & { error: boolean } & { complete: boolean };
export type RxSuspenseNotification = Pick<
  Notification<unknown>,
  NotificationValue
> & { kind: RxNotificationKind.suspense } & { error: false } & {
  complete: false;
};
export type RxErrorNotification = Pick<
  Notification<unknown>,
  NotificationValue
> & { kind: RxNotificationKind.error } & { error: any } & { complete: false };
export type RxCompleteNotification = Pick<
  Notification<unknown>,
  NotificationValue
> & { kind: RxNotificationKind.complete } & { complete: boolean } & {
  error: false;
};
export type RxNotification<T> =
  | RxNextNotification<T>
  | RxSuspenseNotification
  | RxErrorNotification
  | RxCompleteNotification;

export type RenderWork = <T = unknown>(
  cdRef: ChangeDetectorRef,
  scope?: coalescingObj,
  notification?: RxNotification<T>
) => void;
export type RenderBehavior = <T = unknown>(
  work: any,
  scope?: coalescingObj
) => (o: Observable<T>) => Observable<T>;

export interface StrategyCredentials<S = string> {
  name: S;
  work: RenderWork;
  behavior: RenderBehavior;
}

export type CustomStrategyCredentialsMap<T extends string> = Record<
  T,
  StrategyCredentials
>;
