---
id: overview
title: '@rx-angular/template'
package: template
sidebar_label: 'Overview'
sidebar_position: 1
tags: [template, api-reference]
---

# `@rx-angular/template`

`@rx-angular/template` is a set of reactive template directives (`*rxLet`,
`*rxFor`, `*rxIf`, `*rxVirtualFor`, and `*rxVirtualView`) that bind
`Observable`s and `Signal`s directly in your templates.

The directives give you two things native control flow does not:

- **Concurrent, frame-budgeted rendering.** Each directive can schedule its own
  change detection through a prioritized, cancelable scheduler, so a large or
  expensive update is broken across frames instead of blocking the UI thread.
  Native `@if`/`@for`/`@switch` render synchronously; these directives can spread
  that work out.
- **A built-in reactive context.** Each directive tracks the _suspense_, _error_,
  and _complete_ states of its bound source and exposes template slots for each:
  loading and error UI without hand-written boilerplate.

## When to use it

For the plain cases (naming a value, a simple toggle, a straightforward list),
Angular's native `@let`, `@if`, `@for`, and `@switch` already do the job, and you
should reach for them first. `@rx-angular/template` earns its place when you need
the scheduling control or the reactive context on top of that.

To understand _why_ fine-grained, scheduled rendering matters, see
[Understanding change detection in Angular](/docs/concepts/change-detection).

## Install

```bash
npm install @rx-angular/template
```

`@rx-angular/template` v22 peers Angular `>=22`. For RxJS, RxAngular follows the same compatibility ranges as the Angular framework
itself; see the [official Angular versioning guide](https://angular.dev/reference/versions).

## Entry points

Each feature is a standalone directive or pipe imported from its own entry point:

| Entry point                              | Export                               | Purpose                                                        |
| ---------------------------------------- | ------------------------------------ | -------------------------------------------------------------- |
| `@rx-angular/template/let`               | `RxLet`                              | Bind an `Observable`/`Signal` with a reactive context.         |
| `@rx-angular/template/for`               | `RxFor`                              | Concurrent, scheduled list rendering.                          |
| `@rx-angular/template/if`                | `RxIf`                               | Reactive suspense/error/complete conditional rendering.        |
| `@rx-angular/template/push`              | `RxPush`                             | Reactive binding pipe with per-binding render scheduling.      |
| `@rx-angular/template/unpatch`           | `RxUnpatch`                          | Opt DOM events out of Zone.js patching (legacy, Zone.js only). |
| `@rx-angular/template/virtual-scrolling` | `RxVirtualFor`, viewport, strategies | High-performance virtual scrolling.                            |
| `@rx-angular/template/virtual-view`      | `RxVirtualView`                      | Viewport-based view virtualization (developer preview).        |

Import the directives you need directly into a standalone component:

```typescript
import { RxLet } from '@rx-angular/template/let';
import { RxFor } from '@rx-angular/template/for';
import { RxIf } from '@rx-angular/template/if';
import { RxPush } from '@rx-angular/template/push';

@Component({
  imports: [RxLet, RxFor, RxIf, RxPush],
  template: `...`,
})
export class AnyComponent {}
```

## Where to go next

- **How-to:** [Concurrent rendering](./how-to/concurrent-rendering.md),
  [tune rendering with strategies](./how-to/tune-rendering-with-strategies.md), and
  [virtual scroll recipes](./how-to/virtual-scroll-recipes.md).
- **Reference:** [`RxLet`](./reference/rx-let.md), [`RxFor`](./reference/rx-for.md),
  [`RxIf`](./reference/rx-if.md), and [`RxVirtualFor`](./reference/rx-virtual-for.md).
- **Concept:** [Understanding change detection in Angular](/docs/concepts/change-detection).
  [The reactive context](/docs/concepts/reactive-context) and
  [concurrent scheduling](/docs/concepts/concurrent-scheduling) cover the two
  features above.
