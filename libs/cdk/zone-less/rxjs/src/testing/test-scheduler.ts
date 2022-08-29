import { Subscription } from 'rxjs';
import {
  immediateProvider
} from '../internals/immediateProvider';
import { dateTimestampProvider } from '../internals/date-time-stamp.provider';
import { intervalProvider } from '../internals/intervalProvider';
import { animationFrameProvider } from '../internals/animationFrameProvider';
import { RunHelpers, TestScheduler } from 'rxjs/testing';

export class RxTestScheduler extends TestScheduler {
  run<T>(callback: (helpers: RunHelpers) => T): T {
    try {
      const ret = super.run((helpers) => {
        const animator = this._createAnimator();
        const delegates = this._createDelegates();
        animationFrameProvider.delegate = animator.delegate;
        intervalProvider.delegate = delegates.interval;
        immediateProvider.delegate = delegates.immediate;
        dateTimestampProvider.delegate = this;

        const origAnimate = helpers.animate;

        helpers.animate = (marbles) => {
          animator.animate(marbles);
          origAnimate(marbles);
        };
        return callback(helpers);
      });
      return ret;
    } finally {
      animationFrameProvider.delegate = undefined;
      intervalProvider.delegate = undefined;
      immediateProvider.delegate = undefined;
      dateTimestampProvider.delegate = undefined;
    }
  }

