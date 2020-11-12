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
