import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { CdHelper } from '../../../../shared/utils/cd-helper';
import { ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'rxa-recursive-push',
  template: `
    <ng-container *ngIf="level === 0; else: branch">
      <rxa-visualizer>
        <p visualizerHeader>Level {{total-level}}</p>
        <rxa-renders [value$]="value$ | push"></rxa-renders>
      </rxa-visualizer>
    </ng-container>
    <ng-template #branch>
      <rxa-visualizer>
        <p visualizerHeader>Level {{total-level}}</p>
        <rxa-recursive-push [total]="total" [level]="level-1" [value]="value$ | push"></rxa-recursive-push>
      </rxa-visualizer>
    </ng-template>
  `,
  host: {
    class: 'd-flex w-100'
  },
  providers: [CdHelper],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecursivePushComponent {
  @Input()
  set depth(d){
    this.total = d;
    this.level = this.total -1;
  }

  @Input()
  total = 0;

  @Input()
  level = 0;

  value$ = new ReplaySubject(1);
  @Input()
  set value(v) {
    this.value$.next(v)
  };

}
