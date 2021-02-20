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

export type ConcurrentStrategyNames =
  'none' | 'immediate' | 'userBlocking' | 'normal' | 'low' | 'background';

export type NativeStrategyNames = 'native' | 'local' | 'global' | 'noop';

export type ChunkStrategyNames = 'chunk' | 'blocking';

export type CustomStrategyCredentialsMap<T extends string | number | symbol> = Record<T, StrategyCredentials>;

export type StrategyCredentialsMap = CustomStrategyCredentialsMap<ConcurrentStrategyNames | string>; // TODO: remove
export type NativeStrategies = CustomStrategyCredentialsMap<NativeStrategyNames>;
export type ChunkStrategies = CustomStrategyCredentialsMap<ChunkStrategyNames>;
export type ConcurrentStrategies = CustomStrategyCredentialsMap<ConcurrentStrategyNames>;
