# Setup a reactive state, its selections and the related UI interactions

In this section we start with an imperative code base and will refactor
its state management to a reactive setup.
This step will include the components input bindings, child component output as well as global state.

We will ensure automated subscription handling, imperative interaction
over input bindings and a clean separation of responsibilities.

[Full source code available here](https://github.com/BioPhoton/rx-angular/tree/master/apps/state-demo/src/app/examples/demo-basics)

---

## Implement RxState Service

Let's start with introducing a reactive state to our component by extending the RxState class.
This can be done over inheritance, we extend form the state service, or composition, we inject the service in the constructor and add the service to the component `providers` section.

In this article we simply extend from the service.
The benefit here is we can access the services API directly over `this`. e.g. `this.select('prop')`.

To do so, we have to extend our class and use the already existing `ComponentState` interface:

```typescript
import { RxState } from '@rx-angular/state';

// Displayed shape of the list item (this is a reduced version of the server object)
export interface DemoBasicsItem {
  id: string;
  name: string;
}

interface ComponentState {
  refreshInterval: number;
  list: DemoBasicsItem[];
  listExpanded: boolean;
}

export class DemoBasicsComponent2 extends RxState<ComponentState> {
```

Also, a `super` in the constructor is needed as we extend from another class.

```typescript
constructor(...) {
  super();
}
```

---

## Select and display state

Lets setup a component property `model$` which holds all data we wish to display in the template.

By assigning the `model$` to the `$` property of the `RxState` class we get the full state object as `Observable<ComponentState>`

```typescript

@Component({
  selector: 'demo-basics-1',
  template: `
    model$: <pre>{{model$ | async | json}}</pre>
    <h3>Demo Basic 1 - Setup and Retrieving State</h3>
    ...
  `,
  ...
})
export class DemoBasicsComponent2 extends RxState<ComponentState> {
  model$ = this.select();
}
```

---

## Initialize component state

As `RxState` is empty and thus lazy on initialization, we can decide which and if we put values to state initially.
We can initialize the state imperatively over `set` or over a observable and the `connect()` method.

We will use `set` as we already have initial values as `initComponentState` object.

```typescript
 constructor(...) {
  ...
  this.set(initComponentState);
}
```

---

We should see the initial state in the template.

## Setup Input bindings

As parts of our state get passed as input bindings we need to insert these changes into the components' state.
The problem with setting values in an imperative way is that it's not composable.
Thats why in this case we have to hook into the imperative callback of the `refreshInterval` component input binding.

We run a partial update to our state by providing an object containing the new state slice `{refreshInterval: number}`.
This can be done by using a reduce function `(oldState) => ({refreshInterval: oldState.refreshInterval + 2})` or just the slice itself `{refreshInterval: 2}`.
As no previous state is needed to calculate the new value we provide the slice itself for the partial update.

Notice `{refreshInterval}` is the short form of `{refreshInterval: refreshInterval}`.

```typescript
 @Input()
set refreshInterval(refreshInterval: number) {
    if (refreshInterval > 100) {
        this.set({refreshInterval});
        this.resetRefreshInterval();
    }
}
```

We also have to adopt the related method `resetRefreshTick` where `_refreshInterval`is used.
As `refreshInterval` already is part of the components' state,
we can easily select the value with `this.select('refreshInterval')` and use the `interval` operator to create the new interval.

```typescript
import {..., switchMap} from 'rxjs/operators';
...

resetRefreshTick() {
    this.intervalSubscription.unsubscribe();
    this.intervalSubscription = this.select('refreshInterval')
         .pipe(
           switchMap(ms => interval(ms)),
           tap(_ => this.store.dispatch(fetchRepositoryList({}))))
      .subscribe();
}
```

If we edit the parents input box we should see the changes in the components logged state in the template.

---

## Bind the state to the view

In this example we will use a very simple method and directly bind the complete component state to the view.
Further performance improvements can be done later.

To bind the state we can use a simple trick with the structural directive `*ngIf`, the `as` syntax and the `async` pipe.

```html
<ng-container *ngIf="model$ | async as vm"> </ng-container>
```

`vm` is a short form for view model.

The implementation in our expand-panel looks like this:

```html
<mat-expansion-panel *ngIf="model$ | async as vm"> </mat-expansion-panel>
```

now we can replace the `_refreshInterval` in the template with `vm.refreshInterval`.

```html
<span>
  (storeList$ | async)?.length }} Repositories Updated every: {{
  vm.refreshInterval }} ms
</span>
```

---

## React to state changes from child components

In this example we use an expand-panel to display the list.
We identify its' open and close state as part of the components' state.  
We also have to forward the changes to the components `listExpandedChange` output binding.

As connecting Observables to the state is a very essential part, there is a method on the service, that deals with this specific case.

The method gets called `connect` and is able to assign values from an Observable in 3 different ways to the component state.

One way of using it is passing an Observable of type `Partial<ComponentState>` to the `connect` method directly.

We already have a subject for the user interaction with the open/closed state called `listExpandedChanges`.
It next the new state whenever we click the expand-panel.

What we need to do now is to transform the `boolean` value to fit `Partial<ComponentState>`.
Here we can use the `map` operator to achieve the transformation and pass following projection function `listExpanded => ({ listExpanded})`

```typescript
import { map } from `rxjs`;
// ...
constructor() {
  // ...
  this.connect(this.listExpandedChanges.pipe(map(listExpanded => ({ listExpanded}))));
}
```

Now lets refactor the state binding to the expand-panel.

```html
<mat-expansion-panel
  *ngIf="model$ | async as vm"
  (expandedChange)="listExpandedChanges.next($event)"
  [expanded]="vm.listExpanded"
></mat-expansion-panel>
```

If we open and close the expand-panel we should see the change reflected in the state.

---

## Setup Output bindings

Next lets replace the logic for the output binding of the component.

As the open/closed state is already reflected in the components' state, we can directly derive changes from them.

As we are only interested in changes of the slice `listExpanded` we can use the `distinctUntilKeyChanged` operator
to get the changes.

Lets refactor to following and delete the `listExpanded` property int he class and template.

```typescript
  @Output()
  listExpandedChange = this.$.pipe(distinctUntilKeyChanged('listExpanded'));
```

---

## Connect Global state to the `list` slice.

In components, we often need to transform global state into local state. Most often you also need to map the global object into a new shape that fits the view. That state gets provided as `Observable`
In the current implementation we use ta method called `parseListItems` to achieve that.

We already used the `connect` method to connect child component state.
Now lets use another overload of it to connect the global state.

The used overload takes the property as first value to determine the
target slice on which we want to connect the global state to. In our case is the `list` slice.

```typescript
// ...
constructor(private listService: ListService) {
  // ...
  this.connect(
    'list',
    this.listService.list$.pipe(map(this.parseListItems))
  );
}
```

Now we can delete the `storeList$` property in our class and refactore the template to this:

```html
...
<mat-panel-description>
  <span
    >{{ vm.list.length }} Repositories Updated every: {{ vm.refreshInterval }}
    ms
  </span>
</mat-panel-description>
...

<div *ngIf="vm.list?.length; else noList">
  <mat-list>
    <mat-list-item *ngFor="let item of list">
      {{ item.name }}
    </mat-list-item>
  </mat-list>
</div>
```

With this step we refactored the state management from an imperative to a reactive implementation.

The benefits here are we have our state centralized, reactive and can also include
imperative parts of the components like input bindings to the state.

## Handling Side Effects reactively

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

### Examples

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

### Application

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
  map(s => s.refreshInterval),
  switchMap(ms => timer(0, ms))
);
```

If we think about it, both, the button click, and the interval are trigger for the same side-effect.
Furthermore, their emitted value is irrelevant for the side-effect and only serves as a trigger to exectue it.

This means we could simply merge their outputs together.

```typescript
refreshListSideEffect$ = merge(
  this.refreshClicks,
  this.intervalRefreshTick$
).pipe(tap(_ => this.listService.refetchList()));
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
