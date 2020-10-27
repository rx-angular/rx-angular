import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'rxa-nested-component-structure',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h1 class="mat-headline">Nested Component Structure</h1>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <mat-form-field>
              <mat-label>Nesting Level</mat-label>
              <input matInput type="number" [(ngModel)]="depth">
            </mat-form-field>
            <mat-form-field>
              <mat-label>Min Value</mat-label>
              <input matInput type="number" [(ngModel)]="min">
            </mat-form-field>
            <mat-form-field>
              <mat-label>Max Value</mat-label>
              <input matInput type="number" [(ngModel)]="max">
            </mat-form-field>
            <div>
              <mat-button-toggle-group
                name="visibleExamples"
                aria-label="Visible Examples"
                [value]="displayStates.all"
                #group="matButtonToggleGroup">
                <mat-button-toggle [value]="displayStates.static">Static</mat-button-toggle>
                <mat-button-toggle [value]="displayStates.observable">Observable</mat-button-toggle>
                <mat-button-toggle [value]="displayStates.async">Async</mat-button-toggle>
                <mat-button-toggle [value]="displayStates.push">Push</mat-button-toggle>
                <mat-button-toggle [value]="displayStates.clet">C Let</mat-button-toggle>
                <mat-button-toggle [value]="displayStates.evlet">Ev Let</mat-button-toggle>
                <mat-button-toggle [value]="displayStates.all">All</mat-button-toggle>
              </mat-button-toggle-group>
              <button mat-raised-button class="ml-2" (click)="isVisible = !isVisible;">
                Toggle visibility to reset
              </button>
            </div>
          </div>
        </div>
      </ng-container>
      <div class="row w-100" *ngIf="isVisible">
        <div class="col" *ngIf="visible(group, displayStates.async)">
          <h2 class="mat-subheader">Async</h2>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class NestedNgIfComponent {
  min = 0;
  max = 5;

  displayStates = {
    none: 0,
    all: 1,
    static: 2,
    observable: 3,
    async: 4,
    push: 5,
    clet: 6,
    evlet: 7
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
