import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RxState, selectSlice } from '@rx-angular/state';
import { Observable, of } from 'rxjs';
import { filter } from 'rxjs/operators';

interface MyState {
  title: string;
  list: string[];
  isItemRendered: boolean;
}

@Component({
  selector: 'rx-select-slice',
  templateUrl: './select-slice.component.html',
  styleUrls: ['./select-slice.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxStateSelectSliceComponent extends RxState<MyState> {
  readonly viewState$ = this.select(
    selectSlice(['list', 'isItemRendered']),
    filter(({ isItemRendered, list }) => !isItemRendered && list.length > 0)
  );

  constructor() {
    super();
    const state$: Observable<MyState> = of(
      { title: 'myTitle', list: ['foo', 'bar'], isItemRendered: true },
      { title: 'myTitle', list: ['foo', 'bar'], isItemRendered: false },
      { title: 'nextTitle', list: ['foo', 'baR'], isItemRendered: true },
      { title: 'nextTitle', list: ['fooRz', 'boo'], isItemRendered: false }
    );
    this.connect(state$);
  }
}
