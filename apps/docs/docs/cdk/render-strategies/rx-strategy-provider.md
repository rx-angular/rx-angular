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

To address the problem of long tasks and help browser split the work @rx-angular/cdk provides concurrent strategies. This strategies will help browser to chunk the work into non-blocking tasks whenever it's possible.

You can read detailed information about concurrent strategies [here](strategies/concurrent-strategies.md).

## RxStrategyProvider APIs

Full signature of the service available below, but we will focus only on methods that provides scheduling.

```typescript
@Injectable({ providedIn: 'root' })
export class RxStrategyProvider<T extends string = string> {

  get config(): Required<RxAngularConfig<T>>;

  get strategies(): RxStrategies<T>;

  get strategyNames(): string[];

  get primaryStrategy(): RxStrategyNames<T>;

  set primaryStrategy(strategyName: RxStrategyNames<T>);

  readonly primaryStrategy$: Observable<RxStrategyCredentials>;

  readonly strategies$: Observable<RxStrategies<T>;

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

### `get config()`

This method returns current `RxAngularConfig` used in the service.
Config includes:

- strategy that currently in use - `primaryStrategy`
- array of custom user defined strategies - `customStrategies`
- setting that is responsible for running in our outside of the zone.js - `patchZone`

#### Usage example

```typescript
const defaultConfig = this.strategyProvider.config;
```

### `get strategies()`

This method returns object that contains key-value pairs of strategy names and their credentials (settings) that are available in the service.

#### Usage example

```typescript
const currentStrategies = this.strategyProvider.strategies;
```

### `get strategyNames()`

This method returns an array of strategy names available in the service.

#### Usage example

```typescript
const currentStrategiesNames = this.strategyProvider.strategyNames;
```

### `get primaryStrategy()`

This method returns current default strategy of the service.

#### Usage example

```typescript
const primaryStrategy = this.strategyProvider.primaryStrategy;
```

```html
<div *rxLet="let obs$; strategy: strategyProvider.primaryStrategy"></div>
```

### `set primaryStrategy()`

This method allows you to set default strategy of the service.

#### Usage example

```typescript
this.strategyProvider.primaryStrategy = 'low';
```

### `primaryStrategy$`

This is a primary strategy of the service as an observable.

#### Usage example

```typescript
const primaryStrategy$ = this.strategyProvider.primaryStrategy$;
```

```html
<div *rxLet="let obs$; strategy: strategyProvider.primaryStrategy$"></div>
```

### `strategies$`

An array of strategy names available in the service as observables.

#### Usage example

```typescript
const strategyNames$ = this.strategyProvider.strategyNames$;
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
this.strategyProvider
  .schedule(() => myWork(), { strategy: 'idle', patchZone: false, scope: this })
  .subscribe();

myObservable$
  .pipe(
    this.strategyProvider.scheduleWith(() => myWork(), {
      strategy: 'idle',
      patchZone: false,
      scope: this,
    })
  )
  .subscribe();
```

### `scheduleCD` method

Imperative method that you can use to schedule change detection cycle. You must pass there a `ChangeDetectorRef` of the component on which you want change detection run to be executed. Also you can provide configuration object that includes:

- Work that should be performed after change detection is done (`afterCD`).
- `AbortController` that you can use if you want to cancel a change detection cycle that you just scheduled.

#### Usage example

```typescript
this.strategyProvider.scheduleCd(this.changeDetectorRef, { afterCD: myWork() });
```

## Links

- [Demo](https://stackblitz.com/edit/angular-ivy-1vfpoe)
- [Detailed information about strategies](render-strategies.mdx)
- [MessageChannel documentation](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel)
