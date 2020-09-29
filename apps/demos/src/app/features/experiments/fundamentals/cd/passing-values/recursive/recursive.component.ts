import { Component, Input } from '@angular/core';
import { RxState } from '@rx-angular/state';

@Component({
  selector: 'rxa-recursive',
  template: `
    <rxa-visualizer>
      <rxa-cd-trigger></rxa-cd-trigger>
      <ng-container *ngIf="level === 0; else: branch">
        {{value}}
      </ng-container>
      <ng-template #branch>
        <rxa-recursive [level]="level-1" [value]="value"></rxa-recursive>
      </ng-template>
    </rxa-visualizer>
  `
})
export class RecursiveComponent extends RxState<any> {

  @Input()
  level = 0;

  @Input()
  value;

}
