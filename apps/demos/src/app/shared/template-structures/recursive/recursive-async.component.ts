import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'rxa-recursive-async',
  template: `
    <ng-container *ngIf="level === 0; else: branch">
      <rxa-visualizer>
        <p visualizerHeader>Level {{total - level}}</p>
        <rxa-renders [value$]="value$ | async"></rxa-renders>
      </rxa-visualizer>
    </ng-container>
    <ng-template #branch>
      <rxa-visualizer>
        <p visualizerHeader>Level {{total - level}}</p>
        <rxa-recursive-async [total]="total" [level]="level-1" [value]="value$ | async"></rxa-recursive-async>
      </rxa-visualizer>
    </ng-template>
  `,
  host: {
    class: 'd-flex w-100'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecursiveAsyncComponent {
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
  };

}
