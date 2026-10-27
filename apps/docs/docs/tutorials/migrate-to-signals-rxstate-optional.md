---
id: migrate-to-signals-rxstate-optional
title: 'Migrate to Signals (RxState optional)'
diataxis_type: tutorial
package: _site
legacy_guard: false
sidebar_label: 'Migrate to Signals (RxState optional)'
sidebar_position: 5
tags: [state, migration, examples]
concepts: [E3]
---

import SignalsFirst from '@site/src/components/SignalsFirst';

# Migrate to Signals (RxState optional)

By the end of this lesson you will have taken a component that stores its state in a
hand-rolled `BehaviorSubject` service and migrated it to **Angular signals**: the local
state moves to `signal()`/`computed()`, and the one async slice that signals handle
awkwardly is connected with `rxState()`. You will see the same checklist render, updating
reactively, with no manual subscriptions and no lifecycle hooks.

<SignalsFirst>

For **local component state, Angular signals are the default**, so this lesson migrates the
hand-rolled `BehaviorSubject` store straight to `signal()`/`computed()`. **RxState is the
complement**: we reach for `rxState()` only for the one async slice that
signals fit poorly. See [**Reactive state: global vs local, RxState + signals**](../concepts/E3-reactive-state-global-vs-local.md).

</SignalsFirst>

## Prerequisites

- **Angular 21** with a standalone, zoneless app created from a fresh `ng new my-app` (no `NgModule` bootstrap).
- **`@rx-angular/state` 21** installed (`npm install @rx-angular/state`).
- Basic familiarity with signals (`signal()`, `computed()`). No RxJS depth is assumed beyond one HTTP stream.

We start from a component that already works with a `BehaviorSubject` store, so the migration cannot fail.

## The starting point

A `ChecklistComponent` renders a checklist and lets the user answer (remove) tasks. Its
state lives in a hand-rolled store class built on `BehaviorSubject`:

```typescript title="checklist-store.ts"
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';

export interface Task {
  id: string;
  name: string;
}

export interface Checklist {
  id: string;
  name: string;
  tasks: Task[];
}

// The hand-rolled "Observable data service" we are migrating away from.
export class ChecklistStore {
  private readonly source$ = new BehaviorSubject<Checklist>({
    id: '',
    name: '',
    tasks: [],
  });

  readonly data$ = this.source$.asObservable();

  get snapshot(): Checklist {
    return this.source$.getValue();
  }

  select<K extends keyof Checklist>(key: K): Observable<Checklist[K]> {
    return this.data$.pipe(map((state) => state[key]));
  }

  patch(data: Partial<Checklist>): void {
    this.source$.next({ ...this.snapshot, ...data });
  }
}
```

```typescript title="checklist.component.ts (before)"
import { Component, inject, input, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ChecklistStore } from './checklist-store';
import { TodoApiService } from './todo-api.service';

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <section class="checklist">
      <h1>{{ name$ | async }}</h1>
      <div>
        <article class="task" *ngFor="let task of tasks$ | async">
          <h2>{{ task.name }}</h2>
          <button class="answer-button" (click)="answerTask(task.id)">Done</button>
        </article>
      </div>
    </section>
  `,
})
export class ChecklistComponent implements OnInit {
  readonly id = input.required<string>();

  private readonly api = inject(TodoApiService);
  private readonly store = new ChecklistStore();

  readonly name$ = this.store.select('name');
  readonly tasks$ = this.store.select('tasks');

  ngOnInit(): void {
    this.api.get(this.id()).subscribe((checklist) => this.store.patch(checklist));
  }

  answerTask(id: string): void {
    this.api.answerTask(id).subscribe(() => {
      this.store.patch({
        tasks: this.store.snapshot.tasks.filter((t) => t.id !== id),
      });
    });
  }
}
```

The reads go through `select()` + `| async`; the writes are imperative `subscribe` + `patch`.
We migrate the whole component to signals.

## Steps

### 1. Move the local state to a signal

The name and the task list are ordinary component state; signals are the default for this.
Replace the `ChecklistStore` with one `signal<Checklist>` and derive the two reads with
`computed()`:

```typescript title="checklist.component.ts"
readonly checklist = signal<Checklist>({ id: '', name: '', tasks: [] });

