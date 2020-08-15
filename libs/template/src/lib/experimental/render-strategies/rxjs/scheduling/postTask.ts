export enum PostTaskSchedulerPriority {
  background = 'background',
  userBlocking = 'user-blocking',
  userVisible = 'user-visible',
}

export interface PostTaskScheduler {
  postTask<T>(cb: () => void, options: SchedulerPostTaskOptions): Promise<T>;
}

export interface SchedulerPostTaskOptions {
  priority: PostTaskSchedulerPriority | string | null;
  delay?: number;
  signal?: any;
}

export const postTaskScheduler: PostTaskScheduler =
  typeof window !== 'undefined'
    ? (window as any).scheduler || {
        postTask<T>(options: SchedulerPostTaskOptions): Promise<T> {
          const start = Date.now();
          return new Promise((resolve) => {
            setTimeout(function () {
              console.error(
                'postTask not implemented. Use setTimeout as fallback'
              );
              resolve();
            }, 1);
          });
        },
      }
    : () => {};
