import { NgForOf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  Injectable,
  OnInit,
  signal,
} from '@angular/core';
import { insert, remove, update } from '@rx-angular/cdk/transformations';
import { RxState } from '@rx-angular/state';
import { RxActionFactory } from '@rx-angular/state/actions';
import { Observable } from 'rxjs';

type Todo = {
  id: number;
  title: string;
  done: boolean;
};

abstract class TodoService {
  abstract loadTodos(): Observable<Todo[]>;
  abstract updateTodo(todo: Todo): Observable<Todo>;

  abstract createTodo(todo: Todo): Observable<Todo>;

  abstract deleteTodo(todo: Todo): Observable<void>;
}

const todoData: Todo[] = new Array(20).fill(null).map((v, i) => ({
  id: i,
  title: `The todo #${i + 1}`,
  done: false,
}));

const todosDataSignal = signal(todoData);

/*function describeState<
  T extends object,
  M extends Record<string, (args: any) => Partial<T>> = {}
>(description: {
  withState?: Partial<T>;
  withMutations: M;
}): RxState<T> & {
  mutations: {
    [K in keyof M]: (args: Parameters<M[K]>[0]) => void;
  };
} {
  const state: RxState<T> = new RxState();
  if (description.withState) {
    state.set(description.withState);
  }

  // @ts-ignore
  return state;
}

const test = describeState({
  withState: <{ query: string; todos: Todo[] }>{ query: '', todos: [] },
  withMutations: {
    addTodo: (todo: Todo) => ({ todos: [] /!*insert(state.todos, todo)*!/ }),
  },
});
test.mutations.addTodo({ id: 2, title: 'test', done: false });*/

interface TodoState {
  todos: Todo[];
  query: string;
}

@Injectable()
class TodoStore extends RxState<TodoState> {
  // computations
  readonly todos = this.signal('todos');
  readonly filteredTodos = this.computed(({ todos, query }) =>
    query()
      ? todos().filter(({ title }) =>
          title.toLowerCase().includes(query().toLowerCase())
        )
      : todos()
  );
  constructor() {
    super();
    this.set({ todos: [], query: '' });
    this.loadTodos();
  }
  // effects
  loadTodos() {
    this.connect('todos', todosDataSignal);
  }

  // mutations
  filter(query: string) {
    this.set({ query });
  }
  toggleDone(todo: Todo) {
    this.set('todos', ({ todos }) =>
      update(todos, { ...todo, done: !todo.done }, 'id')
    );
  }
  addTodo(todo: Todo) {
    this.set('todos', ({ todos }) => insert(todos, todo));
  }
  removeTodo(todo: Todo) {
    this.set('todos', ({ todos }) => remove(todos, todo, 'id'));
  }
}

@Component({
  selector: 'signal-state',
  template: `
    <h2>Signal State</h2>
    <div class="d-flex">
      <input #input (input)="store.filter(input.value)" />
      <button
        (click)="
          store.addTodo({
            id: store.todos().length + 1,
            title: 'added',
            done: false
          })
        "
      >
        Add
      </button>
    </div>
    <div class="d-flex flex-wrap todo-list">
      <div class="todo" *ngFor="let todo of store.filteredTodos()">
        <div>#{{ todo.id }}</div>
        <div>{{ todo.title }}</div>
        <button (click)="store.toggleDone(todo)">Done: {{ todo.done }}</button>
        <button (click)="store.removeTodo(todo)">remove</button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [TodoStore],
  imports: [NgForOf],
  styles: [
    `
      .todo-list {
        gap: 0.5em;
      }
      .todo {
        border: 1px solid gray;
      }
    `,
  ],
})
export class SignalStateComponent {
  readonly store = inject(TodoStore, {
    self: true,
  });
}
