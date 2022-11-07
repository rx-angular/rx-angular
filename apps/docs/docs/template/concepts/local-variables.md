---
sidebar_label: 'Local variables'
sidebar_position: 2
title: 'Local variables'
hide_title: true
---

# Local variables

Angular provides a way to bind values to the template.
For example this can be done on 2 ways, the 'as syntax' `num$ | async as num` and the 'let syntax' `*rxLet="num$; let num"`.

Both ways can reduce the usage of pipes the `async` pipe (or any other pipe).

**With `async` pipe**

```html
<ng-container> {{ n | async }} {{ n | async}} {{ n | async}} </ng-container>
```

**With `*rxLet` directive**

```html
<ng-container *rxLet="num$; let n;"> {{ n }} {{ n }} {{ n }} </ng-container>
```

With directive's we can now provide custom values to the consumer.
Angular does this in e.g. the `*ngFor` directive with local variables like `even` or `odd`.

```
<ng-container *ngFor="let item in list; let e = even">
    even: {{ e }}
<ng-container/>
```
