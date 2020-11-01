import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { toBooleanArray } from './utils';
import { RX_PRIMARY_STRATEGY } from '../../render-stragegies';

const chunk = (arr, n) => arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];

@Component({
  selector: 'rxa-sibling-custom',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h3>{{siblings.length}} Siblings Custom Strategy</h3>
        <rxa-strategy-select (strategyChange)="strategyChange$.next($event)"></rxa-strategy-select>
        <button mat-button [unpatch] (click)="filled$.next(!filled$.getValue())">DoChange</button>
      </div>
      <div class="w-100 siblings">
        <div class="sibling" *ngFor="let sibling of siblings; trackBy:trackBy">
          <div *rxLet="filled$; let f; strategy: strategyChange$" [ngClass]="{filled: f}" >&nbsp;</div>
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
export class SiblingCustomComponent {

  siblings = [];
  filled$ = new BehaviorSubject<boolean>(false);
  strategyChange$ = new BehaviorSubject<string>(this.defaultStrategy);

  @Input()
  set count(num: number) {
    this.siblings = toBooleanArray(num);
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
    @Inject(RX_PRIMARY_STRATEGY) private defaultStrategy: string
  ) {

  }

}

