// see https://github.com/facebook/react/blob/main/packages/scheduler/src/forks/Scheduler.js

import { ɵglobal } from '@angular/core';
import { enableIsInputPending } from './schedulerFeatureFlags';
import { peek, pop, push, ReactSchedulerTask, SchedulerTaskZone } from './schedulerMinHeap';

import { PriorityLevel } from './schedulerPriorities';

/**
 * @description Will be provided through Terser global definitions by Angular CLI
 * during the production build.
 */
declare const ngDevMode: boolean;

let getCurrentTime: () => number;
const hasPerformanceNow =
  typeof ɵglobal.performance === 'object' && typeof ɵglobal.performance.now === 'function';

if (hasPerformanceNow) {
  const localPerformance = ɵglobal.performance;
  getCurrentTime = () => localPerformance.now();
} else {
  const localDate = Date;
  const initialTime = localDate.now();
  getCurrentTime = () => localDate.now() - initialTime;
}

// Max 31 bit integer. The max integer size in V8 for 32-bit systems.
// Math.pow(2, 30) - 1
// 0b111111111111111111111111111111
const maxSigned31BitInt = 1073741823;

// Times out immediately
const IMMEDIATE_PRIORITY_TIMEOUT = -1;
// Eventually times out
const USER_BLOCKING_PRIORITY_TIMEOUT = 250;
const NORMAL_PRIORITY_TIMEOUT = 5000;
const LOW_PRIORITY_TIMEOUT = 10000;
// Never times out
const IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt;

// Tasks are stored on a min heap
const taskQueue = [];
const timerQueue = [];

// Incrementing id counter. Used to maintain insertion order.
let taskIdCounter = 1;

// Pausing the scheduler is useful for debugging.
let isSchedulerPaused = false;

let currentTask: ReactSchedulerTask = null;
let currentPriorityLevel = PriorityLevel.NormalPriority;

// This is set while performing work, to prevent re-entrancy.
let isPerformingWork = false;

let isHostCallbackScheduled = false;
let isHostTimeoutScheduled = false;

// Capture local references to native APIs, in case a polyfill overrides them.
const setTimeout = ɵglobal.setTimeout;
const clearTimeout = ɵglobal.clearTimeout;
const setImmediate = ɵglobal.setImmediate; // IE and Node.js + jsdom
const messageChannel = ɵglobal.MessageChannel;

const isInputPending =
  typeof ɵglobal.navigator !== 'undefined' &&
  ɵglobal.navigator.scheduling !== undefined &&
  ɵglobal.navigator.scheduling.isInputPending !== undefined
  ? ɵglobal.navigator.scheduling.isInputPending.bind(ɵglobal.navigator.scheduling)
  : null;

const defaultZone = {
  run: fn => fn()
};
function advanceTimers(currentTime) {
  // Check for tasks that are no longer delayed and add them to the queue.
  let timer = peek(timerQueue);
  while (timer !== null) {
    if (timer.callback === null) {
      // Timer was cancelled.
      pop(timerQueue);
    } else if (timer.startTime <= currentTime) {
      // Timer fired. Transfer to the task queue.
      pop(timerQueue);
      timer.sortIndex = timer.expirationTime;
      push(taskQueue, timer);
    } else {
      // Remaining timers are pending.
      return;
    }
    timer = peek(timerQueue);
  }
}

function handleTimeout(currentTime) {
  isHostTimeoutScheduled = false;
  advanceTimers(currentTime);

  if (!isHostCallbackScheduled) {
    if (peek(taskQueue) !== null) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    } else {
      const firstTimer = peek(timerQueue);
      if (firstTimer !== null) {
        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
      }
    }
  }
}

function flushWork(hasTimeRemaining, initialTime) {
  // We'll need a host callback the next time work is scheduled.
  isHostCallbackScheduled = false;
  if (isHostTimeoutScheduled) {
    // We scheduled a timeout but it's no longer needed. Cancel it.
    isHostTimeoutScheduled = false;
    cancelHostTimeout();
  }

  isPerformingWork = true;
  const previousPriorityLevel = currentPriorityLevel;
  try {
    return workLoop(hasTimeRemaining, initialTime);
  } finally {
    currentTask = null;
    currentPriorityLevel = previousPriorityLevel;
    isPerformingWork = false;
  }
}

