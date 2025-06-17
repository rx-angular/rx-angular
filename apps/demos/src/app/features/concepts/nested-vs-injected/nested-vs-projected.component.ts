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
          #group="matButtonToggleGroup"
        >
          <mat-button-toggle [value]="displayStates.nested"
            >Nested</mat-button-toggle
          >
          <mat-button-toggle [value]="displayStates.projected"
            >Projected</mat-button-toggle
          >
          <mat-button-toggle [value]="displayStates.all">All</mat-button-toggle>
        </mat-button-toggle-group>
        <button mat-raised-button class="ml-2" (click)="isVisible = !isVisible">
          Toggle visibility to reset
        </button>
      </div>
      @if (isVisible) {
        <div class="row">
          @if (visible(group, displayStates.nested)) {
            <div class="col">
              <h2>Nested</h2>
              <rxa-cd-nested></rxa-cd-nested>
            </div>
          }
          @if (visible(group, displayStates.projected)) {
            <div class="col">
              <h2>Projected</h2>
              <rxa-cd-injected></rxa-cd-injected>
            </div>
          }
        </div>
      }
    </rxa-visualizer>
  `,
  providers: [CdHelper],
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: false,
})
export class NestedVsProjectedComponent {
  displayStates = {
    none: 0,
    all: 1,
    nested: 2,
    projected: 3,
  };
  isVisible = true;

  visible(group, choice) {
    return group.value === choice || group.value === this.displayStates.all;
  }
}
