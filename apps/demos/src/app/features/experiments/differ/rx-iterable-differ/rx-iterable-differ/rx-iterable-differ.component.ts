import {
  ChangeDetectorRef,
  Component,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { ArrayProviderService } from '../../../../../shared/debug-helper/value-provider';
import { rxIterableDifferFactory } from '../../shared';
import { RxState } from '@rx-angular/state';
import { Hooks } from '../../../../../shared/debug-helper/hooks';
import { map, startWith } from 'rxjs/operators';

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
        </div>
      </div>
      <div class="d-flex flex-column justify-content-start w-100">
        <p *rxLet="rendered$; let rendered">
          <strong>Rendered</strong> {{ rendered }}
        </p>
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
              renderCallback: renderCallback;
              trackBy: trackById
            "
          >
            <div class="child-bg" [ngStyle]="{ background: color(a) }"></div>
            <div class="child-context ">
              <small>id: {{ a.id }}</small>
              <small>value: {{ a.value }}</small>
              <small>index: {{ index }}</small>
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
        height: 50px;
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
    `,
  ],
})
export class RxIterableDifferComponent extends Hooks {
  @ViewChild('arrayP')
  arrayP;

  private numRendered = 0;
  readonly view = new BehaviorSubject<'list' | 'tile'>('list');
  readonly renderCallback = new Subject();
  readonly rendered$ = this.renderCallback.pipe(
    startWith(null),
    map(() => ++this.numRendered)
  );

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
