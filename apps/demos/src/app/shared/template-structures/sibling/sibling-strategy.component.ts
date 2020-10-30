import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { toBooleanArray } from './utils';
import { RX_DEFAULT_STRATEGY } from '../../render-stragegies';

const chunk = (arr, n) => arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];

@Component({
  selector: 'rxa-sibling-strategy',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h3>{{siblings.length}} Siblings Strategy: {{strategyChange$ | push}}</h3>
      </div>
      <div class="w-100">
        <ng-container *ngFor="let sibling of siblings; trackBy:trackBy">
          <div class="sibling" *rxLet="filled$; let f; strategy: strategyChange$" [ngClass]="{filled: f}" >&nbsp;</div>
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
export class SiblingStrategyComponent {

  siblings = [];
  filled$ = new BehaviorSubject<boolean>(false);
  strategyChange$ = new BehaviorSubject<string>(this.defaultStrategy);

  @Input()
  set count(num: number | string) {
    this.siblings = toBooleanArray(parseInt(num as any, 10));
    this.filled$.next(!this.filled$.getValue());
  };

  @Input()
  value: any;

  @Input()
  set strategy(strategy: string) {
    this.strategyChange$.next(strategy)
  };

  trackBy = i => i;

  constructor(
    @Inject(RX_DEFAULT_STRATEGY) private defaultStrategy: string
  ) {

  }

}

