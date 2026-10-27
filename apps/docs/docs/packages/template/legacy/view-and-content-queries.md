---
id: view-and-content-queries
title: 'Handling view and content queries (parent)'
diataxis_type: how-to
package: template
legacy_guard: 'Zone.js / apps still using the deprecated parent flag'
sidebar_label: 'View & content queries (legacy)'
tags: [template, guides, migration]
---

import LegacyGuard from '@site/src/components/LegacyGuard';

# Handling view and content queries (`parent`)

<LegacyGuard audience="Zone.js / apps still using the deprecated parent flag" native="since Angular v19, signal-based viewChild()/contentChild() queries update automatically without the parent flag">

The `parent` flag existed so that a structural directive could re-run its host
component's change detection and keep decorator-based `@ViewChild`/`@ContentChild`
queries in sync when it inserted or removed views asynchronously. With
**signal-based queries** (`viewChild()`, `contentChild()`, since Angular v19) the
query re-evaluates on its own, so the flag is no longer needed. `parent` is
**deprecated** and will be removed; prefer signal queries for new code.

</LegacyGuard>

## When you still need this

You only need the `parent` flag if you are on an older setup that combines a
`@rx-angular/template` structural directive (`*rxLet`, `*rxFor`, …) with
**decorator-based** view/content queries (`@ViewChild`, `@ContentChild`) that
must reflect views the directive inserts or removes. On modern Angular, migrate
to signal queries and leave the flag off.

## Recommended: signal-based queries

```typescript
import { Component, contentChildren, viewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-list',
  template: `
    <div #myDiv *rxLet="state$; let state"></div>
    <button (click)="append()">append</button>
  `,
})
export class AppListComponent {
  readonly myDiv = viewChild<ElementRef<HTMLElement>>('myDiv');

  append() {
    this.myDiv()?.nativeElement.appendChild(document.createElement('span'));
  }
}
```

Because `viewChild()`/`contentChild()` return signals that re-evaluate when the
queried views change, the directive does not need to force the parent's change
detection, so you can keep `parent` at its default (`false`).

## The `parent` input (deprecated)

:::warning

The `parent` flag is **deprecated** and will be removed in a future version once
the underlying option is dropped. It is no longer needed with
[signal-based view queries](https://angular.dev/guide/signals/queries). This page
becomes obsolete the moment the flag is removed.

:::

All `@rx-angular/template` structural directives (`*rxLet`, `*rxFor`, etc.) accept
a `parent` flag. **Its default is `false`.** When set to `true`, the directive
runs change detection for its host component whenever it inserts or removes a
view, updating that component's view and content queries (and those of its
children), at the cost of extra change detection cycles.

```html
<div *rxLet="state$; let state; parent: true"></div>
```

Leaving `parent` at its default `false` (the recommended setting when you use
signal queries) avoids those extra cycles.

## Setting `parent` globally

Set the default for every directive with `provideRxRenderStrategies`, best at
root level:

```typescript
import { provideRxRenderStrategies } from '@rx-angular/cdk/render-strategies';
import { ApplicationConfig } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRxRenderStrategies({
      parent: false, // applies to all rx-template structural directives
    }),
  ],
};
```

For the full picture on the `parent` option alongside the other rendering
controls, see
[How to tune rendering with strategies](../how-to/tune-rendering-with-strategies.md).

## See also

- Concept (legacy context): [Zoneless & how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md)
- Reference: [`RxLet`](../reference/rx-let.md)
- Reference: [`RxFor`](../reference/rx-for.md)
- How-to: [Tune rendering with strategies](../how-to/tune-rendering-with-strategies.md)
