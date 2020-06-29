import {
  asyncScheduler,
  SchedulerAction,
  SchedulerLike,
  Subscription
} from 'rxjs';
import { isObject } from 'util';
import {
  postTaskScheduler,
  PostTaskSchedulerPriority,
  SchedulerPostTaskOptions
} from './postTask';

class PostTaskAction<T> extends Subscription {
  _scheduler;
  constructor(private work: (this: SchedulerAction<T>, state?: T) => void) {
    super();
  }

  schedule(state?: T, delay?: number) {
    if (this.closed) {
      return this;
    }
    return this._scheduler.schedule(this.work, delay, state);
  }
}

export function getPostTaskScheduler(
  priority: PostTaskSchedulerPriority
): SchedulerLike {
  return ({
    now() {
      return asyncScheduler.now();
    },
    schedule<T>(
      work: (this: SchedulerAction<T>, state?: T) => void,
      options: SchedulerPostTaskOptions = {} as SchedulerPostTaskOptions,
      state?: T
    ): Subscription {
      if (isObject(options) && (options as SchedulerPostTaskOptions).delay) {
        return asyncScheduler.schedule(
          work,
          (options as SchedulerPostTaskOptions).delay,
          state
        );
      }

      options = { ...options, priority };

      const action = new PostTaskAction(work);
      // weired hack
      action._scheduler = this;

      const promise = postTaskScheduler
        .postTask(() => {}, options)
        .then(() => {
          try {
            work.call(action, state);
          } catch (error) {
            action.unsubscribe();
            throw error;
          }
        });
      action.add(() => {
        throw new Error('not implemented');
      });
      return action;
    }
  } as unknown) as SchedulerLike;
}
