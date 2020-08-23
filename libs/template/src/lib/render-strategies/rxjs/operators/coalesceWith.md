# coalesceWith

Limits the number of synchronous emitted a value from the source Observable to
one emitted value per durationSelector.
Typically, rendering will use a [`AnimationFrame`](https://developer.mozilla.org/en-US/search?q=AnimationFrame),
then repeats this process for every tick of the Browsers event loop.

The coalesceWith operator is based similar to `debounce(from(Promise.resolve()))` operator.
In addition to that is provides emitted values for the trailing end only, as well as maintaining a context to scope coalescing.

![coalesceWith Operator Marble Diagram](generated/images/guide/component/coalesceWith.png)

![coalesceWith Operator Marble Diagram (v2)](generated/images/guide/component/coalesceWith_2.png)

## Description

Rendering, in most web applications, is by far the most performance crucial part.
The `coalesceWith` operator's general purpose is to buffer synchronous emissions together
to a single emission per `AnimationFrame`,
enabling the user to fire potential view renderings only once even if multiple values are changed across the passed context.
render changes only once per `animationFrame`.
By default, changes will be emitted on the trailing edge of an `AnimationFrame`.
This behavior is fully configurable by the `durationSelector`.

Additionally, the `coalesceWith` operator provides the option to define a custom coalescing scope via the passed `config` object.
If provided, the buffered changes of the source will only be emitted once per scope.
This is especially helpful in scenarios where you want to have only one emission across multiple usages of the operator.

You find a more in depth explanation in the [usage of context scoping](#usage-of-context-scoping) section of this document.

## Basic usage

By default the coalesceWith operator helps you to buffer incoming values within an animationFrame and emits once per browser event-loop tick.
This example demonstrates how the render method is only called once thus having four changes of the source stream.

```typescript
import { coalesceWith } from '@rx-angular/template';
import { range } from 'rxjs';

const source$ = range(1, 4); // stream of data
source$.pipe(coalesceWith()).subscribe((stateChanges) => {
  render(); // render method will be called once for the value 4 of the stream
});
```

## Parameters

**durationSelector:**

Optional. Default is `defaultCoalesceDurationSelector` (coalescing by animationFrame)
A function that receives a value from the source Observable, for computing the silencing duration for each source value, returned as an Observable or a Promise.

**config:**

Optional. Default is `defaultCoalesceConfig` ({ leading: false, trailing: true }` & scoping per Subscriber aka no scoping).

### Usage of Leading/Training

The flags `leading` and `trailing` help to determine which values should be forwarded.

Imagine you have a observable that emits a number of values synchronously. e.g. `range(1,10)`.

Setting `leading` to true would result in the emissions `1`.
Setting `trailing` to true would result in the emissions `10`.
Setting `leading` and `trailing` to true would result in the emissions `1, 10`.

```typescript
import { coalesceWith } from '@rx-angular/template';
import { range } from 'rxjs';

const source$ = range(1, 4); // synchronous emitted values
source$
  .pipe(coalesceWith({ leading: true, tailing: true }))
  .subscribe((v) => console.log(v)); // 1, 10
```

### Usage of Context Scoping

If multiple coalesceWith operators are configured with the same scope object, only one change will be emitted to the first `Subscriber`.
This simple example shows how it is possible to coalesceWith multiple subscribers to one shared scope object. This will result in
only one rendering call thus having multiple subscribers to the incoming stream.

```typescript
import { coalesceWith, generateFrames } from '@rx-angular/template';
import { range, animationFrames } from 'rxjs';

const source$ = range(1, 10); // synchronous emitted values
const coalesceWithConfig = {
  context: {}, // e.g. this.componentRef;
};

source$
  .pipe(coalesceWith(() => animationFrames(), coalesceWithConfig))
  .subscribe((stateChanges) => {
    render(stateChanges); // render method will be called once for the value 4 of the stream
  });

source$
  .pipe(coalesceWith(() => generateFrames(), coalesceWithConfig))
  .subscribe((stateChanges) => {
    render(stateChanges);
  });
// view doesn't get rendered, since the value will be emitted only once per scope
```
