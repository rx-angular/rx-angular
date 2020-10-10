import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { EMPTY, interval, merge, Subject } from 'rxjs';
import { scan, share, switchMap } from 'rxjs/operators';
import { immutableArr, immutableIncArr } from '../utils';


@Component({
  selector: 'rxa-cd-embedded-view-parent06',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h2>
          CD EmbeddedView 06
          <small>Nested Structures And Local Variables</small>
        </h2>
        <mat-button-toggle-group name="visibleExamples"
                                 aria-label="Visible Examples"
                                 [value]="displayStates.all"
                                 #group="matButtonToggleGroup">
          <mat-button-toggle [value]="displayStates.native">Native</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.nativeReactive">RxAngular rxFor trackBy</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.rxAngularReactive">RxAngular rxFor trackBy distinctBy
          </mat-button-toggle>
          <mat-button-toggle [value]="displayStates.all">All</mat-button-toggle>
        </mat-button-toggle-group>
        <br/>
        <button mat-raised-button (click)="changeOneClick$.next(1)">
          update (unpatched)
        </button>
        <button mat-raised-button [unpatch] (click)="changeOneClick$.next(1)">
          update
        </button>
        <button mat-raised-button [unpatch] (click)="changeAllClick$.next(10)">
          Change all
        </button>
        <button mat-raised-button [unpatch] (click)="toggleIntervalClick$.next(10)">
          toggel interval
        </button>

      </ng-container>

      <div class="row w-100">
        <!--  -->
        <div class="col" *ngIf="group.value === displayStates.native || group.value === displayStates.all">
          <h2>Native Angular</h2>
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
          <ng-container
            *ngFor="let value of array$ | async;
          trackBy: trackById
          ">
            <b>Item: </b>
            <rxa-visualizer>
              <ng-container *ngFor="let i of value.arr; trackBy: trackById">
                <rxa-visualizer [value$]="i">
                  <mat-icon [ngClass]="{red:!i.value, green:i.value}">{{i.value ? 'check' : 'highlight_off'}}</mat-icon>
                </rxa-visualizer>
              </ng-container>
            </rxa-visualizer>
          </ng-container>
        </div>
        <div class="col" *ngIf="group.value === displayStates.nativeReactive || group.value === displayStates.all">
          <h2>Static Custom Variables</h2>
          <p>
            <button mat-raised-button [unpatch] (click)="changeOneClick$.next(1)">
              update
            </button>
            <button mat-raised-button [unpatch] (click)="changeAllClick$.next(10)">
              Change all
            </button>
            <button mat-raised-button [unpatch] (click)="toggleIntervalClick$.next(10)">
              toggel interval
            </button>
          </p>
          <ng-container
            *poc2For="array$;
          trackBy: trackByKey
          distinctBy:distinctBy
          let value;
          ">
            <rxa-visualizer key="" size="150">
              <ng-container *ngFor="let i of value.arr; trackBy: trackById">
                <rxa-visualizer>
                  <mat-icon [ngClass]="{red:!i.value, green:i.value}">{{i.value ? 'check' : 'highlight_off'}}</mat-icon>
                </rxa-visualizer>
              </ng-container>
            </rxa-visualizer>
          </ng-container>
        </div>
        <div class="col" *ngIf="group.value === displayStates.rxAngularReactive || group.value === displayStates.all">
          <h2>value as stream</h2>
          <p>
            <button mat-raised-button [unpatch] (click)="changeOneClick$.next(1)">
              update
            </button>
            <button mat-raised-button [unpatch] (click)="changeAllClick$.next(10)">
              Change all
            </button>
            <button mat-raised-button [unpatch] (click)="toggleIntervalClick$.next(10)">
              toggel interval
            </button>
          </p>
          <ng-container *poc6LocV2="array$;
        let value$ = $value$;
        let selectSlices = $selectSlices;
        ">
            <rxa-visualizer>
              <ng-container *poc2For="
         selectSlices(['arr']);
         let i;
         trackBy: trackByKey;
         distinctBy:distinctBy
         let v$ = $value$;">
                <rxa-visualizer>
                  <mat-icon [ngClass]="{red:!i.value, green:i.value}">{{i.value ? 'check' : 'highlight_off'}}</mat-icon>
                </rxa-visualizer>
              </ng-container>
              <!-- -->
            </rxa-visualizer>
          </ng-container>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: environment.changeDetection,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    h1, h2, h3 {
      width: 100%;
    }

    .red {
      color: red;
    }

    .green {
      color: green;
    }

    .row {
      display: flex;
    }

    .col {
      flex-basis: 33%;
      display: flex;
      flex-wrap: wrap;
    }
  `]
})
export class CdEmbeddedViewParent06Component {
  trackByKey = 'id';

  displayStates = {
    native: 0,
    nativeReactive: 1,
    rxAngularReactive: 2,
    all: 3
  };

  componentColor = 'rgba(255,0,0,0.24)';
  itemColor = 'rgba(253,255,0,0.24)';
  childColor = 'rgba(153,255,0,0.24)';

  localVariableProjections = {
    test: (a) => {
      // tslint:disable-next-line:no-bitwise
      return ~~a.$implicit;
    }
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

  trackById = (i) => i.id;

  distinctBy = (a, b) => a.value === b.value;

}
