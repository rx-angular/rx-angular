---
id: refactor-to-rx-effects
title: 'How to refactor manual subscriptions to rxEffects'
diataxis_type: how-to
package: state
legacy_guard: false
sidebar_label: 'Case study: refactor to rxEffects'
sidebar_position: 5
tags: [state, guides]
concepts: [E3]
---

# How to refactor manual subscriptions to rxEffects

This is a case study: take a side effect wired up with manual `subscribe`/cleanup and refactor it to `rxEffects`, which ties the effect to the component lifecycle for you. `rxEffects` is the sanctioned replacement for the removed `hold()` on the functional RxState surface.

## Problem

Start with the side effect and two common ways to execute it:

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
    // [#1st approach] The subscribe's next callback wraps and executes the side effect
    this.trigger$.subscribe(this.effectFn);

    // [#2nd approach] `tap` is used to wrap and execute the side effect
    this.trigger$.pipe(tap(this.effectFn)).subscribe();
  }
}
```

Both leak the subscription, so you have to add boilerplate to handle cleanup:

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
    this.trigger$
      .pipe(
        takeUntilDestroyed(),
        // ⚠ Notice: Don't put any operator after takeUntil to avoid potential subscription leaks
      )
      .subscribe(this.effectFn);
  }
}
```

A couple of things are crucial here:

- unsubscribe on destroy
- keeping `takeUntilDestroyed` as the last operator in the chain

Another way would be using the `Subscription` to run the cleanup logic:

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
    // ⚠ Notice: Never forget to clean up the subscription
    this.subscription.unsubscribe();
  }
}
```

## Solution

In RxAngular we think the essential problem is the call to `subscribe` itself. Every `Subscription` needs to be unsubscribed manually, which most of the time produces heavy boilerplate or even memory leaks if ignored or done wrong. Like `rxState`, `rxEffects` is a local instance created by a component and thus tied to the component's lifecycle. You can manage `Observable`s as reactive triggers for side effects, or manage `Subscription`s that internally hold side effects.

To imperatively stop a registered effect before the component is destroyed, call the cleanup function returned by `register`:

```ts
const stop = effects.register(obs$, fn);
/* later */ stop();
```

Any registered side effect is cleaned up automatically when the related component is destroyed.

Using `rxEffects` to maintain side effects:

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
> Avoid calling `register` or `subscribe` inside the side-effect function.

## Impact

![rx-angular--state--effects--motivation-process-diagram--michael-hladky](https://user-images.githubusercontent.com/10064416/154173507-049815ea-ee2a-4569-8a4d-6abdc319a349.png)

Compared to common approaches, `rxEffects` does not rely on additional decorators or operators, and it removes the need to call `subscribe`.

This results in less boilerplate and good guidance toward a resilient, ergonomic component architecture. The optional imperative methods help glue third-party libraries into a mixed but clean code style in Angular.

## See also

- Concept: [Reactive state: global vs local, RxState + signals](../../../concepts/E3-reactive-state-global-vs-local.md)

> When to reach for an `Observable`-triggered `rxEffects` register versus a native signal `effect()` (the underlying reactive-discipline rationale) is covered by the [RxState reactive discipline & effects](../../../concepts/E6-rxstate-discipline-and-effects.md) concept.
