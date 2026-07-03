import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { insert, remove, update } from '@rx-angular/cdk/transformations';
import { rxState } from '@rx-angular/state';
import { DocsLinkComponent } from '../../../shared/docs-link';
import { CodeHighlightComponent } from '../../../shared/code-highlight';

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

// Shown verbatim on the page via <rxa-code>. Flush-left so it renders cleanly.
const SIGNAL_STATE_CODE = `interface TodoState {
  todos: Todo[];
  query: string;
}

export class SignalStateComponent {
  // Seed the store, then connect a reactive source (a signal here).
  private state = rxState<TodoState>(({ set, connect }) => {
    set({ todos: [], query: '' });
    connect('todos', todosDataSignal);
  });

  // Read state back as a signal and as derived (computed) signals.
  readonly todos = this.state.signal('todos');
  readonly filteredTodos = this.state.computed(({ todos, query }) =>
    query()
      ? todos().filter((t) => t.title.toLowerCase().includes(query().toLowerCase()))
      : todos(),
  );
  readonly doneCount = this.state.computed(
    ({ todos }) => todos().filter((t) => t.done).length,
  );

  // Mutations go through immutable @rx-angular/cdk/transformations helpers.
  filter(query: string) {
    this.state.set({ query });
  }
  addTodo(todo: Todo) {
    this.state.set('todos', ({ todos }) => insert(todos, todo));
  }
  toggleDone(todo: Todo) {
    this.state.set('todos', ({ todos }) =>
      update(todos, { ...todo, done: !todo.done }, 'id'),
    );
  }
  removeTodo(todo: Todo) {
    this.state.set('todos', ({ todos }) => remove(todos, todo, 'id'));
  }
}`;

/**
 * `rxState` is a fully signal-based state container. State is seeded with
 * `set`, connected to reactive sources with `connect`, and read back as
 * signals (`state.signal`) or derived signals (`state.computed`) — so the
 * template stays glitch-free and zoneless without any manual subscriptions.
 */
@Component({
  selector: 'rxa-signal-state',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocsLinkComponent, CodeHighlightComponent],
  template: `
    <rxa-docs-link
      docs="packages/state/reference/rx-state-functional"
      source="apps/demos/src/app/features/state/signal-state"
    />

    <h2>Signal State</h2>
    <p class="text-muted">
      A local todo store built with <code>rxState</code>. The list is seeded via
      <code>connect()</code>, exposed as a <code>signal()</code>, and filtered
      through a <code>computed()</code> selector. Every mutation goes through
      immutable <code>&#64;rx-angular/cdk/transformations</code> helpers
      (<code>insert</code>, <code>update</code>, <code>remove</code>).
    </p>

    <div class="card p-3 mb-3">
      <div class="toolbar">
        <input
          #input
          class="form-control search"
          type="search"
          placeholder="Filter todos…"
          (input)="filter(input.value)"
        />
        <button
          class="btn btn-primary"
          (click)="
            addTodo({
              id: todos().length + 1,
              title: 'New todo',
              done: false,
            })
          "
        >
          + Add todo
        </button>
      </div>

      <div class="stats">
        <span class="badge bg-secondary">total: {{ todos().length }}</span>
        <span class="badge bg-primary">
          shown: {{ filteredTodos().length }}
        </span>
        <span class="badge bg-success">done: {{ doneCount() }}</span>
      </div>

      <div class="todo-grid">
        @for (todo of filteredTodos(); track todo.id) {
          <article class="todo" [class.todo--done]="todo.done">
            <header class="todo__head">
              <span class="todo__id">#{{ todo.id }}</span>
              @if (todo.done) {
                <span class="todo__pill">done</span>
              }
            </header>
            <p class="todo__title">{{ todo.title }}</p>
            <div class="todo__actions">
              <button
                class="btn btn-sm"
                [class.btn-outline-success]="!todo.done"
                [class.btn-success]="todo.done"
                (click)="toggleDone(todo)"
              >
                {{ todo.done ? '✓ Done' : 'Mark done' }}
              </button>
              <button
                class="btn btn-sm btn-outline-danger"
                (click)="removeTodo(todo)"
              >
                Remove
              </button>
            </div>
          </article>
        } @empty {
          <p class="empty">No todos match your filter.</p>
        }
      </div>
    </div>

    <section class="code-section">
      <h3 class="rxa-demo-section-title">Example code</h3>
      <rxa-code title="signal-state.component.ts" [code]="exampleCode" />
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .toolbar {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 0.75rem;
      }
      .search {
        flex: 1 1 220px;
        max-width: 320px;
      }
      .stats {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }
      .todo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 0.75rem;
      }
      .todo {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        border: 1px solid #e1e4e8;
        border-radius: 10px;
        padding: 0.85rem;
        background: #fff;
        transition:
          box-shadow 0.15s ease,
          transform 0.15s ease,
          border-color 0.15s ease;
      }
      .todo:hover {
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        transform: translateY(-2px);
      }
      .todo--done {
        border-color: #2da44e;
        background: #f2fbf5;
      }
      .todo__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .todo__id {
        font-size: 0.8rem;
        font-weight: 700;
        color: #57606a;
      }
      .todo__pill {
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.03em;
        color: #fff;
        background: #2da44e;
        border-radius: 999px;
        padding: 0.1rem 0.5rem;
      }
      .todo__title {
        margin: 0;
        font-size: 0.95rem;
        color: #1b1f23;
      }
      .todo--done .todo__title {
        text-decoration: line-through;
        color: #57606a;
      }
      .todo__actions {
        margin-top: auto;
        display: flex;
        gap: 0.4rem;
      }
      .empty {
        grid-column: 1 / -1;
        margin: 0;
        color: #57606a;
        font-style: italic;
      }
    `,
  ],
})
export class SignalStateComponent {
  protected readonly exampleCode = SIGNAL_STATE_CODE;

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
  readonly doneCount = this.state.computed(
    ({ todos }) => todos().filter((todo) => todo.done).length,
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
