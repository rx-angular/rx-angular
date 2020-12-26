import { mapTo, switchMap } from 'rxjs/operators';
import { RenderBehavior, StrategyCredentials, StrategyCredentialsMap } from '../model';
import { PostTaskSchedulerPriority } from './utils/model';
import { postTaskTick } from './utils/postTaskTick';

/**
 * Strategies
 *
 * - ɵDC - `ɵdetectChanges`
 * - C - `Component`
 * - uV - `userVisible`
 * - uB - `userBlocking`
 * - bg - `background`
 *
 * | Name                       | ZoneLess | Render Method | ScopedCoalescing | Scheduling | Chunked |
 * |--------------------------- | ---------| --------------| ---------------- | ---------- |-------- |
 * | `ɵuserVisible`              | ✔        | ɵDC           | C + Pr          | uV         | ❌       |
 * | `ɵuserBlocking`             | ✔        | ɵDC           | C + Pr          | uB         | ❌       |
 * | `ɵbackground`               | ✔        | ɵDC           | C + Pr          | bg         | ❌       |
 *
 */

export function getPostTaskStrategyCredentialsMap(): StrategyCredentialsMap {
  return {
    postTaskUserVisible: createUserVisibleStrategy(),
    postTaskUserBlocking: createUserBlockingStrategy(),
    postTaskBackground: createBackgroundStrategy()
  };
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
    name: 'postTaskUserVisible',
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
    name: 'postTaskUserBlocking',
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
    name: 'postTaskBackground',
    work: (cdRef) => cdRef.detectChanges(),
    behavior: postTaskBehavior(PostTaskSchedulerPriority.background)
  };
}
