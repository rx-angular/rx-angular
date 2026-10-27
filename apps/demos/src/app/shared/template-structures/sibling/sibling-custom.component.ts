import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RxFor } from '../../../rx-angular-pocs/template/directives/for/rx-for.directive';
import { StrategySelectComponent } from '../../debug-helper/strategy-select/strategy-select.component';
import { VisualizerComponent } from '../../debug-helper/visualizer/visualizer/visualizer.component';
import { WorkComponent } from '../../debug-helper/work/work.component';
import { toIntArray } from './utils';

const chunk = (arr, n) =>
  arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];

@Component({
  selector: 'rxa-sibling-custom',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h3>{{ siblings.length }} Siblings Custom Strategy</h3>
        <rxa-strategy-select
          (strategyChange)="strategyChange$.next($event)"
        ></rxa-strategy-select>
        <button mat-button [unpatch] (click)="filled$.next(num)">
          DoChange
        </button>
      </div>
      <div class="w-100 siblings">
        <div
          class="sibling"
          *rxFor="let sibling of siblings$; trackBy: trackBy"
        >
          <rxa-work [load]="sibling"></rxa-work>
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: {
    class: 'd-flex w-100',
  },
  styleUrls: ['./sibling.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    VisualizerComponent,
    StrategySelectComponent,
    MatButton,
    RxUnpatch,
    RxFor,
    WorkComponent,
  ],
})
export class SiblingCustomComponent {
  num = 0;
  siblings = [];
  filled$ = new BehaviorSubject<number>(this.num);
  strategyChange$ = new BehaviorSubject<string>(
    this.strategyProvider.primaryStrategy,
  );
  siblings$ = this.filled$.pipe(map((num) => toIntArray(num)));

  @Input()
  set count(num: number) {
    this.num = num;
    this.filled$.next(num);
  }

  @Input()
  value: any;

  @Input()
  set strategy(strategy: string) {
    this.strategyChange$.next(strategy);
  }

  trackBy = (i) => i;

  constructor(private strategyProvider: RxStrategyProvider) {}
}
