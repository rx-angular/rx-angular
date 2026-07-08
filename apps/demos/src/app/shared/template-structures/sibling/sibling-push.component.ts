import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RxPush } from '@rx-angular/template/push';
import { ReplaySubject } from 'rxjs';
import { PushPipe } from '../../../rx-angular-pocs/template/pipes/push/push.pipe';
import { VisualizerComponent } from '../../debug-helper/visualizer/visualizer/visualizer.component';
import { toBooleanArray } from './utils';

const chunk = (arr, n) =>
  arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];

@Component({
  selector: 'rxa-sibling-push',
  template: `
    <rxa-visualizer>
      <p visualizerHeader>{{ siblings.length }} Siblings Push</p>
      <div class="w-100 siblings">
        @for (sibling of siblings$ | push; track trackBy($index, sibling)) {
          <span class="sibling">
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
  imports: [VisualizerComponent, NgClass, RxPush, PushPipe],
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
  }

  @Input()
  value: any;

  trackBy = (i: number, sibling: boolean) => i;
}
