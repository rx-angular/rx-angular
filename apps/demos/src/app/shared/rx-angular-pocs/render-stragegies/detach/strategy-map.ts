import { StrategyCredentials, StrategyCredentialsMap } from '../model';
import { tap } from 'rxjs/operators';
import { coalesceWith } from '@rx-angular/template';
import {
  priorityTickMap,
  SchedulingPriority
} from '@rx-angular/template';


export function getDetachStrategyCredentialsMap(): StrategyCredentialsMap {
  return {
    detachOnComplete,
    detach
  };
}

const detachOnComplete: StrategyCredentials = {
  name: 'detachOnComplete',
  work: (cdRef, _, notification) => {
    if (['rxComplete', 'rxError'].includes(notification.kind)) {
      cdRef.detach();
    } else {
      cdRef.reattach();
      cdRef.detectChanges();
    }
  },
  behavior: (work: any, scope) => o$ => o$.pipe(
    coalesceWith(priorityTickMap[SchedulingPriority.Promise], scope),
    tap(() => work())
  )
};


const detach: StrategyCredentials = {
  name: 'detach',
  work: (cdRef, _, notification) => {
    cdRef.reattach();
    cdRef.detectChanges();
    cdRef.detach();
  },
  behavior: (work: any, scope) => o$ => o$.pipe(
    coalesceWith(priorityTickMap[SchedulingPriority.Promise], scope),
    tap(() => work())
  )
};

