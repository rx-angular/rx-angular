import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'rxa-recursive-static',
  template: `
    <ng-container *ngIf="level === 0; else: branch">
      <rxa-visualizer>
        <p visualizerHeader>Level {{total - level}}</p>
        <rxa-renders [value$]="value"></rxa-renders>
      </rxa-visualizer>
    </ng-container>
    <ng-template #branch>
      <rxa-visualizer>
        <p visualizerHeader>Level {{total - level}}</p>
        <rxa-recursive-static [total]="total" [level]="level-1" [value]="value"></rxa-recursive-static>
      </rxa-visualizer>
    </ng-template>
  `,
  host: {
    class: 'd-flex w-100'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecursiveStaticComponent {

  @Input()
  set depth(d) {
    this.total = d;
    this.level = this.total - 1;
  }

  @Input()
  total = 0;

  @Input()
  level = 0;

  @Input()
  value;

}
