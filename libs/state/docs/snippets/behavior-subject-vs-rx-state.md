# Migrating to RxState

Let's take a look at a simple checklist app, see how it can be implemented in an imperative way, and after that, we will iterate over it and add some reactiveness. We skip any additional logic such as routing, error handling etc., in these examples.

## Initial solution

**Interfaces**

The checklist interface:

```ts
interface Checklist {
  id: string;
  name: string;
  tasks: Task[];
}
```

The task interface:

```ts
export interface Task {
  id: string;
  name: string;
}
```

List is a nested smart component.

The component code:

```ts
export class ChecklistComponent implements OnInit, OnDestroy {
  @Input() id: string;

  checklist: Checklist;

  private destroy$ = new Subject();

  constructor(private api: TodoApiService) {}

  ngOnInit(): void {
    this.api
      .get(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((checklist) => {
        this.checklist = checklist;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  answerTask(id: string): void {
    this.api
      .answerTask(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.checklist.tasks = this.checklist.tasks.filter((t) => t.id !== id);
      });
  }
}
```

The template:

```html
<section class="checklist">
  <h1>
    <span>{{ checklist.name }}</span>
  </h1>
  <div>
    <article class="task" *ngFor="let task of checklist.tasks">
      <h2>{{ task.name }}</h2>
      <button class="answer-button" (click)="answerTask(task.id)">Done</button>
    </article>
  </div>
</section>
```

## Step 1. Basic solution using BehaviorSubject

The first pattern that many developers switching to reactive programming with Angular & RxJS will find is the so-called "Observable data service" (organization of state with `BehaviorSubject` as data storage).

This pattern is pretty flexible and can be applied to services and components. It can even serve as a lightweight alternative to NgRx, NGXS, Akita, and other state management solutions with some tuning.

_Another alternative can be `merge` + `scan` operators to combine multiple observables and accumulate their values into a single state observable._

**Let's create a state class that abstracts our BehaviorSubject and some basic operations we can do with it.**

**State class**

```ts
export class State<T = any> {
  data$: Observable<T>;

  private dataSource$: BehaviorSubject<T>;

  constructor(initialData: T) {
    this.dataSource$ = new BehaviorSubject(initialData);
    this.data$ = this.dataSource$.asObservable();
  }

  get snapshot(): T {
    return this.dataSource$.getValue();
  }

  select<K extends keyof T>(path: K): Observable<T[K]> {
    return this.data$.pipe(
      map((state) => state[path])
      // some additional logic
    );
  }

  patch(data: Partial<T>): void {
    this.dataSource$.next({ ...this.snapshot, ...data });
  }
}
```

- Data initialization happens inside the `constructor`. We are passing `initialData` of type `T`, and it is set to our `dataSource$`.
- `get snapshot()` returns the current value from the `dataSource$`.
- `select <K extends keyof T>(path: K): Observable<T[K]>` accepts key of `T` and returns value of type `T[K]` from `data$` as observable. Selection is done with `map` operator but `pluck` is also an option. We are skipping any additional filtering/sharing logic in this example.
- `patch(data: Partial<T>)` accepts data of `Partial<T>` and updates the current value of `dataSource$`.

**Now we can organize `List` component in a more reactive way:**

```ts
export class ChecklistComponent implements OnInit, OnDestroy {
  @Input() id: string;

  state = new State<Checklist>({
    id: null,
    name: null,
    tasks: null,
  });

  name$ = this.state.select('name');

  tasks$ = this.state.select('tasks');

  private destroy$ = new Subject();

  constructor(private api: TodoApiService) {}

  ngOnInit(): void {
    this.api
      .get(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((checklist) => this.state.patch(checklist));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  answerTask(id: string): void {
    this.api
      .answerTask(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const snapshot = this.state.snapshot;
        this.state.patch({
          tasks: snapshot.tasks.filter((t) => t.id !== id),
        });
      });
  }
}
```

**The template:**

```html
<section class="checklist">
  <h1>{{ name$ | async }}</h1>
  <div>
    <article class="task" *ngFor="let task of (tasks$ | async)">
      <h2>{{ task.name }}</h2>
      <button class="answer-button" (click)="answerTask(task.id)">Done</button>
    </article>
  </div>
</section>
```

What happens here:

