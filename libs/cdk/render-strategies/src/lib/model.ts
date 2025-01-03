import { ChangeDetectorRef, NgZone } from '@angular/core';
import { coalescingObj } from '@rx-angular/cdk/coalescing';
import { RxNotification } from '@rx-angular/cdk/notifications';
import { Observable } from 'rxjs';

export interface ScheduleOnStrategyOptions {
  scope?: object;
  strategy?: string;
  patchZone?: false | NgZone;
}

export type RxRenderWork = <T = unknown>(
  cdRef: ChangeDetectorRef,
  scope?: coalescingObj,
  notification?: RxNotification<T>,
) => void;
export type RxRenderBehavior = <T = unknown>(params: {
  work: () => any;
  scope?: coalescingObj;
  ngZone?: NgZone;
}) => (o: Observable<T>) => Observable<T>;

export interface RxStrategyCredentials<S = string> {
  name: S;
  work: RxRenderWork;
  behavior: RxRenderBehavior;
}

export type RxCustomStrategyCredentials<T extends string> = Record<
  T,
  RxStrategyCredentials
>;
export type RxNativeStrategyNames = 'native' | 'local' | 'noop';
export type RxConcurrentStrategyNames =
  | 'immediate'
  | 'userBlocking'
  | 'normal'
  | 'low'
  | 'idle';
export type RxDefaultStrategyNames =
  | RxNativeStrategyNames
  | RxConcurrentStrategyNames;
export type RxStrategyNames<T extends string = string> =
  | RxDefaultStrategyNames
  | T;
export type RxStrategies<T extends string> = RxCustomStrategyCredentials<
  RxStrategyNames<T>
>;
