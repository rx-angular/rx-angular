import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { toBooleanArray } from './utils';

const chunk = (arr, n) =>
  arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];

@Component({
  selector: 'rxa-sibling-async',
  template: `
    <rxa-visualizer>
      <p visualizerHeader>{{ siblings.length }} Async</p>
      <div class="w-100 siblings">
        @for (sibling of siblings$ | async; track trackBy($index, sibling)) {
          <span class="sibling" [ngClass]="{ filled: sibling }">
            <div [ngClass]="{ filled: filled }">&nbsp;</div>
          </span>
        }
      </div>
    </rxa-visualizer>
  `,
  host: {
    class: 'd-flex w-100',
  },
  styleUrls: ['./sibling.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SiblingAsyncComponent {
  siblings = [];
  siblings$ = new ReplaySubject<any[]>(1);
  filled = false;

  @Input()
  set count(num: number) {
    this.siblings = toBooleanArray(num);
    this.siblings$.next(this.siblings);
    this.filled = !this.filled;
  }

  @Input()
  value: any;

  trackBy = (i: number, sibling: boolean) => i;
}
