import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { toBooleanArray } from './utils';

const chunk = (arr, n) => arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];

@Component({
  selector: 'rxa-sibling-custom',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h3>{{siblings.length}} Siblings Custom Strategy</h3>
        <rxa-strategy-select (strategyChange)="strategyChange$.next($event)"></rxa-strategy-select>
      </div>
      <div class="w-100">
        <ng-container *ngFor="let sibling of siblings; trackBy:trackBy">
          <div class="sibling" *rxLet="siblings$; let s;" [ngClass]="{filled: sibling}" >&nbsp;</div>
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
export class SiblingCustomComponent {

  siblings = [];
  siblings$ = new ReplaySubject<any[]>(1);
  strategyChange$ = new Subject<string>();

  @Input()
  set count(num: number) {
    this.siblings = toBooleanArray(num);
    this.siblings$.next(this.siblings);
  };

  @Input()
  value: any;

  trackBy = i => i;

}

