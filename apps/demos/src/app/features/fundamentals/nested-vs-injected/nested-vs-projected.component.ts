import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdHelper } from '../../../shared/utils/cd-helper';

@Component({
  selector: 'rxa-cd',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h1>Nested vs Projected Components</h1>
        <mat-button-toggle-group
          name="visibleExamples"
          aria-label="Visible Examples"
          [value]="displayStates.all"
          #group="matButtonToggleGroup">
          <mat-button-toggle [value]="displayStates.nested">Nested</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.projected">Projected</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.all">All</mat-button-toggle>
        </mat-button-toggle-group>
        <button mat-raised-button class="ml-2" (click)="isVisible = !isVisible;">
          Toggle visibility to reset
        </button>
      </div>
      <div class="row" *ngIf="isVisible">
        <div class="col" *ngIf="visible(group, displayStates.nested)">
          <h2>Nested</h2>
          <rxa-cd-nested></rxa-cd-nested>
        </div>
        <div class="col" *ngIf="visible(group, displayStates.projected)">
          <h2>Projected</h2>
          <rxa-cd-injected></rxa-cd-injected>
        </div>
      </div>
    </rxa-visualizer>
  `,
  providers: [CdHelper],
  changeDetection: ChangeDetectionStrategy.Default
})
export class NestedVsProjectedComponent {

  displayStates = {
    none: 0,
    all: 1,
    nested: 2,
    projected: 3
  };
  isVisible = true;

  visible(group, choice) {
    return group.value === choice || group.value === this.displayStates.all;
  }
}
