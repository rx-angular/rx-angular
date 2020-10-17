import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject, EMPTY, interval, merge, Subject } from 'rxjs';
import { scan, share, switchMap } from 'rxjs/operators';
import { immutableArr, immutableIncArr } from '../utils';


@Component({
  selector: 'rxa-cd-embedded-view-parent06',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h2>
          rxFor POC
          <small>Nested Structures And Local Variables</small>
        </h2>
        <div>
          <mat-button-toggle-group name="visibleExamples"
                                   aria-label="Visible Examples"
                                   [value]="displayStates.all"
                                   #group="matButtonToggleGroup">
            <mat-button-toggle [value]="displayStates.native">Native</mat-button-toggle>
            <mat-button-toggle [value]="displayStates.rxAngularReactive">RxAngular *rxFor trackBy, distinctBy, select
            </mat-button-toggle>
            <mat-button-toggle [value]="displayStates.all">All</mat-button-toggle>
          </mat-button-toggle-group>
          <br/>
          <mat-form-field>
            <label>Work Load</label>
            <input matInput #load (input)="load$.next(load.value)">
          </mat-form-field>

        </div>
      </ng-container>

      <div class="row w-100">
        <!--  -->
        <div class="col-sm-6" *ngIf="group.value === displayStates.native || group.value === displayStates.all">
          <h2>Native Angular, *ngFor trackBy</h2>
          <p>
            <button mat-raised-button (click)="changeOneClick$.next(1)">
              update
            </button>
            <button mat-raised-button (click)="changeAllClick$.next(10)">
              Change all
            </button>
            <button mat-raised-button (click)="toggleIntervalClick$.next(10)">
              toggel interval
            </button>
          </p>
          <rxa-visualizer viewType="embedded-view" *ngFor="let value of array$ | async;trackBy: trackById">

              <ng-container *ngFor="let i of value.arr; trackBy: trackById">
                <rxa-rx-for-value [value]="i"></rxa-rx-for-value>
              </ng-container>
          </rxa-visualizer>
        </div>
        <div class="col-sm-6"
             *ngIf="group.value === displayStates.rxAngularReactive || group.value === displayStates.all">
          <h2>RxAngular, *rxFor trackBy, distinctBy, select</h2>
          <p>
            <button mat-raised-button [unpatch] (click)="changeOneClick$.next(1)">
              unpatched update
            </button>
            <button mat-raised-button [unpatch] (click)="changeAllClick$.next(10)">
              unpatched Change all
            </button>
            <button mat-raised-button [unpatch] (click)="toggleIntervalClick$.next(10)">
              unpatched toggel interval
            </button>
          </p>
          <rxa-visualizer viewType="embedded-view" *rxFor="array$; let i; let r$ = record$; let select = select">
            <ng-container *rxFor="select(['arr']); trackBy: tK; distinctBy:dK; let v$ = record$;">
              <rxa-rx-for-value [value]="v$"></rxa-rx-for-value>
            </ng-container>
          </rxa-visualizer>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: environment.changeDetection,
  encapsulation: ViewEncapsulation.None,
  styles: [`

  `]
})
export class RxForContainerComponent {
  tK = 'id';

  displayStates = {
    native: 0,
    nativeReactive: 1,
    rxAngularReactive: 2,
    all: 3
  };

  changeOneClick$ = new Subject<number>();
  changeAllClick$ = new Subject<number>();
  toggleIntervalClick$ = new Subject<number>();

  array$ = merge(
    this.changeOneClick$.pipe(immutableIncArr()),
    merge(
      this.toggleIntervalClick$.pipe(
        scan(a => !a, false),
        switchMap(b => b ? interval(100) : EMPTY)
      ),
      this.changeAllClick$
    ).pipe(
      immutableArr()
    )
  ).pipe(
    share()
  );

  load$ = new BehaviorSubject<number>(0);
  trackById = (i) => i.id;

  dK = (a, b) => a.value === b.value;

}
