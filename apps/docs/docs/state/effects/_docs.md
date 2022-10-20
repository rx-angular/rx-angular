## Resources

**Example applications:**
A demo application is available on [GitHub](https://github.com/BioPhoton/rx-angular-state-rx-effects).

## Motivation

![rx-angular--state--effects--motivation--michael-hladky](https://user-images.githubusercontent.com/10064416/154173406-47245226-e56a-43b1-aec6-bbf1efc535b9.png)

Most of the side effects are related to rendering and change detection and done in the template by building blocks like:

- pipes
- directives
- component bindings

Some of the side effects are not related to the template and need to get handled in the component.
For for async effect's like Promise or Observable it requires to maintain a cancellation logic.

> **Pro Tip:**
> In general, it's best to avoid the direct use of the `subscribe` API of RxJS at all.

It may sound weird, as I'm pretty sure you are used to handle your subscriptions.
You most probably store the `Subscription` object, add a `takeUntil` to hook it into the component lifecycle and avoid memory leaks etc.
Maybe even hacks where you subscribe to one Observable just to next into another subject.

In RxAngular we found ways to avoid the `subscribe` API and in addition handle all of the above edge cases and more.
This is the hidden secret of why all parts of RxAngular fit together so well.

However, sometimes we have to subscribe in the component to handle reactive side effects.
This leads to bloated code and potential risk of a memory leak, late subscriber and so on.

> In the context of state management every piece of code which does not manipulate,
> transform or read state can be considered as side effect.

Side effects can be triggered by state changes but don't depend on state.

Side effects (most of the time coming from subscriptions) always yield the potential of a memory leak if not cleaned up correctly.
Like local state, local side-effects need to be coupled to the lifecycle of the component.
To accomplish this, we need to make sure to clean up every side effect in the `OnDestroy` method. Here we can de-reference local variables and unsubscribe open subscriptions.

**With `RxEffects` RxAngular introduces another light weight tool only designed to manage side-effects.**

### Problem

Let's get the problem it solves into code so we can refactor it.

We start with the side effect and 2 ways to execute it:

```typescript
@Component({
  // ...
})
export class FooComponent {
  // The side effect (`console.log`)
  private runSideEffect = (num: number) => console.log('number: ' + num);
  // The interval triggers our function including the side effect
  private effect$ = interval(1000);

  constructor() {
    // The subscribe's next callback it used to wrap and execute the side effect
    effect$.subscribe(this.runSideEffect);

    effect$
      .pipe(
        // `tap` is used to wrap and execute the side effect
        tap(this.runSideEffect)
      )
      .subscribe();
  }
}
```

As we introduced a memory leak we have to setup some boilerplate code to handle the cleanup logic:

```ts
@Component({
  // ...
})
export class FooComponent implements OnDestroy {
  // ⚠ Notice: The destroy hook must be reactive to use `takeUntil`
  private readonly destroy$ = new Subject<void>();

  constructor() {
    effect$
      .pipe(
        takeUntil(this.destroy$)
        // ⚠ Notice: Don't put any operator after takeUntil to avoid potential subscription leaks
      )
      .subscribe(runSideEffect);
  }

  ngOnDestroy(): void {
    // ⚠ Notice: Never forget to cleanup the subscription
    this.destroy$.next();
  }
}
```

There are already a couple of things that are crucial:

- using the right `Subject`
- unsubscribe on destroy
- having the `takeUntil` operator as last operator in the chain

Another way would be using the `subscription` to run the cleanup logic.

```ts
@Component({
  // ...
})
export class FooComponent implements OnDestroy {
  // ⚠ Notice: The created subscription must be stored to `unsubscribe` later
  private readonly subscription: Subscription;

  constructor() {
    // ⚠ Notice: Never forget to store the subscription
    this.subscription = effect$.subscribe(runSideEffect);
  }

  ngOnDestroy(): void {
    // ⚠ Notice: Never forget to cleanup the subscription
    this.subscription.unsubscribe();
  }
}
```

### Solution

In RxAngular we think the essential problem here is the call to `subscribe` itself. All `Subscription`s need to get unsubscribed manually which most of the time produces heavy boilerplate or even memory leaks if ignored or did wrong.
Like `RxState`, `RxEffects` is a local service provided by a component and thus tied to the components life cycle.
We can manage `Observables` as reactive triggers for side effects or manage `Subscription`s which internally hold side effects.
To also provide an imperative way for developers to unsubscribe from the side effect `register` returns an "asyncId" similar to `setTimeout`.
This can be used later on to call `unregister` and pass the async id retrieved from a previous `register` call. This stops and cleans up the side effect when invoked.

As an automatism any registered side effect will get cleaned up when the related component is destroyed.

Using `RxEffect` to maintain side-effects

```ts
@Component({
  // ...
  providers: [RxEffects],
})
export class FooComponent {
  constructor(effects: RxEffects) {
    effects.register(obs$, doSideEffect);
  }
}
```

> **⚠ Notice:**
> Avoid calling `register`, `unregister` , `subscribe` inside the side-effect function. (here named `doSideEffect`)

# Impact

![rx-angular--state--effects--motivation-process-diagramm--michael-hladky](https://user-images.githubusercontent.com/10064416/154173507-049815ea-ee2a-4569-8a4d-6abdc319a349.png)

Compared to common approaches `RxEffects` does not rely on additional decorators or operators.
In fact, it removes the necessity of the `subscribe`.

This results in less boilerplate and a good guidance to resilient and ergonomic component architecture.
Furthermore, the optional imperative methods help to glue third party libs and a mixed but clean code style in Angular.

## Concepts

Let's have some fundamental thoughts on the concept of side effects and their reactive handling.
Before we get any further, let's define two terms, _side effect_ and _pure function_.

### Referentially transparent

![rx-angular--state--effects--concept-referentially-transparent--michael-hladky](https://user-images.githubusercontent.com/10064416/154173775-7900608a-3fd9-4c56-b583-3150709d622e.png)
A function is referentially transparent if:

- it is **pure** (output must be the same for the same inputs)
- it's evaluation must have no **side effects**

### Pure function

![rx-angular--state--effects--concept-pure-function--michael-hladky](https://user-images.githubusercontent.com/10064416/153937480-b39debc4-b524-4c7b-8f46-bd7b67b4b334.png)

A function is called pure if:

- Its return value is the same for the same arguments, e.g. `function add(a, b) { return a + b}`
- Its executed internal logic has no side effects

### Side effect

![rx-angular--state--effects--concept-side-effect-free--michael-hladky](https://user-images.githubusercontent.com/10064416/154173856-39ba5362-9952-46f6-83bd-765e4511b326.png)

A function has a _side effect_ if:

- There's a mutation of local static variables, e.g. `this.prop = value`
- Non-local variables are used

#### Examples

Let's look at a couple of examples that will make the above definitions easier to understand.

```typescript
let state = false;
sideEffectFn();

function sideEffectFn() {
  state = true;
}
```

- mutable reference arguments get passed

```typescript
let state = { isVisible: false };
let newState = sideEffectFn(state);

function sideEffectFn(oldState) {
  oldState.isVisible = true;
  return oldState;
}
```

- I/O is changed

```typescript
let state = { isVisible: false };
sideEffectFn(state);

function sideEffectFn(state) {
  console.log(state);
  // or
  this.render(state);
}
```

As a good rule of thumb, you can consider every function without a return value to be a side effect.

### Anatomy

![rx-angular--state--effects--motivation-building-blocks--michael-hladky](https://user-images.githubusercontent.com/10064416/154174526-aa1409cd-e16a-4e3d-b913-f77920ffc05e.png)

Yet, essentially, a side effect always has 2 important parts associated with it:

- the trigger
- the side-effect logic

In the previous examples, the trigger was the method call itself like here:

```typescript
@Component({
  // ...
  providers: [RxEffects],
})
export class FooComponent {
  private runSideEffect = console.log;
  private effect$ = interval(1000).pipe(tap(this.runSideEffect));

  constructor(effects: RxEffects) {
    effects.register(this.effect$);
  }
}
```

We can also set a value emitted from an `Observable` as a trigger.
Thus, you may use a render call or any other logic executed by the trigger as the side-effect logic.

```typescript
@Component({
  // ...
  providers: [RxEffects],
})
export class FooComponent {
  private runSideEffect = console.log;
  private effect$ = interval(1000);

  constructor(effects: RxEffects) {
    effects.register(this.effect$, this.runSideEffect);
  }
}
```

The subscription handling and cleanup is done automatically under the hood.
However, if we want to stop a particular side effect earlier we can do the following:

```typescript
@Component({
  // ...
  providers: [RxEffects],
})
export class FooComponent {
  private effect$ = interval(1000);
  private effectId: number;

  constructor(effects: RxEffects) {
    this.effectId = effects.register(this.effect$, console.log);
  }

  stop() {
    this.effects.unregister(this.effectId);
  }
}
```

## Install

```bash
npm install --save @rx-angular/state
# or
yarn add @rx-angular/state
```

## Update

If you are using `@rx-angular/state` already, please consider upgrading with the `@angular/cli update` command in order
to make sure all provided code migrations are processed properly.

```bash
ng update @rx-angular/state
# or with nx
nx migrate @rx-angular/state
```

## Usage

![rx-angular--state--effects--motivation-when-to-use--michael-hladky](https://user-images.githubusercontent.com/10064416/154174403-5ab34eb8-68e4-40f9-95de-12a62784ac40.png)

In this example we have a chart in our UI which should display live data of a REST API ;).
We have a small handle that shows and hides the chart.
To avoid data fetching when the chart is not visible we connect the side effect to the toggle state of the chart.

```typescript
@Component({
  // ...
  providers: [RxEffects],
})
export class FooComponent {

  chartVisible$ = new Subject<boolean>();
  chartData$ = this.ngRxStore.select(getListData());

  pollingTrigger$ this.chartVisible$.pipe(
      switchMap(isPolling => isPolling ? interval(2000) : EMPTY)
  );

  constructor(
    private ngRxStore: Store,
    private effects: RxEffects
  ) {
     effects.register(this.pollingTrigger$, () => this.ngRxStore.dispatch(refreshAction()));
  }

}
```

### Advanced examples

The register method can also be combined with tap or even subscribe:

```typescript
effects.register(obs$, doSideEffect);
// is equivalent to
effects.register(obs$.pipe(tap(doSideEffect)));
// is equivalent to
effects.register(obs$.subscribe(doSideEffect));
// is equivalent to
effects.register(obs$, { next: doSideEffect }); // <- you can also tap into error or complete here
```

You can even use it with promises or schedulers:

```typescript
effects.register(fetch('...'), doSideEffect);
effects.register(animationFrameScheduler.schedule(action));
```

All registered effects are automatically unsubscribed when the component is destroyed. If you wish to cancel a specific effect earlier, you can do this either declaratively (obs$.pipe(takeUntil(otherObs$))) or imperatively using the returned effect ID:

```typescript
this.effectId = this.effects.register(obs$, doSideEffect);

// later
this.effects.unregister(this.effectId); // doSideEffect will no longer be called
```

## Error handling

If an error is thrown inside one side-effect callback, other effects are not affected.
The built-in Angular ErrorHandler gets automatically notified of the error, so these errors should still show up in Rollbar reports.

However, there are additional ways to tweak the error handling.

We can hook into this process by providing a custom error handler:

```typescript
import { ErrorHandler } from '@angular/core';

const customErrorHandler: ErrorHandler = {
  handleError: jest.fn()
};

@NgModule({
  declarations: [AnyComponent],
  providers: [
    {
      provide: ErrorHandler,
      useValue: customErrorHandler
    }
  ]
});
// ...
```
