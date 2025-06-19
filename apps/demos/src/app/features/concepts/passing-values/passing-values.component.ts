import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'rxa-passing-values',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h1 class="mat-headline">Passing Values</h1>
        <div class="row">
          <div class="col-sm-12 col-md-12">
            <mat-form-field>
              <mat-label>Nesting Level</mat-label>
              <input matInput type="number" [(ngModel)]="depth" />
            </mat-form-field>
            <mat-form-field>
              <mat-label>Min Value</mat-label>
              <input matInput type="number" [(ngModel)]="min" />
            </mat-form-field>
            <mat-form-field>
              <mat-label>Max Value</mat-label>
              <input matInput type="number" [(ngModel)]="max" />
            </mat-form-field>
            <div>
              <mat-button-toggle-group
                name="visibleExamples"
                aria-label="Visible Examples"
                [value]="displayStates.all"
                #group="matButtonToggleGroup"
              >
                <mat-button-toggle [value]="displayStates.static"
                  >Static</mat-button-toggle
                >
                <mat-button-toggle [value]="displayStates.observable"
                  >Observable</mat-button-toggle
                >
                <mat-button-toggle [value]="displayStates.all"
                  >All</mat-button-toggle
                >
              </mat-button-toggle-group>
              <button
                mat-raised-button
                class="ml-2"
                (click)="isVisible = !isVisible"
              >
                Toggle visibility to reset
              </button>
            </div>
          </div>
        </div>
      </ng-container>
      @if (isVisible) {
        <div class="row w-100">
          @if (visible(group, displayStates.static)) {
            <div class="col">
              <h2 class="mat-subheader">Static</h2>
              <rxa-value-provider
                [min]="min"
                [max]="max"
                [changes$]="btnBothClick$"
                #staticVal="rxaValueProvider"
              ></rxa-value-provider>
              <div class="mb-1">
                <button mat-mini-fab (click)="staticVal.next()">
                  <mat-icon>add</mat-icon>
                </button>
              </div>
              <rxa-recursive-static
                [depth]="depth"
                [value]="staticVal.int"
              ></rxa-recursive-static>
            </div>
          }
          @if (visible(group, displayStates.observable)) {
            <div class="col">
              <h2 class="mat-subheader">Observable</h2>
              <rxa-value-provider
                [min]="min"
                [max]="max"
                [changes$]="btnBothClick$"
                #observableVal="rxaValueProvider"
              ></rxa-value-provider>
              <div class="mb-1">
                <button mat-mini-fab [unpatch] (click)="observableVal.next()">
                  <mat-icon>add</mat-icon>
                </button>
              </div>
              <rxa-recursive-observable
                [depth]="depth"
                [value$]="observableVal.int$"
              ></rxa-recursive-observable>
            </div>
          }
        </div>
      }
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: false,
})
export class PassingValuesComponent {
  min = 0;
  max = 5;

  displayStates = {
    none: 0,
    all: 1,
    static: 2,
    observable: 3,
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
