import { StrategyCredentials, StrategyCredentialsMap } from '../model';
import { tap } from 'rxjs/operators';
import { coalesceWith } from '../../../cdk/utils/rxjs/operators/coalesceWith';
import { animationFrameTick } from '../../utils/rxjs/observable';

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
    coalesceWith(animationFrameTick(), scope),
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
    coalesceWith(animationFrameTick(), scope),
    tap(() => work())
  )
};

