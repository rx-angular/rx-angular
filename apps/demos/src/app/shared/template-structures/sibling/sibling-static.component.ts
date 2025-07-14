import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { toBooleanArray } from './utils';

@Component({
  selector: 'rxa-sibling-static',
  template: `
    <rxa-visualizer>
      <p visualizerHeader>{{ siblings.length }} Siblings Static</p>
      <div class="w-100 siblings">
        @for (sibling of siblings; track trackBy($index, sibling)) {
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
export class SiblingStaticComponent {
  siblings = [];
  filled = false;
  @Input()
  set count(num: number) {
    this.siblings = toBooleanArray(num);
    this.filled = !this.filled;
  }

  @Input()
  value: any;

  trackBy = (i: number, sibling: boolean) => i;
}
