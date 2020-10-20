import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReplaySubject, timer } from 'rxjs';
import { concatMap, mapTo, mergeMap, scan } from 'rxjs/operators';
import { insert } from '@rx-angular/state';

const chunk = (arr, n) => arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];

@Component({
  selector: 'rxa-sibling-progressive',
  template: `
    <rxa-visualizer>
      <p visualizerHeader>{{siblings.length}} Siblings Progressive</p>
      <div class="w-100">
        <span class="sibling" *ngFor="let sibling of siblings$ | push; trackBy:trackBy">
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
export class SiblingProgressiveComponent {

  siblings = [];
  siblingsSubject = new ReplaySubject<any[]>(1);
  siblings$ = this.siblingsSubject.pipe(
    mergeMap(arr => chunk(arr, arr.length / 10)),
    concatMap(v => timer(0).pipe(mapTo(v))),
    scan(insert)
  );

  @Input()
  set count(num: number) {
    this.siblings = new Array(num).fill(0).map((_, idx) => idx);
    this.siblingsSubject.next(this.siblings);
  };

  @Input()
  value: any;

  trackBy = i => i;

}

