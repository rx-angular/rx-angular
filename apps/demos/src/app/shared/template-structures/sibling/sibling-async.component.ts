import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';

const chunk = (arr, n) => arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];

@Component({
  selector: 'rxa-sibling-async',
  template: `
    <rxa-visualizer>
      <p visualizerHeader>{{siblings.length}}  Async</p>
      <div class="w-100">
        <span class="sibling" *ngFor="let sibling of siblings$ | async; trackBy:trackBy">
          &nbsp;
        </span>
      </div>
    </rxa-visualizer>
  `,
  host: {
    class: 'd-flex w-100'
  },
  styles: [`
    .sibling {
      width: 3px;
      height: 3px;
      float: left;
      margin: 0 1px 1px 0;
      background-color: #fafbfc;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SiblingAsyncComponent {

  siblings = [];
  siblings$ = new ReplaySubject<any[]>(1);

  @Input()
  set count(num: number) {
    this.siblings = new Array(num).fill(0).map((_, idx) => idx);
    this.siblings$.next(this.siblings);
  };

  @Input()
  value: any;

  trackBy = i => i;

}

