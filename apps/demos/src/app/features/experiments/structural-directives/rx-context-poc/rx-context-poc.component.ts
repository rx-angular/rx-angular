import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StrategyProvider } from '../../../../rx-angular-pocs';

@Component({
  selector: 'rxa-rx-context-poc',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <rxa-strategy-select (strategyChange)="strategyProvider.primaryStrategy = $event">
        </rxa-strategy-select>
        <rxa-trigger-provider #triggers="rxaTriggerProvider"></rxa-trigger-provider>
        <br/>
        <rxa-value-provider [buttons]="true" #v="rxaValueProvider"></rxa-value-provider>
      </div>
      <div class="mt-5 row w-100 d-flex">
        <div class="col-6 dh-embedded-view p-2">
          <div [rxContextContainer]="v.incremental$"
               [suspenseTrg]="triggers.suspense$"
               [errorTrg]="triggers.error$"
               [completeTrg]="triggers.complete$"
          >
            <div *rxLet="v.incremental$; let n;">
              <rxa-dirty-check></rxa-dirty-check>
              {{n}}
            </div>
            <div rxSuspense>
              SUSPENSE TEMPLATE TRIGGERED
            </div>
            <div rxComplete>
              COMPLETE TEMPLATE TRIGGERED
            </div>
            <div rxError>
              ERROR TEMPLATE TRIGGERED
            </div>
          </div>

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
export class RxContextPocComponent {

  constructor(public strategyProvider: StrategyProvider) {

  }

}
