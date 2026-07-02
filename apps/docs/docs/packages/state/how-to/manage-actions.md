---
id: manage-actions
title: "How to manage actions"
diataxis_type: how-to
package: state
legacy_guard: false
sidebar_label: "Manage actions"
sidebar_position: 2
tags: [state, guides]
---

# How to manage actions

## Goal

Use `@rx-angular/state/actions` to model the events in a component or service (user interactions, external system events, device APIs) as typed channels you can dispatch imperatively and consume reactively. `rxActions` turns an actions interface into a dispatcher (`login(...)`), a stream (`login$`), and a side-effect binder (`onLogin(...)`) per key, with automatic subscription cleanup. It pairs naturally with an [`rxState`](../reference/rx-state-functional.md) container but works standalone.

Every symbol used here is documented in the [`rxActions` reference](../reference/rx-actions-api.md).

> **Why route events through actions rather than raw subjects:** see the [RxState reactive discipline & effects](../../../concepts/E6-rxstate-discipline-and-effects.md) concept. Treat actions as the single place your event channels, their transforms, and their side effects are declared.

## Dispatch and subscribe to an action

Create the handle, dispatch from the template, and subscribe to the stream. Note how one interface key (`login`) becomes both a dispatchable `login()` and a readable `login$`.

```typescript title="src/login.component.ts"
import { Component, inject } from '@angular/core';
import { rxActions } from '@rx-angular/state/actions';
import { exhaustMap } from 'rxjs';

@Component({
  selector: 'app-login',
  template: `
    <input placeholder="username" #username />
    <input type="password" placeholder="password" #password />
    <button
      (click)="
        actions.login({
          username: username.value,
          password: password.value,
        })
      "
    >
      Login
    </button>
  `,
})
export class LoginComponent {
  private readonly service = inject(AuthService);

  protected readonly actions = rxActions<{
    login: { username: string; password: string };
  }>();

  constructor() {
    this.actions.login$
      .pipe(exhaustMap((credentials) => this.service.login(credentials)))
      .subscribe();
  }
}
```

## Bind a side effect with the `on` shorthand

For every key you also get an `on<Key>` binder. It pipes the stream through your operator and runs a side effect per result. It returns a teardown function; call it to stop the effect.

```typescript title="src/login.component.ts"
import { Component, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { rxActions } from '@rx-angular/state/actions';
import { exhaustMap } from 'rxjs';

@Component({
  selector: 'app-login',
  template: `
    <input placeholder="username" #username />
    <input type="password" placeholder="password" #password />
    <button
      (click)="
        actions.login({
          username: username.value,
          password: password.value,
        })
      "
    >
      Login
    </button>
  `,
})
export class LoginComponent {
  private readonly service = inject(AuthService);
  private readonly doc = inject(DOCUMENT);

  protected readonly actions = rxActions<{
    login: { username: string; password: string };
  }>();

  private readonly loginEffect = this.actions.onLogin(
    (credentials$) => credentials$.pipe(exhaustMap((c) => this.service.login(c))),
    () => this.doc.defaultView?.alert('successfully logged in'),
  );
}
```

## Drive data fetching from a service

The same handle works in a service. Here a `void` action (`refresh`) triggers a fetch, and the result is written into a `signal`, the signals-first read surface.

```typescript title="src/movie.service.ts"
import { Injectable, inject, signal } from '@angular/core';
import { rxActions } from '@rx-angular/state/actions';
import { exhaustMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly movieResource = inject(MovieResource);
  private readonly actions = rxActions<{ refresh: void }>();

  readonly movies = signal<Movie[]>([]);

  private readonly refreshEffect = this.actions.onRefresh(
    (refresh$) => refresh$.pipe(exhaustMap(() => this.movieResource.getMovies())),
    (movies) => this.movies.set(movies),
  );

  refresh() {
    this.actions.refresh();
  }
}
```

## Stop an effect programmatically

The return value of the `on` binder is the cleanup function. Call it to stop firing the side effect.

```typescript title="src/movie.service.ts"
export class MovieService {
  // …as above…
  private readonly refreshEffect = this.actions.onRefresh(
    (refresh$) => refresh$.pipe(exhaustMap(() => this.movieResource.getMovies())),
    (movies) => this.movies.set(movies),
  );

  disable() {
    // stop the refresh effect
    this.refreshEffect();
  }
}
```

## Transform inputs at the source

Register a transform to normalize an event before it is emitted, so the template can pass `$event` directly while the stream stays typed. Use a [predefined transform](../reference/rx-actions-api.md#predefined-transforms) or your own function.

```typescript title="src/list.component.ts"
import { Component } from '@angular/core';
import { rxActions, eventValue } from '@rx-angular/state/actions';

@Component({
  selector: 'app-list',
  // the template forwards the raw DOM Event; `eventValue` plucks `.target.value`
  template: `<input name="search" (change)="actions.search($event)" />`,
})
export class ListComponent {
  protected readonly actions = rxActions<{ search: string }>(({ transforms }) =>
    transforms({ search: eventValue }),
  );

  // actions.search$ still emits a `string`
}
```

A custom transform is any function returning the channel's payload type:

```typescript title="src/greet.component.ts"
import { Component } from '@angular/core';
import { rxActions } from '@rx-angular/state/actions';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-greet',
  template: `
    <input name="name" (input)="ui.greet($event.target.value)" />
    <div>{{ greeting() }}</div>
  `,
})
export class GreetComponent {
  protected readonly ui = rxActions<{ greet: string }>(({ transforms }) =>
    transforms({ greet: (v: string) => `Hello ${v}` }),
  );

  protected readonly greeting = toSignal(this.ui.greet$, { initialValue: '' });
}
```

## Result

Dispatching a channel (from the template or the class) pushes onto its `$` stream and runs any bound `on<Key>` effect. `void` channels act as plain triggers; transformed channels emit the normalized value. Everything unsubscribes automatically when the host is destroyed.

## Testing

Actions are tested through the component or service that hosts them: dispatch (click a button or call the method), then assert the side effect. The mechanics (`TestBed`, `whenStable()`, signal assertions) are covered in [How to test RxState building blocks](./testing.md).

## See also

- Reference: [`rxActions`](../reference/rx-actions-api.md), covering signatures, the transforms table, and the deprecated `RxActionFactory`.
- How-to: [Test RxState building blocks](./testing.md).
