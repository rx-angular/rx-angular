import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { concat, ReplaySubject, timer } from 'rxjs';
import { concatMap, finalize, mapTo, mergeMap, scan, startWith, switchMap, tap } from 'rxjs/operators';
import { insert } from '@rx-angular/state';
import { toBooleanArray } from './utils';
import { measure$ } from '../../utils/measure';

const chunk = (arr, n) => arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];

@Component({
  selector: 'rxa-sibling-progressive',
  template: `
    <rxa-visualizer>
      <p visualizerHeader>{{siblings.length}} Siblings Progressive</p>
      <div class="w-100">
        <span class="sibling" [ngClass]="{filled: sibling}" *ngFor="let sibling of siblings$ | push; trackBy:trackBy">
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
export class SiblingProgressiveComponent {

  siblings = [];
  siblingsSubject = new ReplaySubject<any[]>(1);
  siblings$ = this.siblingsSubject.pipe(
    switchMap(a => concat([],chunk(a, a.length / 10)).pipe(
      concatMap(v => timer(0).pipe(mapTo(v))),
      scan(insert),
      // as rendering is sync it will be included (parts missing) in the measurement
      measure$('progressive rendering '+a.length + ': ')
    ))
  );

  @Input()
  set count(num: number) {
    this.siblings = toBooleanArray(num);
    this.siblingsSubject.next(this.siblings);
  };

  @Input()
  value: any;

  trackBy = i => i;

}

