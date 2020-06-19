import {
  asyncScheduler,
  SchedulerAction,
  SchedulerLike,
  Subscription
} from 'rxjs';
import { isObject } from 'util';

/**
 *
 * Implementation based on rxjs-etc => IdleScheduler
 *
 */

export enum PostTaskSchedulerPriority {
  background = 'background',
  userBlocking = 'user-blocking',
  userVisible = 'user-visible'
}

interface PostTaskScheduler {
  postTask<T>(cb: () => void, options: SchedulerPostTaskOptions): Promise<T>;
}

interface SchedulerPostTaskOptions {
  priority: PostTaskSchedulerPriority | string | null;
  delay: number;
  signal?: any;
}

const scheduler: PostTaskScheduler =
  typeof window !== 'undefined'
    ? (window as any).scheduler || {
        postTask<T>(options: SchedulerPostTaskOptions): Promise<T> {
          const start = Date.now();
          return new Promise(resolve => {
            setTimeout(function() {
              console.error(
                'postTask not implemented. Use setTimeout as fallback'
              );
              resolve();
            }, 1);
          });
        }
      }
    : () => {};

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

export function postTaskScheduler(
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

      const promise = scheduler
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
