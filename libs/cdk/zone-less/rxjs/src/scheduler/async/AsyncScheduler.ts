import { Action } from '../Action';
import { AsyncAction } from './AsyncAction';
import { Scheduler } from '../scheduler';

export class AsyncScheduler extends Scheduler {
  actions: Array<AsyncAction<any>> = [];
  /**
   * A flag to indicate whether the Scheduler is currently executing a batch of
   * queued actions.
   * @type {boolean}
   * @internal
   */
  _active = false;

  /**
   * An internal ID used to track the latest asynchronous task such as those
   * coming from `setTimeout`, `setInterval`, `requestAnimationFrame`, and
   * others.
   * @type {any}
   * @internal
   */
  _scheduled?: any = undefined;

  constructor(
    SchedulerAction: typeof Action,
    now: () => number = Scheduler.now
  ) {
    super(SchedulerAction, now);
  }

  public flush(action: AsyncAction<any>): void {
    const { actions } = this;

    if (this._active) {
      actions.push(action);
      return;
    }

    let error: any;
    this._active = true;

    do {
      if ((error = action.execute(action.state, action.delay))) {
        break;
      }
    } while ((action = actions.shift()!)); // exhaust the scheduler queue

    this._active = false;

    if (error) {
      while ((action = actions.shift()!)) {
        action.unsubscribe();
      }
      throw error;
    }
  }
}
