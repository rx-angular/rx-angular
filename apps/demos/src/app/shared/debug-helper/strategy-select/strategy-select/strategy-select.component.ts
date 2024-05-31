import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { RxState } from '@rx-angular/state';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { map, skip } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

const strategiesUiConfig = {
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
    <mat-form-field appearance="fill">
      <mat-select
        #i
        [value]="strategyProvider.primaryStrategy"
        (valueChange)="strategyProvider.primaryStrategy = i.value"
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
  providers: [RxState],
})
export class StrategySelectComponent {
  readonly strategiesUiConfig = strategiesUiConfig;

  readonly stratNames$ = this.strategyProvider.strategyNames$;
  readonly strategiesRendered$ = new Subject<any>();

  @ViewChild(MatSelect) select: MatSelect;

  @Output() strategyChange = new EventEmitter<string>();

  constructor(
    public strategyProvider: RxStrategyProvider,
    private state: RxState<any>,
    private cdRef: ChangeDetectorRef,
  ) {
    state.hold(
      this.strategyProvider.primaryStrategy$.pipe(
        map((s) => s.name),
        skip(1), // skip(1) to make it "COLD"...
      ),
      (primaryStrategyChanged) =>
        this.strategyChange.next(primaryStrategyChanged),
    );
  }
}
