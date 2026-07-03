import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DataService } from './shared/data.service';
import { VisualizerComponent } from '../../../shared/debug-helper/visualizer/visualizer/visualizer.component';
import {
  MatButtonToggleGroup,
  MatButtonToggle,
} from '@angular/material/button-toggle';
import { V1AComponent } from './native-v/v1-a.component';
import { V2AComponent } from './push-v/v2-a.component';
import { V3AComponent } from './rx-let-v/v3-a.component';
import { V4AComponent } from './rx-form-v/v4-a.component';

@Component({
  selector: 'rxa-global-order',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>Custom Strategy - Parent component</h2>
        <br />
        <mat-button-toggle-group
          name="visibleExamples"
          aria-label="Visible Examples"
          [value]="displayStates.none"
          #group="matButtonToggleGroup"
        >
          <mat-button-toggle [value]="displayStates.none"
            >None</mat-button-toggle
          >
          <mat-button-toggle [value]="displayStates.native"
            >Angular Native</mat-button-toggle
          >
          <mat-button-toggle [value]="displayStates.push"
            >RxAngular push
          </mat-button-toggle>
          <mat-button-toggle [value]="displayStates.rxLet"
            >RxAngular *rxLet</mat-button-toggle
          >
          <mat-button-toggle [value]="displayStates.rxForm"
            >Angular Reactive Forms</mat-button-toggle
          >
          <mat-button-toggle [value]="displayStates.all">All</mat-button-toggle>
        </mat-button-toggle-group>
      </div>
      <div class="row w-100">
        @if (
          group.value === displayStates.native ||
          group.value === displayStates.all
        ) {
          <div class="col">
            <rxa-v1-a></rxa-v1-a>
          </div>
        }
        @if (
          group.value === displayStates.push ||
          group.value === displayStates.all
        ) {
          <div class="col">
            <rxa-v2-a></rxa-v2-a>
          </div>
        }
        @if (
          group.value === displayStates.rxLet ||
          group.value === displayStates.all
        ) {
          <div class="col">
            <rxa-v3-a></rxa-v3-a>
          </div>
        }
        @if (
          group.value === displayStates.rxForm ||
          group.value === displayStates.all
        ) {
          <div class="col">
            <rxa-v4-a></rxa-v4-a>
          </div>
        }
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    VisualizerComponent,
    MatButtonToggleGroup,
    MatButtonToggle,
    V1AComponent,
    V2AComponent,
    V3AComponent,
    V4AComponent,
  ],
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

  constructor(public data: DataService) {}
}
