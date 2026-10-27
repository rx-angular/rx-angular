---
id: T2-render-a-large-live-list
title: 'Render a large live list without jank'
diataxis_type: tutorial
package: _site
legacy_guard: false
sidebar_label: 'Render a large live list'
sidebar_position: 2
tags: [template, cdk, examples]
concepts: [E1, E5]
---

# Render a large live list without jank

By the end of this lesson you will have a list of 10,000 rows that updates on a live
stream and stays smooth to scroll, with no dropped frames, by rendering it with `rxFor`
on a concurrent render strategy, then virtualizing it with `rxVirtualFor`.

## Prerequisites

- **Node.js 20+** and **npm 10+**.
- **Angular 21** with a standalone, zoneless app created from a fresh `ng new my-app`
  (no `NgModule` bootstrap).
- **`@rx-angular/template` 21** (peer `@angular/core ^21`).

We start from a brand-new app and add everything the lesson needs, so it cannot fail.

## Steps

### 1. Build the list with native `@for` and feel the jank

Install the template package:

```shell
npm install @rx-angular/template
```

Create a component that holds 10,000 rows and re-emits the whole array on a fast timer,
so the list is under constant load. Render it with native `@for`:

```typescript title="src/app/list.component.ts"
import { Component, signal } from '@angular/core';

interface Row {
  id: number;
  label: string;
  value: number;
}

@Component({
  selector: 'app-list',
  template: `
    <button (click)="churn()">Churn</button>
    <ul>
      @for (row of rows(); track row.id) {
        <li>{{ row.label }} — {{ row.value }}</li>
      }
    </ul>
  `,
})
export class ListComponent {
  protected readonly rows = signal<Row[]>(this.makeRows());

  private makeRows(): Row[] {
    return Array.from({ length: 10_000 }, (_, id) => ({
      id,
      label: `Row ${id}`,
      value: Math.random(),
    }));
  }

  churn() {
    // re-roll every value — a large, frequent update
    this.rows.update((rows) => rows.map((r) => ({ ...r, value: Math.random() })));
  }
}
```

Serve the app and click **Churn** repeatedly:

```shell
ng serve
```

You will see the page freeze on each click: native `@for` renders all 10,000 rows in
one synchronous, blocking pass, so scrolling and clicking stall while it runs. That
blocking pass is the jank this lesson removes. To understand _why_ the whole list
re-renders in one uninterruptible go, read
[Understanding change detection in Angular](../concepts/E1-change-detection.md).

### 2. Swap `@for` for `rxFor` with `trackBy`

Replace the native `@for` block with the `rxFor` structural directive. It takes the
same list and a `trackBy` that names the item's identity key, and, unlike `@for`, it
renders each row as its own scheduled unit instead of one blocking pass:

```typescript title="src/app/list.component.ts"
import { Component, signal } from '@angular/core';
import { RxFor } from '@rx-angular/template/for';

interface Row {
  id: number;
  label: string;
  value: number;
}

@Component({
  selector: 'app-list',
  imports: [RxFor],
  template: `
    <button (click)="churn()">Churn</button>
    <ul>
      <li *rxFor="let row of rows; trackBy: 'id'">{{ row.label }} — {{ row.value }}</li>
    </ul>
  `,
})
export class ListComponent {
  protected readonly rows = signal<Row[]>(this.makeRows());

  private makeRows(): Row[] {
    return Array.from({ length: 10_000 }, (_, id) => ({
      id,
      label: `Row ${id}`,
      value: Math.random(),
    }));
  }

  churn() {
    this.rows.update((rows) => rows.map((r) => ({ ...r, value: Math.random() })));
  }
}
```

You pass the `rows` signal by reference; `rxFor` reads it for you, no `()` call in the
template. Click **Churn** again: the list already updates through `rxFor`'s renderer.

### 3. Apply a concurrent render strategy

Add the `strategy` input and set it to `normal`, a concurrent strategy. Native `@for`
has no equivalent: `rxFor` now chunks the 10,000-row render
across frames against a frame budget, pausing to let the browser handle scroll and
click between chunks instead of blocking until the whole list is done:

```html title="src/app/list.component.ts (template)"
<li *rxFor="let row of rows; trackBy: 'id'; strategy: 'normal'">{{ row.label }} — {{ row.value }}</li>
```

`normal` is the right priority for a user-facing list: it has a generous render
deadline and keeps chunking while the user can still interact. For the mental model
behind frame budgets and priorities, read
[Concurrent scheduling & the frame budget](../concepts/E5-concurrent-scheduling.md).

### 4. Virtualize the list with `rxVirtualFor`

Ten thousand `<li>` elements is more DOM than the viewport can ever show at once, so
render only the visible rows. Wrap the list in a virtual-scroll viewport with a
fixed-size scroll strategy and switch `rxFor` to `rxVirtualFor`, the stable
virtual-scrolling directive:

```typescript title="src/app/list.component.ts"
import { Component, signal } from '@angular/core';
import { FixedSizeVirtualScrollStrategy, RxVirtualScrollViewportComponent, RxVirtualFor } from '@rx-angular/template/virtual-scrolling';

interface Row {
  id: number;
  label: string;
  value: number;
}

@Component({
  selector: 'app-list',
  imports: [RxVirtualFor, RxVirtualScrollViewportComponent, FixedSizeVirtualScrollStrategy],
  template: `
    <button (click)="churn()">Churn</button>
    <rx-virtual-scroll-viewport [itemSize]="32" style="height: 400px">
      <div *rxVirtualFor="let row of rows; trackBy: 'id'; strategy: 'normal'" style="height: 32px">{{ row.label }} — {{ row.value }}</div>
    </rx-virtual-scroll-viewport>
  `,
})
export class ListComponent {
  protected readonly rows = signal<Row[]>(this.makeRows());

  private makeRows(): Row[] {
    return Array.from({ length: 10_000 }, (_, id) => ({
      id,
      label: `Row ${id}`,
      value: Math.random(),
    }));
  }

  churn() {
    this.rows.update((rows) => rows.map((r) => ({ ...r, value: Math.random() })));
  }
}
```

The viewport keeps only the rows in view (plus a small runway) in the DOM, and
`rxVirtualFor` schedules their change detection on the same `normal` strategy.

### 5. Verify it stays smooth

Serve the app and scroll the list fast while clicking **Churn**:

```shell
ng serve
```

The list now scrolls smoothly and stays interactive under the live churn: no freeze on
update, no stutter while scrolling. That smooth scroll with no dropped frames is the
success signal that proves the list renders without jank. To confirm it, open Chrome
DevTools' Performance panel and record while you scroll and churn: the long blocking
task from Step 1 is gone, replaced by short frame-budgeted chunks with input handling
interleaved between them.

## What you learned

- Native `@for` renders a large list in one synchronous, blocking pass, the source of
  the jank.
- `rxFor` with a `trackBy` renders each row as its own scheduled unit.
- A concurrent render `strategy` chunks that rendering across frames against a frame
  budget, so the UI stays responsive. Native control flow has no equivalent.
- `rxVirtualFor` in a virtual-scroll viewport renders only the visible rows, so even a
  10,000-row live list scrolls smoothly.

## Next steps

- Tune it: [How to tune rendering with strategies](../packages/template/how-to/tune-rendering-with-strategies.md)
- Go further: [How to render heavy UI work without blocking the frame](../packages/template/how-to/concurrent-rendering.md)
- Virtual scrolling recipes: [How to build virtual scroll lists](../packages/template/how-to/virtual-scroll-recipes.md)
