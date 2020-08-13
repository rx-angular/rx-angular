# Handling Side Effects reactively

This section is targeting the concept of side effects, and it's reactive handling.

Let's first quickly define two terms, "side effect" & "pure function".

**Pure function:**
A function is called pure if:
Its return value is the same for the same arguments e.g. `function add(a, b) { return a + b}`.
Its executed internal logic has no side effects

**Side Effect:**
A function has a "side-effect" if:

- Mutation of local static variables are done e.g. `this.prop = value`
- non-local variables are used

## Examples

```typescript
let state = true;
sideEffectFn();

function sideEffectFn() {
  state = true;
}
```

- mutable reference arguments get passed

```typescript
let state = { isVisible: false };
let newState = sideEffectFn(state);

function sideEffectFn(oldState) {
  oldState.isVisible = true;
  return oldState;
}
```

- I/O is changed

```typescript
let state = { isVisible: false };
sideEffectFn(state);

function sideEffectFn(state) {
  console.log(state);
  // or
  this.render(state);
}
```

As a good rule of thumb, you can consider every function without a return value as side-effect

A side-effect has 2 important parts:

- the trigger
- the side-effecting logic

In the above examples the trigger was the method call itself, but we can also set an emitted value form an `Observable` as trigger.
This side-effect logic is a render call or any other logic executed by the trigger.

## Application

With this in mind let's take a look at the component logic and see if we can identify a side effect:

In the `ngOnInit` we initialize a background process over `resetRefreshTick`.

```typescript
  ngOnInit(): void {
    this.resetRefreshTick();
  }
```

The interval also gets reset whenever the input binding for `refreshInterval` changes.

```typescript
   @Input()
    set refreshInterval(refreshInterval: number) {
      if (refreshInterval > 100) {
        this.set({ refreshInterval });
        this.resetRefreshTick()
      }
    }
```

Another side-effect is contained in the `onRefreshClicks` callback. Here we dispatch an action to the global store.

```typescript
  onRefreshClicks(event) {
    this.listService.refetchList();
  }
```

Lets refactore those and handle them in a clean and reactiv way.

### Refactor to a reactive UI

As RxJS is providing us a very powerful way of composing the emitted events we will refactor oue UI interaction the streams.

UI interaction in general can come from buttons, inputs, forms, scroll or resize events etc.

In our case we have the refresh button as UI interaction. To get its interaction as `Observable` we create a `Subject` in the component class and fire its `next` method on every button click.

```html
<button mat-raised-button color="primary" (click)="refreshClicks.next($event)">
  Refresh List
</button>
```

```typescript
export class DemoBasicsComponent2 extends RxState<ComponentState>
  implements OnInit, OnDestroy {
  refreshClicks = new Subject<Event>();
  //...
}
```

### Setup the store side-effect

In out class we create a new property called `refreshListSideEffect$` and assing the newly created click Observable to is.

```typescript
refreshListSideEffect$ = this.refreshClick$;
```

This is the trigger for our side-effect.

From the `resetRefreshTick` method we now move the logic that starts the tick and place it in the `pipe` method of `this.refreshClick$`.

```typescript
refreshListSideEffect$ = this.refreshClick$.pipe(
  tap(() => this.listService.refetchList())
);
```

### `hold` the side-effect

`hold` as the name implies "holds" something. It holds a subscription to a side effect and takes care of its initialisation.
Furthermore, it automatically handles the subscription management and unsubscribes if the component gets destroyed.

```typescript
constructor(...) {
  this.hold(refreshListSideEffect$);
}
```

This should dispatch an action on every button click.

### Refactor background process side-effect

The other side-effect in this component is the background process that dispatches the refresh action in an interval defined over the `refreshInterval` input binding.

If we take a look at the current implementation of `resetRefreshTick` we see 2 pieces.

One piece that is responsible of deriving an interval from the current `refreshInterval` value in milliseconds.
And the other piece that fires the actual side-effect.

Lets first refactor the trigger `this.select('refreshInterval').pipe(switchMap(ms => timer(0, ms)))` to a separate class property ``

```typescript
intervalRefreshTick$ = this.select(
  map((s) => s.refreshInterval),
  switchMap((ms) => timer(0, ms))
);
```

If we think about it, both, the button click, and the interval are trigger for the same side-effect.
Furthermore, their emitted value is irrelevant for the side-effect and only serves as a trigger to exectue it.

This means we could simply merge their outputs together.

```typescript
refreshListSideEffect$ = merge(
  this.refreshClicks,
  this.intervalRefreshTick$
).pipe(tap((_) => this.listService.refetchList()));
```

As a last step we could use another overload of the `hold` method to get better readability of the code.

The second overload of the `hold` method takes a trigger Observable and a separate function that is executed whenever the trigger fires.
It looks like that `hold(o$: Obsserable<T>, sideEffect: (v: T) => void)`

In our coustructor we can use it as following:

```typescript
constructor(...) {
  // ...
  this.hold(refreshListSideEffect$, () => this.listService.refetchList());
}
```

Now it's time to reap the benefits!

Let's delete code.

In the example we can get rid of the following snippets:

```typescript
  implements OnInit, OnDestroy
  // ..
  intervalSubscription = new Subscription();
  // ...
  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }
  // ...
  ngOnInit(): void {
    this.resetRefreshTick();
  }
  // ...
  resetRefreshTick() {
    this.intervalSubscription.unsubscribe();
    this.intervalSubscription = this.select('refreshInterval')
      .pipe(
        switchMap(ms => interval(ms)),
        tap(_ => this.listService.refetchList())
      )
      .subscribe();
  }
  // ...
  onRefreshClicks(event) {
    this.listService.refetchList();
  }
  // ...
}
```

We can say without any doubt we did an excellent job.
Side-effect's are nor organized in a structured and readable way and the subscription handling gets done automatically by the state layer.
Furthermore, we could get rid of all implemented lifecycles as well as the callback function for the button cick.

All in all an amazing job!
