---
id: state
title: "@rx-angular/state"
diataxis_type: reference
package: state
legacy_guard: false
sidebar_label: "@rx-angular/state"
sidebar_position: 1
hide_title: true
tags: [state, api-reference]
concepts: [E3]
---

import SignalsFirst from '@site/src/components/SignalsFirst';

# @rx-angular/state

<SignalsFirst />

`@rx-angular/state` (RxState) is a lightweight library for managing **reactive
component-level state** in Angular: components, services, and directives. It gives
you a small, strongly-typed API (`set`, `connect`, `select`, `signal`, `computed`)
with automatic subscription handling, so you can merge multiple asynchronous sources
into one state container and read it from the template as signals or observables.

## Signals first: where RxState fits

Modern Angular ships built-in reactivity: `signal()`, `computed()`,
`linkedSignal()`, and `toSignal()`. For **local component state, those primitives are
the default**; reach for them first. RxState is a **complement** to signals, useful
when state grows past what a handful of signals express cleanly:

- **Global / shared state**: a `providedIn: 'root'` service holding a state container
  that many components read.
- **Complex derived state**: several slices combined and memoized, especially when the
  inputs are asynchronous.
- **Async-heavy orchestration**: multi-source `connect`, plus actions and effects
  coordinating streams, bridged into signals for the template via `.signal()`.

For the full mental model of when state is local vs. global and how RxState sits
alongside signals, see [Reactive state: global vs local, RxState +
signals](../../concepts/E3-reactive-state-global-vs-local.md).

### When *not* to reach for RxState

If a component only needs a couple of independent pieces of local state and some
values derived from them, plain `signal()` + `computed()` is simpler and has no
library dependency: use it, and skip RxState.

## Install

```bash
npm install @rx-angular/state
```

## Quick look

The functional `rxState()` API creates and configures a state container bound to the
current injection context. It is destroyed automatically with its host.

```ts
import { Component, inject } from '@angular/core';
import { rxState } from '@rx-angular/state';
import { MovieResource } from './movie.resource';

@Component({
  selector: 'app-movie-list',
  template: `
    @for (movie of movies(); track movie.id) {
      <app-movie [movie]="movie" />
    }
  `,
})
export class MovieListComponent {
  private readonly movieResource = inject(MovieResource);

  private readonly state = rxState<{ movies: Movie[] }>(({ set, connect }) => {
    set({ movies: [] });
    connect('movies', this.movieResource.fetchMovies());
  });

  // read state in the template as a signal
  protected readonly movies = this.state.signal('movies');
}
```

## Where to go next

- **Reference: [`rxState`](./reference/rx-state-functional.md)**, the functional API with
  source-derived signatures.
- **Reference: [`RxState`](./reference/rx-state-class.md)**, the class-based API
  (legacy surface; prefer `rxState()` for new code).
- **Selection operators**: [`select`](./reference/select.md),
  [`selectSlice`](./reference/select-slice.md),
  [`distinctUntilSomeChanged`](./reference/distinct-until-some-changed.md),
  [`stateful`](./reference/stateful.md).
- **Concept: [Reactive state: global vs local, RxState +
  signals](../../concepts/E3-reactive-state-global-vs-local.md).**
