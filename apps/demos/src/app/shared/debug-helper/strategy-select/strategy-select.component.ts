import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import {
  MatFormField,
  MatSelect,
  MatSelectTrigger,
  MatOption,
  MatLabel,
} from '@angular/material/select';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { MatIcon } from '@angular/material/icon';
import { RxFor } from '@rx-angular/template/for';

const strategiesUiConfig: { [key: string]: { name: string; icon: string } } = {
  local: { name: 'local', icon: 'call_split' },
  global: { name: 'global', icon: 'vertical_align_bottom' },
  detach: { name: 'detach', icon: 'play_for_work' },
  noop: { name: 'noop', icon: 'block' },
  postTask: { name: 'postTask', icon: 'science' },
  chunk: { name: 'chunk', icon: 'link' },
  native: { name: 'native', icon: 'find_replace' },
};

@Component({
  selector: 'rxa-strategy-select',
  template: `
    <mat-form-field>
      <mat-select
        #i
        [value]="strategyProvider.primaryStrategy"
        (valueChange)="setCurrentStrategy(i.value)"
      >
        <mat-select-trigger>
          {{ strategyProvider.primaryStrategy }}
        </mat-select-trigger>
        <mat-option [value]="s" *rxFor="let s of stratNames$">
          <mat-icon class="mr-2">{{ strategiesUiConfig[s]?.icon }}</mat-icon>
          {{ s }}
        </mat-option>
      </mat-select>
      <mat-icon matPrefix class="mr-2">
        {{ strategiesUiConfig[strategyProvider.primaryStrategy]?.icon }}
      </mat-icon>
      <mat-label>Strategy</mat-label>
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatSelect,
    MatIcon,
    MatFormField,
    MatSelectTrigger,
    MatOption,
    MatLabel,
    RxFor,
  ],
})
export class StrategySelectComponent {
  protected strategyProvider = inject(RxStrategyProvider);

  readonly strategiesUiConfig = strategiesUiConfig;

  readonly stratNames$ = this.strategyProvider.strategyNames$;

  readonly strategyChange = output<string>();

  setCurrentStrategy(strategy: string) {
    this.strategyProvider.primaryStrategy = strategy;
    this.strategyChange.emit(strategy);
  }
}
