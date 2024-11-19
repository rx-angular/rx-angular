// https://github.com/facebook/react/blob/master/packages/scheduler/src/__tests__/SchedulerDOM-test.js
import { ɵglobal } from '@angular/core';

const originalPerformance = ɵglobal.performance,
  originalSetTimeout = ɵglobal.setTimeout,
  originalClearTimeout = ɵglobal.clearTimeout,
  originalSetImmediate = ɵglobal.setImmediate,
  originalClearImmediate = ɵglobal.clearImmediate,
  originalRequestAnimationFrame = ɵglobal.requestAnimationFrame,
  originalCancelAnimationFrame = ɵglobal.cancelAnimationFrame,
  originalMessageChannel = ɵglobal.MessageChannel;

describe('Scheduler', () => {
  let runtime: ReturnType<typeof installMockBrowserRuntime>;
  let performance: typeof global.performance;
  let schedulingMessageEvent: LogEvent;

  const NormalPriority = 3;
  let scheduleCallback: typeof import('./scheduler').scheduleCallback;
  let cancelCallback: typeof import('./scheduler').cancelCallback;

  describe.each([['Browser'], ['Node'], ['NonBrowser']])('%p', (env) => {
    beforeEach(() => {
      jest.resetModules();
      jest.mock('./scheduler', () => jest.requireActual('./scheduler'));
      switch (env) {
        case 'Browser':
          runtime = installMockBrowserRuntime();
          schedulingMessageEvent = LogEvent.PostMessage;
          break;
        case 'Node':
          runtime = installMockNodeRuntime();
          schedulingMessageEvent = LogEvent.SetImmediate;
          break;
        case 'NonBrowser':
          runtime = installMockNonBrowserRuntime();
          schedulingMessageEvent = LogEvent.SetTimer;
          break;
      }
      performance = ɵglobal.performance;
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const Scheduler = require('./scheduler');
      scheduleCallback = Scheduler.scheduleCallback;
      cancelCallback = Scheduler.cancelCallback;
    });

    afterEach(() => {
      if (!runtime.isLogEmpty()) {
        throw Error('Test eited without clearing log.');
      }
    });

    afterAll(() => {
      ɵglobal.performance = originalPerformance;
      ɵglobal.setTimeout = originalSetTimeout;
      ɵglobal.clearTimeout = originalClearTimeout;
      ɵglobal.setImmediate = originalSetImmediate;
      ɵglobal.clearImmediate = originalClearImmediate;
      ɵglobal.requestAnimationFrame = originalRequestAnimationFrame;
      ɵglobal.cancelAnimationFrame = originalCancelAnimationFrame;
      ɵglobal.MessageChannel = originalMessageChannel;
    });

    it('task that finishes before deadline', () => {
      scheduleCallback(NormalPriority, () => {
        runtime.log(LogEvent.Task);
      });
      runtime.assertLog([schedulingMessageEvent]);
      runtime.fireMessageEvent();
      runtime.assertLog([LogEvent.MessageEvent, LogEvent.Task]);
    });

    it('multiple tasks', () => {
      scheduleCallback(NormalPriority, () => {
        runtime.log('A');
      });
      scheduleCallback(NormalPriority, () => {
        runtime.log('B');
      });
      runtime.assertLog([schedulingMessageEvent]);
      runtime.fireMessageEvent();
      runtime.assertLog([LogEvent.MessageEvent, 'A', 'B']);
    });

    it('multiple tasks with a yield in between', () => {
      scheduleCallback(NormalPriority, () => {
        runtime.log('A');
        runtime.advanceTime(4999);
      });
      scheduleCallback(NormalPriority, () => {
        runtime.log('B');
      });
      runtime.assertLog([schedulingMessageEvent]);
      runtime.fireMessageEvent();
      runtime.assertLog([
        LogEvent.MessageEvent,
        'A',
        // Ran out of time. Post a continuation event.
        schedulingMessageEvent,
      ]);
      runtime.fireMessageEvent();
      runtime.assertLog([LogEvent.MessageEvent, 'B']);
    });

    it('cancels tasks', () => {
      const task = scheduleCallback(NormalPriority, () => {
        runtime.log(LogEvent.Task);
      });
      runtime.assertLog([schedulingMessageEvent]);
      cancelCallback(task);
      runtime.assertLog([]);
    });

    it('throws when a task errors then continues in a new event', () => {
      scheduleCallback(NormalPriority, () => {
        runtime.log('Oops!');
        throw Error('Oops!');
      });
      scheduleCallback(NormalPriority, () => {
        runtime.log('Yay');
      });
      runtime.assertLog([schedulingMessageEvent]);

      expect(() => runtime.fireMessageEvent()).toThrow('Oops!');
      runtime.assertLog([
        LogEvent.MessageEvent,
        'Oops!',
        schedulingMessageEvent,
      ]);

      runtime.fireMessageEvent();
      runtime.assertLog([LogEvent.MessageEvent, 'Yay']);
    });

    it('schedule new task after queue has emptied', () => {
      scheduleCallback(NormalPriority, () => {
        runtime.log('A');
      });

      runtime.assertLog([schedulingMessageEvent]);
      runtime.fireMessageEvent();
      runtime.assertLog([LogEvent.MessageEvent, 'A']);

      scheduleCallback(NormalPriority, () => {
        runtime.log('B');
      });
      runtime.assertLog([schedulingMessageEvent]);
      runtime.fireMessageEvent();
      runtime.assertLog([LogEvent.MessageEvent, 'B']);
    });

    it('schedule new task after a cancellation', () => {
      const handle = scheduleCallback(NormalPriority, () => {
        runtime.log('A');
      });

      runtime.assertLog([schedulingMessageEvent]);
      cancelCallback(handle);

      runtime.fireMessageEvent();
      runtime.assertLog([LogEvent.MessageEvent]);

      scheduleCallback(NormalPriority, () => {
        runtime.log('B');
      });
      runtime.assertLog([schedulingMessageEvent]);
      runtime.fireMessageEvent();
      runtime.assertLog([LogEvent.MessageEvent, 'B']);
    });

    describe('NgZone', () => {
      it('should run task with configured patch', () => {
        const ngZone = getMockNgZone();
        scheduleCallback(
          NormalPriority,
          () => {
            runtime.log('A');
          },
          { ngZone },
        );
        runtime.assertLog([schedulingMessageEvent]);
        runtime.fireMessageEvent();
        expect(ngZone.run).toHaveBeenCalledTimes(1);
        runtime.assertLog([LogEvent.MessageEvent, 'A']);
      });

      it('should run multiple tasks with different patches', () => {
        const ngZone = getMockNgZone();
        const ngZone2 = getMockNgZone();
        scheduleCallback(
          NormalPriority,
          () => {
            runtime.log('A');
          },
          { ngZone },
        );
        scheduleCallback(
          NormalPriority,
          () => {
            runtime.log('B');
          },
          { ngZone: ngZone2 },
        );
        scheduleCallback(
          NormalPriority,
          () => {
            runtime.log('C');
          },
          { ngZone: ngZone },
        );
        runtime.assertLog([schedulingMessageEvent]);
        runtime.fireMessageEvent();
        expect(ngZone.run).toHaveBeenCalledTimes(2);
        expect(ngZone2.run).toHaveBeenCalledTimes(1);
        runtime.assertLog([LogEvent.MessageEvent, 'A', 'B', 'C']);
      });

      it('should work with multiple tasks with a yield in between', () => {
        const ngZone = getMockNgZone();
        const ngZone2 = getMockNgZone();
        scheduleCallback(
          NormalPriority,
          () => {
            runtime.log('A');
          },
          { ngZone },
        );
        scheduleCallback(
          NormalPriority,
          () => {
            runtime.log('B');
            runtime.advanceTime(4000);
          },
          { ngZone: ngZone2 },
        );
        scheduleCallback(
          NormalPriority,
          () => {
            runtime.log('C');
          },
          { ngZone },
        );
        runtime.assertLog([schedulingMessageEvent]);
        runtime.fireMessageEvent();
        runtime.assertLog([
          LogEvent.MessageEvent,
          'A',
          'B',
          // Ran out of time. Post a continuation event.
          schedulingMessageEvent,
        ]);
        // expect(ngZone.run).toHaveBeenCalledTimes(1);
        runtime.fireMessageEvent();
        runtime.assertLog([LogEvent.MessageEvent, 'C']);
        expect(ngZone2.run).toHaveBeenCalledTimes(1);
        expect(ngZone.run).toHaveBeenCalledTimes(2);
      });

      it('should execute work that was added by NgZone', () => {
        const ngZone = {
          run: jest.fn((fn: (...args: any[]) => any) => {
            const result = fn();
            scheduleCallback(NormalPriority, () => {
              runtime.log('B');
            });
            return result;
          }),
        };
        scheduleCallback(
          NormalPriority,
          () => {
            runtime.log('A');
          },
          { ngZone },
        );
        runtime.assertLog([schedulingMessageEvent]);
        runtime.fireMessageEvent();
        runtime.assertLog([LogEvent.MessageEvent, 'A', 'B']);
      });
    });
  });

  const enum LogEvent {
    Task = 'Task',
    SetTimer = 'Set Timer',
    SetImmediate = 'Set Immediate',
    PostMessage = 'Post Message',
    MessageEvent = 'Message Event',
    Continuation = 'Continuation',
  }

  function getMockNgZone() {
    const run = jest.fn((fn: (...args: any[]) => any) => {
      return fn();
    });
    return { run };
  }

  function installMockBrowserRuntime() {
    let timerIdCounter = 0;
    let currentTime = 0;
    let eventLog: string[] = [];
    let hasPendingMessageEvent = false;

    ɵglobal.performance.now = () => {
      return currentTime;
    };

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ɵglobal.requestAnimationFrame = ɵglobal.cancelAnimationFrame = () => {};

    ɵglobal.setTimeout = () => {
      const id = timerIdCounter++;
      log(LogEvent.SetTimer);
      return id;
    };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ɵglobal.clearTimeout = () => {};

    const port1 = {} as MessagePort;
    const port2 = {
      postMessage() {
        if (hasPendingMessageEvent) {
          throw Error('Message event already scheduled');
        }
        log(LogEvent.PostMessage);
        hasPendingMessageEvent = true;
      },
    };

    ɵglobal.MessageChannel = function MessageChannel() {
      this.port1 = port1;
      this.port2 = port2;
    };

    ɵglobal.setImmediate = undefined;

    function ensureLogIsEmpty(): void | never {
      if (eventLog.length !== 0) {
        throw Error('Log is not empty. Call assertLog before continuing.');
      }
    }

    function advanceTime(ms: number): void {
      currentTime += ms;
    }

    function fireMessageEvent(): void {
      ensureLogIsEmpty();
      if (!hasPendingMessageEvent) {
        throw Error('No message event was scheduled');
      }
      hasPendingMessageEvent = false;
      const onMessage = port1.onmessage;
      log(LogEvent.MessageEvent);
      onMessage.call(port1);
    }

    function log(value: string): void {
      eventLog.push(value);
    }

    function isLogEmpty(): boolean {
      return eventLog.length === 0;
    }

    function assertLog(expected: string[]): void {
      const actual = eventLog;
      eventLog = [];
      expect(actual).toEqual(expected);
    }

    return {
      advanceTime,
      fireMessageEvent,
      log,
      isLogEmpty,
      assertLog,
    };
  }
  function installMockNodeRuntime() {
    const _runtime = installMockBrowserRuntime();
    let immediateIdCounter = 0;
    let pendingExhaust;

    ɵglobal.setImmediate = (cb: () => void) => {
      if (pendingExhaust) {
        throw Error('Message event already scheduled');
      }
      const id = immediateIdCounter++;
      _runtime.log(LogEvent.SetImmediate);
      pendingExhaust = cb;
      return id;
    };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ɵglobal.clearImmediate = () => {};

    function fireMessageEvent(): void {
      if (!pendingExhaust) {
        throw Error('No message event was scheduled');
      }
      _runtime.log(LogEvent.MessageEvent);
      const exhaust = pendingExhaust;
      pendingExhaust = null;
      exhaust();
    }
    return {
      advanceTime: _runtime.advanceTime,
      fireMessageEvent,
      log: _runtime.log,
      isLogEmpty: _runtime.isLogEmpty,
      assertLog: _runtime.assertLog,
    };
  }
  function installMockNonBrowserRuntime() {
    const _runtime = installMockBrowserRuntime();
    let immediateIdCounter = 0;
    let pendingExhaust;
    ɵglobal.MessageChannel = undefined;
    ɵglobal.setTimeout = (cb: () => void) => {
      const id = immediateIdCounter++;
      _runtime.log(LogEvent.SetTimer);
      pendingExhaust = cb;
      return id;
    };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    ɵglobal.clearTimeout = () => {};

    function fireMessageEvent(): void {
      if (!pendingExhaust) {
        throw Error('No message event was scheduled');
      }
      _runtime.log(LogEvent.MessageEvent);
      const exhaust = pendingExhaust;
      pendingExhaust = null;
      exhaust();
    }
    return {
      advanceTime: _runtime.advanceTime,
      fireMessageEvent,
      log: _runtime.log,
      isLogEmpty: _runtime.isLogEmpty,
      assertLog: _runtime.assertLog,
    };
  }
});
