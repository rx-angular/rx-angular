import {
  MonoTypeOperatorFunction,
  Observable,
  Operator,
  SubscribableOrPromise,
  Subscriber,
  Subscription,
  TeardownLogic,
} from 'rxjs';
import {
  InnerSubscriber,
  OuterSubscriber,
  subscribeToResult,
} from 'rxjs/internal-compatibility';
import { coalescingContextPropertiesMap } from '../../render-aware/coalescing-context-properties-map';

export interface CoalesceConfig {
  context?: object;
}

const defaultCoalesceConfig: CoalesceConfig = {
  context: undefined,
};

function getCoalesceConfig(
  config: CoalesceConfig = defaultCoalesceConfig
): CoalesceConfig {
  return {
    ...defaultCoalesceConfig,
    ...config,
  };
}

/**
 * @description
 * Limits the number of synchronous emitted a value from the source Observable to
 * one emitted value per [`AnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame),
 * then repeats this process for every tick of the browsers event loop.
 *
 * The coalesce operator is based on the [throttle](https://rxjs-dev.firebaseapp.com/api/operators/throttle) operator.
 * In addition to that is provides emitted values for the trailing end only, as well as maintaining a context to scope coalescing.
 *
 * @param {function(value: T): SubscribableOrPromise} durationSelector - A function
 * that receives a value from the source Observable, for computing the silencing
 * duration for each source value, returned as an Observable or a Promise.
 * It defaults to `requestAnimationFrame` as durationSelector.
 * @param {Object} config - A configuration object to define `leading` and `trailing` behavior and the context object.
 * Defaults to `{ leading: false, trailing: true }`. The default scoping is per subscriber.
 * @return {Observable<T>} An Observable that performs the coalesce operation to
 * limit the rate of emissions from the source.
 *
 * @usageNotes
 * Emit clicks at a rate of at most one click per second
 * ```ts
 * import { fromEvent, animationFrames } from 'rxjs';
 * import { coalesce } from 'ngRx/component';
 *
 * const clicks = fromEvent(document, 'click');
 * const result = clicks.pipe(coalesce(ev => animationFrames));
 * result.subscribe(x => console.log(x));
 * ```
 */
export function coalesce2<T>(
  durationSelector: () => SubscribableOrPromise<any>,
  config?: CoalesceConfig
): MonoTypeOperatorFunction<T> {
  const parsedConfig = getCoalesceConfig(config);
  return (source: Observable<T>) =>
    source.lift(new CoalesceOperator(durationSelector, parsedConfig));
}

class CoalesceOperator<T> implements Operator<T, T> {
  constructor(
    private durationSelector: () => SubscribableOrPromise<any>,
    private config: CoalesceConfig
  ) {}

  call(subscriber: Subscriber<T>, source: any): TeardownLogic {
    return source.subscribe(
      new CoalesceSubscriber(subscriber, this.durationSelector, this.config)
    );
  }
}

class CoalesceSubscriber<T, R> extends OuterSubscriber<T, R> {
  private _coalesced: Subscription | null | undefined;
  private _lastValueArrived: T | null = null;
  private _scope: object;

  constructor(
    protected destination: Subscriber<T>,
    private durationSelector: () => SubscribableOrPromise<number>,
    config: CoalesceConfig
  ) {
    super(destination);
    // We create the object for context scoping by default per subscription
    this._scope = config.context || {};
  }

  // Next call from source
  protected _next(value: T): void {
    this._lastValueArrived = value;
    if (!this.isCoalescing()) {
      this.startCoalesceDuration();
    }
  }

  // Complete call from source
  protected _complete(): void {
    this.endLocalCoalescing();
    super._complete();
  }

  // Next call from inner coalescing duration
  notifyNext(
    outerValue: T,
    innerValue: R,
    outerIndex: number,
    innerIndex: number,
    innerSub: InnerSubscriber<T, R>
  ): void {
    this.endLocalCoalescing();
  }

  // Complete call from inner coalescing duration
  notifyComplete(): void {
    this.endLocalCoalescing();
  }

  // Inner subscription responsible for next
  private startCoalesceDuration(): void {
    this.add(
      (this._coalesced = subscribeToResult(this, this.durationSelector()))
    );
    this.addCoalescingSubscription(this._coalesced);
  }

  // When this function is called we end the internal coalescing and clean up all subscriptions
  // We also send the coalesced value in case of scoped coalescing
  private endLocalCoalescing() {
    const { _coalesced, _lastValueArrived } = this;
    if (_coalesced) {
      _coalesced.unsubscribe();
    }
    const lastDurationEnded = this.removeAndCheckIfLast(this._coalesced);
    this._coalesced = null;
    if (lastDurationEnded) {
      this.destination.next(_lastValueArrived);
    }
  }

  // Handles the coalescing relate to a scope e.g. a class instance
  private removeAndCheckIfLast(subscription: Subscription): boolean {
    const instances = coalescingContextPropertiesMap.getProps(this._scope)
      .instances;
    const newInstances = instances.filter((i) => i === subscription);
    coalescingContextPropertiesMap.setProps(this._scope, {
      instances: newInstances,
    });
    return newInstances.length <= 0;
  }

  // Handles the coalescing relate to a scope e.g. a class instance
  private addCoalescingSubscription(subscription: Subscription): void {
    const instances = coalescingContextPropertiesMap.getProps(this._scope)
      .instances;
    instances.push(subscription);
    coalescingContextPropertiesMap.setProps(this._scope, {
      instances,
    });
  }

  // checks if anybody is already coalescing atm
  private isCoalescing(): boolean {
    return (
      coalescingContextPropertiesMap.getProps(this._scope).instances.length > 0
    );
  }
}
