import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { toBooleanArray } from './utils';

const chunk = (arr, n) => arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];

@Component({
  selector: 'rxa-sibling-async',
  template: `
    <rxa-visualizer>
      <p visualizerHeader>{{siblings.length}}  Async</p>
      <div class="w-100">
        <span class="sibling" [ngClass]="{filled: sibling}" *ngFor="let sibling of siblings$ | async; trackBy:trackBy;">
          &nbsp;
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
export class SiblingAsyncComponent {

  siblings = [];
  siblings$ = new ReplaySubject<any[]>(1);

  @Input()
  set count(num: number) {
    this.siblings = toBooleanArray(num);
    this.siblings$.next(this.siblings);
  };

  @Input()
  value: any;

  trackBy = i => i;

}

