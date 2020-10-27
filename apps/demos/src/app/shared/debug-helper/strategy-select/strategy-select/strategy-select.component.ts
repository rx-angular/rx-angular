import { ChangeDetectionStrategy, Component, Inject, Optional, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { dictionaryToArray, RxState, toDictionary } from '@rx-angular/state';
import { RX_CUSTOM_STRATEGIES } from '../../../../features/experiments/structural-directives/rx-let-poc/custom-strategies-token';
import { RX_DEFAULT_STRATEGY } from '../../../../features/experiments/structural-directives/rx-let-poc/default-strategy-token';
import { StrategyCredentials } from '../../../../features/experiments/structural-directives/rx-let-poc/rx-let-poc.directive';
import { internalStrategies } from '../../../../features/experiments/structural-directives/rx-let-poc/strategy-handling';

@Component({
  selector: 'rxa-strategy-select',
  template: `
    <label>Strategy</label>
    <select #i (change)="strategyChange.next(i.value); currentStrategyName = i.value" class="block">
      <option
        [value]="s"
        [selected]="currentStrategyName === s"
        *ngFor="let s of strategyNames">
        {{ s }}
      </option>
    </select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class StrategySelectComponent {
  strategies: { [name: string]: StrategyCredentials };
  strategyNames: string[];
  currentStrategyName: string;

  @Output() strategyChange = new Subject<string>();

  constructor(
    @Optional()
    @Inject(RX_CUSTOM_STRATEGIES)
    private customStrategies: StrategyCredentials[],
    @Inject(RX_DEFAULT_STRATEGY)
    private defaultStrategy: string
  ) {
    this.currentStrategyName = this.defaultStrategy;
    const _customStrategies = Array.isArray(this.customStrategies) ? toDictionary(this.customStrategies, 'name') : {};
    this.strategies = { ...internalStrategies, ..._customStrategies };
    this.strategyNames = dictionaryToArray(this.strategies).map((str: any) => str.name);
  }

}
