import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { CdHelper } from '../../../../../../shared/utils/cd-helper';

@Component({
  selector: 'rxa-recursive',
  template: `
    <rxa-visualizer [value$]="value">
      <rxa-cd-trigger visualizerHeader [cdHelper]="cdHelper"></rxa-cd-trigger>
      <ng-container *ngIf="level === 0; else: branch">
      </ng-container>
      <ng-template #branch>
        <rxa-recursive [level]="level-1" [value]="value"></rxa-recursive>
      </ng-template>
    </rxa-visualizer>
  `,
  host: {
    class: 'd-flex w-100'
  },
  providers: [CdHelper],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecursiveComponent extends RxState<any> {

  @Input()
  level = 0;

  @Input()
  value;

  constructor(public cdHelper: CdHelper) {super();}

}
