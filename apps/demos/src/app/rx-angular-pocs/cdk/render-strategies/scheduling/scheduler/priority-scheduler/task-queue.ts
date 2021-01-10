let nextHandle = 1;
const activeHandles: { [key: number]: any } = {};

export abstract class TaskQueue<T, O> {

  protected abstract _queTask: (cb: () => void, options: O) => [T, number];
  protected abstract _dequeTask: (handle: T) => void;

  // mental model queueTask is similar to setTimeout:
  // add a callback to be executed in the future and return an async id  as handle
  queueTask(cb: () => void, options: O): number {
    const [task, id] = this._queTask(cb, options);
    this.addTask(id, task);
    return id;
  };

  // mental model dequeueTask is similar to clearTimeout:
  // remove the once scheduled task async handle id
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
