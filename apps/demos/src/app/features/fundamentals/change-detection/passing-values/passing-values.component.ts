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
              <input matInput type="number" [(ngModel)]="level" />
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
              <button
                mat-raised-button
                color="primary"
                (click)="btnBothClick$.next($event)"
              >
                <mat-icon class="mr-2">add</mat-icon>
                Increment Both
              </button>
              <button mat-raised-button color="primary" (click)="showStatic()">
                <mat-icon class="mr-2">add</mat-icon>
                Toggle static
              </button>
              <button
                mat-raised-button
                color="primary"
                (click)="showReactive()"
              >
                <mat-icon class="mr-2">add</mat-icon>
                Toggle reactive
              </button>
            </div>
          </div>
        </div>
      </ng-container>
      <div class="row w-100">
        <div class="col-sm-12 col-md-6" *ngIf="staticVisible">
          <h2 class="mat-subheader">Static Values</h2>
          <rxa-value-provider
            [min]="min"
            [max]="max"
            [changes$]="btnBothClick$"
            #static="rxaValueProvider"
          >
            <div><strong>Current value:</strong> {{ static.incremental }}</div>
            <div class="mb-1">
              <button mat-mini-fab (click)="static.next($event)">
                <mat-icon>add</mat-icon>
              </button>
            </div>
            <rxa-recursive
              [level]="level"
              [value]="static.incremental"
            ></rxa-recursive>
          </rxa-value-provider>
        </div>
        <div class="col-sm-12 col-md-6" *ngIf="reactiveVisible">
          <h2 class="mat-subheader">Reactive Values</h2>
          <rxa-value-provider
            [changes$]="btnBothClick$"
            #reactive="rxaValueProvider"
          >
            <div>
              <strong>Current value:</strong> {{ reactive.incremental$ | push }}
            </div>
            <div class="mb-1">
              <button mat-mini-fab unpatch (click)="reactive.next($event)">
                <mat-icon>add</mat-icon>
              </button>
            </div>
            <rxa-recursive-reactive
              [level]="level"
              [value$]="reactive.incremental$"
            ></rxa-recursive-reactive>
          </rxa-value-provider>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PassingValuesComponent {
  min = 0;
  max = 5;

  btnBothClick$ = new Subject<Event>();

  staticVisible = true;
  reactiveVisible = false;

  private _level = 3;
  set level(level: number) {
    this._level = level >= 1 ? level : 1;
  }

  get level(): number {
    return this._level;
  }

  showStatic() {
    this.staticVisible = !this.staticVisible;
  }
  showReactive() {
    this.reactiveVisible = !this.reactiveVisible;
  }
}
