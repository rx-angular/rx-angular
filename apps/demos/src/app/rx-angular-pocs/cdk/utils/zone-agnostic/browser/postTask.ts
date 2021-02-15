import { getZoneUnPatchedApi } from '../zone-checks';
import { setTimeout } from './setTimeout';

export enum PostTaskSchedulerPriority {
  background = 'background',
  userBlocking = 'user-blocking',
  userVisible = 'user-visible',
}

export interface PostTaskScheduler {
  postTask<T>(cb: () => T, options: SchedulerPostTaskOptions): Promise<T>;
}

export interface SchedulerPostTaskOptions {
  priority: PostTaskSchedulerPriority | string | null;
  delay?: number;
  signal?: any;
}

(window as any).__postTaskScheduler__present = typeof window !== 'undefined' ? (window as any).scheduler : false;

export const postTaskScheduler: PostTaskScheduler =
  typeof window !== 'undefined'
    ? ((window as any).scheduler ? getZoneUnPatchedApi('scheduler') as PostTaskScheduler : false) || {
    postTask<T>(cb: () => T, options: SchedulerPostTaskOptions): Promise<T> {
      return new Promise<T>((resolve) => {
        setTimeout(function() {
          console.warn('postTask not implemented. Use setTimeout scheduled over Promise as fallback');
          resolve(cb());
        }, options.delay !== undefined ? options.delay : 1);
      });
    }
  } as PostTaskScheduler
    : {
      postTask: <T>(cb: () => void, options: SchedulerPostTaskOptions): Promise<T> => Promise.resolve() as unknown as Promise<T>
    };
