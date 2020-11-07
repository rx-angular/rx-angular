import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StrategyProvider } from '../../../../shared/rx-angular-pocs/render-stragegies/strategy-provider.service';

@Component({
  selector: 'rxa-rx-let-poc',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <rxa-strategy-select (strategyChange)="strategyProvider.primaryStrategy = $event">
        </rxa-strategy-select>
        <br/>
        <rxa-value-provider [buttons]="true" #v="rxaValueProvider"></rxa-value-provider>
      </div>
      <div class="mt-5 row w-100 d-flex">
        <div class="col dh-embedded-view p-2">
          <ng-template #suspense>
            <rxa-list-item-ghost></rxa-list-item-ghost>
          </ng-template>
          <div *rxLet="v.incremental$; let i; rxSuspense: suspense">
            i: {{i}}
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
export class RxLetPocComponent implements OnInit {

  constructor(public strategyProvider: StrategyProvider) {

  }

  ngOnInit(): void {
  }
}
