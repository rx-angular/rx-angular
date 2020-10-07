import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';

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
              <input matInput type="number" [(ngModel)]="level">
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
              <button mat-raised-button color="primary" (click)="btnBothClick$.next($event)">
                <mat-icon class="mr-2">add</mat-icon>
                Update Both
              </button>
              <mat-button-toggle-group
                name="visibleExamples"
                aria-label="Visible Examples"
                [value]="displayStates.all"
                #group="matButtonToggleGroup">
                <mat-button-toggle [value]="displayStates.nativeStatic">Native Static</mat-button-toggle>
                <mat-button-toggle [value]="displayStates.rxAngularReactive">RxAngular Reactive</mat-button-toggle>
                <mat-button-toggle [value]="displayStates.all">All</mat-button-toggle>
              </mat-button-toggle-group>
            </div>
          </div>
        </div>
      </ng-container>
      <div class="row w-100">
        <div class="col-sm-12 col-md-6"
             *ngIf="group.value === displayStates.nativeStatic ||
                    group.value === displayStates.all">
          <h2 class="mat-subheader">Static Values</h2>
          <rxa-value-provider [min]="min" [max]="max" [changes$]="btnBothClick$"
                              #staticVal="rxaValueProvider"></rxa-value-provider>
          <div>
            <strong>Current value:</strong> {{ staticVal.int }}
          </div>
          <div class="mb-1">
            <button mat-mini-fab (click)="staticVal.next()">
              <mat-icon>add</mat-icon>
            </button>
          </div>
          <rxa-recursive [level]="level" [value]="staticVal.int"></rxa-recursive>
        </div>
        <div class="col-sm-12 col-md-6"
             *ngIf="group.value === displayStates.rxAngularReactive ||
                    group.value === displayStates.all">
          <h2 class="mat-subheader">Reactive Values</h2>
          <rxa-value-provider [changes$]="btnBothClick$" #reactiveVal="rxaValueProvider"></rxa-value-provider>
          <div>
            <strong>Current value:</strong> {{ reactiveVal.int$ | push }}
          </div>
          <div class="mb-1">
            <button mat-mini-fab unpatch (click)="reactiveVal.next()">
              <mat-icon>add</mat-icon>
            </button>
          </div>
          <rxa-recursive-reactive [level]="level" [value$]="reactiveVal.int$">
          </rxa-recursive-reactive>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class PassingValuesComponent {
  min = 0;
  max = 5;

  displayStates = {
    nativeStatic: 0,
    nativeReactive: 1,
    rxAngularReactive: 2,
    all: 3
  }

  btnBothClick$ = new Subject<Event>();

  private _level = 3;
  set level(level: number) {
    this._level = level >= 1 ? level : 1;
  }

  get level(): number {
    return this._level;
  }
}
