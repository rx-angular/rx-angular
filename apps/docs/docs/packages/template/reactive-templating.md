---
id: reactive-templating
title: "Reactive templating: local templates and local variables"
diataxis_type: explanation
package: template
legacy_guard: false
sidebar_label: "Reactive templating"
tags: [template, content]
concepts: [E4]
---

# Reactive templating: local templates and local variables

`@rx-angular/template`'s directives grew out of two small template patterns:
*local templates* and *local variables*. Modern Angular now expresses the basic
form of both with native control flow, so this page explains the ideas and shows
where native syntax already covers them and where the reactive directives still
add value.

## Local templates

A *local template* is a named template slot a structural directive can render in
place of its main content. The classic example is the `else` slot of the old
`*ngIf`:

```html
<!-- old: named else template -->
<div *ngIf="isTrue; else elseTpl">Visible if true</div>
<ng-template #elseTpl>Visible if false</ng-template>
```

Native `@if`/`@else` expresses this directly, no named `<ng-template>` needed:

```html
@if (isTrue) {
  <div>Visible if true</div>
} @else {
  Visible if false
}
```

The reactive directives extend the same idea to *reactive* template slots keyed
off a source's state: a `*rxIf` or `*rxLet` can render distinct templates for
the loading, error, and complete phases of an `Observable`. That is the reactive
context, which native `@if` has no equivalent for.

## Local variables

A *local variable* binds a value into the template so you can name it once and
reuse it, instead of repeating a pipe. The old patterns used the `async`-`as`
form or the `*rxLet` `let` syntax:

```html
<!-- old: async pipe bound once via *ngIf ... as -->
<ng-container *ngIf="num$ | async as n"> {{ n }} {{ n }} {{ n }} </ng-container>

<!-- old: *rxLet let syntax -->
<ng-container *rxLet="num$; let n"> {{ n }} {{ n }} {{ n }} </ng-container>
```

Native `@let` names a value for reuse and covers the basic case directly:

```html
@let n = num$ | async;
<ng-container> {{ n }} {{ n }} {{ n }} </ng-container>
```

Structural directives also expose their own contextual variables. The old
`*ngFor` published `even`, `odd`, `index`, and friends:

```html
<!-- old: *ngFor context variables -->
<ng-container *ngFor="let item of list; let e = even">
  even: {{ e }}
</ng-container>
```

Native `@for` exposes the same contextual variables directly:

```html
@for (item of list; track item.id; let e = $even) {
  even: {{ e }}
}
```

## When native control flow is enough

For a plain value binding, a plain toggle, or a plain list, native `@let`, `@if`,
and `@for` cover these local-template and local-variable cases; prefer them
first. `*rxLet`, `*rxIf`, and `*rxFor` remain useful when you want more than the
name or the toggle: a **reactive context** (suspense/error/complete template
slots driven from a source) and **per-directive render scheduling**.

## See also

- Concept: [The reactive context](../../concepts/E4-reactive-context.md)
