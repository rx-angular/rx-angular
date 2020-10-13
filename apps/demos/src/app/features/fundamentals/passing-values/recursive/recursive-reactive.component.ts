import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Observable } from 'rxjs';
import { CdHelper } from '../../../../shared/utils/cd-helper';

@Component({
  selector: 'rxa-recursive-reactive',
  template: `
      <ng-container *ngIf="level === 0; else: branch">
        <rxa-visualizer>
          <rxa-cd-trigger visualizerHeader [cdHelper]="cdHelper"></rxa-cd-trigger>
          <rxa-renders [value$]="value$"></rxa-renders>
        </rxa-visualizer>
      </ng-container>
      <ng-template #branch>
        <rxa-visualizer>
          <rxa-cd-trigger visualizerHeader [cdHelper]="cdHelper"></rxa-cd-trigger>
          <rxa-recursive-reactive [level]="level-1" [value$]="value$"></rxa-recursive-reactive>
        </rxa-visualizer>
      </ng-template>
  `,
  host: {
    class: 'd-flex w-100'
  },
  providers: [CdHelper],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecursiveReactiveComponent extends RxState<any> {

  @Input()
  level = 0;

  @Input() value$: Observable<any>;

  constructor(public cdHelper: CdHelper) {super();}

}
