import { StrategyCredentials, StrategyCredentialsMap } from '../model';
import { tap } from 'rxjs/operators';
import { coalesceWith } from '../../cdk/rxjs/operators/coalesceWith';
import { priorityTickMap } from '../../cdk/rxjs/scheduling/priority-tick-map';
import { SchedulingPriority } from '../../cdk/rxjs/scheduling/interfaces';

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

