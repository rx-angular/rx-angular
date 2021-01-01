import { priorityLevel } from '../../../render-strategies/model/priority';
import { cancelCallback, scheduleCallback } from '../../scheduling/concurrent-scheduler/react-source-code/scheduler';
let nextHandle = 1;
const activeHandles: { [key: number]: any } = {};

/**
 * Finds the handle in the list of active handles, and removes it.
 * Returns `true` if found, `false` otherwise. Used both to clear
 * Immediate scheduled tasks, and to identify if a task should be scheduled.
 */
function findAndClearHandle(handle: number): boolean {
  if (handle in activeHandles) {
    cancelCallback(activeHandles[handle]);
    delete activeHandles[handle];
    return true;
  }
  return false;
}

/**
 * Helper functions to schedule and unschedule microtasks.
 */
export const GlobalQueue = {
  setHandle(cb: () => void, priority: priorityLevel): number {
    const handle = nextHandle++;
    activeHandles[handle] = scheduleCallback(priority, () => findAndClearHandle(handle) && cb(), {});
    return handle;
  },

  clearHandle(handle: number): void {
    findAndClearHandle(handle);
  },
};
