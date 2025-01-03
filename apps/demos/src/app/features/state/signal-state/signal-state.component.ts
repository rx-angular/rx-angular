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
import { rxState, RxState } from '@rx-angular/state';
import { RxActionFactory } from '@rx-angular/state/actions';
import { Observable } from 'rxjs';

type Todo = {
  id: number;
  title: string;
  done: boolean;
};

const todoData: Todo[] = new Array(20).fill(null).map((v, i) => ({
  id: i,
  title: `The todo #${i + 1}`,
  done: false,
}));

const todosDataSignal = signal(todoData);

interface TodoState {
  todos: Todo[];
  query: string;
}

@Component({
  selector: 'signal-state',
  template: `
    <h2>Signal State</h2>
    <div class="d-flex">
      <input #input (input)="filter(input.value)" />
      <button
        (click)="
          addTodo({
            id: todos().length + 1,
            title: 'added',
            done: false
          })
        "
      >
        Add
      </button>
    </div>
    <div class="d-flex flex-wrap todo-list">
      <div class="todo" *ngFor="let todo of filteredTodos()">
        <div>#{{ todo.id }}</div>
        <div>{{ todo.title }}</div>
        <button (click)="toggleDone(todo)">Done: {{ todo.done }}</button>
        <button (click)="removeTodo(todo)">remove</button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  private state = rxState<TodoState>(({ set, connect }) => {
    set({ todos: [], query: '' });

    connect('todos', todosDataSignal);
  });
  // computations
  readonly todos = this.state.signal('todos');
  readonly filteredTodos = this.state.computed(({ todos, query }) =>
    query()
      ? todos().filter(({ title }) =>
          title.toLowerCase().includes(query().toLowerCase()),
        )
      : todos(),
  );

  // mutations
  filter(query: string) {
    this.state.set({ query });
  }
  toggleDone(todo: Todo) {
    this.state.set('todos', ({ todos }) =>
      update(todos, { ...todo, done: !todo.done }, 'id'),
    );
  }
  addTodo(todo: Todo) {
    this.state.set('todos', ({ todos }) => insert(todos, todo));
  }
  removeTodo(todo: Todo) {
    this.state.set('todos', ({ todos }) => remove(todos, todo, 'id'));
  }
}
