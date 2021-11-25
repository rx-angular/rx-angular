import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'rxa-recursive-observable-work-push',
  template: `
    <ng-container *ngIf="level === 0; else: branch">
      <rxa-work-visualizer [work]="work">
        <p visualizerHeader>Level {{total - level}}</p>
        {{ value$ | push }}
      </rxa-work-visualizer>
    </ng-container>
    <ng-template #branch>
      <rxa-work-visualizer [work]="work">
        <p visualizerHeader>Level {{total - level}}</p>
        <rxa-recursive-observable-work-push
          [work]="work"
          [total]="total" [level]="level-1" [value$]="value$"></rxa-recursive-observable-work-push>
      </rxa-work-visualizer>
    </ng-template>
  `,
  host: {
    class: 'd-flex w-100'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecursiveObservableWorkPushComponent {

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
