---
sidebar_position: 8
id: pass-observables-directly
title: 'Pass observables directly into child state'
diataxis_type: how-to
package: state
legacy_guard: 'zoneful OnPush perf'
sidebar_label: 'Pass observables directly'
tags: [state, guides]
concepts: [E2, E3]
---

import LegacyGuard from '@site/src/components/LegacyGuard';

# Pass observables directly into child state

<LegacyGuard audience="zoneful OnPush perf" native="under zoneless change detection with signal inputs (default since Angular v21), a value flowing through a parent's async pipe no longer costs an extra change-detection pass">

This page documents a **zone-era OnPush performance technique**: passing an
`Observable` into a child component and `connect`-ing it, instead of unwrapping it in
the parent with `async` and passing the value. The saving it targets, one change
detection per emission, is **nil under zoneless change detection with
signal inputs**, because rendering is driven by signal reads, not by a zone tick on
every emission. See [Zoneless & how Zone.js affected change
detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md) for why.

</LegacyGuard>

## Goal / when to use

You have a stream of data in a parent and want a child component to own it as state.
This recipe compares two zone-era shapes, passing the **value** (via `async`) vs.
passing the **observable**, and shows the modern replacement.

**On the modern baseline, prefer the modern path below.** The observable-passing trick
is only relevant to apps still running Zone.js with OnPush that are chasing per-emission
change-detection cost.

## Modern path (recommended)

Use a signal `input()` and derive with `computed()` / `toSignal()`. No manual
`connect`, no async pipe, no per-emission change-detection concern.

```ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-user-list',
  template: `
    @for (user of users(); track user.id) {
      <div>{{ user.name }}</div>
    }
  `,
})
export class UserListComponent {
  // parent binds: <app-user-list [users]="users()" />
  readonly users = input.required<User[]>();
}
```

If the parent holds the data as an `Observable`, convert it once at the edge with
`toSignal()` and pass the signal's value down; the child stays a plain signal-input
component. For shared, async-heavy state, model it with
[`rxState`](../reference/rx-state-functional.md) in a service rather than threading
observables through `@Input`. See [Reactive state: global vs local, RxState +
signals](../../../concepts/E3-reactive-state-global-vs-local.md).

## Legacy path: passing the value (zoneful OnPush)

Here the parent unwraps the stream with `async` and passes the **value**. Every
emission triggers change detection in the parent, then again in the child.

```ts
import { Component, Input, inject } from '@angular/core';
import { rxState } from '@rx-angular/state';

@Component({
  selector: 'parent',
  template: `<user-list [users]="users$ | async"></user-list>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentComponent {
  private readonly userService = inject(UserService);
  readonly users$ = this.userService.users$;
}

@Component({
  selector: 'user-list',
  template: `
    @if (users$ | async; as users) {
      @for (user of users; track user.id) {
        <div>{{ user.name }}</div>
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  private readonly state = rxState<{ users: User[] }>();
  readonly users$ = this.state.select('users');

  @Input()
  set users(users: User[]) {
    this.state.set({ users });
  }
}
```

## Legacy path: passing the observable (zoneful OnPush)

This variant passes the `Observable` itself and `connect`s it inside the child. In a
zoneful OnPush app, the parent renders only once instead of on every emission, saving
one change-detection pass per emission.

```ts
import { Component, Input, inject } from '@angular/core';
import { rxState } from '@rx-angular/state';
import { Observable } from 'rxjs';

@Component({
  selector: 'parent',
  template: `<user-list [users$]="users$"></user-list>`,
})
export class ParentComponent {
  private readonly userService = inject(UserService);
  readonly users$ = this.userService.users$;
}

@Component({
  selector: 'user-list',
  template: `
    @if (users$ | async; as users) {
      @for (user of users; track user.id) {
        <div>{{ user.name }}</div>
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  private readonly state = rxState<{ users: User[] }>();
  readonly users$ = this.state.select('users');

  @Input()
  set users$(source: Observable<User[]>) {
    this.state.connect('users', source);
  }
}
```

:::caution Passing an observable as input has a sharp edge
If the parent swaps in a **new** observable reference, the original is still connected
to the child's state and its emissions keep mutating the view. Only pass observables
as inputs when the reference does not change.
:::

## Result

The value renders in the child either way. Under zoneless + signal inputs the two
legacy shapes converge: there is no extra change-detection pass to save, so the
modern signal-input path is both simpler and equivalent in cost.

## See also

- Reference: [`rxState`](../reference/rx-state-functional.md) · [`select`](../reference/select.md)
- Concept: [Zoneless & how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md)
- Concept: [Reactive state: global vs local, RxState + signals](../../../concepts/E3-reactive-state-global-vs-local.md)
