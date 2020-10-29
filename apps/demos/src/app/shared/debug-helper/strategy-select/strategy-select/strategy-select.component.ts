import { ChangeDetectionStrategy, Component, Inject, Input, Optional, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { dictionaryToArray, RxState, toDictionary } from '@rx-angular/state';
import { distinctUntilChanged, share } from 'rxjs/operators';
import { RX_CUSTOM_STRATEGIES } from '../../../../features/experiments/structural-directives/rx-let-poc/custom-strategies-token';
import { RX_DEFAULT_STRATEGY } from '../../../../features/experiments/structural-directives/rx-let-poc/default-strategy-token';
import { StrategyCredentials } from '../../../../features/experiments/structural-directives/rx-let-poc/rx-let-poc.directive';
import {
  internalStrategies,
  mergeStrategies
} from '../../../../features/experiments/structural-directives/rx-let-poc/strategy-handling';

const strategiesUiConfig = {
  local: { name: 'local', icon: 'call_split' },
  global: { name: 'global', icon: 'vertical_align_bottom' },
  detach: { name: 'detach', icon: 'play_for_work' },
  noop: { name: 'noop', icon: 'block' },
  postTask: { name: 'postTask', icon: 'science' },
  queue: { name: 'queue', icon: 'link' },
  native: { name: 'native', icon: 'find_replace' }
}

@Component({
  selector: 'rxa-strategy-select',
  template: `
    <mat-form-field appearance="fill">
      <mat-select #i
                  unpatch
                  [(value)]="strategy">
        <mat-select-trigger>
          {{ strategy }}
        </mat-select-trigger>
        <mat-option
          [value]="s"
          *ngFor="let s of strategyNames">
          <mat-icon class="mr-2">{{ strategiesUiConfig[s]?.icon }}</mat-icon>
          {{ s }}
        </mat-option>
      </mat-select>
      <mat-icon matPrefix class="mr-2">
        {{ strategiesUiConfig[strategy]?.icon }}
      </mat-icon>
      <mat-label>Strategy</mat-label>
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class StrategySelectComponent {
  strategies: { [name: string]: StrategyCredentials };
  strategyNames: string[];

  readonly strategiesUiConfig = strategiesUiConfig;

  private _strategy: string;
  @Input()
  set strategy(currentStrategyName: string) {
    const changed = this._strategy !== currentStrategyName;
    this._strategy = currentStrategyName;
    if (changed) {
      this.strategyChange.next(currentStrategyName);
    }
  }
  get strategy(): string {
    return this._strategy;
  }
  @Output() strategyChange = new Subject<string>();

  constructor(
    @Optional()
    @Inject(RX_CUSTOM_STRATEGIES)
    private customStrategies: { [name: string]: StrategyCredentials }[],
    @Inject(RX_DEFAULT_STRATEGY)
    private defaultStrategy: string
  ) {
    this._strategy = this.defaultStrategy;
    this.strategies = this.customStrategies.reduce((a, i) => mergeStrategies(a, i), internalStrategies);
    this.strategyNames = dictionaryToArray(this.strategies).map((str: any) => str.name);
  }

}
