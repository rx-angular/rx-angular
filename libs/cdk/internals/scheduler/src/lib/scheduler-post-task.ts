import { ɵglobal } from '@angular/core';
import { PriorityLevel } from './schedulerPriorities';

// Capture local references to native APIs, in case a polyfill overrides them.
const perf: Performance = ɵglobal.performance;
const setTimeoutFn: (handler: TimerHandler, timeout?: number) => number =
  ɵglobal.setTimeout;

// Use experimental Chrome Scheduler postTask API.
const scheduler: {
  postTask: (
    callback: () => void,
    options: { delay?: number; signal?: AbortSignal }
  ) => Promise<void>;
  yield?: (options: { signal: AbortSignal }) => Promise<void>;
} = ɵglobal.scheduler;

const getCurrentTime: () => DOMHighResTimeStamp = perf.now.bind(perf);

// Scheduler periodically yields in case there is other work on the main
// thread, like user events. By default, it yields multiple times per frame.
// It does not attempt to align with frame boundaries, since most tasks don't
// need to be frame aligned; for those that do, use requestAnimationFrame.
const yieldInterval = 5;

let deadline = 0;

// `isInputPending` is not available. Since we have no way of knowing if
// there's pending input, always yield at the end of the frame.
export function shouldYield(): boolean {
  return getCurrentTime() >= deadline;
}

export function scheduleCallback<T>(
  priorityLevel: PriorityLevel,
  callback: SchedulerCallback<T>,
  options?: { delay?: number }
): CallbackNode {
  let postTaskPriority: PostTaskPriorityLevel;
  switch (priorityLevel) {
    case PriorityLevel.ImmediatePriority:
    case PriorityLevel.UserBlockingPriority:
      postTaskPriority = 'user-blocking';
      break;
    case PriorityLevel.LowPriority:
    case PriorityLevel.NormalPriority:
      postTaskPriority = 'user-visible';
      break;
    case PriorityLevel.IdlePriority:
      postTaskPriority = 'background';
      break;
    default:
      postTaskPriority = 'user-visible';
      break;
  }

  const controller = new TaskController({ priority: postTaskPriority });
  const postTaskOptions = {
    delay: typeof options === 'object' && options !== null ? options.delay : 0,
    signal: controller.signal,
  };

  const node: CallbackNode = {
    _controller: controller,
  };

  scheduler
    .postTask(
      runTask.bind(null, priorityLevel, postTaskPriority, node, callback),
      postTaskOptions
    )
    .catch(handleAbortError);

  return node;
}

function runTask<T>(
  priorityLevel: PriorityLevel,
  postTaskPriority: PostTaskPriorityLevel,
  node: CallbackNode,
  callback: SchedulerCallback<T>
) {
  deadline = getCurrentTime() + yieldInterval;
  try {
    const didTimeout_DEPRECATED = false;
    const result = callback(didTimeout_DEPRECATED);
    if (typeof result === 'function') {
      // Assume this is a continuation
      const continuation: SchedulerCallback<T> = result as any;
      const continuationOptions = {
        signal: node._controller.signal,
      };

      const nextTask = runTask.bind(
        null,
        priorityLevel,
        postTaskPriority,
        node,
        continuation
      );

      if (scheduler.yield !== undefined) {
        scheduler
          .yield(continuationOptions)
          .then(nextTask)
          .catch(handleAbortError);
      } else {
        scheduler
          .postTask(nextTask, continuationOptions)
          .catch(handleAbortError);
      }
    }
  } catch (error) {
    // We're inside a `postTask` promise. If we don't handle this error, then it
    // will trigger an "Unhandled promise rejection" error. We don't want that,
    // but we do want the default error reporting behavior that normal
    // (non-Promise) tasks get for unhandled errors.
    //
    // So we'll re-throw the error inside a regular browser task.
    setTimeoutFn(() => {
      throw error;
    });
  }
}

function handleAbortError() {
  // Abort errors are an implementation detail. We don't expose the
  // TaskController to the user, nor do we expose the promise that is returned
  // from `postTask`. So we should suppress them, since there's no way for the
  // user to handle them.
}

export function cancelCallback(node: CallbackNode) {
  const controller = node._controller;
  controller.abort();
}

/**
 * See: https://developer.mozilla.org/en-US/docs/Web/API/TaskController
 */
declare class TaskController {
  constructor(options?: { priority?: string });
  signal: AbortSignal;
  abort(): void;
}

type PostTaskPriorityLevel = 'user-blocking' | 'user-visible' | 'background';

type CallbackNode = {
  _controller: TaskController;
};

type SchedulerCallback<T> = (didTimeout_DEPRECATED: boolean) =>
  | T
  // May return a continuation
  | SchedulerCallback<T>;
