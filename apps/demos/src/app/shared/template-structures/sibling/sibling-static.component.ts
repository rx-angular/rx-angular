import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { toBooleanArray } from './utils';

@Component({
  selector: 'rxa-sibling-static',
  template: `
    <rxa-visualizer>
      <p visualizerHeader>{{siblings.length}} Siblings Static</p>
      <div class="w-100">
        <span class="sibling" [ngClass]="{filled: sibling}" *ngFor="let sibling of siblings; trackBy:trackBy">
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
export class SiblingStaticComponent {
  siblings = [];

  @Input()
  set count(num: number) {
    this.siblings = toBooleanArray(num);
  };

  @Input()
  value: any;

  trackBy = i => i

}
