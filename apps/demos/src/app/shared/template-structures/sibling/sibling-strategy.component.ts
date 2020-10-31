import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { toBooleanArray } from './utils';
import { RX_DEFAULT_STRATEGY } from '../../render-stragegies';
import { RxState } from '../../../../../../../libs/state/src/lib';
import { map } from 'rxjs/operators';

const chunk = (arr, n) => arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];

@Component({
  selector: 'rxa-sibling-strategy',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h3>{{siblings.length}} Siblings</h3>
      </div>
      <div class="w-100">
        <ng-container *ngFor="let sibling of siblings; trackBy:trackBy">
          <div class="sibling" *rxLet="filled$; let f; strategy: strategy$" [ngClass]="{filled: f}">&nbsp;</div>
        </ng-container>
      </div>
    </rxa-visualizer>
  `,
  host: {
    class: 'd-flex w-100'
  },
  styleUrls: ['./sibling.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiblingStrategyComponent extends RxState<{ siblings: any[], strategy: string,  filled: boolean }> {

  filled$ = this.select('filled');
  siblings$ = this.select('siblings');
  siblings = [];
  strategy$ = this.select('strategy');
  m$ = this.$;

  @Input()
  set count(num$: Observable<number | string>) {
    this.connect('siblings', num$.pipe(map(num => {
      this.siblings = toBooleanArray(parseInt(num as any, 10));
      this.set(s => ({ filled: !s.filled }));
      return this.siblings;
    })));

  };

  @Input()
  value: any;

  @Input()
  set strategy(strategy: string) {
    this.set({strategy});
  };

  trackBy = i => i;

  constructor(
    @Inject(RX_DEFAULT_STRATEGY) private defaultStrategy: string
  ) {
    super();
    this.set({
      strategy: defaultStrategy,
      filled: true
    });
  }

}

