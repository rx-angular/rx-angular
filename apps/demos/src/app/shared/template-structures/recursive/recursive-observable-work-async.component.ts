import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'rxa-recursive-observable-work-async',
  template: `
    @if (level === 0) {
      <rxa-work-visualizer [work]="work">
        <p visualizerHeader>Level {{ total - level }}</p>
        {{ value$ | async }}
      </rxa-work-visualizer>
    } @else {
      <rxa-work-visualizer [work]="work">
        <p visualizerHeader>Level {{ total - level }}</p>
        <rxa-recursive-observable-work-async
          [work]="work"
          [total]="total"
          [level]="level - 1"
          [value$]="value$"
        ></rxa-recursive-observable-work-async>
      </rxa-work-visualizer>
    }
  `,
  host: {
    class: 'd-flex w-100',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RecursiveObservableWorkAsyncComponent {
  @Input()
  set depth(d) {
    this.total = d;
    this.level = this.total - 1;
  }

  @Input() work = 10;

  @Input()
  total = 0;

  @Input()
  level = 0;

  @Input() value$: Observable<any>;
}
