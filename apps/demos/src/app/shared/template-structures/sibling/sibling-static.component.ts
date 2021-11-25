import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { toBooleanArray } from './utils';

@Component({
  selector: 'rxa-sibling-static',
  template: `
    <rxa-visualizer>
      <p visualizerHeader>{{siblings.length}} Siblings Static</p>
      <div class="w-100 siblings">
        <span class="sibling" [ngClass]="{filled: sibling}" *ngFor="let sibling of siblings; trackBy:trackBy">
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
export class SiblingStaticComponent {
  siblings = [];
  filled = false;
  @Input()
  set count(num: number) {
    this.siblings = toBooleanArray(num);
    this.filled = !this.filled;
  };

  @Input()
  value: any;

  trackBy = i => i

}