- Component gets initialized. Constructor gets involved.
- Checklist id passed to the component through `@Input id: string`
- In `OnInit` lifecycle hook, we are getting our checklist by calling `get(id)` method from our API service, subscribe to results and updating our `state`.
- After that `name$` and `tasks$` getting data from state through `select()` method. (let's assume we placed some filtering logic in the `select()` method, so we haven't received initial empty values).
- Data is displayed in component template with `async` pipe. `<h1>{{name$ | async}}</h1>` and `<article class="task"*ngFor="let task of (tasks$ | async)">`
- User clicks on the `answer-button`. Method `answerTask(task.id)` is called.
- We subscribe to the `answerTask` method from our API service. Our API returns only the status code. So what we can do is just remove this task from UI. For this, we need to get existing tasks in some way. We are using `this.state.snapshot` for this purpose. We filter tasks to exclude answered task from an array and updating our state with `patch()` method.

**Looks reactive?**

The reading part is pretty reactive. With the `select()` method, we observe changes of state fields `name` and `tasks` and render them with an `async` pipe. So Angular will manage subscription for us. That's pretty cool.

But there are some issues with this approach.

- Solution is depending on lifecycle hooks of our component. We need to remember the order in which initialization happens `constructor` -> `ngOnChanges` (that's where input binding will be initialized) -> `ngOnInit` -> .... -> `ngOnDestroy`.
- Update (or write) part is still imperative. We need to call a method in our component, subscribe to some observable and inside subscription update our state with `patch()` method. We are breaking the reactive flow.
- We have multiple subscriptions in a pretty simple component. Subscription management should be done manually if we don't use external packages or create our solution.

## Step 2. A bit more reactive component.

**First, let's try to get rid of `OnInit` lifecycle hook.**

We need some **event** for initialization. Let's create a `Subject` for this.

```ts
init$ = new Subject<string>();
```

Now we need a place from which we can **trigger** this event. `@Input id: string` is where we get the checklist id that is needed for initialization. We are planning to remove `OnInit`, so there is no need to introduce `OnChanges` to our component. Let's make a setter!

```ts
@Input() set id(id: string) {
  this.init$.next(id);
}
```

Also, we need to write a logic for getting our checklist from API and storing a response:

```ts
initHandler$ = this.init$.pipe(
  switchMap((id) =>
    this.api.get(id).pipe(tap((checklist) => this.state.patch(checklist)))
  )
);
```

So far, so good. Inside `switchMap`, we are getting value passed to `init$` and switching to our API call. We
are going as reactive as possible here and don't want to have any logic inside subscription and placed it
inside `tap`.

Nice. Now we can get rid of `OnInit` and subscription inside of it.

**Let's handle tasks answering in the same manner and get rid of `answerTask()` method.**

Event

```ts
answer$ = new Subject<string>();
```

Trigger

```html
<button class="answer-button" (click)="answer$.next(task.id)">Done</button>
```

Answering logic

```ts
answerHandler$ = this.answer$.pipe(
  withLatestFrom(this.tasks$),
  switchMap(([id, tasks]) =>
    this.api
      .answerTask(id)
      .pipe(
        tap(() => this.state.patch({ tasks: tasks.filter((t) => t.id !== id) }))
      )
  )
);
```

Here we introduce an additional operator called `withLatestFrom`. This way we can get latest value from our `this.tasks$ = this.state.select('tasks')` in more reactive manner. `switchMap` will receive array of values. The first one will be `id` from `answer$` and the second one will be our tasks.

**Now we need to subscribe.**

Good fit is `constructor()`. Here we use `merge` to combine 2 observables and subscribe only once.
Unsubscribe will happen on component destruction as in the original example.

```ts
constructor(private api: TodoApiService) {
  merge(this.initHandler$, this.answerHandler$)
    .pipe(takeUntil(this.destroy$))
    .subscribe();
}
```

**The full component code:**

```ts
export class ChecklistComponent implements OnDestroy {
  @Input() set id(id: string) {
    this.init$.next(id);
  }

  state = new State<Checklist>({
    id: null,
    name: null,
    tasks: null,
  });

  // READS
  name$ = this.state.select('name');
  tasks$ = this.state.select('tasks');

  // EVENTS
  init$ = new Subject<string>();
  answer$ = new Subject<string>();

  initHandler$ = this.init$.pipe(
    switchMap((id) =>
      this.api.get(id).pipe(tap((checklist) => this.state.patch(checklist)))
    )
  );

  answerHandler$ = this.answer$.pipe(
    withLatestFrom(this.tasks$),
    switchMap(([id, tasks]) =>
      this.api
        .answerTask(id)
        .pipe(
          tap(() =>
            this.state.patch({ tasks: tasks.filter((t) => t.id !== id) })
          )
        )
    )
  );

  private destroy$ = new Subject();

  constructor(private api: TodoApiService) {
    merge(this.initHandler$, this.answerHandler$)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
```

**Summary:**

- Now we have a bit more code but component is more reactive.
- Component initialization is not depending on the `OnInit` lifecycle hook and will be a reaction to the `init$` event.
- We removed imperative `answerTask()` method.
- Now we have only one subscription to manage.
- We dont have any code inside subscription.

**However:**

- We still need to manage subscription.
- State updates are side effects of our API calls. We are using `tap` in our pipe to handle this and manually calling the `this.state.patch()` method in our component. It is still not reactive.

## Step 3. Fully reactive component.

Let's do another round and refactor the `List` component using `@rx-angular/state`. The core of it is operators `mergeAll()` that works with a stream of streams instead of single values and `scan()` that accumulates values from these streams into single state observable.

First step will be adding `RxState` service to our component.

```ts
@Component({
  ...
  providers: [RxState],
  ...
})
```

```ts
constructor(private api: TodoApiService, private state: RxState<IChecklist>)
```

RxState service is in component providers. That means that the lifecycle of this service will be nearly the same as the lifecycle of the component. And on component destruction, service will also be destroyed. We can now entirely remove our `State` class. Also, we can get rid of the `OnDestroy` lifecycle hook since we don't need to manage subscriptions manually anymore.

**Reading from state:**

```ts
name$ = this.state.select('name');
tasks$ = this.state.select('tasks');
```

Visually it looks the same but the select operator provides a lot more than just passing keys. You can read about it [here](https://github.com/rx-angular/rx-angular/blob/main/libs/state/docs/api/rx-state.md#select). Also selection will be shareReplayed, distincted and undefined values will be filtered out.

**Updating state reactively**

Since in this example our api calls are main producers of our state we can connect them to state
using `connect` method.

Let's start with initialization. Event `init$` and trigger `@Input set id` remains the same, but now we can remove the `tap` operator from our `initHandler$` and simply return raw data from our API.

```ts
initHandler$ = this.init$.pipe(switchMap((id) => this.api.get(id)));
```

Now `initHandler$` is `Observable<IChecklist>`. Let's connect it to state.

```ts
constructor(private api: TodoApiService, private state: RxState<IChecklist>) {
  this.state.connect(this.initHandler$);
  ...
}
```

Cool, so now all values emitted by our `get()` API call will be merged into the state. Subscription
will be managed automatically.

Now we need to update our `answerHandler$` so it will return an id of task that was answered
(api returns only status code). And connect it to our `tasks` property.

```ts
answerHandler$ = this.answer$.pipe(
  switchMap((id) => this.api.answerTask(id).pipe(map(() => id)))
);
```

```ts
constructor(private api: TodoApiService, private state: RxState<IChecklist>) {
  ...
  this.state.connect("tasks", this.answerHandler$, (state, id) =>
    state.tasks.filter(t => t.id !== id)
  );
}
```

Note that we removed `withLatestFrom(this.tasks$)` in favor of the `projectionFunction` in `connect`.
First we define fields to be updated, then the source of the changes and lastly we provide the `projectionFunction`. The functions' first first argument is the current state, the second is the change coming from
our source. More on possible `connect` variants [here](https://github.com/rx-angular/rx-angular/blob/main/libs/state/docs/api/rx-state.md#connect).

**Full component code**

```ts
export class ChecklistComponent {
  @Input() set id(id: string) {
    this.init$.next(id);
  }

  // READS
  name$ = this.state.select('name');
  tasks$ = this.state.select('tasks');

  // EVENTS
  init$ = new Subject<string>();
  answer$ = new Subject<string>();

  // HANDLERS
  initHandler$ = this.init$.pipe(switchMap((id) => this.api.get(id)));
  answerHandler$ = this.answer$.pipe(
    switchMap((id) => this.api.answerTask(id).pipe(map(() => id)))
  );

  constructor(private api: TodoApiService, private state: RxState<IChecklist>) {
    this.state.connect(this.initHandler$);
    this.state.connect('tasks', this.answerHandler$, (state, id) =>
      state.tasks.filter((t) => t.id !== id)
    );
  }
}
```

**Summary:**

- Both reading and writing are reactive.
- No subscriptions. All managed automatically by package.
- No lifecycle hooks.
- Less code. No need to use tricky operators if you not sure how to use them. A massive chunk of a job done under the hood.
