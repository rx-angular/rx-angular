import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { of, scheduled } from 'rxjs';

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

const todos = signal(todoData);

@Component({
  selector: 'signal-state',
  template: ` <div>Signal State</div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [RxState],
})
export class SignalStateComponent implements OnInit {
  private readonly state = inject<RxState<{ todos: Todo[]; loading: boolean }>>(
    RxState,
    {
      self: true,
    }
  );

  ngOnInit() {
    this.state.connect('todos', todos);
    const a = signal(false);
    const b = signal(false);

    // computedState: Signal<{ todos: Todo[]; loading: boolean; }>
    // VS
    // computedState: { todos: Signal<Todo[]>; loading: Signal<boolean>; }
    const computedState = this.state.computed(({ todos, loading }) => ({
      todos,
      loading,
      count: todos.length,
    }));

    const computedState2 = this.state.computed(({ todos, loading }) => {
      if (loading) {
        return [];
      } else {
        return todos;
      }
    });

    // computedTodos: Signal<>
    const computedTodos = computed(() => a());

    effect(() => {
      if (a()) {
        console.log('a');
      } else {
        console.log('b', b());
      }
    });

    a.set(true);
    a.mutate(() => true);
  }
}
