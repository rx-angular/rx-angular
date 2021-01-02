import { Observable } from 'rxjs/internal/Observable';
import { Operator } from 'rxjs/internal/Operator';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { Subscription } from 'rxjs/internal/Subscription';
import { Notification } from 'rxjs/internal/Notification';
import { MonoTypeOperatorFunction, PartialObserver, SchedulerAction, TeardownLogic } from 'rxjs/internal/types';
import { RxaSchedulingOptions } from '../scheduler/priority/model';
import { PriorityScheduler } from '../scheduler/priority/PriorityScheduler';

/**
 *
 * Re-emits all notifications from source Observable with specified prioritized scheduler.
 */
export function observeOnPriority<S, P, T>(scheduler: PriorityScheduler<P, T>, options: RxaSchedulingOptions<P> = {
  delay: 0
}): MonoTypeOperatorFunction<S> {
  return function observeOnOperatorFunction(source: Observable<S>): Observable<S> {
    return source.lift(new ObserveOnOperator(scheduler, options));
  };
}

class ObserveOnOperator<S, P, T> implements Operator<S, S> {
  constructor(private scheduler: PriorityScheduler<P, T>, private options: RxaSchedulingOptions<P> = { delay: 0 }) {
  }

  call(subscriber: Subscriber<S>, source: any): TeardownLogic {
    return source.subscribe(new ObserveOnSubscriber<S, P, T>(subscriber, this.scheduler, this.options));
  }
}

class ObserveOnSubscriber<S, P, T> extends Subscriber<S> {
  static dispatch(this: SchedulerAction<ObserveOnMessage>, arg: ObserveOnMessage) {
    const { notification, destination } = arg;
    notification.observe(destination);
    this.unsubscribe();
  }

  constructor(destination: Subscriber<S>,
              private scheduler: PriorityScheduler<P, T>,
              private options: RxaSchedulingOptions<P> = { delay: 0 }) {
    super(destination);
  }

  private scheduleMessage(notification: Notification<any>): void {
    const destination = this.destination as Subscription;
    destination.add(this.scheduler.schedule(
      ObserveOnSubscriber.dispatch,
      this.options,
      new ObserveOnMessage(notification, this.destination)
    ));
  }

  protected _next(value: S): void {
    this.scheduleMessage(Notification.createNext(value));
  }

  protected _error(err: any): void {
    this.scheduleMessage(Notification.createError(err));
    this.unsubscribe();
  }

  protected _complete(): void {
    this.scheduleMessage(Notification.createComplete());
    this.unsubscribe();
  }
}

class ObserveOnMessage {
  constructor(public notification: Notification<any>,
              public destination: PartialObserver<any>) {
  }
}
