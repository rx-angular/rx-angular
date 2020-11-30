import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'rxa-global-order',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h1 class="mat-headline">Passing Values</h1>
      </ng-container>
      <div class="row w-100" *ngIf="isVisible">
        <div class="col">
          <rxa-a></rxa-a>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class GlobalOrderComponent {
  min = 0;
  max = 5;

  displayStates = {
    none: 0,
    all: 1,
    static: 2,
    observable: 3
  };
  isVisible = true;
  btnBothClick$ = new BehaviorSubject<any>(1);

  private _depth = 5;
  set depth(depth: number) {
    this._depth = depth >= 1 ? depth : 1;
  }

  get depth(): number {
    return this._depth;
  }

  selected(group, choice) {
    return group.value === choice;
  }

  visible(group, choice) {
    return group.value === choice || group.value === this.displayStates.all;
  }

}
