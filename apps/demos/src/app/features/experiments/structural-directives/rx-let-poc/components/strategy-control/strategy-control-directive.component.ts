import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'rxa-strategy-control-directive',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <mat-card-title>Strategy controlled by directive</mat-card-title>
        <rxa-strategy-select></rxa-strategy-select>
        <rxa-value-provider buttons="true" #vP="rxaValueProvider"></rxa-value-provider>
      </div>
      <mat-card>
        <div *rxLet="vP.incremental$; let counter; strategy: strategy$ | push">
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
  providers: []
})
export class StrategyControlDirectiveComponent {
  changeStrategy$ = new Subject();
  strategy$ = this.changeStrategy$;
}
