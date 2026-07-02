---
id: notifications
title: "@rx-angular/cdk/notifications"
diataxis_type: reference
package: cdk
legacy_guard: false
sidebar_label: "Notifications"
tags: [cdk, api-reference]
concepts: [E4]
---

# @rx-angular/cdk/notifications

`@rx-angular/cdk/notifications` models the full **reactive context** of an async source
as a stream: `rxMaterialize` turns an `Observable<T>` into an
`Observable<RxNotification<T>>`, where every emission carries the current phase
(`suspense`, `next`, `error`, or `complete`) alongside the value.

This is the capability with no native equivalent: native `@if` / `@switch` / `@defer`
plus signals can branch on the phases of a source you already hold, but they cannot
**produce a first-class stream** of those phases for you to pipe, transform, and share.
That materialized stream is what powers RxAngular's reactive-context directives.

For the mental model behind these types, see the concept
[The reactive context](../../../concepts/E4-reactive-context.md); this page also
contributes to it.

## Import

```ts
import {
  RxNotification,
  RxNotificationKind,
  toRxErrorNotification,
  toRxSuspenseNotification,
  toRxCompleteNotification,
  rxMaterialize,
} from '@rx-angular/cdk/notifications';
```

---

## `RxNotificationKind`

A `const enum` naming the four phases of the reactive context:

```ts
const enum RxNotificationKind {
  Suspense = 'suspense',
  Next = 'next',
  Error = 'error',
  Complete = 'complete',
}
```

The string values map directly to the default template names (`suspense`, `next`,
`error`, `complete`) used by the template-package directives.

---

## `RxNotification<T>`

A discriminated union over `kind`:

```ts
type RxNotification<T> =
  | RxNextNotification<T>
  | RxSuspenseNotification<T>
  | RxErrorNotification<T>
  | RxCompleteNotification<T>;
```

Every member carries:

| Field | Type | Description |
| --- | --- | --- |
| `value` | `T` | The current value (may be the last-known value on non-`next` phases). |
| `kind` | `RxNotificationKind` | The phase discriminant. |
| `error` | per member (see below) | The error on the `error` phase; `false` otherwise. `RxNextNotification`: `boolean`; `RxSuspenseNotification`: `false`; `RxErrorNotification`: `any`; `RxCompleteNotification`: `false`. |
| `complete` | `boolean` | `true` on the `complete` phase. |
| `hasValue` | `boolean` | **@deprecated**; check `kind === RxNotificationKind.Next` instead. |

The individual interfaces are `RxNextNotification<T>`, `RxSuspenseNotification<T>`,
`RxErrorNotification<T>`, and `RxCompleteNotification<T>`.

---

## `rxMaterialize`

```ts
function rxMaterialize<T>(): OperatorFunction<T, RxNotification<T>>;
```

Materializes a source into a stream of `RxNotification`. Built on RxJS `materialize()`,
it maps RxJS notification kinds (`N`/`E`/`C`) to `RxNotificationKind` names and logs any
error (it does not swallow it).

**Returns:** an `OperatorFunction<T, RxNotification<T>>`.

```ts
import { interval, Observable } from 'rxjs';
import { rxMaterialize } from '@rx-angular/cdk/notifications';
import { RxNotification } from '@rx-angular/cdk/notifications';

const updates$: Observable<number> = interval(3000);
const materialized$: Observable<RxNotification<number>> = updates$.pipe(rxMaterialize());
```

Because the phases are now values in a stream, a template can branch on them with native
control flow:

```ts
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { rxMaterialize } from '@rx-angular/cdk/notifications';

@Component({
  selector: 'app-updates',
  template: `
    @if (state(); as n) {
      @switch (n.kind) {
        @case ('suspense') { <p>Loading…</p> }
        @case ('next') { <p>Value: {{ n.value }}</p> }
        @case ('error') { <p>Error!</p> }
        @case ('complete') { <p>Complete!</p> }
      }
    }
  `,
})
export class UpdatesComponent {
  private readonly updates$ = interval(3000).pipe(rxMaterialize());
  readonly state = toSignal(this.updates$);
}
```

---

## `toRxErrorNotification`

```ts
function toRxErrorNotification<T>(error?: any, value?: T): RxErrorNotification<T>;
```

Builds an `error`-phase notification. `error` defaults to `true` when omitted.

## `toRxSuspenseNotification`

```ts
function toRxSuspenseNotification<T>(value?: T): RxSuspenseNotification<T>;
```

Builds a `suspense`-phase notification, the extra phase RxAngular adds beyond RxJS's
`next`/`error`/`complete` to represent "in progress, nothing yet."

## `toRxCompleteNotification`

```ts
function toRxCompleteNotification<T>(value?: T): RxCompleteNotification<T>;
```

Builds a `complete`-phase notification.

---

## See also

- Concept: [The reactive context](../../../concepts/E4-reactive-context.md)
