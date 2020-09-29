import { Component, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { EMPTY, interval, merge, Subject } from 'rxjs';
import { map, scan, share, switchMap, switchMapTo } from 'rxjs/operators';
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
      <div class="col">
        <h2>Native Angular</h2>
        <ng-container
          *ngFor="let value of array$ | async;
          trackBy: trackById
          ">
          <b>Item: </b>
          <rxa-dirty-check [color]="itemColor"></rxa-dirty-check>
          <rxa-renders [value$]="array$"></rxa-renders>
          <ng-container *ngFor="let i of value.arr; trackBy: trackById">
            <rxa-dirty-check [radius]="15" [color]="childColor"></rxa-dirty-check>
            <rxa-renders [color]="itemColor" [value$]="i"></rxa-renders>
            child:
            <mat-icon [ngClass]="{red:!i.value, green:i.value}">{{i.value ? 'check' : 'highlight_off'}}</mat-icon>
          </ng-container>
          <br/>
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
          <b>Item: </b>
          <rxa-dirty-check [color]="itemColor"></rxa-dirty-check>
          <rxa-renders [value$]="array$"></rxa-renders>
          <ng-container *ngFor="let i of value.arr; trackBy: trackById">
            <rxa-dirty-check [radius]="15" [color]="childColor"></rxa-dirty-check>
            <rxa-renders [value$]="i"></rxa-renders>
            child:
            <mat-icon [ngClass]="{red:!i.value, green:i.value}">{{i.value ? 'check' : 'highlight_off'}}</mat-icon>
          </ng-container>
          <br/>
        </ng-container>
      </div>
      <div class="col">
        <h2>value as stream</h2>
        <ng-container *poc6LocV2="array$;
        let value$ = $value$;
        let selectSlices = $selectSlices;
        ">

          <rxa-visualizer [value$]="value$" key="value" size="300">

         <ng-container *poc2For="
         selectSlices(['arr']);
         let i;
         trackBy: trackByKey;
         distinctBy:distinctBy
         let v$ = $value$;"
         >
            <rxa-visualizer [value$]="i" key="value" size="100">
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
      width: 32%;
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
        switchMap(b => b ? interval(100): EMPTY),
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
