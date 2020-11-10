import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'rxa-recursive-observable-work-async',
  template: `
    <ng-container *ngIf="level === 0; else: branch">
      <rxa-work-visualizer [work]="work">
        <p visualizerHeader>Level {{total - level}}</p>
        {{ value$ | async }}
      </rxa-work-visualizer>
    </ng-container>
    <ng-template #branch>
      <rxa-work-visualizer [work]="work">
        <p visualizerHeader>Level {{total - level}}</p>
        <rxa-recursive-observable-work-async
          [work]="work"
          [total]="total" [level]="level-1" [value$]="value$"></rxa-recursive-observable-work-async>
      </rxa-work-visualizer>
    </ng-template>
  `,
  host: {
    class: 'd-flex w-100'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
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
