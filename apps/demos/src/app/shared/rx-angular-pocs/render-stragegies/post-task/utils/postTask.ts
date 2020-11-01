import { PostTaskScheduler, SchedulerPostTaskOptions } from './model';

export const postTaskScheduler: PostTaskScheduler =
  typeof window !== 'undefined'
    ? (window as any).scheduler || {
    postTask<T>(options: SchedulerPostTaskOptions): Promise<T> {
      const start = Date.now();
      return new Promise((resolve) => {
        setTimeout(function() {
          console.error(
            'postTask not implemented. Use setTimeout as fallback'
          );
          resolve();
        }, 1);
      });
    }
  }
    : () => {
    };
