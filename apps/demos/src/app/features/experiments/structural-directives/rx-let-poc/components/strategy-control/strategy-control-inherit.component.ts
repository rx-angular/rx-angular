import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RxEffects } from '../../../../../../shared/rx-effects.service';

@Component({
  selector: 'rxa-strategy-control-inherit',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <mat-card-title>Strategy controlled by parent component</mat-card-title>
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
  providers: [RxEffects]
})
export class StrategyControlInheritComponent {

}