function workLoop(hasTimeRemaining: boolean, initialTime: number, _currentTask?: ReactSchedulerTask) {
  let currentTime = initialTime;
  if (_currentTask) {
    currentTask = _currentTask;
  } else {
    advanceTimers(currentTime);
    currentTask = peek(taskQueue);
  }
  let zoneChanged = false;
  const hitDeadline = () =>
    currentTask && currentTask.expirationTime > currentTime &&
    (!hasTimeRemaining || shouldYieldToHost());

  if (!hitDeadline()) {
    const ngZone = currentTask.ngZone || defaultZone;
    ngZone.run(() => {
      while (currentTask !== null && !zoneChanged) {
        if (hitDeadline()) {
          break;
        }
        const callback = currentTask.callback;
        if (typeof callback === 'function') {
          currentTask.callback = null;
          currentPriorityLevel = currentTask.priorityLevel;
          const didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
          const continuationCallback = callback(didUserCallbackTimeout);
          currentTime = getCurrentTime();
          if (typeof continuationCallback === 'function') {
            currentTask.callback = continuationCallback;
          } else {
            if (currentTask === peek(taskQueue)) {
              pop(taskQueue);
            }
          }
          advanceTimers(currentTime);
        } else {
          pop(taskQueue);
        }
        currentTask = peek(taskQueue);
        zoneChanged = currentTask?.ngZone != null && currentTask.ngZone !== ngZone;
      }
    });
  }
  if (zoneChanged) {
    return workLoop(hasTimeRemaining, currentTime, currentTask);
  }
  // Return whether there's additional work
  if (currentTask !== null) {
    return true;
  } else {
    const firstTimer = peek(timerQueue);
    if (firstTimer !== null) {
      requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
    }
    return false;
  }
}

function runWithPriority(priorityLevel, eventHandler) {
  switch (priorityLevel) {
    case PriorityLevel.ImmediatePriority:
    case PriorityLevel.UserBlockingPriority:
    case PriorityLevel.NormalPriority:
    case PriorityLevel.LowPriority:
    case PriorityLevel.IdlePriority:
      break;
    default:
      priorityLevel = PriorityLevel.NormalPriority;
  }

  const previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;

  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
}

function next(eventHandler) {
  let priorityLevel;
  switch (currentPriorityLevel) {
    case PriorityLevel.ImmediatePriority:
    case PriorityLevel.UserBlockingPriority:
    case PriorityLevel.NormalPriority:
      // Shift down to normal priority
      priorityLevel = PriorityLevel.NormalPriority;
      break;
    default:
      // Anything lower than normal priority should remain at the current level.
      priorityLevel = currentPriorityLevel;
      break;
  }

  const previousPriorityLevel = currentPriorityLevel;
  currentPriorityLevel = priorityLevel;

  try {
    return eventHandler();
  } finally {
    currentPriorityLevel = previousPriorityLevel;
  }
}

