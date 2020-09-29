import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Observable } from 'rxjs';
import { CdHelper } from '../../../../../../shared/utils/cd-helper';

@Component({
  selector: 'rxa-recursive-reactive',
  template: `
    <rxa-visualizer [value$]="value$">
      <rxa-cd-trigger visualizerHeader [cdHelper]="cdHelper"></rxa-cd-trigger>
      <ng-container *ngIf="level === 0; else: branch">
        {{value$ | push}}
      </ng-container>
      <ng-template #branch>
        <rxa-recursive-reactive [level]="level-1" [value$]="value$"></rxa-recursive-reactive>
      </ng-template>
    </rxa-visualizer>
  `,
  styles: [`
    :host {
      display: flex;
      width: 100%;
    }
  `],
  providers: [CdHelper],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecursiveReactiveComponent extends RxState<any> {

  @Input()
  level = 0;

  @Input() value$: Observable<any>;

  constructor(public cdHelper: CdHelper) {super();}

}
