import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { IdlePriority, LowPriority, NormalPriority } from './react/utils/react-source-code/schedulerPriorities';
import { RxNotification } from '@rx-angular/template';


export type RenderWork = <T = unknown>(cdRef: ChangeDetectorRef, context?: any, notification?: RxNotification<T>) => void;
export type RenderBehavior = <T = unknown>(work: any, context: any) => (o: Observable<T>) => Observable<T>;

export interface StrategyCredentials {
  name: string;
  work: RenderWork
  behavior?: RenderBehavior
}

export interface StrategyCredentialsMap {
  [name: string]: StrategyCredentials
}

export enum RxAngularPriorityLevel {
  Exclude = -1, // exclude
  NoPriority = 0, // sync
  ImmediatePriority = 1, // PostTask:user-blocking
  UserBlockingPriority = 2, // PostTask:user-blocking
  NormalPriority = 3, // PostTask:user-visible
  LowPriority = 4, // PostTask:user-visible
  IdlePriority = 5 // PostTask:background | IdleCallback
}
