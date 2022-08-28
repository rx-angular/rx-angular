import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, share, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'rxa-push-basic-example',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h1 class="mat-headline">Push Pipe</h1>
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
                <mat-button-toggle [value]="displayStates.push">Push</mat-button-toggle>
                <mat-button-toggle [value]="displayStates.async">Async</mat-button-toggle>
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
             *ngIf="visible(group, displayStates.push)">
          <h2 class="mat-subheader">Push</h2>
          <rxa-value-provider [min]="min" [max]="max" [changes$]="btnBothClick$"
                              #staticVal="rxaValueProvider"></rxa-value-provider>
          <div class="mb-1">
            <button mat-mini-fab (click)="staticVal.next()">
              <mat-icon>add</mat-icon>
            </button>
          </div>
          <rxa-recursive-observable-work-push [depth]="depth"
                                              [value$]="staticVal.int$"></rxa-recursive-observable-work-push>
        </div>
        <div class="col"
             *ngIf="visible(group, displayStates.async)">
          <h2 class="mat-subheader">Async</h2>
          <rxa-value-provider [min]="min" [max]="max" [changes$]="btnBothClick$"
                              #observableVal="rxaValueProvider"></rxa-value-provider>
          <div class="mb-1">
            <button mat-mini-fab (click)="observableVal.next()">
              <mat-icon>add</mat-icon>
            </button>
          </div>
          <rxa-recursive-observable-work-async
            [depth]="depth" [value$]="observableVal.int$"></rxa-recursive-observable-work-async>
        </div>
      </div>
    </rxa-visualizer>
  `,
  styles: [`

  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PushVsAsyncComponent {

  private _depth = 5;
  set depth(depth: number) {
    this._depth = depth >= 1 ? depth : 1;
  }
  get depth(): number {
    return this._depth;
  }

  min = 0;
  max = 5;

  readonly updateClick = new Subject<void>();

  displayStates = {
    none: 0,
    all: 1,
    push: 2,
    async: 3
  };

  btnBothClick$ = new ReplaySubject<any>(1);
  readonly value$ = this.updateClick.pipe(
    map(() => Math.ceil(Math.random() * 100)),
    distinctUntilChanged(),
    share()
  )

  isVisible = true;

  selected(group, choice) {
    return group.value === choice;
  }

  visible(group, choice) {
    return group.value === choice || group.value === this.displayStates.all;
  }
}
