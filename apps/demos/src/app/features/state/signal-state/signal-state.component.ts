import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { insert } from '@rx-angular/cdk/transformations';
import { RxState } from '@rx-angular/state';

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
  private readonly state = inject<
    RxState<{ todos: Todo[]; loading: boolean; foo: string }>
  >(RxState, {
    self: true,
  });

  ngOnInit() {
    // connect a signal:
    this.state.connect('todos', todos);
    // get a signal:
    const todosSignal = this.state.signal('todos');
    // get a computed:
    const count = this.state.computed(({ todos }) => {
      return todos().length;
    });

    // mutate the state
    setTimeout(() => {
      this.state.set('todos', ({ todos }) =>
        insert(todos, { id: 23, done: false, title: 'somenewtitle' })
      );
    }, 100);

    // create an effect from plain signal
    effect(() => {
      console.log('from plain signal');
      console.log(todosSignal());
    });

    // create an effect from computed
    effect(() => {
      console.log('from computed');
      console.log(count());
    });

    // create an effect from state signals
    this.state.effect(({ todos }) => {
      console.log('from state effect');
      if (todos().length > 20) {
        console.log('something was added');
      }
    });
  }
}
