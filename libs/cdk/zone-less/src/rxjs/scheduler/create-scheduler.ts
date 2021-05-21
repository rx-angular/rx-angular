import { SchedulerLike } from 'rxjs';
import { Action } from './Action';

/**
 * Schedulers rely on provided actions and actions are using some asynchronous API
 * internally, e.g. `setInterval`, etc. We don't wanna copy-paste the code of all schedulers
 * here since it'll increase the bundle size. We can re-use constructors of RxJS schedulers
 * and provide our custom actions that use the unpatched API.
 */
export function createScheduler<T extends SchedulerLike>(
  scheduler: T,
  action: typeof Action
): T {
  // The `Reflect.construct` is a cross-browser feature, it's only not supported in IE11,
  // but apps anyway require polyfills if they want to be run in IE11.
  return Reflect.construct(scheduler.constructor, [action]);
}
