import { ChangeDetectorRef, NgZone } from '@angular/core';
import { coalescingObj } from '@rx-angular/cdk/coalescing';
import { Observable } from 'rxjs';

import { RxNotification } from '@rx-angular/cdk/notifications';

export type RxRenderWork = <T = unknown>(
  cdRef: ChangeDetectorRef,
  scope?: coalescingObj,
  notification?: RxNotification<T>
) => void;
export type RxRenderBehavior = <T = unknown>(
  work: any,
  scope?: coalescingObj,
  ngZone?: NgZone
) => (o: Observable<T>) => Observable<T>;

export interface RxStrategyCredentials<S = string> {
  name: S;
  work: RxRenderWork;
  behavior: RxRenderBehavior;
}

export type RxCustomStrategyCredentials<T extends string> = Record<
  T,
  RxStrategyCredentials
>;
export type RxNativeStrategyNames = 'native' | 'local' | 'global' | 'noop';

export type RxConcurrentStrategyNames =
  | 'noPriority'
  | 'immediate'
  | 'userBlocking'
  | 'normal'
  | 'low'
  | 'idle';

export type RxDefaultStrategyNames =
  | RxNativeStrategyNames
  | RxConcurrentStrategyNames;

export type RxStrategyNames<T> = RxDefaultStrategyNames | T;
export type RxStrategies<T extends string> = RxCustomStrategyCredentials<
  RxStrategyNames<T>
>;

export interface RxAngularConfig<T extends string> {
  primaryStrategy?: RxStrategyNames<T>;
  customStrategies?: RxCustomStrategyCredentials<T>;
  patchZone?: boolean;
}