function wrapCallback(callback: VoidFunction) {
  const parentPriorityLevel = currentPriorityLevel;
  return () => {
    // This is a fork of runWithPriority, inlined for performance.
    const previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = parentPriorityLevel;

    try {
      // eslint-disable-next-line prefer-rest-params
      return callback.apply(this, arguments);
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  };
}

interface ScheduleCallbackOptions {
  delay?: number;
  ngZone?: SchedulerTaskZone;
}

function scheduleCallback(
  priorityLevel: PriorityLevel,
  callback: VoidFunction,
  options?: ScheduleCallbackOptions
): ReactSchedulerTask {
  const currentTime = getCurrentTime();

  let startTime: number;
  if (typeof options === 'object' && options !== null) {
    const delay = options.delay;
    if (typeof delay === 'number' && delay > 0) {
      startTime = currentTime + delay;
    } else {
      startTime = currentTime;
    }
  } else {
    startTime = currentTime;
  }

  let timeout: number;
  switch (priorityLevel) {
    case PriorityLevel.ImmediatePriority:
      timeout = IMMEDIATE_PRIORITY_TIMEOUT;
      break;
    case PriorityLevel.UserBlockingPriority:
      timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
      break;
    case PriorityLevel.IdlePriority:
      timeout = IDLE_PRIORITY_TIMEOUT;
      break;
    case PriorityLevel.LowPriority:
      timeout = LOW_PRIORITY_TIMEOUT;
      break;
    case PriorityLevel.NormalPriority:
    default:
      timeout = NORMAL_PRIORITY_TIMEOUT;
      break;
  }

  const expirationTime = startTime + timeout;

  const newTask: ReactSchedulerTask = {
    id: taskIdCounter++,
    callback,
    priorityLevel,
    startTime,
    expirationTime,
    sortIndex: -1,
    ngZone: options?.ngZone || null
  };

  if (startTime > currentTime) {
    // This is a delayed task.
    newTask.sortIndex = startTime;
    push(timerQueue, newTask);
    if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
      // All tasks are delayed, and this is the task with the earliest delay.
      if (isHostTimeoutScheduled) {
        // Cancel an existing timeout.
        cancelHostTimeout();
      } else {
        isHostTimeoutScheduled = true;
      }
      // Schedule a timeout.
      requestHostTimeout(handleTimeout, startTime - currentTime);
    }
  } else {
    newTask.sortIndex = expirationTime;
    push(taskQueue, newTask);
    // Schedule a host callback, if needed. If we're already performing work,
    // wait until the next time we yield.
    if (!isHostCallbackScheduled && !isPerformingWork) {
      isHostCallbackScheduled = true;
      requestHostCallback(flushWork);
    }
  }

  return newTask;
}

function pauseExecution() {
  isSchedulerPaused = true;
}

function continueExecution() {
  isSchedulerPaused = false;
  if (!isHostCallbackScheduled && !isPerformingWork) {
    isHostCallbackScheduled = true;
    requestHostCallback(flushWork);
  }
}

function getFirstCallbackNode() {
  return peek(taskQueue);
}

function cancelCallback(task) {
  // Null out the callback to indicate the task has been canceled. (Can't
  // remove from the queue because you can't remove arbitrary nodes from an
  // array based heap, only the first one.)
  task.callback = null;
}

function getCurrentPriorityLevel() {
  return currentPriorityLevel;
}

let isMessageLoopRunning = false;
let scheduledHostCallback = null;
let taskTimeoutID = -1;

// Scheduler periodically yields in case there is other work on the main
// thread, like user events. By default, it yields multiple times per frame.
// It does not attempt to align with frame boundaries, since most tasks don't
// need to be frame aligned; for those that do, use requestAnimationFrame.
let yieldInterval = 16;

// TODO: Make this configurable
// TODO: Adjust this based on priority?
const maxYieldInterval = 300;
let needsPaint = false;
let queueStartTime = -1;

function shouldYieldToHost() {
  const timeElapsed = getCurrentTime() - queueStartTime;
  if (timeElapsed < yieldInterval) {
    // The main thread has only been blocked for a really short amount of time;
    // smaller than a single frame. Don't yield yet.
    return false;
  }

  // The main thread has been blocked for a non-negligible amount of time. We
  // may want to yield control of the main thread, so the browser can perform
  // high priority tasks. The main ones are painting and user input. If there's
  // a pending paint or a pending input, then we should yield. But if there's
  // neither, then we can yield less often while remaining responsive. We'll
  // eventually yield regardless, since there could be a pending paint that
  // wasn't accompanied by a call to `requestPaint`, or other main thread tasks
  // like network events.

  // we don't support isInputPending currently
  /*if (enableIsInputPending) {
    if (needsPaint) {
      // There's a pending paint (signaled by `requestPaint`). Yield now.
      return true;
    }
    if (timeElapsed < continuousInputInterval) {
      // We haven't blocked the thread for that long. Only yield if there's a
      // pending discrete input (e.g. click). It's OK if there's pending
      // continuous input (e.g. mouseover).
      if (isInputPending !== null) {
        return isInputPending();
      }
    } else if (timeElapsed < maxInterval) {
      // Yield if there's either a pending discrete or continuous input.
      if (isInputPending !== null) {
        return isInputPending(continuousOptions);
      }
    } else {
      // We've blocked the thread for a long time. Even if there's no pending
      // input, there may be some other scheduled work that we don't know about,
      // like a network event. Yield now.
      return true;
    }
  }*/

  // `isInputPending` isn't available. Yield now.
  return true;
}

