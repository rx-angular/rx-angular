---
sidebar_label: 'RxUnpatch'
sidebar_position: 4
title: 'RxUnpatch'
---

# RxUnpatch

The `unpatch` directive helps developers to partially deactivate `NgZone`, as well as getting rid
of unnecessary renderings through zones `addEventListener` patches.
It can be used on any element you apply to event bindings.

The current way of binding events to DOM:

```html
<div (mousemove)="doStuff($event)">Hover me</div>
<!-- every mousemove will automatically schedule a re-render for you -->
```

The problem is that every event registered via `()`, e.g. `(mousemove)` (or custom `@Output()`)
marks the component and all its ancestors as dirty and re-renders the whole component tree. [Read more about this here](../performance-issues/rendering-issues-in-angular.md)

So even if your eventListener is not related to any change at all, your app will re-render the whole component tree.
This can lead to very bad user experiences, especially if you work with frequently fired events such as `mousemove`.

The `unpatch` directive solves this problem in a convenient way:

```html
<button [unpatch] (click)="triggerSomeMethod($event)">click me</button> <button [unpatch]="['mousemove']" (mousemove)="doStuff2($event)" (click)="doStuff($event)">click or hover me</button>
```

> **Warning**: Do not use `[unpatch]` on the following elements:
>
> 1. Elements that should trigger navigation (with `routerLink` directly or with method bound to `(click)` or other events). Otherwise you will end up having a 'Navigation triggered outside Angular zone, did you forget to call "ngZone.run()"?' warning.
> 2. Elements that reference a `FormControl`. Specify all events except the `blur` and `change` events. Otherwise user input is ignored, the `FormControl.valueChanges` observable will not emit and attached validations to the FormControl will not run until next change detection that affects the component in which the element is rendered.

Included Features:

- by default un-patch all registered listeners of the host it is applied on
- un-patch only a specified set of registered event listeners
- works zone independent (it directly checks the window for patched APIs and un-patches them without the use of `runOutsideZone` which brings more performance)
- Not interfering with any logic executed by the registered callback

## Current list of unpatched events

```typescript
export const zonePatchedEvents = ['scroll', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseout', 'mouseover', 'mouseup', 'load', 'pointerup', 'change', 'blur', 'focus', 'click', 'contextmenu', 'drag', 'dragend', 'dragenter', 'dragleave', 'dragover', 'dragstart', 'drop', 'input'];
```

_more coming soon_:

- `EventEmitter` -> custom `@Output()`
- `(@animationTrigger.start)` & `(@animationTrigger.done)`
- ...
