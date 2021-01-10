import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { RxNotification } from '../../utils/rxjs/Notification';


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
