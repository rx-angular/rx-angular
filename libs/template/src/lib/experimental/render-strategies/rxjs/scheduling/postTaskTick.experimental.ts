import { Observable } from 'rxjs';
import {
  postTaskScheduler,
  SchedulerPostTaskOptions,
} from './postTask.experimental';

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
