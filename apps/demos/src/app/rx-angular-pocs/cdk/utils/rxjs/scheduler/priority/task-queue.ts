import { RxaSchedulingOptions } from './model';

let nextHandle = 1;
const activeHandles: { [key: number]: any } = {};

export abstract class TaskQueue<P, T> {

  _queTask: (cb: () => void, options: RxaSchedulingOptions<P>) => [T, number];
  _dequeTask: (handle: any) => void;

  queueTask(cb: () => void, options: RxaSchedulingOptions<P>): number {
    const [task, id, ] = this._queTask(cb, options);
    this.addTask(id, task);
    return id;
  };

  dequeueTask(id: number): void {
    this.clearTask(id);
  }

  getTaskId(): number {
    return ++nextHandle;
  }

  addTask(id, handle) {
    activeHandles[id] = handle;
  }

  clearTask(id: number): boolean {
    if (id in activeHandles) {
      this._dequeTask(activeHandles[id]);
      delete activeHandles[id];
      return true;
    }
    return false;
  }
}
