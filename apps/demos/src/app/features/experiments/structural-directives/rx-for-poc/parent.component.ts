import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY, interval, merge, of, Subject } from 'rxjs';
import { map, scan, share, startWith, switchMap, tap } from 'rxjs/operators';
import { RxState } from '@rx-angular/state';
import { environment } from '../../../../../environments/environment';
import { immutableArr } from '../utils';

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
          <p *rxLet="table$; let table">
            <mat-form-field>
              <mat-label>Rows</mat-label>
              <input matInput min="1" #r type="number" unpatch [value]="table?.rows+''" (input)="set({rows: +r.value})">
            </mat-form-field>
            <mat-form-field>
              <mat-label>Colums</mat-label>
              <input matInput
                     min="1"
                     #c
                     type="number"
                     unpatch
                     [value]="table?.columns+''"
                     (input)="set({columns: +c.value})">
            </mat-form-field>
          </p>
          <mat-button-toggle-group name="visibleExamples"
                                   aria-label="Visible Examples"
                                   [value]="displayStates.all"
                                   #group="matButtonToggleGroup">
            <mat-button-toggle [value]="displayStates.native">Native</mat-button-toggle>
            <mat-button-toggle [value]="displayStates.rxAngularMinimalReactive">RxAngular *rxMinimalFor trackBy,
              distinctBy, select
            </mat-button-toggle>
            <mat-button-toggle [value]="displayStates.rxAngularReactive">RxAngular *rxFor trackBy, distinctBy, select
            </mat-button-toggle>
            <mat-button-toggle [value]="displayStates.rxAngularReactive2">RxAngular2 *rxFor trackBy, distinctBy, select
            </mat-button-toggle>
            <mat-button-toggle [value]="displayStates.all">All</mat-button-toggle>
          </mat-button-toggle-group>
          <br/>

        </div>
      </ng-container>

      <div class="row w-100">
        <!--  -->
        <div class="col" *ngIf="group.value === displayStates.native || group.value === displayStates.all">
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
        <div class="col"
             *ngIf="group.value === displayStates.rxAngularMinimalReactive || group.value === displayStates.all">
          <h2>RxAngular, *rxMinimalFor trackBy, distinctBy, select</h2>
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
            <rxa-strategy-select (strategyChange)="strategy$.next($event)"></rxa-strategy-select>
          </p>
          <rxa-visualizer viewType="embedded-view" *rxMinimalFor="array$; let i; let r$ = record$; let select = select">
            <span #spanChild></span>
            <ng-container *rxMinimalFor="select(['arr']); trackBy: tK; distinctBy:dK; let v$ = record$;">
              <rxa-rx-for-value [strategy$]="strategy$" [value]="v$"></rxa-rx-for-value>
            </ng-container>
          </rxa-visualizer>
        </div>
        <div class="col"
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
            <rxa-strategy-select (strategyChange)="strategy$.next($event)"></rxa-strategy-select>
          </p>
          <!--
          <ng-container *rxLet="childrenRendered$; let childrenRendered; strategy: strategy$">
            Rendercallback: <strong>{{ childrenRendered }}</strong>
          </ng-container>
          -->
          <rxa-visualizer
            viewType="embedded-view"
            *rxForNormal="
              let a of array$;
              let i;
              let r$ = item$;
              strategy: 'normal';
              trackBy: trackById; let select = select
            "
          >
            <span #spanChild></span>
            <ng-container *rxForNormal="select(['arr']); trackBy: trackById; let o; let v$ = item$; strategy: 'normal';">
              <rxa-rx-for-value [strategy$]="strategy$" [value]="v$"></rxa-rx-for-value>
            </ng-container>
          </rxa-visualizer>
        </div>
        <div class="col"
             *ngIf="group.value === displayStates.rxAngularReactive2 || group.value === displayStates.all">
          <h2>RxAngular, *rxFor2 trackBy, distinctBy, select</h2>
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
            <rxa-strategy-select (strategyChange)="strategy$.next($event)"></rxa-strategy-select>
          </p>
          <!--
          <ng-container *rxLet="childrenRendered$; let childrenRendered; strategy: strategy$">
            Rendercallback: <strong>{{ childrenRendered }}</strong>
          </ng-container>
          <ng-container *rxLet="childrenRendered2$; let childrenRendered2; strategy: strategy$">
            Rendercallback2: <strong>{{ childrenRendered2 }}</strong>
          </ng-container>
          -->
          <rxa-visualizer
            viewType="embedded-view"
            *rxFor="
              let a of array$;
              let i;
              let r$ = item$;

              trackBy: trackById; let select = select
            "
          >
            <span #spanChild></span>
            <ng-container *rxFor="
            select(['arr']);

            trackBy: trackById;
            let o; let v$ = item$;">
              <rxa-rx-for-value [strategy$]="strategy$" [value]="v$"></rxa-rx-for-value>
            </ng-container>
          </rxa-visualizer>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: environment.changeDetection,
  encapsulation: ViewEncapsulation.None
})
export class RxForContainerComponent extends RxState<{ rows: number, columns: number }> implements AfterViewInit {

  @ViewChildren('spanChild') spanChildren: QueryList<ElementRef>;

  tK = 'id';

  displayStates = {
    none: -1,
    all: 0,
    native: 1,
    nativeReactive: 2,
    rxAngularReactive: 3,
    rxAngularReactive2: 4,
    rxAngularMinimalReactive: 5

  };

  childrenRendered = new Subject<string>();
  private numChildrenRendered = 0;
  childrenRendered$ = this.childrenRendered.pipe(
   // tap(v => console.log('rcb', v))
  )
  childrenRendered2 = new Subject<string>();
  private numChildrenRendered2 = 0;
  childrenRendered2$ = this.childrenRendered2.pipe(
//    tap(v => console.log('rcb2', v))
  )

  table$ = this.select();

  strategy$ = new Subject<string>();
  changeOneClick$ = new Subject<number>();
  changeAllClick$ = new Subject<number>();
  toggleIntervalClick$ = new Subject<number>();

  changesFromTick$ = this.toggleIntervalClick$.pipe(
    scan(a => !a, false),
    switchMap(b => b ? interval(100) : EMPTY)
  );

  array$ = merge(
    combineLatest(this.changeOneClick$, this.table$).pipe(
      switchMap(([_, { rows, columns }]) => immutableArr(rows, columns)(of(1)))
    ),
    combineLatest(
      merge(this.changesFromTick$, this.changeAllClick$),
      this.table$
    ).pipe(
      switchMap(([_, { rows, columns }]) => immutableArr(rows, columns)(of(rows)))
    )
  ).pipe(
    share()
  );

  load$ = new BehaviorSubject<number>(0);
  trackById = (i, v) => v.id;

  dK = (a, b) => a.value === b.value;


  constructor() {
    super();
    this.set({ columns: 5, rows: 10 });
  }

  ngAfterViewInit() {
    this.hold(this.spanChildren.changes, console.log);
  }

}
