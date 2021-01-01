import {
  noopSchedulingName,
  backgroundSchedulingName,
  requestIdleCallbackSchedulingName,
  promiseSchedulingName,
  queueMicrotaskSchedulingName,
  requestAnimationFrameSchedulingName,
  syncSchedulingName,
  userBlockingSchedulingName,
  userVisibleSchedulingName,
  setTimeoutSchedulingName,
  setIntervalSchedulingName
} from './scheduling-priorities';
import { EMPTY, Observable, of } from 'rxjs';
import { animationFrameTick, idleCallbackTick, promiseTick } from '../../utils/rxjs/observable';


/**
 * NoopPriority
 *
 * @description
 * Prioritize work that should not get executed, and "nooped" instead.
 *
 * Use Case:
 * Best used for rendering work that needs to update internal state, but the related dom is not visible in to the user.
 *
 * Scheduling Technique:
 * No API is used. The execution of work is skipped completely.
 *
 */
export const NoopPriority = -1;


/**
 * NoPriority
 *
 * @description
 * @TODO
 *
 * Use Case:
 * @TODO
 *
 * Scheduling Technique:
 * @TODO
 *
 * possible Browser APIs are:
 * -
 *
 */
export const NoPriority = 0;

/**
 * ImmediatePriority
 *
 * @description
 * Prioritize work that must happen immediately. Urgent things that has to happen within the current frame.
 *
 * Use Case:
 * @TODO
 *
 * Scheduling Technique:
 * This is microtask timing. Work is executed within the current browser task and does not yield to the browser's event loop.
 *
 * possible Browser APIs are:
 * - queueMicrotask
 * - Promise
 */
export const ImmediatePriority = 1;

/**
 * UserBlockingPriority
 *
 * @description
 * Urgent rendering work that must happen in the limited time within the current frame.
 * Tasks posted at this priority can delay rendering of the current frame, and therefore should finish quickly.
 *
 * Because of the delay of the current frame you should try to use lower priorities as often as possible.
 *
 * Use Case:
 * In general rendering work for ongoing animations and dom manipulation that needs to render right away.
 * - user input, button, controls, dropdowns, tooltips
 *
 * Scheduling Technique:
 * @TODO
 *
 * possible Browser APIs are:
 * - requestAnimationFrame
 *
 */
export const UserBlockingPriority = 2;

/**
 * NormalPriority
 *
 * @description
 * User visible work that is needed to prepare for the next, or future frames.
 * Normal work that is important, but can take a while to finish.
 * @TODO
 * This is typically rendering that is needed in response to user interaction,
 * but has dependency on network or I/O, and should be rendered over next couple frames - as the needed data becomes available.
 * This work should not delay current frame rendering, but should execute immediately afterwards to pipeline and target the next frame.
 * NOTE: This is essentially setTimeout(0) without clamping; see other workarounds used today
 * Eg. user zooms into a map, fetching of the maps tiles OR at least post-processing of fetch responses should be posted as "default" priority work to render over subsequent frames. Eg. user clicks a (long) comment list, it can take a while to fetch all the comments from the server; the fetches should be handled as "default" priority (and potentially start a spinner or animation, posted at "render-blocking" priority).
 * NOTE: while it may make sense to kick off fetches in input-handler, handling fetch responses in microtasks can be problematic, and could block user input & urgent rendering work.
 *
 * Use Case:
 * @TODO
 *
 * Scheduling Technique:
 * @TODO
 *
 * possible Browser APIs are:
 * - requestAnimationFrame (browser native API for work executed before the next paint)
 * - setTimeout (fallback for older browsers)
 *
 */
export const NormalPriority = 3;

/**
 * LowPriority
 *
 * @description
 * @TODO
 *
 * Use Case:
 * @TODO
 *
 * Scheduling Technique:
 * @TODO
 *
 * possible Browser APIs are:
 * -
 *
 */
export const LowPriority = 4;

/**
 * BackgroundPriority
 *
 * @description
 * Work that is typically not visible to the user or initiated by the user, and is not time critical.
 *
 * Use Case:
 * "Background" processes like HTTP requests/responses, backup/sync offline data, backup/sync cloud data, analytics,indexing etc.
 * Dom manipulations not visible to the user
 *
 * Scheduling Technique:
 * @TODO
 *
 * possible Browser APIs are:
 * - requestIdleCallback (browser native API for idle priority work)
 * - setTimeout (fallback for older browsers)
 *
 */
export const BackgroundPriority = 5;

export type priorityLevel = -1 | 0 | 1 | 2 | 3 | 4 | 5;

export type priorityNames = 'noop' | 'noPriority' | 'immediate' | 'userBlocking' | 'normal' | 'low' | 'background';
export const PriorityNames: {[name: string]: priorityNames} = {
  noop: 'noop',
  noPriority: 'noPriority',
  immediate: 'immediate',
  userBlocking: 'userBlocking',
  normal: 'normal',
  low: 'low',
  background: 'background'
}

/**
 * SchedulingNameAsPriorityLevel
 * Cross Scheduler/Browser priority mapping
 */
export const PriorityNameToLevel: {[name: string]: priorityLevel} = {
  noop: NoopPriority,
  noPriority: NoPriority,
  immediate: ImmediatePriority,
  userBlocking: UserBlockingPriority,
  normal: NormalPriority,
  low: LowPriority,
  background: BackgroundPriority
}



/**
 * SchedulingNameAsPriorityLevel
 * Cross Scheduler/Browser priority mapping
 */
export const SchedulingNameAsPriorityLevelNumber: {[name: string]: priorityLevel} = {
  [noopSchedulingName]: NoopPriority,

  [syncSchedulingName]: NoPriority,

  [promiseSchedulingName]: ImmediatePriority,
  [queueMicrotaskSchedulingName]: ImmediatePriority,

  [userBlockingSchedulingName]: UserBlockingPriority,

  [userVisibleSchedulingName]: NormalPriority,
  [requestAnimationFrameSchedulingName]: NormalPriority,

  [setIntervalSchedulingName]: LowPriority,
  [setTimeoutSchedulingName]: LowPriority,

   [backgroundSchedulingName]: BackgroundPriority,
   [requestIdleCallbackSchedulingName]: BackgroundPriority
}


/**
 * SchedulingNameAsPriorityLevel
 * Cross Scheduler/Browser priority mapping
 */
export const PriorityToObservable: {[name: number]: () => Observable<number>} = {
  [PriorityNameToLevel.noPriority]: () => of(0),
  [PriorityNameToLevel.immediate]: promiseTick,
  [PriorityNameToLevel.userBlocking]: animationFrameTick,
  [PriorityNameToLevel.normal]: animationFrameTick,
  [PriorityNameToLevel.low]: idleCallbackTick,
  [PriorityNameToLevel.background]: idleCallbackTick
}
