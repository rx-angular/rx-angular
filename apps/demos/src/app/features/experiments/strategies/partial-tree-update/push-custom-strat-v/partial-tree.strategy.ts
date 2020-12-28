import { StrategyCredentials } from '../../../../../rx-angular-pocs/render-strategies';
import { coalesceWith } from '../../../../../rx-angular-pocs/cdk/rxjs/operators';
import { priorityTickMap } from '../../../../../rx-angular-pocs/cdk/rxjs/scheduling/priority-tick-map';
import { SchedulingPriority } from '../../../../../rx-angular-pocs/cdk/rxjs/scheduling/interfaces';
import { tap } from 'rxjs/operators';

const behavior1 = (work: any, scope) => o$ => o$.pipe(
  coalesceWith(priorityTickMap[SchedulingPriority.animationFrame], scope),
  tap(() => work())
);

export const partialTreeCredentials: StrategyCredentials = {
  name: 'partialTree1',
  work: (cdRef, _, notification) => {
    cdRef.detectChanges();
  },
  behavior: behavior1
};

export function getPartialTreeCredentials(args: any): StrategyCredentials {
  return {
    name: 'partialTree2',
    work: (cdRef, _, notification) => {
      cdRef.detectChanges();
    },
    behavior: behavior1
  }
};
