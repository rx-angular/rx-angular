# rxScheduleTask

`rxScheduleTask` provides a helper function to schedule function execution. It is a minimal building block for making performance optimizations in your code.

## Motivation

Chromium based browsers considers all tasks that taking more than 50ms as long tasks. If task runs more than 50ms, users will start noticing lags. Optimally all user interactions should happen at 30 fps framerate with 32ms budget per browser task. In ideal world it should be 60 fps and 16ms budget.

> 💡 In reality browser has a reserved overhead of 4ms, try to stick to 28ms of work for 30 fps and 12ms for 60 fps.

## Scheduling mechanisms in browser

Most common ways of delaying task execution are:

- `setTimeout`
- `requestAnimationFrame`
- `requestIdleCallback`

`rxScheduleTask` provides similar API but comes with huge benefits of notion of frame budget and priority configuration.

## Concurrent strategies

> 💡 Under the hood all our concurrent strategies are based on MessageChannel technology.

To address the problem of long tasks and help browser split the work @rx-angular/cdk provides concurrent strategies. This strategies will help browser to chunk the work into non-blocking tasks whenever it's possible.

You can read detailed information about concurrent strategies [here](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/render-strategies/docs/concurrent-strategies.md).

## Usage examples

### Input params

- Just as common delaying apis this method `accepts` a work function that should be scheduled.
- Second important parameter is `strategy` which will be used for scheduling (`normal` is default).
- Third argument is `options` that can hold `delay` for the task and `ngZone` where task should run.

### Return type

Function returns a callback that you can use to cancel already scheduled tasks.

### Default usage

```typescript
import { rxScheduleTask } from '@rx-angular/cdk/render-strategies';
...

function updateStateAndBackup<T>(data: T) {
  this.stateService.set(data);

  rxScheduleTask(() => localStorage.setItem('state', JSON.stringify(state)));
}
```

### Usage with non-default strategy

```typescript
import { rxScheduleTask } from '@rx-angular/cdk/render-strategies';
...

function updateStateAndBackup<T>(data: T) {
  this.stateService.set(data);

  rxScheduleTask(
    () => localStorage.setItem('state', JSON.stringify(state)),
    'idle'
  );
}
```

### Usage with options

```typescript
import { rxScheduleTask } from '@rx-angular/cdk/render-strategies';
...

function updateStateAndBackup<T>(data: T) {
  this.stateService.set(data);

  rxScheduleTask(
    () => localStorage.setItem('state', JSON.stringify(state)),
    { delay: 200, zone: this.ngZone, strategy: 'idle' }
  );
}
```

### Cancel scheduled task

```typescript
import { rxScheduleTask } from '@rx-angular/cdk/render-strategies';
...

let saveToLocalStorageCallback;

function updateStateAndBackup<T>(data: T) {
  this.stateService.set(data);

  if (saveToLocalStorageCallback) {
    saveToLocalStorageCallback();
  }

  saveToLocalStorageCallback = rxScheduleTask(() =>
    localStorage.setItem('state', JSON.stringify(state))
  );
}
```

## Links

- [Detailed information about strategies](https://github.com/rx-angular/rx-angular/tree/master/libs/cdk/render-strategies)
- [MessageChannel documentation](https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel)