  private _createAnimator() {
    if (!(this as any).runMode) {
      throw new Error('animate() must only be used in run mode');
    }
    // The TestScheduler assigns a delegate to the provider that's used for
    // requestAnimationFrame (rAF). The delegate works in conjunction with the
    // animate run helper to coordinate the invocation of any rAF callbacks,
    // that are effected within tests, with the animation frames specified by
    // the test's author - in the marbles that are passed to the animate run
    // helper. This allows the test's author to write deterministic tests and
    // gives the author full control over when - or if - animation frames are
    // 'painted'.

    let lastHandle = 0;
    let map: Map<number, FrameRequestCallback> | undefined;

    const delegate = {
      requestAnimationFrame(callback: FrameRequestCallback) {
        if (!map) {
          throw new Error('animate() was not called within run()');
        }
        const handle = ++lastHandle;
        map.set(handle, callback);
        return handle;
      },
      cancelAnimationFrame(handle: number) {
        if (!map) {
          throw new Error('animate() was not called within run()');
        }
        map.delete(handle);
      },
    };

    const animate = (marbles: string) => {
      if (map) {
        throw new Error(
          'animate() must not be called more than once within run()'
        );
      }
      if (/[|#]/.test(marbles)) {
        throw new Error('animate() must not complete or error');
      }
      map = new Map<number, FrameRequestCallback>();
      const messages = TestScheduler.parseMarbles(
        marbles,
        undefined,
        undefined,
        undefined,
        true
      );
      for (const message of messages) {
        this.schedule(() => {
          const now = this.now();
          // Capture the callbacks within the queue and clear the queue
          // before enumerating the callbacks, as callbacks might
          // reschedule themselves. (And, yeah, we're using a Map to represent
          // the queue, but the values are guaranteed to be returned in
          // insertion order, so it's all good. Trust me, I've read the docs.)
          const callbacks = Array.from(map!.values());
          map!.clear();
          for (const callback of callbacks) {
            callback(now);
          }
        }, message.frame);
      }
    };

    return { animate, delegate };
  }

  private _createDelegates() {
    // When in run mode, the TestScheduler provides alternate implementations
    // of set/clearImmediate and set/clearInterval. These implementations are
    // consumed by the scheduler implementations via the providers. This is
    // done to effect deterministic asap and async scheduler behavior so that
    // all of the schedulers are testable in 'run mode'. Prior to v7,
    // delegation occurred at the scheduler level. That is, the asap and
    // animation frame schedulers were identical in behavior to the async
    // scheduler. Now, when in run mode, asap actions are prioritized over
    // async actions and animation frame actions are coordinated using the
    // animate run helper.

    let lastHandle = 0;
    const scheduleLookup = new Map<
      number,
      {
        due: number;
        duration: number;
        handle: number;
        handler: () => void;
        subscription: Subscription;
        type: 'immediate' | 'interval' | 'timeout';
      }
    >();

    const run = () => {
      // Whenever a scheduled run is executed, it must run a single immediate
      // or interval action - with immediate actions being prioritized over
      // interval and timeout actions.
      const now = this.now();
      const scheduledRecords = Array.from(scheduleLookup.values());
      const scheduledRecordsDue = scheduledRecords.filter(
        ({ due }) => due <= now
      );
      const dueImmediates = scheduledRecordsDue.filter(
        ({ type }) => type === 'immediate'
      );
      if (dueImmediates.length > 0) {
        const { handle, handler } = dueImmediates[0];
        scheduleLookup.delete(handle);
        handler();
        return;
      }
      const dueIntervals = scheduledRecordsDue.filter(
        ({ type }) => type === 'interval'
      );
      if (dueIntervals.length > 0) {
        const firstDueInterval = dueIntervals[0];
        const { duration, handler } = firstDueInterval;
        firstDueInterval.due = now + duration;
        // The interval delegate must behave like setInterval, so run needs to
        // be rescheduled. This will continue until the clearInterval delegate
        // unsubscribes and deletes the handle from the map.
        firstDueInterval.subscription = this.schedule(run, duration);
        handler();
        return;
      }
      const dueTimeouts = scheduledRecordsDue.filter(
        ({ type }) => type === 'timeout'
      );
      if (dueTimeouts.length > 0) {
        const { handle, handler } = dueTimeouts[0];
        scheduleLookup.delete(handle);
        handler();
        return;
      }
      throw new Error('Expected a due immediate or interval');
    };

    // The following objects are the delegates that replace conventional
    // runtime implementations with TestScheduler implementations.
    //
    // The immediate delegate is depended upon by the asapScheduler.
    //
    // The interval delegate is depended upon by the asyncScheduler.
    //
    // The timeout delegate is not depended upon by any scheduler, but it's
    // included here because the onUnhandledError and onStoppedNotification
    // configuration points use setTimeout to avoid producer interference. It's
    // inclusion allows for the testing of these configuration points.

    const immediate = {
      setImmediate: (handler: () => void) => {
        const handle = ++lastHandle;
        scheduleLookup.set(handle, {
          due: this.now(),
          duration: 0,
          handle,
          handler,
          subscription: this.schedule(run, 0),
          type: 'immediate',
        });
        return handle;
      },
      clearImmediate: (handle: number) => {
        const value = scheduleLookup.get(handle);
        if (value) {
          value.subscription.unsubscribe();
          scheduleLookup.delete(handle);
        }
      },
    };

    const interval = {
      setInterval: (handler: () => void, duration = 0) => {
        const handle = ++lastHandle;
        scheduleLookup.set(handle, {
          due: this.now() + duration,
          duration,
          handle,
          handler,
          subscription: this.schedule(run, duration),
          type: 'interval',
        });
        return handle;
      },
      clearInterval: (handle: number) => {
        const value = scheduleLookup.get(handle);
        if (value) {
          value.subscription.unsubscribe();
          scheduleLookup.delete(handle);
        }
      },
    };

    const timeout = {
      setTimeout: (handler: () => void, duration = 0) => {
        const handle = ++lastHandle;
        scheduleLookup.set(handle, {
          due: this.now() + duration,
          duration,
          handle,
          handler,
          subscription: this.schedule(run, duration),
          type: 'timeout',
        });
        return handle;
      },
      clearTimeout: (handle: number) => {
        const value = scheduleLookup.get(handle);
        if (value) {
          value.subscription.unsubscribe();
          scheduleLookup.delete(handle);
        }
      },
    };

    return { immediate, interval, timeout };
  }
}
