import {
  asyncScheduler,
  Observable,
  SchedulerAction,
  SchedulerLike,
  Subscription,
} from 'rxjs';
import { isObject } from 'util';
import {
  postTaskScheduler,
  SchedulerPostTaskOptions,
} from '../../../../render-strategies/rxjs/scheduling/postTask';

export const postTaskTick = (options: SchedulerPostTaskOptions) =>
  new Observable<number>((subscription) => {
    postTaskScheduler
      .postTask(() => {}, options)
      .then(() => {
        subscription.next(0);
        subscription.complete();
      });

    return () => {};
  });
