import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { ArrayProviderService } from '../../../../../shared/debug-helper/value-provider';
import { rxIterableDifferFactory } from '../../shared';
import { RxState } from '@rx-angular/state';
import { Hooks } from '../../../../../shared/debug-helper/hooks';
import { bufferTime, filter, map, mapTo, startWith, switchMap, switchMapTo } from 'rxjs/operators';

@Component({
  selector: 'rxa-differ-rx-iterable-differ',
  template: `
    <rxa-visualizer>
      <div visualizerHeader class="row">
        <div class="col-sm-12">
          <h2>Reactive Iterable Differ</h2>
          <rxa-array-provider
            [unpatched]="" [buttons]="true" #arrayP="rxaArrayProvider"></rxa-array-provider>
        </div>
      </div>
      <p *rxLet="rendered$; let rendered;"><strong>Rendered</strong> {{ rendered }}</p>
      <div class="d-flex flex-wrap w-100">
        <div class="work-child"
             *rxFor="
                let a of arrayP.array$;
                let index = index;
                renderCallback: renderCallback;
                trackBy: trackById
             ">
          <div [ngStyle]="{background: color(a)}" ></div>
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
  styles: [`
    .work-child {
      position: relative;
      width: 10px;
      height: 10px;
      margin: 0 2px 2px 0;
      padding: 0px;
      outline: 1px solid green;
      background-color: transparent;
    }

    .work-child div {
      position: absolute;
      width: 100%;
      height: 100%;
    }
  `]
})
export class RxIterableDifferComponent extends Hooks {
  @ViewChild('arrayP')
  arrayP;

  private numRendered = 0;
  readonly renderCallback = new Subject();
  readonly rendered$ = this.renderCallback.pipe(
    startWith(null),
    map(() => ++this.numRendered)
  )

  rxDiffer = rxIterableDifferFactory({
    trackBy: 'id',
    distinctBy: 'value'
  });
  enter$ = this.rxDiffer.enter$;
  move$ = this.rxDiffer.update$;
  identityChange$ = this.rxDiffer.update$;
  exit$ = this.rxDiffer.exit$;

  trackById = item => {
    return item.id;
  };

  constructor(public state: RxState<any>,
              public cdRef: ChangeDetectorRef) {
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
   /* let c = this.colors.get(a.id)
    if(c) {
      return c;
    } else {
      c = '#' +Math.floor(a.value*16777215).toString(16)
      this.colors.set(a.id, c);
      return c
    }*/
return '#' +Math.floor(a.value*16777215).toString(16);
  }
}
