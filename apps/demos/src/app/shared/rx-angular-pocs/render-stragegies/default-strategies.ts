import { StrategyCredentials, StrategyCredentialsMap } from './model';
import { ɵmarkDirty as markDirty } from '@angular/core';
import { coalesceWith, priorityTickMap, SchedulingPriority } from '@rx-angular/template';
import { tap } from 'rxjs/operators';

export function getDefaultStrategyCredentialsMap(): StrategyCredentialsMap {
  return {
    'global': globalCredentials,
    'native': nativeCredentials,
    'noop': noopCredentials,
    'local': localCredentials
  };
}

const localCredentials: StrategyCredentials = {
  name: 'local',
  work: (cdRef, _, notification) => {
  /*  if(['rxComplete', 'rxError'].includes(notification.kind)) {
      cdRef.detach();
    } else {
      cdRef.reattach();
      cdRef.detectChanges();
    }*/
    console.log('work cdRef', cdRef, notification);
    cdRef.detectChanges();
  },
  behavior: (work: any, scope) => o$ => o$.pipe(
      coalesceWith(priorityTickMap[SchedulingPriority.Promise], scope),
      tap(() => work())
    )
};

const globalCredentials: StrategyCredentials = {
  name: 'global',
  work: (_, context) => markDirty(context),
  behavior: (work: any) => o$ => o$.pipe(tap(() => work()))
};

const noopCredentials: StrategyCredentials = {
  name: 'noop',
  work: () => void 0,
  behavior: () => o$ => o$
};

const nativeCredentials: StrategyCredentials = {
  name: 'native',
  work: (cdRef) => cdRef.markForCheck(),
  behavior: (work: any) => o$ => o$.pipe(tap(() => work()))
};

