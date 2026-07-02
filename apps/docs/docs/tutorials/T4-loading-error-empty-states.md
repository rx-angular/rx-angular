---
id: T4-loading-error-empty-states
title: "Loading / error / empty states the reactive way"
diataxis_type: tutorial
package: _site
legacy_guard: false
sidebar_label: "Loading / error / empty states"
sidebar_position: 4
tags: [template, examples]
concepts: [E4]
---

# Loading / error / empty states the reactive way

By the end of this lesson you will have one component that binds a single async
source and renders four distinct outcomes from it (**loading**, **error**,
**empty**, and **data**) through the reactive-context template outlets of `*rxLet`,
without hand-rolling a chain of `@if` branches. Seeing all four states appear on
screen, driven by that one source, is the success signal.

## Prerequisites

- **Node.js 20+** and **npm 10+**.
- **Angular 21** with a standalone, zoneless app created from a fresh `ng new my-app`
  (no `NgModule` bootstrap, no Zone.js).
- **`@rx-angular/template` 21** (peer `@angular/core ^21`).

We start from a brand-new app and add everything the lesson needs, so it cannot fail.

## Steps

### 1. Install the template package

```shell
ng new my-app
cd my-app
npm install @rx-angular/template
```

`@rx-angular/template` is now in your `package.json` dependencies.

### 2. See why the naive `@if`-chain falls short

Before wiring anything, look at how you would render an async source's states with
native control flow alone. Add a component that fetches a value and tries to cover
loading, error, and empty by hand:

```typescript title="src/app/report.component.ts"
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-report',
  template: `
    @if (data() === undefined) {
      <p>Loading…</p>
    } @else if (data()?.length === 0) {
      <p>Nothing to show.</p>
    } @else {
      <ul>
        @for (row of data(); track row) {
          <li>{{ row }}</li>
        }
      </ul>
    }
  `,
})
export class ReportComponent {
  // A hand-rolled "state" signal: undefined means loading, [] means empty.
  readonly data = signal<string[] | undefined>(undefined);
}
```

Run `ng serve` and open `http://localhost:4200/`. You see **Loading…**, and it never
leaves, because nothing feeds `data()` and the template has **no place to put an
error at all**. The chain conflates "not here yet" with "here but empty", carries no
first-class error branch, and reconstructs the source's phases from side channels
instead of reading them from the source. Change detection re-runs this whole chain on
every signal read (see [Understanding change detection in Angular](../concepts/E1-change-detection.md)),
yet native `@if` cannot express the one thing a UI most needs from an async source:
*which phase is it in*. That missing model is the
[reactive context](../concepts/E4-reactive-context.md): the emitted value together
with the `suspense` / `error` / `complete` phase the source is in.

### 3. Bind the source through `*rxLet` with reactive-context outlets

`*rxLet` reads those phases straight from the source and renders one `ng-template`
per phase. Add `RxLet` to the component's `imports` and give it a suspense, error,
and complete outlet alongside the value:

```typescript title="src/app/report.component.ts"
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { RxLet } from '@rx-angular/template/let';

@Component({
  selector: 'app-report',
  imports: [RxLet],
  template: `
    <ng-container
      *rxLet="rows$; let rows; suspense: loading; error: failed; complete: done"
    >
      @if (rows.length === 0) {
        <p>Nothing to show.</p>
      } @else {
        <ul>
          @for (row of rows; track row) {
            <li>{{ row }}</li>
          }
        </ul>
      }
    </ng-container>

    <ng-template #loading><p>Loading…</p></ng-template>
    <ng-template #failed><p>Something went wrong.</p></ng-template>
    <ng-template #done><p>Done.</p></ng-template>
  `,
})
export class ReportComponent {
  // Wired in the next step.
  readonly rows$!: Observable<string[]>;
}
```

The four outcomes now live in four named slots: `suspense` before the source emits,
`error` if it throws, `complete` when it finishes, and the value itself for `next`.
`*rxLet` derives which one to show from the source, so you no longer reconstruct it.

### 4. Wire the four states to a single async source

Give `rows$` one observable whose phases exercise every outlet. A `timer(...)` that
emits once, then completes, moves the source through **suspense → next → complete**;
swapping in a throwing or empty source triggers the other two. Replace the `rows$`
field:

```typescript title="src/app/report.component.ts"
import { of, timer, Observable } from 'rxjs';
import { delay, map } from 'rxjs';

export class ReportComponent {
  // Emits one non-empty page after 1.5s, then completes.
  readonly rows$: Observable<string[]> = timer(1500).pipe(
    map(() => ['Alpha', 'Bravo', 'Charlie']),
  );

  // Swap rows$ for one of these to observe the other states:
  //   empty  → of<string[]>([]).pipe(delay(1500))
  //   error  → timer(1500).pipe(map(() => { throw new Error('boom'); }))
}
```

One source, four reachable states, no branching in the wiring: a different
source expression visits each outcome.

### 5. Trigger each state and watch the template respond

Run the dev-server and reload for each source in turn:

```shell
ng serve
```

- **Loading** — with `rows$ = timer(1500).pipe(map(() => ['Alpha', 'Bravo', 'Charlie']))`,
  open `http://localhost:4200/`: for the first 1.5s the `suspense` outlet shows
  **Loading…**, then the list of three rows appears (`next`), then **Done.**
  (`complete`) once the timer completes.
- **Empty** — set `rows$` to `of<string[]>([]).pipe(delay(1500))` and reload: after
  the loading outlet you see **Nothing to show.**, the empty case, distinct from
  loading because the value *did* arrive; it was empty.
- **Error** — set `rows$` to `timer(1500).pipe(map(() => { throw new Error('boom'); }))`
  and reload: after loading, the `error` outlet shows **Something went wrong.**

Seeing all four outlets render, each from the same single binding, with no `async`
pipe and no `@if`-chain juggling phases by hand, is the success signal. The template
responds to the source's phase because the phase now travels with the value.

## What you learned

- An async source carries more than its value: it moves through **suspense**,
  **error**, and **complete** phases, and a UI has to render every one of them.
- `*rxLet` exposes those phases as four template outlets (`suspense`, `error`,
  `complete`, and the value for `next`), so one binding covers loading, error, empty,
  and data.
- The reactive-context outlets replace the `*ngIf`+`async` pattern and the native
  `@if`-chain, neither of which can express "which phase is the source in" as a
  first-class, typed outcome.

## Next steps

- Go deeper: [The reactive context](../concepts/E4-reactive-context.md) (E4): the
  suspense / error / complete model behind these outlets.
- Do it for real: [`RxLet` reference](../packages/template/reference/rx-let.md) and
  [`RxIf` reference](../packages/template/reference/rx-if.md): the context variables,
  context templates, and triggers in full.
