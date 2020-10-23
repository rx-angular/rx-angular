import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RxChangeDetectorRef } from '../../../../../../shared/rx-change-detector-ref/rx-change-detector-ref.service';
import { RxEffects } from '../../../../../../shared/rx-effects.service';

@Component({
  selector: 'rxa-strategy-control-custom',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <mat-card-title>Strategy controlled by this component</mat-card-title>
        <rxa-strategy-select></rxa-strategy-select>
        <rxa-value-provider buttons="true" #vP="rxaValueProvider"></rxa-value-provider>
      </div>

      <mat-card>
        <div *rxLet="vP.incremental$; let counter;">
          <mat-card-title>{{ counter }}</mat-card-title>
        </div>
      </mat-card>
    </rxa-visualizer>

  `,
  host: {
    class: 'm-1 p-1',
    style: 'display: block;'
  },

  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxEffects, RxChangeDetectorRef]
})
export class StrategyControlCustomComponent {

}
