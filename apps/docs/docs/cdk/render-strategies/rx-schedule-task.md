# rxScheduleTask

`rxScheduleTask` provides a helper function to schedule function execution. It is a minimal building block for making performance optimizations in your code.

## Motivation

Chromium based browsers consider all tasks that take more than 50ms as long tasks. If task runs for more than 50ms, users will start noticing lags. Optimally all user interactions should happen at 30 fps frame-rate with 32ms budget per browser task. In an ideal world, it should be 60 fps and 16ms budget.

> 💡 To achieve 30 fps or 60 fps in web apps, you can't just focus on 16ms JavaScript execution time. Remember to account for the browser's other tasks, like style recalculations, layout, and painting. Aim for 28ms (30 fps) or 12ms (60 fps) of total JavaScript processing, keeping in mind the browser's overheads.

## Scheduling mechanisms in browser

Most common ways of delaying a task execution are:

- `setTimeout`
- `requestAnimationFrame`
- `requestIdleCallback`
- `Promise.resolve`
- `queueMicrotask`

`rxScheduleTask` provides a similar API but comes with huge benefits of notion of frame budget and priority configuration.

## Concurrent strategies

> 💡 Under the hood all our concurrent strategies are based on MessageChannel technology.

To address the problem of long tasks and help browser split the work @rx-angular/cdk provides concurrent strategies. These strategies will help browser to chunk the work into non-blocking tasks whenever it's possible.

You can read detailed information about concurrent strategies [here](strategies/concurrent-strategies.md).

## Usage examples

### Default usage

```typescript
import { rxScheduleTask } from '@rx-angular/cdk/render-strategies';
...

updateStateAndBackup<T>(data: T) {
  this.stateService.set(data);

  rxScheduleTask(() => localStorage.setItem('state', JSON.stringify(state)));
}
```

### Input params

- Just as common delaying apis this method `accepts` a work function that should be scheduled.
- It also accepts configuration object as an optional second parameter
  - `strategy` which will be used for scheduling (`normal` is default, for full list of available strategies see [concurrent strategies documentation](strategies/concurrent-strategies.md))
  - `delay` which is responsible for delaying the task execution (default is 0ms)
  - `ngZone` if you want your function be executed within ngzone (default scheduling runs out of zone)

### Return type

Function returns a callback that you can use to cancel already scheduled tasks.

### Usage with non-default strategy

```typescript
import { rxScheduleTask } from '@rx-angular/cdk/render-strategies';
...

function updateStateAndBackup<T>(data: T) {
  this.stateService.set(data);

  rxScheduleTask(
    () => localStorage.setItem('state', JSON.stringify(state)),
    {strategy: 'idle'}
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
