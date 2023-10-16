---
sidebar_position: 1
sidebar_label: 'Case Study: Refactor to rxEffects'
title: 'Case Study: Refactor to rxEffects'
---

## Problem

Let's get the problem it solves into code so we can refactor it.

We start with the side effect and 2 ways to execute it:

```typescript
@Component({
  // ...
})
export class MyComponent {
  // The side effect (`console.log`)
  private effectFn = (num: number) => console.log('number: ' + num);
  // The interval triggers our function including the side effect
  private trigger$ = interval(1000);

  constructor() {
    // [#1st approach] The subscribe's next callback it used to wrap and execute the side effect
    this.trigger$.subscribe(this.effectFn);

    // [#2nd approach] `tap` is used to wrap and execute the side effect
    this.trigger$.pipe(tap(this.effectFn)).subscribe();
  }
}
```

As we introduced a memory leak we have to setup some boilerplate code to handle the cleanup logic:

```ts
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  // ...
})
export class MyComponent {
  // The side effect (`console.log`)
  private effectFn = (num: number) => console.log('number: ' + num);
  // The interval triggers our function including the side effect
  private trigger$ = interval(1000);

  constructor() {
    this.trigger$.effect$
      .pipe(
        takeUntilDestroyed()
        // ⚠ Notice: Don't put any operator after takeUntil to avoid potential subscription leaks
      )
      .subscribe(this.effectFn);
  }
}
```

There are already a couple of things that are crucial:

- unsubscribe on destroy
- having the `takeUntil` operator as last operator in the chain

Another way would be using the `subscription` to run the cleanup logic.

```ts
@Component({
  // ...
})
export class MyComponent implements OnDestroy {
  // The side effect (`console.log`)
  private effectFn = (num: number) => console.log('number: ' + num);
  // The interval triggers our function including the side effect
  private trigger$ = interval(1000);
  // ⚠ Notice: The created subscription must be stored to `unsubscribe` later
  private readonly subscription: Subscription;

  constructor() {
    // ⚠ Notice: Never forget to store the subscription
    this.subscription = this.trigger$.subscribe(this.effectFn);
  }

  ngOnDestroy(): void {
    // ⚠ Notice: Never forget to cleanup the subscription
    this.subscription.unsubscribe();
  }
}
```

## Solution

In RxAngular we think the essential problem here is the call to `subscribe` itself. All `Subscription`s need to get unsubscribed manually which most of the time produces heavy boilerplate or even memory leaks if ignored or did wrong.
Like `rxState`, `rxEffects` is a local instance created by a component and thus tied to the components life cycle.
We can manage `Observables` as reactive triggers for side effects or manage `Subscription`s which internally hold side effects.
To also provide an imperative way for developers to unsubscribe from the side effect `register` returns an "asyncId" similar to `setTimeout`.
This can be used later on to call `unregister` and pass the async id retrieved from a previous `register` call. This stops and cleans up the side effect when invoked.

As an automatism any registered side effect will get cleaned up when the related component is destroyed.

Using `rxEffects` to maintain side-effects

```ts
import { rxEffects } from '@rx-angular/state/effects';

@Component({})
export class MyComponent {
  // The side effect (`console.log`)
  private effectFn = (num: number) => console.log('number: ' + num);
  // The interval triggers our function including the side effect
  private trigger$ = interval(1000);

  private effects = rxEffects(({ register }) => {
    register(this.trigger$, this.effectFn);
  });
}
```

> **⚠ Notice:**
> Avoid calling `register`, `unregister` , `subscribe` inside the side-effect function. (here named `doSideEffect`)

## Impact

![rx-angular--state--effects--motivation-process-diagram--michael-hladky](https://user-images.githubusercontent.com/10064416/154173507-049815ea-ee2a-4569-8a4d-6abdc319a349.png)

Compared to common approaches `rxEffects` does not rely on additional decorators or operators.
In fact, it removes the necessity of the `subscribe`.

This results in less boilerplate and a good guidance to resilient and ergonomic component architecture.
Furthermore, the optional imperative methods help to glue third party libs and a mixed but clean code style in Angular.
