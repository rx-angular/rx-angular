import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  interval,
  merge,
  of,
  Subject,
} from 'rxjs';
import { scan, share, switchMap, tap } from 'rxjs/operators';
import { RxState } from '@rx-angular/state/state';
import { environment } from '../../../../../environments/environment';
import { immutableArr } from './utils';

@Component({
  selector: 'rxa-rx-for-nested-lists',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h2>Nested Lists</h2>
        <div>
          <p *rxLet="table$; let table; patchZone: false">
            <mat-form-field>
              <mat-label>Rows</mat-label>
              <input
                matInput
                min="1"
                #r
                type="number"
                unpatch
                [value]="table?.rows + ''"
                (input)="set({ rows: +r.value })"
              />
            </mat-form-field>
            <mat-form-field>
              <mat-label>Columns</mat-label>
              <input
                matInput
                min="1"
                #c
                type="number"
                unpatch
                [value]="table?.columns + ''"
                (input)="set({ columns: +c.value })"
              />
            </mat-form-field>
          </p>
          <mat-button-toggle-group
            name="visibleExamples"
            aria-label="Visible Examples"
            [value]="displayStates.all"
            #group="matButtonToggleGroup"
          >
            <mat-button-toggle [value]="displayStates.native"
              >*ngFor</mat-button-toggle
            >
            <mat-button-toggle [value]="displayStates.rxAngularReactive2"
              >*rxFor
            </mat-button-toggle>
            <mat-button-toggle [value]="displayStates.all"
              >All</mat-button-toggle
            >
          </mat-button-toggle-group>
          <br />
        </div>
      </ng-container>

      <div class="row w-100">
        <!--  -->
        <div
          class="col"
          *ngIf="
            group.value === displayStates.native ||
            group.value === displayStates.all
          "
        >
          <h2>*ngFor</h2>
          <p>
            <button mat-raised-button (click)="changeOneClick$.next(1)">
              update
            </button>
            <button mat-raised-button (click)="changeAllClick$.next(10)">
              Change all
            </button>
            <button mat-raised-button (click)="toggleIntervalClick$.next(10)">
              toggle interval
            </button>
          </p>
          <rxa-visualizer
            viewType="embedded-view"
            *ngFor="let value of array$ | async; trackBy: trackById"
          >
            <ng-container *ngFor="let i of value.arr; trackBy: trackById">
              <rxa-rx-for-value [value]="i" [strategy$]="native$"></rxa-rx-for-value>
            </ng-container>
          </rxa-visualizer>
        </div>
        <div
          class="col"
          *ngIf="
            group.value === displayStates.rxAngularReactive2 ||
            group.value === displayStates.all
          "
        >
          <h2>*rxFor</h2>
          <p *rxLet="table$; let t;">
            <button
              mat-raised-button
              [unpatch]
              (click)="changeOneClick$.next(1)"
            >
              update
            </button>
            <button
              mat-raised-button
              [unpatch]
              (click)="changeAllClick$.next(t.changes)"
            >
              Change many
            </button>
            <button
              mat-raised-button
              [unpatch]
              (click)="toggleIntervalClick$.next(10)"
            >
              toggle interval
            </button>
            <rxa-strategy-select [unpatch]="['strategyChange']"
              (strategyChange)="strategy$.next($event)"
            ></rxa-strategy-select>
          </p>
          <!--
                 <ng-container *rxLet="childrenRendered$; let childrenRendered; strategy: strategy$">
                   Rendercallback: <strong>{{ childrenRendered }}</strong>
                 </ng-container>
       -->
          <rxa-visualizer
            viewType="embedded-view"
            *rxFor="
              let a of array$;
              let i;
              let r$ = item$;
              strategy: strategy$;
              trackBy: trackById;
              parent: true;
              patchZone: false;
              let select = select;
              renderCallback: childrenRendered$
            "
          >
            <span #spanChild></span>
            <ng-container
              *rxFor="
                select(['arr']);
                strategy: strategy$;
                trackBy: trackById;
                 parent: false;
                patchZone: false;
                let o;
                let v$ = item$
              "
            >
              <rxa-rx-for-value [strategy$]="strategy$" [value]="v$"></rxa-rx-for-value>
            </ng-container>
          </rxa-visualizer>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: environment.changeDetection,
  encapsulation: ViewEncapsulation.None,
})
export class RxForNestedListsComponent
  extends RxState<{ rows: number; columns: number; changes: number }>
  implements AfterViewInit {
  @ViewChildren('spanChild') spanChildren: QueryList<ElementRef>;

  tK = 'id';

  native$ = of('native');

  displayStates = {
    none: -1,
    all: 0,
    native: 1,
    nativeReactive: 2,
    rxAngularReactive: 3,
    rxAngularReactive2: 4,
    rxAngularMinimalReactive: 5,
  };

  childrenRendered = new Subject<string>();
  private numChildrenRendered = 0;
  childrenRendered$ = this.childrenRendered
    .pipe
    // tap(v => console.log('rcb', v))
    ();
  childrenRendered2 = new Subject<string>();
  private numChildrenRendered2 = 0;
  childrenRendered2$ = this.childrenRendered2.pipe(
    tap((v) => console.log('rcb2', v))
  );

  table$ = this.select();

  strategy$ = new BehaviorSubject<string>(this.strategyProvider.primaryStrategy);
  changeOneClick$ = new Subject<number>();
  changeAllClick$ = new Subject<number>();
  toggleIntervalClick$ = new Subject<number>();

  changesFromTick$ = this.toggleIntervalClick$.pipe(
    scan((a) => !a, false),
    switchMap((b) => (b ? interval(100) : EMPTY))
  );

  array$ = merge(
    combineLatest([this.changeOneClick$, this.table$]).pipe(
      switchMap(([_, { rows, columns }]) => immutableArr(rows, columns)(of(1)))
    ),
    combineLatest([
      merge(this.changesFromTick$, this.changeAllClick$),
      this.table$
    ]).pipe(
      switchMap(([_, { rows, columns, changes }]) =>
        immutableArr(rows, columns)(of(rows))
      )
    )
  ).pipe(share());

  load$ = new BehaviorSubject<number>(0);
  trackById = (i, v) => v.id;

  dK = (a, b) => a.value === b.value;

  constructor(
    private strategyProvider: RxStrategyProvider
  ) {
    super();
    this.set({ columns: 5, rows: 10 });
  }

  ngAfterViewInit() {
    this.hold(this.spanChildren.changes, console.log);
  }
}
