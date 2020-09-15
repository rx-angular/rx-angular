_Author: [@Phhansen](https://github.com/Phhansen)_

# How to manage global state

For an explainer on how to easily identify what should be global state and what should local state, please read: [Difference between Global and Local state](https://github.com/rx-angular/rx-angular/tree/master/libs/state/docs/snippets/global-state-vs-local-state.md).

## Example

As with the global/local state snippet, we'll be doing the same example to-do app with 2 views.

### To do

- Renders a list of `tasks` that must be completed and a `counter` that shows how many tasks left to do.
- The list can be expanded or collapsed and has property `isExpanded`.
- Gets tasks array from endpoint _tasks/get_ and filters out tasks that already answered.

```typescript
interface TodosState {
    tasks: Task[];
    isExpanded: boolean;
}

@Component({
    selector: "todos",
    templateUrl: "./todo.component.html"
})
export class TodoComponent extends RxState<TodosState> {
    readonly tasks$ = this.select("tasks");
    readonly counter$ = this.select(pluck("tasks"), map(tasks => tasks.length));
    readonly isExpanded$ = this.select("isExpanded");

    constructor(private tasksService: TasksService) {
        super();

        /* Filter out tasks that are done */
        this.connect("tasks", this.tasksService.fetchTasks().pipe(filter(tasks => tasks.filter(task => !task.done))));
    }
}
```

### Setup

- Renders a list of all existing `tasks` and a `counter` that shows the total amount of tasks.
- The list can be expanded or collapsed and has property `isExpanded`.
- Gets tasks as array from endpoint _tasks/get_.

```typescript
interface AllTodosState {
    tasks: Task[];
    isExpanded: boolean;
}

@Component({
    selector: "all-tasks",
    templateUrl: "./all-tasks.component.html"
})
export class AllTasksComponent extends RxState<AllTodosState>{
    readonly tasks$ = this.select("tasks");
    readonly counter$ = this.select(pluck("tasks"), map(tasks => tasks.length));
    readonly isExpanded$ = this.select("isExpanded");

    constructor(private tasksService: TasksService) {
        super();

        /* Fetch tasks from backend */
        this.connect("tasks", this.tasksService.fetchTasks());
    }
}
```

### What is global and what is local?
Looking at the above examples, let us see what is **local** and what is **global**! 

- `counter` property is a part of **local** state of each view. The counter value is specific for each view.
- `isExpanded` property is also part of **local** state. Both lists can be expanded/collapsed but this status isn't shared between them and they don't care about this status of each other.
- `tasks` array is a part of our app **global** state. This array needed for each view and received from the same endpoint. We don't need to load it twice. It is time to introduce a global layer to our application and move tasks array and retrieving logic there.

### Moving the `tasks` array to our **global** state
We can handle **global** state in different ways, but for this snippet we´re going to use an `injectionToken`.

```typescript
import { InjectionToken } from "@angular/core";
import { RxState } from "@rx-angular/state";

export interface Task {
    id: number;
    label: string;
    done: boolean;
}

export interface GlobalState {
    tasks: Task[];
}

export const GLOBAL_RX_STATE = new InjectionToken<RxState<GlobalState>>('GLOBAL_RX_STATE');
```

We then _provide_ the `injectionToken` in our `app.module.ts`.

```typescript
import { GLOBAL_RX_STATE, GlobalState } from "./rx-state";
...

@NgModule({
    imports: [...],
    declarations: [...],
    providers: [{
        provide: GLOBAL_RX_STATE, useFactory: () => new RxState<GlobalState>()
    }],
    bootstrap: [...]
})
export class AppModule {}
```

We can then load the `tasks` in the `AppComponent` via our `tasksService.fetchTasks()` and just have our `TodoComponent` and `AllTasksComponent` connect to the global state.

```typescript
import { GLOBAL_RX_STATE } from './rx-state';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
constructor(@Inject(GLOBAL_RX_STATE) private state, private tasksService: TasksService) {
    /* Fetch tasks from backend */
    this.connect("tasks", this.tasksService.fetchTasks());
}
```

And our updated `TodoComponent`

```typescript
interface TodosState {
    tasks: Task[];
    isExpanded: boolean;
}

@Component({
    selector: "todos",
    templateUrl: "./todo.component.html"
})
export class TodoComponent extends RxState<TodosState> {
    readonly tasks$ = this.select("tasks");
    readonly counter$ = this.select(pluck("tasks"), map(tasks => tasks.length));
    readonly isExpanded$ = this.select("isExpanded");

    constructor(@Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>) {
        super();

        /* Connect to global state and filter out already completed tasks */
        this.connect("tasks", this.globalState.select("tasks").pipe(
            map(tasks => tasks.filter(task => !task.done))
        ));
    }
}
```
Here we `connect` to the global state instance and filter out the already completed tasks.

Our `AllTasksComponent` is slightly different in that it doesn´t actually need to filter anything, and thus it only needs to manage the **local** `isExpanded` value, and just have the `tasks` and `counter` values come directly from the **global** state.

```typescript
interface AllTodosState {
    isExpanded: boolean;
}

@Component({
    selector: "all-tasks",
    templateUrl: "./all-tasks.component.html"
})
export class AllTasksComponent extends RxState<AllTodosState>{
    readonly tasks$ = this.globalState.select("tasks");
    readonly counter$ = this.globalState.select(pluck("tasks"), map(tasks => tasks.length));
    readonly isExpanded$ = this.select("isExpanded");

    constructor(@Inject(GLOBAL_RX_STATE) private globalState: RxState<GlobalState>) {
        super();
    }
}
```
