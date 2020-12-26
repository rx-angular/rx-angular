import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-custom-strategy',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>Custom Strategy - Parent component</h2>
        <br/>
        <mat-button-toggle-group name="visibleExamples"
                                 aria-label="Visible Examples"
                                 [value]="displayStates.all"
        #group="matButtonToggleGroup">
          <mat-button-toggle [value]="displayStates.none">None</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.native">Angular Native</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.rxLet">RxAngular *rxLet
          </mat-button-toggle>
          <mat-button-toggle [value]="displayStates.pushCustomStrategy">RxAngular push + custom strategy
          </mat-button-toggle>
          <mat-button-toggle [value]="displayStates.all">All</mat-button-toggle>
        </mat-button-toggle-group>
      </div>
      <div class="row w-100">
        <div class="col" *ngIf="group.value === displayStates.native || group.value === displayStates.all">

        </div>
        <div class="col" *ngIf="group.value === displayStates.rxLet || group.value === displayStates.all">

        </div>
        <div class="col" *ngIf="group.value === displayStates.pushCustomStrategy || group.value === displayStates.all">

        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PartialTreeUpdateContainerComponent {
  displayStates = {
    none: -1,
    all: 0,
    native: 1,
    rxLet: 2,
    pushCustomStrategy: 3,
  };
}
