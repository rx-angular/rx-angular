## 🧪 UnpatchDirective

The `unpatch` directive helps developers to partially deactivate `NgZone`, as well as getting rid
of unnecessary renderings through zones `addEventListener` patches.
It can be used on any element you apply to event bindings.

The current way of binding events to DOM:

```html
<div (mousemove)="doStuff($event)">Hover me</div>
<!-- every mousemove will automatically schedule a re-render for you -->
```

The problem is that every event registered via `()`, e.g. `(mousemove)` (or custom `@Output()`)
marks the component and all its ancestors as dirty and re-renders the whole component tree. [read more about this here](https://github.com/rx-angular/rx-angular/tree/main/libs/template/docs/performance-issues.md)

So even if your eventListener is not related to any change at all, your app will re-render the whole component tree.
This can lead to very bad user experiences, especially if you work with frequently fired events such as `mousemove`.

The `unpatch` directive solves this problem in a convenient way:

```html
<button [unpatch] (click)="triggerSomeMethod($event)">click me</button>
<button
  [unpatch]="['mousemove']"
  (mousemove)="doStuff2($event)"
  (click)="doStuff($event)"
>
  click or hover me
</button>
```

> **Warning**: Do not use `[unpatch]` on elements that should trigger navigation (with `routerLink` directly or with method bound to `(click)` or other events). Otherwise you will end up having a 'Navigation triggered outside Angular zone, did you forget to call "ngZone.run()"?' warning.

Included Features:

- by default un-patch all registered listeners of the host it is applied on
- un-patch only a specified set of registered event listeners
- works zone independent (it directly checks the widow for patched APIs and un-patches them without the use of `runOutsideZone` which brings more performance)
- Not interfering with any logic executed by the registered callback

## Current list of unpatched events

```typescript
export const zonePatchedEvents = [
  'scroll',
  'mousedown',
  'mouseenter',
  'mouseleave',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'load',
  'pointerup',
  'change',
  'blur',
  'focus',
  'click',
  'contextmenu',
  'drag',
  'dragend',
  'dragenter',
  'dragleave',
  'dragover',
  'dragstart',
  'drop',
  'input',
];
```

_more coming soon_:

- `EventEmitter` -> custom `@Output()`
- `(@animationTrigger.start)` & `(@animationTrigger.done)`
- ...
