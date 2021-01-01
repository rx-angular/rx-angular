import { mapTo, switchMap } from 'rxjs/operators';
import { RenderBehavior, StrategyCredentials, StrategyCredentialsMap } from '../model/strategy-credentials';
import { PostTaskSchedulerPriority } from '../../../cdk/utils/zone-agnostic/browser/postTask';
import { postTaskTick } from '../../../cdk/utils/rxjs/observable/postTaskTick';

export function getPostTaskStrategyCredentialsMap(): StrategyCredentialsMap {
  return (window as any).__postTaskScheduler__present ? {
    userVisible: createUserVisibleStrategy(),
    userBlocking: createUserBlockingStrategy(),
    background: createBackgroundStrategy()
  } : {};
}

const postTaskBehavior = (priority: PostTaskSchedulerPriority = PostTaskSchedulerPriority.userVisible): RenderBehavior => <T>(work: any) => {
  return o$ => o$.pipe(switchMap(v => postTaskTick({ priority }, work).pipe(mapTo(v))));
};


/**
 *  PostTask - Priority UserVisible Strategy
 *
 */
function createUserVisibleStrategy(): StrategyCredentials {
  return {
    name: 'userVisible',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: postTaskBehavior(PostTaskSchedulerPriority.userVisible)
  };
}

/**
 *  PostTask - Priority UserBlocking Strategy
 *
 */
function createUserBlockingStrategy(): StrategyCredentials {
  return {
    name: 'userBlocking',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: postTaskBehavior(PostTaskSchedulerPriority.userBlocking)
  };
}

/**
 *  PostTask - Priority Background Strategy
 *
 */
function createBackgroundStrategy(): StrategyCredentials {
  return {
    name: 'background',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: postTaskBehavior(PostTaskSchedulerPriority.background)
  };
}
