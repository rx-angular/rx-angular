import { AsyncPipe } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { RxState } from '@rx-angular/state';
import { RxFor } from '@rx-angular/template/for';
import { RxLet } from '@rx-angular/template/let';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  interval,
  merge,
  of,
  Subject,
} from 'rxjs';
import { scan, share, switchMap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { StrategySelectModule } from '../../../../shared/debug-helper/strategy-select';
import { VisualizerModule } from '../../../../shared/debug-helper/visualizer';
import { DocsLinkComponent } from '../../../../shared/docs-link';
import { RxForValueComponent } from './rx-for-value.component';
import { immutableArr } from './utils';

@Component({
  selector: 'rxa-rx-for-nested-lists',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatInputModule,
    RxFor,
    RxLet,
    VisualizerModule,
    StrategySelectModule,
    RxForValueComponent,
    DocsLinkComponent,
  ],
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <header class="rxa-demo-header">
          <div>
            <h2>Nested Lists</h2>
            <p class="rxa-demo-subtitle">
              Compare native <code>*ngFor</code> with reactive
              <code>*rxFor</code> when rendering a grid of nested lists.
            </p>
          </div>
          <rxa-docs-link
            docs="packages/template/reference/rx-for"
            source="apps/demos/src/app/features/template/rx-for"
          />
        </header>

        <div class="rxa-demo-toolbar">
          <section class="rxa-demo-group">
            <span class="rxa-demo-label">Table size</span>
            <div
              class="rxa-demo-controls"
              *rxLet="table$; let table; patchZone: false"
            >
              <mat-form-field>
                <mat-label>Rows</mat-label>
                <input
                  matInput
                  min="1"
                  #r
                  type="number"
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
                  [value]="table?.columns + ''"
                  (input)="set({ columns: +c.value })"
                />
              </mat-form-field>
            </div>
          </section>

          <section class="rxa-demo-group">
            <span class="rxa-demo-label">View</span>
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
          </section>
        </div>
      </ng-container>

      <div class="rxa-demo-columns w-100">
        @if (
          group.value === displayStates.native ||
          group.value === displayStates.all
        ) {
          <div>
            <h3 class="rxa-demo-section-title">*ngFor</h3>
            <div class="rxa-demo-controls">
              <button
                class="btn btn-outline-primary btn-sm"
                (click)="changeOneClick$.next(1)"
              >
                update
              </button>
              <button
                class="btn btn-outline-primary btn-sm"
                (click)="changeAllClick$.next(10)"
              >
                Change all
              </button>
              <button
                class="btn btn-outline-primary btn-sm"
                (click)="toggleIntervalClick$.next(10)"
              >
                toggle interval
              </button>
            </div>
            @for (value of array$ | async; track trackById($index, value)) {
              <rxa-visualizer viewType="embedded-view">
                @for (i of value.arr; track trackById($index, i)) {
                  <rxa-rx-for-value
                    [value]="i"
                    [strategy$]="native$"
                  ></rxa-rx-for-value>
                }
              </rxa-visualizer>
            }
          </div>
        }
        @if (
          group.value === displayStates.rxAngularReactive2 ||
          group.value === displayStates.all
        ) {
          <div>
            <h3 class="rxa-demo-section-title">*rxFor</h3>
            <div class="rxa-demo-controls" *rxLet="table$; let t">
              <button
                class="btn btn-outline-primary btn-sm"
                (click)="changeOneClick$.next(1)"
              >
                update
              </button>
              <button
                class="btn btn-outline-primary btn-sm"
                (click)="changeAllClick$.next(t.changes)"
              >
                Change many
              </button>
              <button
                class="btn btn-outline-primary btn-sm"
                (click)="toggleIntervalClick$.next(10)"
              >
                toggle interval
              </button>
              <rxa-strategy-select
                (strategyChange)="strategy$.next($event)"
              ></rxa-strategy-select>
            </div>
            <rxa-visualizer
              viewType="embedded-view"
              *rxFor="
                let a of array$;
                let i;
                let r$ = item$;
                strategy: strategy$;
                trackBy: trackById;
                let select = select;
                renderCallback: childrenRendered$
              "
            >
              <ng-container
                *rxFor="
                  let o of select(['arr']);
                  strategy: strategy$;
                  trackBy: trackById;
                  parent: false;
                  patchZone: false;
                  let v$ = item$
                "
              >
                <rxa-rx-for-value
                  [strategy$]="strategy$"
                  [value]="v$"
                ></rxa-rx-for-value>
              </ng-container>
            </rxa-visualizer>
          </div>
        }
      </div>
    </rxa-visualizer>
  `,
  changeDetection: environment.changeDetection,
  encapsulation: ViewEncapsulation.None,
})
export class RxForNestedListsComponent extends RxState<{
  rows: number;
  columns: number;
  changes: number;
}> {
  private strategyProvider = inject(RxStrategyProvider);

  native$ = of('native');

  displayStates = {
    all: 0,
    native: 1,
    rxAngularReactive2: 4,
  };

  childrenRendered$ = new Subject<string>();

  table$ = this.select();

  strategy$ = new BehaviorSubject<string>(
    this.strategyProvider.primaryStrategy,
  );
  changeOneClick$ = new Subject<number>();
  changeAllClick$ = new Subject<number>();
  toggleIntervalClick$ = new Subject<number>();

  changesFromTick$ = this.toggleIntervalClick$.pipe(
    scan((a) => !a, false),
    switchMap((b) => (b ? interval(100) : EMPTY)),
  );

  array$ = merge(
    combineLatest([this.changeOneClick$, this.table$]).pipe(
      switchMap(([_, { rows, columns }]) => immutableArr(rows, columns)(of(1))),
    ),
    combineLatest([
      merge(this.changesFromTick$, this.changeAllClick$),
      this.table$,
    ]).pipe(
      switchMap(([_, { rows, columns }]) =>
        immutableArr(rows, columns)(of(rows)),
      ),
    ),
  ).pipe(share());

  trackById = (i, v) => v.id;

  constructor() {
    super();
    this.set({ columns: 5, rows: 10 });
  }
}
