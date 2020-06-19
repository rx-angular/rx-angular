import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
import { AsyncScheduler } from 'rxjs/internal/scheduler/AsyncScheduler';

/**
 *
 * Implementation based on AsapScheduler
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
              console.error(
                'postTask not implemented. Use setTimeout as fallback'
              );
              resolve();
            }, 1);
          });
        }
      }
    : () => {
        console.log('NOOP');
      };

export class RxPostTaskScheduler extends AsyncScheduler {
  public flush(action?: AsyncAction<any>): void {
    this.active = true;
    this.scheduled = undefined;

    const { actions } = this;
    let error: any;
    let index = -1;
    const count = actions.length;
    action = action || actions.shift();

    do {
      if ((error = action.execute(action.state, action.delay))) {
        break;
      }
    } while (++index < count && (action = actions.shift()));

    this.active = false;

    if (error) {
      while (++index < count && (action = actions.shift())) {
        action.unsubscribe();
      }
      throw error;
    }
  }
}
