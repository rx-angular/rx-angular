import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { RxNotification } from '../../utils/rxjs/Notification';


export type RenderWork = <T = unknown>(cdRef: ChangeDetectorRef, scope?: any, notification?: RxNotification<T>) => void;
export type RenderBehavior = <T = unknown>(work: any, scope: any) => (o: Observable<T>) => Observable<T>;

export interface StrategyCredentials {
  name: string;
  work: RenderWork
  behavior?: RenderBehavior
}

export interface StrategyCredentialsMap {
  [name: string]: StrategyCredentials
}
