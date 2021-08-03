// tslint:disable
import { AsyncAction } from '../async/AsyncAction';
import { AsapScheduler } from './AsapScheduler';
import { SchedulerAction } from '../types';
import { Promise } from '../../../browser/browser';

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
export class AsapAction<T> extends AsyncAction<T> {
  constructor(
    protected scheduler: AsapScheduler,
    protected work: (this: SchedulerAction<T>, state?: T) => void
  ) {
    super(scheduler, work);
  }

  protected requestAsyncId(
    scheduler: AsapScheduler,
    id?: any,
    delay: number = 0
  ): any {
    // If delay is greater than 0, request as an async action.
    if (delay !== null && delay > 0) {
      return super.requestAsyncId(scheduler, id, delay);
    }
    // Push the action to the end of the scheduler queue.
    scheduler.actions.push(this);
    // If a microtask has already been scheduled, don't schedule another
    // one. If a microtask hasn't been scheduled yet, schedule one now. Return
    // the current scheduled microtask id.
    return (
      scheduler.scheduled ||
      (scheduler.scheduled = Immediate.setImmediate(
        scheduler.flush.bind(scheduler, undefined)
      ))
    );
  }
  protected recycleAsyncId(
    scheduler: AsapScheduler,
    id?: any,
    delay: number = 0
  ): any {
    // If delay exists and is greater than 0, or if the delay is null (the
    // action wasn't rescheduled) but was originally scheduled as an async
    // action, then recycle as an async action.
    if ((delay !== null && delay > 0) || (delay === null && this.delay > 0)) {
      return super.recycleAsyncId(scheduler, id, delay);
    }
    // If the scheduler queue is empty, cancel the requested microtask and
    // set the scheduled flag to undefined so the next AsapAction will schedule
    // its own.
    if (scheduler.actions.length === 0) {
      Immediate.clearImmediate(id);
      scheduler.scheduled = undefined;
    }
    // Return undefined so the action knows to request a new async id if it's rescheduled.
    return undefined;
  }
}

let nextHandle = 1;
// The promise needs to be created lazily otherwise it won't be patched by Zones
let resolved: Promise<any>;
const activeHandles: { [key: number]: any } = {};

/**
 * Finds the handle in the list of active handles, and removes it.
 * Returns `true` if found, `false` otherwise. Used both to clear
 * Immediate scheduled tasks, and to identify if a task should be scheduled.
 */
function findAndClearHandle(handle: number): boolean {
  if (handle in activeHandles) {
    delete activeHandles[handle];
    return true;
  }
  return false;
}

/**
 * Helper functions to schedule and unschedule microtasks.
 */
const Immediate = {
  setImmediate(cb: () => void): number {
    const handle = nextHandle++;
    activeHandles[handle] = true;
    if (!resolved) {
      resolved = Promise.resolve();
    }
    resolved.then(() => findAndClearHandle(handle) && cb());
    return handle;
  },

  clearImmediate(handle: number): void {
    findAndClearHandle(handle);
  },
};

/**
 * Used for internal testing purposes only. Do not export from library.
 */
export const TestTools = {
  pending() {
    return Object.keys(activeHandles).length;
  },
};