readonly name = computed(() => this.checklist().name);
readonly tasks = computed(() => this.checklist().tasks);
```

`name` and `tasks` now recompute automatically whenever `checklist` changes. Delete the
`ChecklistStore` class and its `BehaviorSubject`; you no longer need it.

### 2. Render the signals with `@for` instead of `| async`

Read the signals directly in the template and replace `*ngFor` + `| async` with `@for`
(and `track`):

```typescript title="checklist.component.ts (template)"
template: `
  <section class="checklist">
    <h1>{{ name() }}</h1>
    <div>
      @for (task of tasks(); track task.id) {
        <article class="task">
          <h2>{{ task.name }}</h2>
          <button class="answer-button" (click)="answerTask(task.id)">Done</button>
        </article>
      }
    </div>
  </section>
`,
```

You can drop the `AsyncPipe` import; the template reads signals now.

### 3. Make the write reactive with a signal update

The answer handler mutates local state, so it stays a plain signal update: no subscription
to the store, no `patch`:

```typescript title="checklist.component.ts"
answerTask(id: string): void {
  this.api.answerTask(id).subscribe(() => {
    this.checklist.update((c) => ({
      ...c,
      tasks: c.tasks.filter((t) => t.id !== id),
    }));
  });
}
```

The local state is now fully signal-based.

### 4. Connect the one async slice with `rxState()`

The initial load is the slice signals fit poorly: it is an asynchronous source that must be
merged into state without a lifecycle hook or a manual subscription. Here
**RxState complements signals**. Model the checklist with `rxState()`, `connect()` the load
stream, and expose it back to the template as a signal:

```typescript title="checklist.component.ts (final)"
import { Component, computed, inject, input } from '@angular/core';
import { rxState } from '@rx-angular/state';
import { TodoApiService } from './todo-api.service';
import { Checklist } from './checklist-store';

@Component({
  selector: 'app-checklist',
  standalone: true,
  template: `
    <section class="checklist">
      <h1>{{ name() }}</h1>
      <div>
        @for (task of tasks(); track task.id) {
          <article class="task">
            <h2>{{ task.name }}</h2>
            <button class="answer-button" (click)="answerTask(task.id)">Done</button>
          </article>
        }
      </div>
    </section>
  `,
})
export class ChecklistComponent {
  readonly id = input.required<string>();

  private readonly api = inject(TodoApiService);

  private readonly state = rxState<Checklist>(({ connect }) => {
    connect(this.api.get(this.id()));
  });

  readonly name = this.state.computed(({ name }) => name());
  readonly tasks = this.state.computed(({ tasks }) => tasks());

  answerTask(id: string): void {
    this.api.answerTask(id).subscribe(() => {
      this.state.set('tasks', ({ tasks }) => tasks.filter((t) => t.id !== id));
    });
  }
}
```

`connect()` merges every value the `get()` stream emits into state, and `state.computed()`
exposes `name` and `tasks` as signals for the template. The subscription is managed for you
and torn down with the component: no `ngOnInit`, no `ngOnDestroy`, no `| async`.

### 5. Run it and see the reactive render

Serve the app and mount the component with a checklist id:

```shell
ng serve
```

Open the page. The checklist name and tasks render as soon as the `get()` stream emits, and
clicking **Done** removes that task immediately; the template reacts to every signal change
with no manual subscriptions. That live, subscription-free render is the success signal that
the migration worked.

## What you built

A `ChecklistComponent` whose local state is plain **Angular signals** (`signal()` /
`computed()` / `.update()`), with the single async load slice handled by `rxState().connect()`
and bridged back into signals for the template. The hand-rolled `BehaviorSubject` store,
the `| async` reads, and the lifecycle hooks are all gone.

## Next steps

- Go deeper: [**Reactive state: global vs local, RxState + signals**](../concepts/E3-reactive-state-global-vs-local.md) (E3): when signals are enough and when RxState complements them.
