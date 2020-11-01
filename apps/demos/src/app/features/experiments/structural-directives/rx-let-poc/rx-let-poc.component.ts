import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StrategyProvider } from '../../../../shared/rx-angular-pocs/render-stragegies/strategy-provider.service';

@Component({
  selector: 'rxa-rx-let-poc',
  template: `
    <rxa-visualizer>
      <rxa-strategy-select
        visualizerHeader (strategyChange)="strategyProvider.primaryStrategy = $event">
      </rxa-strategy-select>
      <div class="mat-row">
        <div class="padding">
          @Todo
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  host: {
    class: 'm-1 p-1',
    style: 'display: block;'
  },
  providers: [StrategyProvider]
})
export class RxLetPocComponent implements OnInit {

  constructor(public strategyProvider: StrategyProvider) {

  }

  ngOnInit(): void {
  }
}
