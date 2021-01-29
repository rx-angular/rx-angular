import { Observable } from 'rxjs';
import { Operator } from 'rxjs';
import { Subscriber } from 'rxjs';
import { Subscription } from 'rxjs';
import { Notification } from 'rxjs';
import { MonoTypeOperatorFunction, PartialObserver, SchedulerAction, TeardownLogic } from 'rxjs/internal/types';
import { PriorityScheduler, PrioritySchedulerOptions } from '../scheduler/priority-scheduler';

/**
 *
 * Re-emits all notifications from source Observable with specified prioritized scheduler.
 */
export function observeOnPriority<S, P, T>(scheduler: PriorityScheduler<P, T>, options?: PrioritySchedulerOptions<P>): MonoTypeOperatorFunction<S> {
  return function observeOnOperatorFunction(source: Observable<S>): Observable<S> {
    return source.lift(new ObserveOnOperator(scheduler, options));
  };
}

class ObserveOnOperator<S, P, T> implements Operator<S, S> {
  constructor(private scheduler: PriorityScheduler<P, T>, private options: PrioritySchedulerOptions<P>) {
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
              private options: PrioritySchedulerOptions<P>) {
    super(destination);
  }

  private scheduleMessage(notification: Notification<any>): void {
    const destination = this.destination as Subscription;
    destination.add(this.scheduler.schedule(
      // @ts-ignore
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
