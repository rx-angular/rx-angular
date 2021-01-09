import { PrioritySchedulingOptions } from './model';

let nextHandle = 1;
const activeHandles: { [key: number]: any } = {};

export abstract class TaskQueue<P, T> {

  _queTask: (cb: () => void, options: PrioritySchedulingOptions<P>) => [T, number];
  _dequeTask: (handle: any, scope?: any) => void;

  queueTask(cb: () => void, options: PrioritySchedulingOptions<P>): number {
    const [task, id] = this._queTask(cb, options);
    this.addTask(id, task);
    return id;
  };

  dequeueTask(id: number, scope?: any): void {
    this.clearTask(id, scope);
  }

  getTaskId(): number {
    return ++nextHandle;
  }

  addTask(id, handle) {
    activeHandles[id] = handle;
  }

  clearTask(id: number, scope: any): boolean {
    if (id in activeHandles) {
      this._dequeTask(activeHandles[id], scope);
      delete activeHandles[id];
      return true;
    }
    return false;
  }
}
