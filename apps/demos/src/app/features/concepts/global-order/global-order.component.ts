import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from './shared/data.service';

@Component({
  selector: 'rxa-global-order',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>Custom Strategy - Parent component</h2>
        <br/>
        <mat-button-toggle-group name="visibleExamples"
                                 aria-label="Visible Examples"
                                  [value]="displayStates.none"
        #group="matButtonToggleGroup">
          <mat-button-toggle [value]="displayStates.none">None</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.native">Angular Native</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.push">RxAngular push
          </mat-button-toggle>
          <mat-button-toggle [value]="displayStates.rxLet">RxAngular *rxLet</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.rxForm">Angular Reactive Forms</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.all">All</mat-button-toggle>
        </mat-button-toggle-group>
      </div>
      <div class="row w-100">
        <div class="col" *ngIf="group.value === displayStates.native || group.value === displayStates.all">
            <rxa-v1-a></rxa-v1-a>
        </div>
        <div class="col" *ngIf="group.value === displayStates.push || group.value === displayStates.all">
          <rxa-v2-a></rxa-v2-a>
        </div>
        <div class="col" *ngIf="group.value === displayStates.rxLet || group.value === displayStates.all">
          <rxa-v3-a></rxa-v3-a>
        </div>
        <div class="col" *ngIf="group.value === displayStates.rxForm || group.value === displayStates.all">
          <rxa-v4-a></rxa-v4-a>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalOrderComponent {
  displayStates = {
    none: -1,
    all: 0,
    native: 1,
    push: 2,
    rxLet: 3,
    rxForm: 4,
  };

  constructor(public data: DataService) {
  }
}
