---
id: getting-started
title: 'Get started with rxState'
diataxis_type: how-to
package: state
legacy_guard: false
sidebar_label: 'Getting started'
sidebar_position: 1
tags: [state, guides]
concepts: [E3]
---

import SignalsFirst from '@site/src/components/SignalsFirst';

# Get started with `rxState`

<SignalsFirst />

This guide walks you through creating your first `rxState()` instance, seeding initial state, connecting async sources, and binding state into a signals-first template.

> **When do I need a state library at all?** For local component state, Angular's `signal()` / `computed()` are usually enough; `rxState()` earns its place for global/shared state, complex derived state, and async-heavy orchestration. See [Reactive state: global vs local, RxState + signals](../../../concepts/E3-reactive-state-global-vs-local.md).

## Create a state instance

Create `rxState()` in a private field. The optional setup function runs once on creation and hands you `set`, `connect`, `get`, and `select` so you can seed state and wire connections in one place.

```ts
import { Component } from '@angular/core';
import { rxState } from '@rx-angular/state';

@Component({
  selector: 'app-movie-list',
  template: `
    @for (movie of movies(); track movie.id) {
      <app-movie [movie]="movie" />
    }
  `,
})
export class MovieListComponent {
  private readonly state = rxState<{ movies: Movie[] }>(({ set }) => {
    // seed initial state
    set({ movies: [] });
  });

  // read a key as a Signal — the signals-first template surface
  readonly movies = this.state.signal('movies');
}
```

`state.signal('movies')` returns a `Signal<Movie[]>` for direct template binding. If you need an `Observable` instead (for RxJS pipelines), use `state.select('movies')`.

## Connect an async source

Use `connect` to merge an external source into a state key. It accepts both `Observable` and `Signal` sources, for example an `@ngrx/store` selector:

```ts
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { rxState } from '@rx-angular/state';

@Component({
  /* … */
})
export class MovieListComponent {
  private readonly store = inject<Store<MovieState>>(Store);

  private readonly state = rxState<{ movies: Movie[] }>(({ set, connect }) => {
    set({ movies: [] });

    // connect an Observable source
    connect('movies', this.store.select('movies'));

    // …or a Signal source
    connect('movies', this.store.selectSignal('movies'));
  });

  readonly movies = this.state.signal('movies');
}
```

### Derive loading and error state from one connection

One of the `connect` overloads lets you fill several keys from a single stream, so loading and error flags stay in sync with the data:

```ts
import { Component, inject } from '@angular/core';
import { rxState } from '@rx-angular/state';
import { catchError, endWith, map, of, startWith } from 'rxjs';

@Component({
  template: `
    @if (loading()) {
      <app-loader />
    }
    @if (error()) {
      <app-error />
    }
    @for (movie of movies(); track movie.id) {
      <app-movie [movie]="movie" />
    }
  `,
})
export class MovieListComponent {
  private readonly movieResource = inject(MovieResource);

  private readonly state = rxState<{
    movies: Movie[];
    loading: boolean;
    error: boolean;
  }>(({ set, connect }) => {
    set({ movies: [], loading: false, error: false });
    connect(
      this.movieResource.fetchMovies().pipe(
        map((movies) => ({ movies })),
        catchError(() => of({ error: true })),
        startWith({ loading: true }),
        endWith({ loading: false }),
      ),
    );
  });

  readonly movies = this.state.signal('movies');
  readonly loading = this.state.signal('loading');
  readonly error = this.state.signal('error');
}
```

## Feed a component input into state

To pull a component input into state, expose the input as a signal and connect it. Use `input()` and bridge it into an `Observable` with `toObservable`:

```ts
import { Component, input } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { rxState } from '@rx-angular/state';

@Component({
  selector: 'app-count',
  template: `<div>{{ count() }}</div>`,
})
export class CounterComponent {
  readonly countInput = input(0, { alias: 'count' });

  private readonly state = rxState<{ count: number }>(({ set, connect }) => {
    set({ count: 0 });
    connect('count', toObservable(this.countInput));
  });

  readonly count = this.state.signal('count');
}
```

## Update based on previous state

`connect` can take a projection `(oldState, value) => newValue`, letting you compute the next value from the current state and an incoming value, for example appending each incoming movie to the list already in state:

```ts
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { rxState } from '@rx-angular/state';

@Component({
  template: `
    @for (movie of movies(); track movie.id) {
      <app-movie [movie]="movie" />
    }
  `,
})
export class MovieListComponent {
  // incoming movies, e.g. from a websocket or an "add" button
  readonly movieAdded = new Subject<Movie>();

  private readonly state = rxState<{ movies: Movie[] }>(({ set, connect }) => {
    set({ movies: [] });

    // compute the next `movies` from its own previous value + the new movie
    connect('movies', this.movieAdded, (oldState, movie) => [...oldState.movies, movie]);
  });

  readonly movies = this.state.signal('movies');
}
```

:::tip Derive views, don't overwrite the source
Use a projection only when the next value genuinely depends on the previous one:
accumulating, appending, or toggling. To derive a _view_ of your state, like a
filtered or sorted list, keep the source untouched and build it with
[`computed`](../reference/rx-state-functional.md) or
[`select`](../reference/select.md) instead. Connecting a filtered result back
into the same key overwrites the source, so clearing the filter can no longer
restore the full list.
:::

## Use `rxState` in a service

For a stronger separation of concerns, hold `rxState()` inside an `@Injectable`. `rxState()` binds its lifecycle to the current injection context, so a root-provided service lives for the app's lifetime:

```ts
import { inject, Injectable } from '@angular/core';
import { rxState } from '@rx-angular/state';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly resource = inject(MovieResource);

  private readonly state = rxState<{ movies: Movie[] }>(({ set, connect }) => {
    set({ movies: [] });
    connect('movies', this.resource.fetchMovies());
  });

  // expose a read-only, signals-first surface to consumers
  readonly movies = this.state.signal('movies');
}
```

To hand out only read access, expose `state.asReadOnly()`; consumers get the reactive reads `select` / `signal` / `computed` plus the imperative snapshot `get`, while write access stays private to the owner.

## Result

You now have a component (or service) that seeds initial state, connects one or more async sources, and exposes state to the template through signals. Change detection runs off the signal reads, with no manual subscription or `async` pipe required.

## Using the class-based API

Older code may create state by extending or injecting the class-based `RxState` service (the "Classic" path). That surface is legacy; new code should prefer the functional `rxState()` above. For the class API and its migration notes, see the [`RxState` (class) reference](../reference/rx-state-class.md).

## See also

- Reference: [`rxState` (functional)](../reference/rx-state-functional.md), the full handle surface (`set`, `connect`, `select`, `signal`, `computed`, `asReadOnly`).
- Reference: [`RxState` configuration](../reference/rx-state-config.md), scheduler and accumulator options.
- Concept: [Reactive state: global vs local, RxState + signals](../../../concepts/E3-reactive-state-global-vs-local.md).
