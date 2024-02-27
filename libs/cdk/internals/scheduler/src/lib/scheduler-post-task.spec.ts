import { ɵglobal } from '@angular/core';
import { PriorityLevel } from './schedulerPriorities';

// The Scheduler postTask implementation uses a new postTask browser API to
// schedule work on the main thread. This test suite mocks all browser methods
// used in our implementation. It assumes as little as possible about the order
// and timing of events.
describe('SchedulerPostTask', () => {
  let Scheduler;
  let runtime: ReturnType<typeof installMockBrowserRuntime>;
  let performance: typeof global.performance;
  let scheduleCallback: typeof import('./scheduler').scheduleCallback;
  let cancelCallback: typeof import('./scheduler').cancelCallback;
  let shouldYield: typeof import('./scheduler').shouldYield;
  const ImmediatePriority = PriorityLevel.ImmediatePriority;
  const NormalPriority = PriorityLevel.NormalPriority;
  const UserBlockingPriority = PriorityLevel.UserBlockingPriority;
  const LowPriority = PriorityLevel.LowPriority;
  const IdlePriority = PriorityLevel.IdlePriority;

  beforeEach(() => {
    jest.resetModules();
    jest.mock('./scheduler-post-task', () =>
      jest.requireActual('./scheduler-post-task')
    );

    runtime = installMockBrowserRuntime();
    performance = ɵglobal.performance;
    Scheduler = require('./scheduler-post-task');
    cancelCallback = Scheduler.cancelCallback;
    scheduleCallback = Scheduler.scheduleCallback;
    shouldYield = Scheduler.shouldYield;
  });

  afterEach(() => {
    if (!runtime.isLogEmpty()) {
      throw Error('Test exited without clearing log.');
    }
  });

  function installMockBrowserRuntime() {
    let taskQueue = new Map();
    let eventLog = [];

    let idCounter = 0;
    let currentTime = 0;
    ɵglobal.performance.now = () => {
      return currentTime;
    };

    // Note: setTimeout is used to report errors and nothing else.
    ɵglobal.setTimeout = (cb) => {
      try {
        cb();
      } catch (error) {
        runtime.log(`Error: ${error.message}`);
      }
    };

    // Mock browser scheduler.
    const scheduler = {} as any;
    ɵglobal.scheduler = scheduler;

    scheduler.postTask = function (callback, { signal }) {
      const { priority } = signal;
      const id = idCounter++;
      log(
        `Post Task ${id} [${priority === undefined ? '<default>' : priority}]`
      );
      const controller = signal._controller;
      return new Promise((resolve, reject) => {
        taskQueue.set(controller, { id, callback, resolve, reject });
      });
    };

    scheduler.yield = function ({ signal }) {
      const { priority } = signal;
      const id = idCounter++;
      log(`Yield ${id} [${priority === undefined ? '<default>' : priority}]`);
      const controller = signal._controller;
      let callback;

      return {
        then(cb) {
          callback = cb;
          return new Promise((resolve, reject) => {
            taskQueue.set(controller, { id, callback, resolve, reject });
          });
        },
      };
    };

    ɵglobal.TaskController = class TaskController {
      constructor({ priority }) {
        // @ts-expect-error: This is a mock
        this.signal = { _controller: this, priority };
      }
      abort() {
        const task = taskQueue.get(this);
        if (task !== undefined) {
          taskQueue.delete(this);
          const reject = task.reject;
          reject(new Error('Aborted'));
        }
      }
    };

    function ensureLogIsEmpty() {
      if (eventLog.length !== 0) {
        throw Error('Log is not empty. Call assertLog before continuing.');
      }
    }
    function advanceTime(ms) {
      currentTime += ms;
    }
    function flushTasks() {
      ensureLogIsEmpty();

      // If there's a continuation, it will call postTask again
      // which will set nextTask. That means we need to clear
      // nextTask before the invocation, otherwise we would
      // delete the continuation task.
      const prevTaskQueue = taskQueue;
      taskQueue = new Map();
      for (const [, { id, callback, resolve }] of prevTaskQueue) {
        log(`Task ${id} Fired`);
        callback(false);
        resolve();
      }
    }
    function log(val) {
      eventLog.push(val);
    }
    function isLogEmpty() {
      return eventLog.length === 0;
    }
    function assertLog(expected) {
      const actual = eventLog;
      eventLog = [];
      expect(actual).toEqual(expected);
    }
    return {
      advanceTime,
      flushTasks,
      log,
      isLogEmpty,
      assertLog,
    };
  }

  it('task that finishes before deadline', () => {
    scheduleCallback(NormalPriority, () => {
      runtime.log('A');
    });
    runtime.assertLog(['Post Task 0 [user-visible]']);
    runtime.flushTasks();
    runtime.assertLog(['Task 0 Fired', 'A']);
  });

  it('task with continuation', () => {
    scheduleCallback(NormalPriority, () => {
      runtime.log('A');
      while (!Scheduler.shouldYield()) {
        runtime.advanceTime(1);
      }
      runtime.log(`Yield at ${performance.now()}ms`);
      return () => {
        runtime.log('Continuation');
      };
    });
    runtime.assertLog(['Post Task 0 [user-visible]']);

    runtime.flushTasks();
    runtime.assertLog([
      'Task 0 Fired',
      'A',
      'Yield at 5ms',
      'Yield 1 [user-visible]',
    ]);

    runtime.flushTasks();
    runtime.assertLog(['Task 1 Fired', 'Continuation']);
  });

  it('multiple tasks', () => {
    scheduleCallback(NormalPriority, () => {
      runtime.log('A');
    });
    scheduleCallback(NormalPriority, () => {
      runtime.log('B');
    });
    runtime.assertLog([
      'Post Task 0 [user-visible]',
      'Post Task 1 [user-visible]',
    ]);
    runtime.flushTasks();
    runtime.assertLog(['Task 0 Fired', 'A', 'Task 1 Fired', 'B']);
  });

  it('cancels tasks', () => {
    const task = scheduleCallback(NormalPriority, () => {
      runtime.log('A');
    });
    runtime.assertLog(['Post Task 0 [user-visible]']);
    cancelCallback(task);
    runtime.flushTasks();
    runtime.assertLog([]);
  });

  it('an error in one task does not affect execution of other tasks', () => {
    scheduleCallback(NormalPriority, () => {
      throw Error('Oops!');
    });
    scheduleCallback(NormalPriority, () => {
      runtime.log('Yay');
    });
    runtime.assertLog([
      'Post Task 0 [user-visible]',
      'Post Task 1 [user-visible]',
    ]);
    runtime.flushTasks();
    runtime.assertLog(['Task 0 Fired', 'Error: Oops!', 'Task 1 Fired', 'Yay']);
  });

  it('schedule new task after queue has emptied', () => {
    scheduleCallback(NormalPriority, () => {
      runtime.log('A');
    });

    runtime.assertLog(['Post Task 0 [user-visible]']);
    runtime.flushTasks();
    runtime.assertLog(['Task 0 Fired', 'A']);

    scheduleCallback(NormalPriority, () => {
      runtime.log('B');
    });
    runtime.assertLog(['Post Task 1 [user-visible]']);
    runtime.flushTasks();
    runtime.assertLog(['Task 1 Fired', 'B']);
  });

  it('schedule new task after a cancellation', () => {
    const handle = scheduleCallback(NormalPriority, () => {
      runtime.log('A');
    });

    runtime.assertLog(['Post Task 0 [user-visible]']);
    cancelCallback(handle);

    runtime.flushTasks();
    runtime.assertLog([]);

    scheduleCallback(NormalPriority, () => {
      runtime.log('B');
    });
    runtime.assertLog(['Post Task 1 [user-visible]']);
    runtime.flushTasks();
    runtime.assertLog(['Task 1 Fired', 'B']);
  });

  it('schedules tasks at different priorities', () => {
    scheduleCallback(ImmediatePriority, () => {
      runtime.log('A');
    });
    scheduleCallback(UserBlockingPriority, () => {
      runtime.log('B');
    });
    scheduleCallback(NormalPriority, () => {
      runtime.log('C');
    });
    scheduleCallback(LowPriority, () => {
      runtime.log('D');
    });
    scheduleCallback(IdlePriority, () => {
      runtime.log('E');
    });
    runtime.assertLog([
      'Post Task 0 [user-blocking]',
      'Post Task 1 [user-blocking]',
      'Post Task 2 [user-visible]',
      'Post Task 3 [user-visible]',
      'Post Task 4 [background]',
    ]);
    runtime.flushTasks();
    runtime.assertLog([
      'Task 0 Fired',
      'A',
      'Task 1 Fired',
      'B',
      'Task 2 Fired',
      'C',
      'Task 3 Fired',
      'D',
      'Task 4 Fired',
      'E',
    ]);
  });

  it('yielding continues in a new task regardless of how much time is remaining', () => {
    scheduleCallback(NormalPriority, () => {
      runtime.log('Original Task');
      runtime.log('shouldYield: ' + shouldYield());
      runtime.log('Return a continuation');
      return () => {
        runtime.log('Continuation Task');
      };
    });
    runtime.assertLog(['Post Task 0 [user-visible]']);

    runtime.flushTasks();
    runtime.assertLog([
      'Task 0 Fired',
      'Original Task',
      // Immediately before returning a continuation, `shouldYield` returns
      // false, which means there must be time remaining in the frame.
      'shouldYield: false',
      'Return a continuation',

      // The continuation should be scheduled in a separate macrotask even
      // though there's time remaining.
      'Yield 1 [user-visible]',
    ]);

    // No time has elapsed
    expect(performance.now()).toBe(0);

    runtime.flushTasks();
    runtime.assertLog(['Task 1 Fired', 'Continuation Task']);
  });

  describe('falls back to postTask for scheduling continuations when scheduler.yield is not available', () => {
    beforeEach(() => {
      delete global.scheduler.yield;
    });

    it('task with continuation', () => {
      scheduleCallback(NormalPriority, () => {
        runtime.log('A');
        while (!Scheduler.shouldYield()) {
          runtime.advanceTime(1);
        }
        runtime.log(`Yield at ${performance.now()}ms`);
        return () => {
          runtime.log('Continuation');
        };
      });
      runtime.assertLog(['Post Task 0 [user-visible]']);

      runtime.flushTasks();
      runtime.assertLog([
        'Task 0 Fired',
        'A',
        'Yield at 5ms',
        'Post Task 1 [user-visible]',
      ]);

      runtime.flushTasks();
      runtime.assertLog(['Task 1 Fired', 'Continuation']);
    });

    it('yielding continues in a new task regardless of how much time is remaining', () => {
      scheduleCallback(NormalPriority, () => {
        runtime.log('Original Task');
        runtime.log('shouldYield: ' + shouldYield());
        runtime.log('Return a continuation');
        return () => {
          runtime.log('Continuation Task');
        };
      });
      runtime.assertLog(['Post Task 0 [user-visible]']);

      runtime.flushTasks();
      runtime.assertLog([
        'Task 0 Fired',
        'Original Task',
        // Immediately before returning a continuation, `shouldYield` returns
        // false, which means there must be time remaining in the frame.
        'shouldYield: false',
        'Return a continuation',

        // The continuation should be scheduled in a separate macrotask even
        // though there's time remaining.
        'Post Task 1 [user-visible]',
      ]);

      // No time has elapsed
      expect(performance.now()).toBe(0);

      runtime.flushTasks();
      runtime.assertLog(['Task 1 Fired', 'Continuation Task']);
    });
  });
});
