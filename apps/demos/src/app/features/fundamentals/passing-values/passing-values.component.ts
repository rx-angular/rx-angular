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
                <mat-button-toggle [value]="displayStates.let">C Let</mat-button-toggle>
                <mat-button-toggle [value]="displayStates.let">Ev Let</mat-button-toggle>
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
          <rxa-recursive-static [depth]="depth" [value]="staticVal.int"></rxa-recursive-static>
        </div>
        <div class="col"
             *ngIf="visible(group, displayStates.observable)">
          <h2 class="mat-subheader">Observable</h2>
          <rxa-value-provider [min]="min" [max]="max" [changes$]="btnBothClick$"
                              #observableVal="rxaValueProvider"></rxa-value-provider>
          <div class="mb-1">
            <button mat-mini-fab [unpatch] (click)="observableVal.next()">
              <mat-icon>add</mat-icon>
            </button>
          </div>
          <rxa-recursive-observable [depth]="depth" [value$]="observableVal.int$"></rxa-recursive-observable>
        </div>
        <div class="col"
             *ngIf="visible(group, displayStates.async)">
          <h2 class="mat-subheader">Async</h2>
          <rxa-value-provider [changes$]="btnBothClick$" #asyncVal="rxaValueProvider"></rxa-value-provider>
          <div class="mb-1">
            <button mat-mini-fab (click)="asyncVal.next()">
              <mat-icon>add</mat-icon>
            </button>
          </div>
          <rxa-recursive-async [depth]="depth" [value]="asyncVal.int$ | async">
          </rxa-recursive-async>
        </div>
        <div class="col"
             *ngIf="visible(group, displayStates.push)">
          <h2 class="mat-subheader">Push</h2>
          <rxa-value-provider [changes$]="btnBothClick$" #pushVal="rxaValueProvider"></rxa-value-provider>
          <div class="mb-1">
            <button mat-mini-fab [unpatch] (click)="pushVal.next()">
              <mat-icon>add</mat-icon>
            </button>
          </div>
          <rxa-recursive-push [depth]="depth" [value]="pushVal.int$ | push">
          </rxa-recursive-push>
        </div>
        <div class="col"
             *ngIf="visible(group, displayStates.let)">
          <h2 class="mat-subheader">Let - <small>Component CD</small></h2>
          <rxa-value-provider [changes$]="btnBothClick$" #letVal="rxaValueProvider"></rxa-value-provider>
          <div class="mb-1">
            <button mat-mini-fab [unpatch] (click)="letVal.next()">
              <mat-icon>add</mat-icon>
            </button>
          </div>
          <rxa-recursive-component-let [depth]="depth" [value]="letVal.int$">
          </rxa-recursive-component-let>
        </div>
        <div class="col"
             *ngIf="visible(group, displayStates.let)">
          <h2 class="mat-subheader">Let - <small>EmbeddedView CD</small></h2>
          <rxa-value-provider [changes$]="btnBothClick$" #letVal="rxaValueProvider"></rxa-value-provider>
          <div class="mb-1">
            <button mat-mini-fab [unpatch] (click)="letVal.next()">
              <mat-icon>add</mat-icon>
            </button>
          </div>
          <rxa-recursive-embedded-view-let [depth]="depth" [value]="letVal.int$">
          </rxa-recursive-embedded-view-let>
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
    none: 0,
    all: 1,
    static: 2,
    observable: 3,
    async: 4,
    push: 5,
    let: 6
  };

  btnBothClick$ = new Subject<Event>();
  isVisible = true;

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
