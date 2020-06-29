import {
  asyncScheduler,
  SchedulerAction,
  SchedulerLike,
  Subscription
} from 'rxjs';
import { cancelIdleCallback, requestIdleCallback } from './idleCallback';

class IdleAction<T> extends Subscription {
  constructor(private work: (this: SchedulerAction<T>, state?: T) => void) {
    super();
  }

  schedule(state?: T, delay?: number) {
    if (this.closed) {
      return this;
    }
    return idleScheduler.schedule(this.work, delay, state);
  }
}

export const idleScheduler: SchedulerLike = {
  now() {
    return asyncScheduler.now();
  },
  schedule<T>(
    work: (this: SchedulerAction<T>, state?: T) => void,
    delay?: number,
    state?: T
  ): Subscription {
    if (delay) {
      return asyncScheduler.schedule(work, delay, state);
    }

    const action = new IdleAction(work);
    const id = requestIdleCallback(() => {
      try {
        work.call(action, state);
      } catch (error) {
        action.unsubscribe();
        throw error;
      }
    });
    action.add(() => cancelIdleCallback(id));
    return action;
  }
};
