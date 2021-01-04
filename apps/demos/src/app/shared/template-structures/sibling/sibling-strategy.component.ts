import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { toBooleanArray } from './utils';
import { RX_CUSTOM_STRATEGIES, RX_PRIMARY_STRATEGY } from '../../../rx-angular-pocs';
import { RxState } from '@rx-angular/state';
import { map } from 'rxjs/operators';

const chunk = (arr, n) => arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];

@Component({
  selector: 'rxa-sibling-strategy',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h3>{{siblings.length}} Siblings</h3>
      </div>
      <div class="siblings">
        <div class="sibling" *rxFor="let sibling of siblings$; trackBy:trackBy">
          <div *rxLet="filled$; let f; strategy: strategy$" [ngClass]="{filled: f}">

          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  host: {
    class: 'd-flex w-100'
  },
  styleUrls: ['./sibling.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiblingStrategyComponent extends RxState<{ siblings: any[], strategy: string, filled: boolean }> {
  filled$ = this.select('filled').pipe(
    //map(() => toBoolean(toRandom()))
  );
  siblings$ = this.select('siblings');
  siblings = [];

  strategy$ = this.select('strategy');

  @Input()
  set count(num$: Observable<number | string>) {
    this.connect('siblings', num$.pipe(map(num => {
      this.siblings = toBooleanArray(parseInt(num as any, 10));
      return this.siblings;
    })));
  };

  @Input()
  set filled(filled$: Observable<boolean>) {
    this.connect('filled', filled$);
  }

  @Input()
  value: any;

  @Input()
  set strategy(strategy: string) {
    this.set({ strategy });
  };

  trackBy = i => i;

  constructor(
    @Inject(RX_CUSTOM_STRATEGIES) private strategies: string,
    @Inject(RX_PRIMARY_STRATEGY) private defaultStrategy: string
  ) {
    super();
    this.set({
      strategy: defaultStrategy,
      filled: true
    });
  }

}

