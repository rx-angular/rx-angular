---
id: unpatch
title: "RxUnpatch"
diataxis_type: reference
package: template
legacy_guard: "Zone.js only"
sidebar_label: "RxUnpatch (legacy)"
tags: [template, api-reference, migration]
---

import LegacyGuard from '@site/src/components/LegacyGuard';

# RxUnpatch

<LegacyGuard audience="Zone.js only">

`RxUnpatch` re-registers DOM event listeners through the zone-*un*patched
`addEventListener`, so that high-frequency events do not mark the component tree
dirty on every fire. Under **zoneless** change detection the directive is a
**no-op**: there is no Zone.js patching to opt out of, so event listeners
already never trigger change detection by themselves. It is useful only for apps
still running Zone.js.

</LegacyGuard>

## Residual unique value: suppress Zone.js re-renders from noisy events

Under Zone.js, every listener bound with `()` (for example `(mousemove)`) is
patched so that firing it marks the component and all its ancestors dirty and
re-renders the tree, even when the handler changes nothing relevant. `RxUnpatch`
re-applies those listeners with the un-patched browser API, so the handler still
runs but no longer schedules change detection. Its whole job is scoped to
Zone.js; it does nothing when Zone.js is absent.

## Import

```typescript
import { RxUnpatch } from '@rx-angular/template/unpatch';
```

`RxUnpatch` is a standalone directive with the selector `[unpatch]`.

## Usage

```typescript
import { Component } from '@angular/core';
import { RxUnpatch } from '@rx-angular/template/unpatch';

@Component({
  selector: 'app-buttons',
  imports: [RxUnpatch],
  template: `
    <button [unpatch] (click)="triggerSomeMethod($event)">click me</button>
    <button
      [unpatch]="['mousemove']"
      (mousemove)="doStuff2($event)"
      (click)="doStuff($event)"
    >
      click or hover me
    </button>
  `,
})
export class ButtonsComponent {
  /* … */
}
```

With no value, `[unpatch]` un-patches all zone-patched events on the host. Pass a
`string[]` to un-patch only the named events.

## Inputs

| Input | Alias | Type | Default | Description |
| ----- | ----- | ---- | ------- | ----------- |
| `events` | `[unpatch]` | `string[] \| undefined` | all zone-patched events | The events to un-patch on the host. When empty/undefined, every zone-patched event is un-patched. |

## Default un-patched events

When no explicit list is given, the directive un-patches its built-in
`zonePatchedEvents` set. This set is composed from the `focus`, `mouse`, `wheel`,
`input`, `keyboard`, and `touch`/pointer event arrays exported by
`@rx-angular/cdk/zone-configurations`:

```typescript
// focusEvents + mouseEvents + wheelEvents + inputEvents + keyboardEvents + touchEvents
[
  // focus
  'blur', 'focus', 'focusin', 'focusout',
  // mouse
  'mousedown', 'dblclick', 'mouseenter', 'mouseleave', 'mousemove',
  'mouseout', 'mouseover', 'mouseup', 'click',
  // wheel
  'wheel', 'mousewheel',
  // input
  'input', 'invalid', 'change', 'reset', 'select', 'submit',
  // keyboard
  'keydown', 'keypress', 'keyup',
  // touch / pointer / drag
  'pointerover', 'pointerenter', 'pointerdown', 'pointermove', 'pointerup',
  'pointercancel', 'pointerout', 'pointerleave', 'gotpointercapture',
  'lostpointercapture', 'touchstart', 'touchend', 'touchmove', 'touchcancel',
  'drag', 'dragend', 'dragexit', 'dragenter', 'dragleave', 'dragover',
  'dragstart', 'drop',
];
```

:::note

Under zoneless change detection this directive returns early and does nothing.
It only has an effect in Zone.js applications.

:::

:::warning Do not use `[unpatch]` on

1. Elements that trigger navigation (a `routerLink`, or a method bound to
   `(click)` or another event). You would otherwise see a *"Navigation triggered
   outside Angular zone…"* warning.
2. Elements bound to a `FormControl`. Un-patching `blur`/`change` there stops
   `valueChanges` from emitting and validators from running until the next
   change detection.

:::

## See also

- Concept (legacy context): [Zoneless & how Zone.js affected change detection](../../../concepts/E2-zoneless-and-zonejs-change-detection.md)
