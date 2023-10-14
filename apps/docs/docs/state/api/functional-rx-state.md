---
sidebar_label: Functional Creation (NEW)
sidebar_position: 1
title: Functional Creation
---

## Overview

The new Functional Creation API lets you create and configure `RxState` in only one place.

## Example

```typescript
import { RxFor } from '@rx-angular/template/for';

@Component({
  template: `<movie *rxFor="let movie of movies$" [movie]="movie" />`,
  imports: [RxFor],
})
export class MovieListComponent {
  private state = rxState<{ movies: Movie[] }>(({ set }) => {
    // set initial state
    set({ movies: [] });
  });

  // select a property for the template to consume
  movies$ = this.state.select('movies');
}
```

## Signature

The functional creation API is based on the class-based `RxState` API, more details about the signature [here](./rx-state).

```typescript
import { RxState as LegacyState } from '@rx-angular/state';

export type RxState<T extends object> = Pick<
  LegacyState<T>,
  'get' | 'select' | 'connect' | 'set' | '$' | 'setAccumulator'
>;

export type RxStateSetupFn<State extends object> = (
  rxState: Pick<RxState<State>, 'connect' | 'set' | 'setAccumulator'>
) => void;

export function rxState<State extends object>(
  setupFn?: RxStateSetupFn<State>
): RxState<State>;
```
