import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { EMPTY, interval, merge, Subject } from 'rxjs';
import { scan, share, switchMap } from 'rxjs/operators';
import { immutableArr, immutableIncArr } from '../utils';


@Component({
  selector: 'rxa-cd-embedded-view-parent06',
  template: `
    <h2>
      CD EmbeddedView 06
      <small>Local Variables</small>
      <rxa-dirty-check radius="60" [color]="componentColor"></rxa-dirty-check>
    </h2>

    <button mat-raised-button [unpatch] (click)="changeOneClick$.next(1)">
      update
    </button>
    <button mat-raised-button [unpatch] (click)="changeAllClick$.next(10)">
      Change all
    </button>
    <button mat-raised-button [unpatch] (click)="toggleIntervalClick$.next(10)">
      toggel interval
    </button>

    <!-- <pre>{{array$ | push | json}}</pre> -->
    <mat-checkbox></mat-checkbox>
    <div class="row">
      <!--  -->
      <div class="col">
        <h2>Native Angular</h2>
        <ng-container
          *ngFor="let value of array$ | async;
          trackBy: trackById
          ">
          <b>Item: </b>
          <rxa-visualizer [value$]="value.arr" key="" size="150">
          <ng-container *ngFor="let i of value.arr; trackBy: trackById">
            <rxa-visualizer [value$]="i" key="" size="150">
            <mat-icon [ngClass]="{red:!i.value, green:i.value}">{{i.value ? 'check' : 'highlight_off'}}</mat-icon>
            </rxa-visualizer>
          </ng-container>
          </rxa-visualizer>
        </ng-container>
      </div>
      <div class="col">
        <h2>Static Custom Variables</h2>
        <ng-container
          *poc2For="array$;
          trackBy: trackByKey
          distinctBy:distinctBy
          let value;
          ">
          <rxa-visualizer [value$]="array$" key="" size="150">
            <ng-container *ngFor="let i of value.arr; trackBy: trackById">
              <rxa-visualizer>
                <mat-icon [ngClass]="{red:!i.value, green:i.value}">{{i.value ? 'check' : 'highlight_off'}}</mat-icon>
              </rxa-visualizer>
            </ng-container>
          </rxa-visualizer>
        </ng-container>
      </div>

      <div class="col">
        <h2>value as stream</h2>
        <ng-container *poc6LocV2="array$;
        let value$ = $value$;
        let selectSlices = $selectSlices;
        ">
          <rxa-visualizer [value$]="selectSlices(['arr'])" key="" size="150">
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
