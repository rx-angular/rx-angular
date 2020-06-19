import { from, SchedulerLike, Subscription } from 'rxjs';

/**
 *
 * Implementation custom try
 *
 */

interface PostTaskScheduler {
  postTask<T>(options: SchedulerPostTaskOptions): Promise<T>;
}

interface SchedulerPostTaskOptions {
  priority: string | null;
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
              resolve();
            }, 1);
          });
        }
      }
    : () => {};

interface SchedulerPostTaskOptions {
  priority: string | null;
  delay: number;
  signal?: any;
}

export const postTaskScheduler: SchedulerLike = {
  now() {
    return 0;
  },
  schedule(
    work: () => void,
    options: number | SchedulerPostTaskOptions = {
      priority: null,
      delay: 0
    },
    ...state
  ): Subscription {
    return from(
      scheduler.postTask(options as SchedulerPostTaskOptions)
    ).subscribe(() => work());
  }
};
