import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { dictionaryToArray, RxState, select } from '@rx-angular/state';
import { RxChangeDetectorRef } from '../../../rx-change-detector-ref/rx-change-detector-ref.service';
import { RenderStrategy, StrategySelection } from '@rx-angular/template';

@Component({
  selector: 'rxa-strategy-select',
  template: `
    <label>Current Strategy: {{ currentStrategyName$ | push }}</label>
    <select (change)="strategyChange.next($event.target.value)" class="block">
      <option
        [value]="s"
        [selected]="(currentStrategyName$ | push) === s"
        *ngFor="let s of strategyNames$ | push"
      >
        {{ s }}
      </option>
    </select>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class StrategySelectComponent {
  @Input() set strategies(strategies$: Observable<StrategySelection>) {
    this.state.connect('strategies', strategies$);
  }
  @Input() set currentStrategy(currentStrategy$: Observable<RenderStrategy>) {
    this.state.connect('currentStrategy', currentStrategy$);
  }

  @Output() strategyChange = new Subject<string>();
  currentStrategyName$ = this.state.select(
    select('currentStrategy'),
    map((s) => s.name)
  );
  strategyNames$ = this.state.select(
    select('strategies'),
    map((s) => dictionaryToArray(s).map((str: any) => str.name))
  );
  constructor(
    private state: RxState<{
      currentStrategy: RenderStrategy;
      strategies: StrategySelection;
    }>,
    public rxCdRef: RxChangeDetectorRef
  ) {}
}
