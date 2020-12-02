import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'rxa-global-order',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h1 class="mat-headline">Global Order</h1>
        <mat-button-toggle-group
          name="visibleExamples"
          aria-label="Visible Examples"
          [value]="displayStates.all"
          #group="matButtonToggleGroup">
          <mat-button-toggle [value]="displayStates.native">Native</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.rxa">RxA</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.all">All</mat-button-toggle>
        </mat-button-toggle-group>
      </ng-container>
      <div class="row w-100">
        <div class="col" *ngIf="visible(group, displayStates.native)">
          <rxa-a1></rxa-a1>
        </div>
        <div class="col" *ngIf="visible(group, displayStates.rxa)">
          <rxa-a2></rxa-a2>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class GlobalOrderComponent {

  displayStates = {
    none: 0,
    all: 1,
    native: 2,
    rxa: 3
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
