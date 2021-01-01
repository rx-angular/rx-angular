import { StrategyCredentials, coalesceWith, PriorityNameToLevel,  PriorityToObservable } from '../../../../../rx-angular-pocs';
import { tap } from 'rxjs/operators';

const behavior1 = (work: any, scope) => o$ => o$.pipe(
  coalesceWith(PriorityToObservable[PriorityNameToLevel.normal](), scope),
  tap(() => {
    console.log('In strategy partialTree => behavior1: ', scope);
    work();
  })
);

export const partialTreeCredentials: StrategyCredentials = {
  name: 'partialTree1',
  work: (cdRef, _, notification) => {
    console.log('In strategy partialTree1 => work: ', notification.kind);
    cdRef.detectChanges();
  },
  behavior: behavior1
};

export function getPartialTreeCredentials(args: any): StrategyCredentials {
  return {
    name: 'partialTree2',
    work: (cdRef, _, notification) => {
      console.log('In strategy partialTree2 => work: ', notification.kind);
      cdRef.detectChanges();
    },
    behavior: behavior1
  }
};
