---
sidebar_position: 3
id: manage-effects
title: "Manage side effects with rxEffects"
diataxis_type: how-to
package: state
legacy_guard: false
sidebar_label: "Manage side effects"
tags: [state, guides]
concepts: [E6]
---

# How to manage side effects with `rxEffects`

**Goal:** run Observable- or Promise-based side effects in a component without manual `subscribe` / `takeUntil(destroy$)` / `ngOnDestroy` bookkeeping. `rxEffects` owns the subscriptions and cleans them up when the host is destroyed.

> Reach for `rxEffects` when the trigger is an **Observable or Promise**. For side effects that react to a `signal()`, use Angular's native [`effect()`](https://angular.dev/guide/signals#effects) instead; see the boundary table in the [`rxEffects` Reference](../reference/rx-effects-api.md#rxeffects-vs-native-effect).

## Register an effect

Create the handle with `rxEffects()` and wire effects inline via the setup function. Each `register(source, sideEffect)` subscribes to `source` and runs `sideEffect` on every emission.

```ts
import { Component, inject } from '@angular/core';
import { rxEffects } from '@rx-angular/state/effects';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-resize-logger',
  template: `<p>Resize the window and watch the console.</p>`,
})
export class ResizeLoggerComponent {
  private readonly effects = rxEffects(({ register }) => {
    register(fromEvent(window, 'resize'), () => {
      console.log('window was resized');
    });
  });
}
```

No `providers`, no `super()`, no `ngOnDestroy`. The subscription is torn down automatically when the component is destroyed.

### Run cleanup on destroy

Register custom teardown with `onDestroy`:

```ts
private readonly effects = rxEffects(({ register, onDestroy }) => {
  register(this.autosave$, (draft) => this.storage.save(draft));
  onDestroy(() => this.storage.flush());
});
```

### Cancel one effect early

`register` returns an unregister callback. Hold it and call it to stop that single effect before the component is destroyed:

```ts
export class ChartComponent {
  private readonly effects = rxEffects();

  private readonly stopPolling = this.effects.register(
    interval(2000),
    () => this.refresh(),
  );

  pausePolling() {
    this.stopPolling(); // this effect is now unsubscribed
  }
}
```

## Handle Observable-or-Promise side effects

`register` accepts any `ObservableInput` (an `Observable`, a `Promise`, an iterable, or a scheduler action), so the same API covers both stream- and promise-shaped work.

```ts
private readonly effects = rxEffects(({ register }) => {
  // Observable trigger
  register(this.colorMode$, (mode) => localStorage.setItem('colorMode', mode));

  // Promise trigger
  register(fetch('/api/ping'), (res) => console.log('pinged', res.status));
});
```

You can pass either a `next` callback or a full observer object to also tap `error` / `complete`:

```ts
register(this.save$, {
  next: (saved) => this.notify(saved),
  error: (err) => this.reportError(err),
});
```

### Keep an effect alive after an error

An error in one effect is forwarded to Angular's `ErrorHandler` and does not tear down the other effects, but the failing stream itself completes. If the effect must survive errors, recover inside the pipe with RxJS `retry()` or `catchError()`:

```ts
register(
  this.login$.pipe(
    exhaustMap(({ user, pass }) => this.http.post('/auth/', { user, pass })),
    retry(), // resubscribe on error instead of completing
  ),
  (data) => this.welcome(data),
);
```

### Poll only while visible

Compose the trigger with plain RxJS, then register once. This is a common orchestration pattern:

```ts
private readonly chartVisible$ = new Subject<boolean>();

private readonly pollingTrigger$ = this.chartVisible$.pipe(
  switchMap((visible) => (visible ? interval(2000) : EMPTY)),
);

private readonly effects = rxEffects(({ register }) => {
  register(this.pollingTrigger$, () => this.refreshChart());
});
```

## Result

Side effects run on their triggers and unsubscribe automatically on destroy, with no `destroy$` subject and no `ngOnDestroy`. Effects you cancel early stop immediately when you invoke their unregister callback.

## Testing

You rarely test `rxEffects` directly; test the **trigger** and the **side-effect function** instead (`rxEffects` is only the glue). A component-level testing guide (`how-to/testing`) is authored later in this Phase-C run; until then, click the trigger and assert the side-effect service method was called.

## See also

- Reference: [`rxEffects`](../reference/rx-effects-api.md)
- Concept: [RxState reactive discipline & effects](../../../concepts/E6-rxstate-discipline-and-effects.md), covering pure functions, referential transparency, and the anatomy of a side effect.
