---
id: T1-your-first-rxstate
title: 'Your first reactive state with RxState (alongside signals)'
diataxis_type: tutorial
package: _site
legacy_guard: false
sidebar_label: 'First reactive state'
sidebar_position: 1
tags: [state, examples]
concepts: [E3]
---

import SignalsFirst from '@site/src/components/SignalsFirst';

# Your first reactive state with RxState (alongside signals)

By the end of this lesson you will have a standalone, zoneless component that starts with a plain signal, then reaches for `rxState()` the moment an asynchronous source arrives, and you will see the value update on screen.

<SignalsFirst />

## Prerequisites

- **Node.js 20+** and **npm 10+**.
- **Angular 21** with a standalone, zoneless app from a fresh `ng new my-app` (no `NgModule` bootstrap).
- **`@rx-angular/state` 21** (peer `@angular/core ^21`).
- Basic familiarity with signals. No RxJS depth is assumed beyond a single stream.

We start from a brand-new app and add everything the lesson needs, so it cannot fail.

## Steps

### 1. Start with a signal for local state

Create a standalone, zoneless component and hold its trivially-local state in a signal. For state that lives and dies with the component, a signal is the default; reach for it first.

```typescript title="counter.component.ts"
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <p>Count: {{ count() }}</p>
    <button (click)="increment()">Increment</button>
  `,
})
export class CounterComponent {
  protected readonly count = signal(0);

  increment(): void {
    this.count.update((n) => n + 1);
  }
}
```

Run `ng serve` and click the button. The count increases on screen. A signal is all this component needs.

### 2. Add a requirement signals fit poorly

Now the component must also load a list of movies from an **asynchronous source**: an HTTP call that emits over time, not a value you already hold. A plain `signal()` stores a value you set imperatively; it has no built-in way to _connect_ to a stream and keep itself in sync as the stream emits. This is where `rxState()` fits and a signal does not. For the split between local signals and reactive state, see [Reactive state: global vs local, RxState + signals](../concepts/E3-reactive-state-global-vs-local.md).

The async source we will connect is a plain observable of movies:

```typescript title="movie.service.ts"
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Movie {
  id: number;
  title: string;
}

@Injectable({ providedIn: 'root' })
export class MovieService {
  // Stands in for an HTTP call — emits once, after a short delay.
  movies$(): Observable<Movie[]> {
    return of([
      { id: 1, title: 'Reactive Rewind' },
      { id: 2, title: 'The Signal' },
    ]).pipe(delay(300));
  }
}
```

### 3. Create state functionally with `rxState()`

Add `rxState()` to the component in a private field. The setup function runs once on creation and hands you `set` and `connect`, so you can seed initial state in one place.

```typescript title="counter.component.ts"
import { Component, inject, signal } from '@angular/core';
import { rxState } from '@rx-angular/state';
import { Movie, MovieService } from './movie.service';

interface MovieState {
  movies: Movie[];
}

@Component({
  selector: 'app-counter',
  template: `<p>Count: {{ count() }}</p>`,
})
export class CounterComponent {
  private readonly movieService = inject(MovieService);
  protected readonly count = signal(0);

  private readonly state = rxState<MovieState>(({ set }) => {
    set({ movies: [] });
  });
}
```

`rxState<MovieState>()` returns a handle with `connect`, `set`, and `signal`, created functionally and held in a field. There is no `providers: [RxState]`, no `super()`, no class extension.

### 4. Connect the async source, then set an update

Connect the observable so state stays in sync as it emits, and expose the slice as a signal for the template. Add an imperative `set()` for a manual update.

```typescript title="counter.component.ts"
export class CounterComponent {
  private readonly movieService = inject(MovieService);
  protected readonly count = signal(0);

  private readonly state = rxState<MovieState>(({ set, connect }) => {
    set({ movies: [] });
    // The async source drives state reactively.
    connect('movies', this.movieService.movies$());
  });

  // A signal surface for the template.
  protected readonly movies = this.state.signal('movies');

  // An imperative update — clears the list on demand.
  clear(): void {
    this.state.set({ movies: [] });
  }
}
```

`connect('movies', …)` keeps the `movies` slice in sync with the stream; `state.signal('movies')` exposes it as a `Signal<Movie[]>` for direct template binding; `state.set(...)` applies an imperative update when you need one.

Beyond replacing a whole slice, when you need to update the `movies` array or a nested object _immutably_ — add one item, update one by id, or patch a field — reach for the pure helpers in [`@rx-angular/cdk/transformations`](../packages/cdk/reference/transformations/index.md). Each returns a new value and never mutates its input, so it drops straight into a `set(...)`, for example `this.state.set({ movies: insert(this.state.get('movies'), newMovie) })`. The helpers are framework-agnostic, so the same `insert` / `patch` / `update` also work on a plain signal via `signal.update(...)`.

### 5. Select and render, and watch it update

Render the count with a signal and the connected movies with `@if`/`@for`. Because `movies` is a signal, the template re-renders the instant the async source emits.

```typescript title="counter.component.ts"
@Component({
  selector: 'app-counter',
  template: `
    <p>Count: {{ count() }}</p>
    <button (click)="increment()">Increment</button>

    @if (movies().length > 0) {
      <ul>
        @for (movie of movies(); track movie.id) {
          <li>{{ movie.title }}</li>
        }
      </ul>
    } @else {
      <p>Loading movies…</p>
    }

    <button (click)="clear()">Clear</button>
  `,
})
export class CounterComponent {
  /* … from step 4 … */
  increment(): void {
    this.count.update((n) => n + 1);
  }
}
```

Reload the page. You first see **“Loading movies…”**, and after the source emits the list appears: **two movie titles render on screen**. Click **Clear** and the list empties; clicking again shows nothing new, and the count still increments independently. That list appearing when the stream emits is the success signal: your `rxState()` is connected, selected, and rendering.

## What you learned

- Signals are the default for **local** state; you started there.
- `rxState()` fits the moment state comes from an **async source** (or is shared across components).
- You created state **functionally** with `rxState()`, seeded it with `set()`, kept it in sync with `connect()`, applied an imperative `set()`, and exposed a slice as a **signal** rendered with `@if`/`@for`.

## Next steps

- Understand the split: [Reactive state: global vs local, RxState + signals](../concepts/E3-reactive-state-global-vs-local.md) (E3).
- Go deeper on discipline: [RxState reactive discipline & effects](../concepts/E6-rxstate-discipline-and-effects.md) (E6).
- Do it for real: [Get started with rxState](../packages/state/how-to/getting-started.md) and [How to manage actions](../packages/state/how-to/manage-actions.md).
