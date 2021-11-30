# RxStrategyProvider

`RxStrategyProvider` is the best way to consume full power of concurrent strategies to schedule any kind of work.

> Want to play with it? Here's [demo link](https://stackblitz.com/edit/angular-ivy-1vfpoe) 

## Motivation

Chromium based browsers considers all tasks that taking more than 50ms as long tasks. If task runs more than 50ms, users will start noticing lags. Optimally all user interactions should happen at 30 fps framerate with 32ms budget per browser task. In ideal world it should be 60 fps and 16ms budget. 

> 💡 In reality browser has a reserved overhead of 4ms, try to stick to 28ms of work for 30 fps and 12ms for 60 fps.

## Scheduling mechanisms in browser

There are multiple ways to schedule task in the browser. 

- `setTimeout`
- `requestAnimationFrame`
- `requestIdleCallback`
- `Promise.resolve`
- `queueMicrotask`

None of them has a full notion about what happens in the browser and can be unreliable for performance optimizations.

## Concurrent strategies

> 💡 Under the hood all our concurrent strategies are based on MessageChannel technology.

To address the problem of long tasks and help browser split the work @rx-angular/cdk provides  concurrent strategies. This strategies will help browser to chunk the work into non-blocking tasks whenever it's possible. 

### Core concepts

**Frame budget**

Each strategy knows the budget and knows which task will go above this budget.

**Chunking**

Strategies will split work into non-blocking pieces whenever it's possible.

**Deadline**

Some of the strategies has limited amount of time to do tasks in chunks, after this time all remaining work will go as a single task.

**Priority**

Each strategy has its own queue with its own priority.

### [Available concurrent strategies](https://github.com/rx-angular/rx-angular/tree/master/libs/cdk/render-strategies)

```jsx
| Name             | Priority | Render Method     | Scheduling    | Deadline        |
| ---------------- | -------- | ----------------- | ------------- | --------------- |
| `"noPriority"`   | 0        | 🠗 `detectChanges` | `postMessage` | ❌              |
| `"immediate"`    | 2        | 🠗 `detectChanges` | `postMessage` | 0ms             |
| `"userBlocking"` | 3        | 🠗 `detectChanges` | `postMessage` | 250ms           |
| `"normal"`       | 4        | 🠗 `detectChanges` | `postMessage` | 5000ms          |
| `"low"`          | 5        | 🠗 `detectChanges` | `postMessage` | 10000ms         |
| `"idle"`         | 6        | 🠗 `detectChanges` | `postMessage` | ❌              |
```

## RxStrategyProvider APIs

Full signature of the service available below, but we will focus only on methods that provides scheduling.

```typescript
@Injectable({ providedIn: 'root' })
export class RxStrategyProvider<T extends string = string> {
  /**
   * Returns current `RxAngularConfig` used in the service.
   * Config includes:
   * - strategy that currently in use - `primaryStrategy`
   * - array of custom user defined strategies - `customStrategies`
   * - setting that is responsible for running in our outside of the zone.js - `patchZone`
   */
  get config(): Required<RxAngularConfig<T>>;

  /**
   * Returns object that contains key-value pairs of strategy names and their credentials (settings) that are available in the service.
   */
  get strategies(): RxStrategies<T>;

  /**
   * Returns an array of strategy names available in the service.
   */
  get strategyNames(): string[];

  /**
   * Returns current strategy of the service.
   */
  get primaryStrategy(): RxStrategyNames<T>;

  /**
   * Set's the strategy that will be used by the service.
   */
  set primaryStrategy(strategyName: RxStrategyNames<T>);

  /**
   * Current strategy of the service as an observable.
   */
  readonly primaryStrategy$: Observable<RxStrategyCredentials>;

  /**
   * Returns observable of an object that contains key-value pairs of strategy names and their credentials (settings) that are available in the service.
   */
  readonly strategies$: Observable<RxStrategies<T>;

  /**
   * Returns an observable of an array of strategy names available in the service.
   */
  readonly strategyNames$: Observable<string[]>;

  schedule<R>(
    work: () => R,
    options?: ScheduleOnStrategyOptions
  ): Observable<R>;

  scheduleWith<R>(
    work: (v?: R) => void,
    options?: ScheduleOnStrategyOptions
  ): MonoTypeOperatorFunction<R>;

  scheduleCD(
    cdRef: ChangeDetectorRef,
    options?: ScheduleOnStrategyOptions & {
      afterCD?: () => void;
      abortCtrl?: AbortController;
    }
  ): AbortController;
}
```

### `schedule` & `scheduleWith`

These methods allows users to schedule any kind of work. 

- `schedule` returns an observable (don't forget to subscribe!)
- `scheduleWith` returns a `MonoTypeOperatorFunction` so you can use this method inside rxjs `pipe`

Both methods accept the work and configuration options object.

Work is any function that should be executed.

Options are configuration object that you can use to setup the scheduling behavior. In options you can provide:

- Scheduling `strategy`.
- Should scheduling be patched by zone or not (`patchZone`)
- Scheduling `scope`. This one is very useful if your work is just a `ChangeDetectorRef` method. If you have multiple change detection methods scheduled and scope is set to `this` then only one change detection cycle will be executed.

#### Usage examples

```typescript
this.strategyProvider.schedule(() => 
    myWork(), 
    {strategy: 'idle', patchZone: false, scope: this}
).subscribe();

myObservable$.pipe(
  this.strategyProvider.scheduleWith(
    () => myWork(), 
    {strategy: 'idle', patchZone: false, scope: this})
).subscribe();
```

### `scheduleCD` method

Imperative method that you can use to schedule change detection cycle. You must pass there a `ChangeDetectorRef` of the component on which you want change detection run to be executed. Also you can provide configuration object that includes:

- Work that should be performed after change detection is done (`afterCD`).
- `AbortController` that you can use if you want to cancel a change detection cycle that you just scheduled.

#### Usage example

```typescript
this.strategyProvider.scheduleCd(this.changeDetectorRef, {afterCD: myWork()});
```

## Links
- [Demo](https://stackblitz.com/edit/angular-ivy-1vfpoe)
- [Detailed information about strategies](https://github.com/rx-angular/rx-angular/tree/master/libs/cdk/render-strategies)
- [MessageChannel documentation](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel)
