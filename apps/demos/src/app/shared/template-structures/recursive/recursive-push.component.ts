import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'rxa-recursive-push',
  template: `
    @if (level === 0) {
      <rxa-visualizer>
        <p visualizerHeader>Level {{ total - level }}</p>
        <rxa-renders [value$]="value$ | push"></rxa-renders>
      </rxa-visualizer>
    } @else {
      <rxa-visualizer>
        <p visualizerHeader>Level {{ total - level }}</p>
        <rxa-recursive-push
          [total]="total"
          [level]="level - 1"
          [value]="value$ | push"
        ></rxa-recursive-push>
      </rxa-visualizer>
    }
  `,
  host: {
    class: 'd-flex w-100',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class RecursivePushComponent {
  @Input()
  set depth(d) {
    this.total = d;
    this.level = this.total - 1;
  }

  @Input()
  total = 0;

  @Input()
  level = 0;

  value$ = new ReplaySubject(1);

  @Input()
  set value(v) {
    this.value$.next(v);
  }
}
