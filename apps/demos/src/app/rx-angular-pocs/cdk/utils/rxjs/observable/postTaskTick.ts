import { Observable } from 'rxjs';
import { postTaskScheduler, SchedulerPostTaskOptions } from '../../zone-agnostic/browser/postTask';

export const postTaskTick = (options: SchedulerPostTaskOptions, work: () => void) =>
  new Observable<number>((subscription) => {
    let active = true;
    if (options?.signal) {
      throw new Error('signal not implemented in postTaskTick');
    }
    const s = new AbortController();
    postTaskScheduler
      .postTask(() => {
        if (active) {
          work();
        }
      }, { ...options, signal: s.signal })
      .then(() => {
        subscription.next(0);
        subscription.complete();
      });

    return () => {
      active = false;
    };
  });

