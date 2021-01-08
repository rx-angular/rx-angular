import {
  ChangeDetectorRef,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, from, Subject } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { ArrayProviderService } from '../../../../../shared/debug-helper/value-provider';
import { rxIterableDifferFactory } from '../../shared';
import { RxState } from '@rx-angular/state';
import { Hooks } from '../../../../../shared/debug-helper/hooks';
import { map, startWith, switchMap, switchMapTo, tap } from 'rxjs/operators';

const item0 = { id: '0', value: '0000' };
const item1 = { id: '1', value: '1111' };
const item2 = { id: '2', value: '2222' };
const item3 = { id: '3', value: '3333' };
const customChangeSet = [
  [item0, item1, item2, item3],
  [item0, item2, item1],
  [item0, item3, { ...item2, value: '2232' }],
];

@Component({
  selector: 'rxa-differ-rx-iterable-differ',
  template: `
    <rxa-visualizer>
      <div visualizerHeader class="row">
        <div class="col-sm-12">
          <h2>Reactive Iterable Differ</h2>
          <rxa-array-provider
            [unpatched]=""
            [buttons]="true"
            #arrayP="rxaArrayProvider"
          ></rxa-array-provider>
          <rxa-strategy-select
            (strategyChange)="strategy$.next($event)"
          ></rxa-strategy-select>
          <mat-button-toggle-group
            name="visibleExamples"
            *rxLet="view; let viewMode"
            aria-label="Visible Examples"
            [value]="viewMode"
            #group="matButtonToggleGroup"
          >
            <mat-button-toggle value="tile" (click)="view.next('tile')"
              >Tile</mat-button-toggle
            >
            <mat-button-toggle value="list" (click)="view.next('list')"
              >List</mat-button-toggle
            >
          </mat-button-toggle-group>
          <button mat-raised-button (click)="triggerChangeSet.next()">
            ChangeSet
          </button>
          <p *rxLet="rendered$; let rendered">
            <strong>Rendered</strong> {{ rendered }}
          </p>
        </div>
      </div>
      <div class="d-flex flex-column justify-content-start w-100">
        <div
          class="work-container d-flex flex-wrap w-100"
          [class.list-view]="viewMode === 'list'"
          *rxLet="view; let viewMode"
        >
          <div
            class="work-child d-flex"
            *rxFor="
              let a of arrayP.array$;
              let index = index;
              let count = count;
              let even = even;
              renderCallback: renderCallback;
              trackBy: trackById;
              strategy: strategy$
            "
          >
            <!--<div class="child-bg" [class.even]="even" [ngStyle]="{ background: color(a) }"></div>-->
            <div class="child-bg" [class.even]="even"></div>
            <div class="child-context ">
              <small>id: {{ a.id }}</small>
              <small>value: {{ a.value }}</small>
              <small>index: {{ index }}</small>
              <small>count: {{ count }}</small>
            </div>
          </div>
        </div>
      </div>

      <!--<div class="w-100 row">
        <div class="col-sm-2">
          <h3>List</h3>
          <div *ngFor="let enterRes of arrayP.array$ | push">
            <pre>{{enterRes | json}}</pre>
          </div>
        </div>
        <div class="col-sm-2">
          <h3>Enter</h3>
          <div *ngFor="let enterRes of enter$ | push">
            <pre>{{enterRes | json}}</pre>
          </div>
        </div>
        <div class="col-sm-2">
          <h3>Move</h3>
          <div *ngFor="let enterRes of move$ | push">
            <pre>{{enterRes | json}}</pre>
          </div>
        </div>
        <div class="col-sm-2">
          <h3>Identity Change</h3>
          <div *ngFor="let enterRes of identityChange$ | push">
            <pre>{{enterRes | json}}</pre>
          </div>
        </div>
        <div class="col-sm-2">
          <h3>Exit</h3>
          <div *ngFor="let enterRes of exit$ | push">
            <pre>{{enterRes | json}}</pre>
          </div>
        </div>
      </div>-->
    </rxa-visualizer>
  `,
  changeDetection: environment.changeDetection,
  encapsulation: ViewEncapsulation.None,
  providers: [ArrayProviderService],
  styles: [
    `
      .work-container.list-view {
        flex-direction: column;
      }

      .work-container.list-view .work-child {
        width: 100%;
        height: 65px;
        margin: 0.5rem 0;
        background-color: transparent !important;
      }

      .child-context {
        display: none;
      }

      .work-container.list-view .work-child .child-context {
        display: flex;
        flex-direction: column;
      }

      .work-container.list-view .work-child .child-bg {
        margin-right: 0.5rem;
        width: 50px;
        position: relative;
      }

      .work-child {
        position: relative;
        width: 10px;
        height: 10px;
        margin: 0 2px 2px 0;
        padding: 0px;
        outline: 1px solid green;
        background-color: transparent;
      }

      .work-child .child-bg {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .work-child .child-bg.even {
        background-color: red;
      }
    `,
  ],
})
export class RxIterableDifferComponent extends Hooks {
  @ViewChild('arrayP')
  arrayP;

  private numRendered = 0;

  readonly view = new BehaviorSubject<'list' | 'tile'>('list');
  readonly triggerChangeSet = new Subject<void>();
  readonly activeChangeSet$ = this.triggerChangeSet.pipe(
    switchMap(() => [
      [item0, item1, item2, item3],
      [item0, item2, item1, item3],
      [item2, item1, {...item3, value: '283942'}],
    ]),
    // switchMapTo([customChangeSet[0]]),
    tap(data => console.log(data))
  )
  readonly renderCallback = new Subject();
  readonly rendered$ = this.renderCallback.pipe(
    startWith(null),
    map(() => ++this.numRendered)
  );
  strategy$ = new Subject<string>();
  customChangeSet = customChangeSet;
  customChangeSet$ = new Subject<any>();

  rxDiffer = rxIterableDifferFactory({
    trackBy: 'id',
    distinctBy: 'value',
  });
  enter$ = this.rxDiffer.enter$;
  move$ = this.rxDiffer.update$;
  identityChange$ = this.rxDiffer.update$;
  exit$ = this.rxDiffer.exit$;

  trackById = (idx, item) => {
    return item.id;
  };

  constructor(public state: RxState<any>, public cdRef: ChangeDetectorRef) {
    super();
    // this.state.hold(this.afterViewInit$, () => this.setupRxDiffer())
    // this.state.hold(this.afterViewInit$.pipe(switchMap(_ => this.arrayP.array$)), (v) => this.rxDiffer.next(v as any))
  }

  trackByIdFn = (a) => a.id;

  setupRxDiffer() {
    this.rxDiffer.connect();
    this.rxDiffer.enter$.subscribe((result) => {
      console.log('enter', result);
    });
    this.rxDiffer.update$.subscribe((result) => {
      console.log('update', result);
    });
    this.rxDiffer.exit$.subscribe((result) => {
      console.log('exit', result);
    });
    this.cdRef.detectChanges();
  }

  color(a) {
    return '#' + Math.floor(a.value * 16777215).toString(16);
  }
}
