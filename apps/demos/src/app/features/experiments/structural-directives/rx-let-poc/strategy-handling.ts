import { ɵmarkDirty as markDirty } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { StrategyCredentials } from './rx-let-poc.directive';
import {
  priorityTickMap,
  SchedulingPriority
} from '../../../../../../../../libs/template/src/lib/render-strategies/rxjs/scheduling';
import { Observable } from 'rxjs';
import { coalesceWith } from '../../../../../../../../libs/template/src/lib/render-strategies/rxjs/operators';
import { scheduleOnGlobalTick } from '../../../../shared/render-stragegies/render-queue/globalAnimationFrameTick';

export type RenderBehavior = <T = unknown>(work: any, context: any) => (o: Observable<T>) => Observable<T>;

export const localBehavior: RenderBehavior = (work: any) => {
  return o$ => o$.pipe(
    coalesceWith(priorityTickMap[SchedulingPriority.animationFrame]),
    tap(() => work())
  );
};

export const localDetachBehavior: RenderBehavior = <T>(work: any) => {
  return o$ => o$.pipe(
    coalesceWith(priorityTickMap[SchedulingPriority.animationFrame]),
    tap(() => work())
  );
};

export const globalBehavior: RenderBehavior = <T>(work: any) => {
  return o$ => o$.pipe(
    tap(() => work()),
    tap(() => console.log('global'))
  );
};

export const nativeBehavior: RenderBehavior = <T>(work: any) => {
  return o$ => o$.pipe(tap(() => work()));
};

export const chunkedBehavior: RenderBehavior = <T>(work: any, context: any) => {
  return o$ => o$.pipe(
    scheduleOnGlobalTick(() => ({
      priority: 0,
      work: work(),
      scope: context
    }))
  );
};

const localCredentials: StrategyCredentials = {
  name: 'local',
  work: (cdRef) => cdRef.detectChanges(),
  behavior: localBehavior
};

const queuedCredentials: StrategyCredentials = {
  name: 'queue',
  work: (cdRef) => cdRef.detectChanges(),
  behavior: chunkedBehavior
};

const globalCredentials: StrategyCredentials = {
  name: 'global',
  work: (_, context) => markDirty(context),
  behavior: globalBehavior
};

const noopCredentials: StrategyCredentials = {
  name: 'noop',
  work: () => void 0,
  behavior: () => o => o
};

const nativeCredentials: StrategyCredentials = {
  name: 'native',
  work: (cdRef) => cdRef.markForCheck(),
  behavior: nativeBehavior
};

const postTaskCredentials: StrategyCredentials = {
  name: 'postTask',
  work: (cdRef) => cdRef.detectChanges(),
  behavior: nativeBehavior
};

export function nameToStrategyConfig() {
  return (o$: Observable<string | Observable<string>>): Observable<StrategyCredentials> => o$.pipe(
    map(name => {
      switch (name) {
        case'global':
          return globalCredentials;
        case'native':
          return nativeCredentials;
        case'noop':
          return noopCredentials;
        case 'chunk':
          return queuedCredentials;
        case'local':
        default:
          return localCredentials;
      }
    })
  );
}

export const internalStrategies: { [name: string]: StrategyCredentials } = {
  'global': globalCredentials,
  'native': nativeCredentials,
  'noop': noopCredentials,
  'local': localCredentials
};

export const customStrategies: { [name: string]: StrategyCredentials } = {
  'local': localCredentials,
  'postTask': postTaskCredentials,
  'chunk': queuedCredentials
};
