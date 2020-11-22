import { StrategyCredentials, StrategyCredentialsMap } from '../model';
import { audit, buffer, bufferCount, concatMap, tap } from 'rxjs/operators';
import { coalesceWith, priorityTickMap, SchedulingPriority } from '@rx-angular/template';

export function testStrategyCredentialsMap(): StrategyCredentialsMap {
  return {
    localSync: localSync(),
    localCoalescing: localCoalescing(),
    localScopedCoalescing: localScopedCoalescing(),
    batchProcessing: batchProcessing()
  };
}

function localSync(): StrategyCredentials {
  return {
    name: 'localSync',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work) => o => o.pipe(tap(v => work(v)))
  };
}

function localCoalescing(): StrategyCredentials {
  return {
    name: 'localCoalescing',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work) => o => o.pipe(
      coalesceWith(priorityTickMap[SchedulingPriority.Promise]),
      tap(() => work())
    )
  };
}

function localScopedCoalescing(): StrategyCredentials {
  return {
    name: 'localScopedCoalescing',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, scope) => o$ => o$.pipe(
      coalesceWith(priorityTickMap[SchedulingPriority.animationFrame], scope),
      tap(() => work())
    )
  };
}

function batchProcessing(): StrategyCredentials {
  return {
    name: 'batchProcessing',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: (work: any, scope) => o$ => o$.pipe(
      audit(() => priorityTickMap[SchedulingPriority.setInterval]),
      tap(() => work())
    )
  };
}