function requestPaint() {
  if (
    enableIsInputPending &&
    navigator !== undefined &&
    (navigator as any).scheduling !== undefined &&
    (navigator as any).scheduling.isInputPending !== undefined
  ) {
    needsPaint = true;
  }

  // Since we yield every frame regardless, `requestPaint` has no effect.
}

function forceFrameRate(fps) {
  if (fps < 0 || fps > 125) {
    if (typeof ngDevMode === 'undefined' || ngDevMode) {
      console.error(
        'forceFrameRate takes a positive int between 0 and 125, ' +
          'forcing frame rates higher than 125 fps is not supported'
      );
    }
    return;
  }
  if (fps > 0) {
    yieldInterval = Math.floor(1000 / fps);
  } else {
    // reset the framerate
    yieldInterval = 5;
  }
}

const performWorkUntilDeadline = () => {
  if (scheduledHostCallback !== null) {
    const currentTime = getCurrentTime();
    // Yield after `yieldInterval` ms, regardless of where we are in the vsync
    // cycle. This means there's always time remaining at the beginning of
    // the message event.
    queueStartTime = currentTime;
    const hasTimeRemaining = true;

    // If a scheduler task throws, exit the current browser task so the
    // error can be observed.
    //
    // Intentionally not using a try-catch, since that makes some debugging
    // techniques harder. Instead, if `scheduledHostCallback` errors, then
    // `hasMoreWork` will remain true, and we'll continue the work loop.
    let hasMoreWork = true;
    try {
      hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
    } finally {
      if (hasMoreWork) {
        // If there's more work, schedule the next message event at the end
        // of the preceding one.
        schedulePerformWorkUntilDeadline();
      } else {
        isMessageLoopRunning = false;
        scheduledHostCallback = null;
      }
    }
  } else {
    isMessageLoopRunning = false;
  }
  // Yielding to the browser will give it a chance to paint, so we can
  // reset this.
  needsPaint = false;
};

let schedulePerformWorkUntilDeadline;
if (typeof setImmediate === 'function') {
  // Node.js and old IE.
  // There's a few reasons for why we prefer setImmediate.
  //
  // Unlike MessageChannel, it doesn't prevent a Node.js process from exiting.
  // (Even though this is a DOM fork of the Scheduler, you could get here
  // with a mix of Node.js 15+, which has a MessageChannel, and jsdom.)
  // https://github.com/facebook/react/issues/20756
  //
  // But also, it runs earlier which is the semantic we want.
  // If other browsers ever implement it, it's better to use it.
  // Although both of these would be inferior to native scheduling.
  schedulePerformWorkUntilDeadline = () => {
    setImmediate(performWorkUntilDeadline);
  };
} else if (typeof messageChannel !== 'undefined') {
  const channel: MessageChannel = new messageChannel();
  const port = channel.port2;

  channel.port1.onmessage = performWorkUntilDeadline;
  schedulePerformWorkUntilDeadline = () => {
    port.postMessage(null);
  };
} else {
  // We should only fallback here in non-browser environments.
  schedulePerformWorkUntilDeadline = () => {
    setTimeout(performWorkUntilDeadline, 0);
  };
}

function requestHostCallback(callback) {
  scheduledHostCallback = callback;
  if (!isMessageLoopRunning) {
    isMessageLoopRunning = true;
    schedulePerformWorkUntilDeadline();
  }
}

function requestHostTimeout(callback, ms) {
  taskTimeoutID = setTimeout(() => {
    callback(getCurrentTime());
  }, ms);
}

function cancelHostTimeout() {
  clearTimeout(taskTimeoutID);
  taskTimeoutID = -1;
}

const _requestPaint = requestPaint;

export {
  runWithPriority,
  next,
  scheduleCallback,
  cancelCallback,
  wrapCallback,
  getCurrentPriorityLevel,
  shouldYieldToHost as shouldYield,
  _requestPaint as requestPaint,
  continueExecution,
  pauseExecution,
  getFirstCallbackNode,
  getCurrentTime as now,
  forceFrameRate as forceFrameRate,
};
