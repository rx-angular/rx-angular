import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'rxa-sibling-component-structure',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h1 class="mat-headline">Nested Component Structure</h1>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <mat-form-field>
              <mat-label>Num Siblings</mat-label>
              <input matInput type="number" [(ngModel)]="count">
            </mat-form-field>
            <div>
              <mat-button-toggle-group
                name="visibleExamples"
                aria-label="Visible Examples"
                [value]="displayStates.all"
                #group="matButtonToggleGroup">
                <mat-button-toggle [value]="displayStates.static">Static</mat-button-toggle>
                <mat-button-toggle [value]="displayStates.async">Async</mat-button-toggle>
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
        <div class="col"
             *ngIf="visible(group, displayStates.static)">
          <h2 class="mat-subheader">Static</h2>
          <rxa-value-provider [min]="min" [max]="max" [changes$]="btnBothClick$"
                              #staticVal="rxaValueProvider"></rxa-value-provider>
          <div class="mb-1">
            <button mat-mini-fab (click)="staticVal.next()">
              <mat-icon>add</mat-icon>
            </button>
          </div>
          <rxa-sibling-async [count]="count" [value]="staticVal.int"></rxa-sibling-async>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class SiblingComponentStructureComponent {
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

  private _count = 100;
  set count(depth: number) {
    this._count = depth >= 1 ? depth : 1;
  }

  get count(): number {
    return this._count;
  }

  selected(group, choice) {
    return group.value === choice;
  }

  visible(group, choice) {
    return group.value === choice || group.value === this.displayStates.all;
  }

}
