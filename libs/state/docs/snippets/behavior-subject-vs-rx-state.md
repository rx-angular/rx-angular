@Notice: This content is a copy of [this comment](https://github.com/rx-angular/rx-angular/issues/75#issuecomment-626031134) created by [@Karnaukhov-kh](https://github.com/Karnaukhov-kh)
We are incredible thankful for that contribution!!

# Migrating to RxState

Let's take a look at a simple checklist app, see how it can be implemented in the imperative way and after that we will iterate over it and add some reactiveness. We skip any additional logic as routing, errors handling etc in this examples.

## Intial solution

**Interfaces**

checklist interface

```
interface IChecklist {
  id: string;
  name: string;
  tasks: ITask[];
}
```

task interface

```
export interface ITask {
  id: string;
  name: string;
}
```

List is a nested smart component.

component code

```
export class ChecklistComponent implements OnInit, OnDestroy {
  @Input() id: string;

  private destroy$ = new Subject();

  checklist: IChecklist;

  constructor(private api: TodoApiService) {}

  ngOnInit() {
    this.api
      .get(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(checklist => this.checklist = checklist);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  answerTask(id: string) {
    this.api
      .answerTask(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.checklist.tasks = this.checklist.tasks.filter(t => t.id !== id);
      });
  }
}
```

template

```
    <section class="checklist">
      <h1>
        <span>checklist.name</span>
      </h1>
      <div>
        <article class="task" *ngFor="let task of checklist.tasks">
          <h2>
            {{ task.name }}
          </h2>
          <button class="answer-button" (click)="answerTask(task.id)">
            Done
          </button>
        </article>
      </div>
    </section>
```

## Step 1. Basic solution using BehaviorSubject

First pattern that many developers who switching to reactive programming with Angular & RxJS will find is so called "Observable data service" (organization of state with `BehaviorSubject` as data storage).

This pattern is pretty flexible and can be applied to services and components. With some tuning it can even serve as a light-weight alternative to NgRx, NGXS, Akita and other state management solutions.

_Another alternative can be `merge` + `scan` operators that allows to combine multiple observables and accumulate their values into a single state observable._

**Let's create a state class that abstracts our BehaviorSubject and some basic operations we can do with it**

**State class**

```
export class State<T = any> {
  private dataSrc: BehaviorSubject<T>;
  data$: Observable<T>;

  constructor(initialData: T) {
    this.dataSrc = new BehaviorSubject(initialData);
    this.data$ = this.dataSrc.asObservable();
  }

  get snapshot() {
    return this.dataSrc.getValue();
  }

  select<K extends keyof T>(path: K): Observable<T[K]> {
      return this.data$.pipe(
        map(state => state[path])
        // some additional logic
      );
  }

  patch(data: Partial<T>) {
    this.dataSrc.next({ ...this.snapshot, ...data });
  }
}
```

- Data initialization happens inside `constructor`. We are passing `initialData` of type `T` and it is set to our `dataSrc`.
- `get snapshot()` returns current value from `dataSrc`.
- `select<K extends keyof T>(path: K): Observable<T[K]>` accepts key of `T` and returns value of type `T[K]` from `data$` as observable. Selection is done with `map` operator but `pluck` is also an option. We are skipping any additional filtering/sharing logic in this example.
- `patch(data: Partial<T>)` accepts data of `Partial<T>` and updates current value of `dataSrc`.

**Now we can organize `List` component in a more reactive way**

```
export class ChecklistComponent implements OnInit, OnDestroy {
  @Input() id: string;

  private destroy$ = new Subject();

  state = new State<IChecklist>({
    id: null,
    name: null,
    tasks: null
  });

  name$ = this.state.select("name");

  tasks$ = this.state.select("tasks");

  constructor(private api: TodoApiService) {}

  ngOnInit() {
    this.api
      .get(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(checklist => this.state.patch(checklist));
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  answerTask(id: string) {
    this.api
      .answerTask(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const snapshot = this.state.snapshot;
        this.state.patch({
          tasks: snapshot.tasks.filter(t => t.id !== id)
        });
      });
  }
}
```

**Template**

```
 <section class="checklist">
      <h1>
          {{ name$ | async }}
      </h1>
      <div>
        <article class="task" *ngFor="let task of (tasks$ | async)">
          <h2>
            {{ task.name }}
          </h2>
          <button
            class="answer-button"
            (click)="answerTask(task.id)"
          >
            Done
          </button>
        </article>
      </div>
  </section>
```

What happens here:

- Component gets initialized. Constructor gets involved.
- Checklist id passed to component through `@Input id: string`
- In `OnInit` lifecycle hook we are getting our checklist by calling `get(id)` method from our api service, subscribe to results and updating our `state`.
- After that `name$` and `tasks$` getting data from state through `select()` method. (let's assume we placed some filtering logic in `select()` method so we haven't received initial empty values).
- Data is displayed in component template with `async` pipe. `<h1>{{name$ | async}}</h1>` and `<article class="task" *ngFor="let task of (tasks$ | async)">`
- User clicks on `answer-button`. Method `answerTask(task.id)` is called.
- We subscribe to `answerTask` method form our api service. Our api returns only status code. So what we can do is just remove this task from UI. For this we need to get existing tasks in some way. We are using `this.state.snapshot` for this purpose. We filter tasks to exclude answered task from array and updating our state with `patch()` method.

**Looks reactive?**

Reading part is pretty reactive. With `select()` method we are observing changes of state fields `name` and `tasks` and render them with `async` pipe. So Angular will manage subscription for us. That's pretty cool.

But there are some issues with this approach.

- Solution is depending on lifecycle hooks of our component. We need to remember the order in which initialization happens `constructor` -> `ngOnChanges` (that's where input binding will be initialized) -> `ngOnInit` -> .... -> `ngOnDestroy`.
- Update (or write) part is still imperative. We need to call a method in our component, subscribe to some observable and inside subscription update our state with `patch()` method. We are breaking reactive flow.
- We have multiple subscriptions in pretty simple component. Subscription management should be done manually if we don't use external packages or create own solution for this.

## Step 2. A bit more reactive component.

**First let's try to get rid of `OnInit` lifecycle hook.**

We need some **event** for initialization. Let's create a `Subject` for this.

```
init$ = new Subject<string>();
```

Now we need a place from which we can **trigger** this event. `@Input id: string` is a place where we getting checklist id that is needed for initialization. We are planning to remove `OnInit` so there is no need to intorduce `OnChanges` to our component. Let's make a setter!

```
  @Input() set id(id: string) {
    this.init$.next(id);
  }
```

Also we need to write a logic for getting our checklist from api and storing response.

```
initHandler$ = this.init$.pipe(
  switchMap(id =>
    this.api.get(id).pipe(tap(checklist => this.state.patch(checklist)))
  )
);
```

So far so good. Inside `switchMap` we are getting value passed to `init$` and switching to our api call. We are going as reactive as possible here and don't want to have any logic inside subscription and placed it inside `tap`.

Nice. Now we can get rid of `OnInit` and subscription inside of it.

**Let's handle tasks answering in the same manner and get rid of `answerTask()` method.**

Event

```
answer$ = new Subject<string>();
```

Trigger

```
<button class="answer-button" (click)="answer$.next(task.id)">
     Done
</button>
```

Answering logic

```
answerHandler$ = this.answer$.pipe(
    withLatestFrom(this.tasks$),
    switchMap(([id, tasks]) =>
      this.api
        .answerTask(id)
        .pipe(
          tap(() => this.state.patch({ tasks: tasks.filter(t => t.id !== id) }))
        )
    )
  );
```

Here we introduce additional operator called `withLatestFrom`. This way we can get latest value from our `this.tasks$ = this.state.select('tasks')` in more reactive manner. `switchMap` will receive array of values. First one will be `id` from `answer$` and second one will be our tasks.

**Now we need to subscribe.**

Good fit is `constructor()`. Here we use `merge` to combine 2 observables and subscribe only once. Unsubscribe will happen on component destruction as in original example.

```
  constructor(private api: TodoApiService) {
    merge(this.initHandler$, this.answerHandler$)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }
```

**Full component code.**

```
export class ChecklistComponent implements OnDestroy {
  @Input() set id(id: string) {
    this.init$.next(id);
  }

  private destroy$ = new Subject();

  state = new State<IChecklist>({
    id: null,
    name: null,
    tasks: null
  });

  // READS
  name$ = this.state.select("name");
  tasks$ = this.state.select("tasks");

  // EVENTS
  init$ = new Subject<string>();
  answer$ = new Subject<string>();

  initHandler$ = this.init$.pipe(
    switchMap(id =>
      this.api.get(id).pipe(tap(checklist => this.state.patch(checklist)))
    )
  );
  answerHandler$ = this.answer$.pipe(
    withLatestFrom(this.tasks$),
    switchMap(([id, tasks]) =>
      this.api
        .answerTask(id)
        .pipe(
          tap(() => this.state.patch({ tasks: tasks.filter(t => t.id !== id) }))
        )
    )
  );

  constructor(private api: TodoApiService) {
    merge(this.initHandler$, this.answerHandler$)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
```

**Summary:**

- Now we have a bit more code but component is more reactive.
- Component initialization now not depending on `OnInit` lifecycle hook and will be a reaction to `init$` event.
- We removed imperative `answerTask()` method.
- Now we have only one subscription to manage.
- We don't have any code inside subscription.

**However:**

- We still need to manage subscription.
- State updates are side effects of our api calls. We are using `tap` in our pipe to handle this and manually calling `this.state.patch()` method in our component. It is still not reactive.

## Step 3. Fully reactive component.

Let's do another round and refactor `List` component using `@rx-angular/state`. In the core of it are operators `mergeAll()` that works with stream of streams instead of single values and `scan()` that accumulates values form this streams into single state observable.

First step will be adding `RxState` service to our component.

```
@Component({
  ...
  providers: [RxState],
  ...
})
```

```
constructor(private api: TodoApiService, private state: RxState<IChecklist>)
```

RxState service is in component providers. That means that lifecycle of this service will be nearly the same as lifecycle of component. And on component destruction service will also be destroyed. We can now completely remove our `State` class. Also we can get rid of `OnDestroy` lifecycle hook since we don't need to manage subscriptions manually anymore.

**Reading from state**

```
  name$ = this.state.select("name");
  tasks$ = this.state.select("tasks");
```

Visually it looks the same but the select operator provides a lot more than just passing keys. You can read about it [here](https://github.com/rx-angular/rx-angular/blob/master/libs/state/docs/api/rx-state.md#select). Also selection will be shareReplayed, distincted and undefined values will be filtered out.

**Updating state reactively**

Since in this example our api calls are main producers of our state we can connect them to state using `connect` method.

Let's start with initialization. Event `init$` and trigger `@Input set id` remains the same but now we can remove `tap` operator from our `initHandler$` and simply return raw data from our api.

```
  initHandler$ = this.init$.pipe(switchMap(id => this.api.get(id)));
```

Now `initHandler$` is `Observable<IChecklist>`. Let's connect it to state.

```
  constructor(private api: TodoApiService, private state: RxState<IChecklist>) {
    this.state.connect(this.initHandler$);
    ...
  }
```

Cool so now all values emitted by our `get()` api call will be merged into state. Subscription will be managed automatically.

Now we need to update our `answerHandler$` so it will return an id of task that was answered (api returns only status code). And connect it to our `tasks` property.

```
 answerHandler$ = this.answer$.pipe(
    switchMap(id => this.api.answerTask(id).pipe(map(() => id)))
  );
```

```
  constructor(private api: TodoApiService, private state: RxState<IChecklist>) {
    ...
    this.state.connect("tasks", this.answerHandler$, (state, id) =>
      state.tasks.filter(t => t.id !== id)
    );
  }
```

Note that we removed `withLatestFrom(this.tasks$)` in favor of the `projectionFunction` in `connect`.
First we define fields to be updated, then the source of the changes and lastly we provide the `projectionFunction`.
The functions' first first argument is the current state, the second is the change coming from our source. More on possible `connect` variants [here](https://github.com/rx-angular/rx-angular/blob/master/libs/state/docs/api/rx-state.md#connect).

**Full component code**

```
export class ChecklistComponent {
  @Input() set id(id: string) {
    this.init$.next(id);
  }

  // READS
  name$ = this.state.select("name");
  tasks$ = this.state.select("tasks");

  // EVENTS
  init$ = new Subject<string>();
  answer$ = new Subject<string>();

  // HANDLERS
  initHandler$ = this.init$.pipe(switchMap(id => this.api.get(id)));
  answerHandler$ = this.answer$.pipe(
    switchMap(id => this.api.answerTask(id).pipe(map(() => id)))
  );

  constructor(private api: TodoApiService, private state: RxState<IChecklist>) {
    this.state.connect(this.initHandler$);
    this.state.connect("tasks", this.answerHandler$, (state, id) =>
      state.tasks.filter(t => t.id !== id)
    );
  }
}
```

**Summary:**

- Both reading and writing are reactive.
- No subscriptions. All managed automatically by package.
- No lifecycle hooks.
- Less code. No need to use tricky operators if you not sure how to use them. Huge chunk of job done under the hood.
