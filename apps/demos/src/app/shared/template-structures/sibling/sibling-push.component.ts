import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { toBooleanArray } from './utils';

const chunk = (arr, n) => arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];

@Component({
  selector: 'rxa-sibling-push',
  template: `
    <rxa-visualizer>
      <p visualizerHeader>{{siblings.length}} Siblings Push</p>
      <div class="w-100 siblings">
        <span class="sibling" *ngFor="let sibling of siblings$ | push; trackBy:trackBy">
            <div [ngClass]="{filled: filled}">&nbsp;</div>
        </span>
      </div>
    </rxa-visualizer>
  `,
  host: {
    class: 'd-flex w-100'
  },
  styleUrls: ['./sibling.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiblingPushComponent {

  siblings = [];
  filled = false;
  siblings$ = new ReplaySubject<any[]>(1);

  @Input()
  set count(num: number) {
    this.siblings = toBooleanArray(num);
    this.siblings$.next(this.siblings);
    this.filled = !this.filled;
  };

  @Input()
  value: any;

  trackBy = i => i;

}

