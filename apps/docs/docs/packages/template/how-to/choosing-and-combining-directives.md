---
id: choosing-and-combining-directives
title: 'How to choose and combine template directives'
diataxis_type: how-to
package: template
legacy_guard: false
sidebar_label: 'Choose & combine directives'
tags: [template, guides]
---

# How to choose and combine template directives

**Goal.** Decide when a native `@if`/`@for`/`@let` binding is enough, when a
reactive directive (`*rxIf`, `*rxFor`, `*rxLet`, `*rxVirtualFor`) earns its
place, and how to avoid the most common mistake when the two are combined:
wrapping a value that is already reactive-context output in another rx
directive.

## `@rx-angular/template` is not a find-and-replace for native control flow

It's tempting to read "drop-in replacement" as "swap every `*ngIf` for
`*rxIf` and every `| async` for `| push`". That is not what the phrase means,
and doing it blindly can make a template slower and harder to reason about.

`*rxIf`, `*rxFor`, and `*rxLet` don't just re-implement `@if`/`@for`/`@let`
with an `Observable` input. Each one changes the rendering model of the view
it controls:

- It schedules its own change detection through the render strategies
  system (see [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)),
  instead of relying on the surrounding change-detection run.
- It creates a [reactive context](../../../concepts/E4-reactive-context.md)
  with `suspense`, `error`, and `complete` slots, whether or not the template
  uses them.

For a value that updates synchronously, rarely, or as part of a small,
cheap template, that machinery is pure overhead: an extra scheduler tick and
context bookkeeping for a binding native `@if`/`@for` would have handled in
the same change-detection pass. This is why the `@rx-angular/template`
[overview](../index.md) says to reach for native control flow first for the
plain cases.

## When to prefer native, when to reach for rx directives

| Situation | Prefer |
| --- | --- |
| Naming a value, a simple toggle, a small/static list | Native `@let` / `@if` / `@for` |
| Synchronous or already-derived signal/value with no need for loading/error UI | Native control flow |
| Large or frequently-changing list, expensive item templates | `*rxFor` / `*rxVirtualFor` |
| You need `suspense`/`error`/`complete` template slots without hand-written boilerplate | `*rxLet` / `*rxIf` |
| The update should be scheduled concurrently instead of blocking the current frame | `*rxLet` / `*rxIf` / `*rxFor` with a concurrent `strategy` |

Combining both in one template is normal and expected: use an rx directive at
the point where an `Observable`/`Signal` enters the template and needs
scheduling or reactive context, and native control flow for everything
downstream of that point that doesn't need those things on its own.

## Gotcha: don't re-wrap a value an rx directive already unwrapped

`*rxLet`, `*rxIf`, and `*rxFor` each unwrap their source and hand you a plain
value (or a `Signal`) through their template variables (`let`,
`$implicit`/`let-item`). That value is no longer an `Observable` you need to
subscribe to again, and it's already covered by that directive's scheduling.

Nesting **another** rx directive or an `| async`/`| push` pipe on that same
derived value doesn't add correctness — it adds a second, independent
scheduler that re-does work the outer directive already did. Bind the plain
value with native `@if`/interpolation in the nested template instead.

```html
<!-- Avoid: rxIf re-schedules a value rxLet already unwrapped and scheduled -->
<ng-container *rxLet="hidden$; let hidden">
  <div *rxIf="!hidden">content</div>
</ng-container>

<!-- Prefer: hidden is a plain value now, native @if is enough -->
<ng-container *rxLet="hidden$; let hidden">
  @if (!hidden) {
    <div>content</div>
  }
</ng-container>
```

The same applies when nesting `*rxFor` inside `*rxLet`: don't wrap the items
`*rxFor` already renders in another reactive directive.

```html
<!-- Avoid: nested rxLet re-wraps a value already produced by rxFor's context -->
<ng-container *rxLet="items$; let items">
  @for (item of items; track item.id) {
    <ng-container *rxLet="item; let current">
      <app-item [item]="current" />
    </ng-container>
  }
</ng-container>

<!-- Prefer: rxFor already unwraps and schedules each item; bind it directly -->
<div *rxFor="let item of items$; trackBy: trackItem">
  <app-item [item]="item" />
</div>
```

The rule of thumb: once a value has passed through one rx directive's
reactive context, treat the rest of that template subtree as synchronous and
reach for native bindings — reserve the next rx directive for the next place
an `Observable`/`Signal` actually enters the template.

## Result

Your template uses `@rx-angular/template` directives only where they add
scheduling control or reactive context, falls back to native control flow
everywhere else, and never layers a second directive on a value an outer
directive already unwrapped. Verify by checking, for every `*rxIf`/`*rxLet`/
`*rxFor`/`| push` in a template, that its input is still an
`Observable`/`Signal` and not a value already produced by another rx
directive's context.

## See also

- Reference: [`rxLet`](../reference/rx-let.md), [`rxIf`](../reference/rx-if.md), [`rxFor`](../reference/rx-for.md)
- Concept: [The reactive context](../../../concepts/E4-reactive-context.md)
- Concept: [Concurrent scheduling & the frame budget](../../../concepts/E5-concurrent-scheduling.md)
- How-to: [Tune rendering with strategies](./tune-rendering-with-strategies.md)
