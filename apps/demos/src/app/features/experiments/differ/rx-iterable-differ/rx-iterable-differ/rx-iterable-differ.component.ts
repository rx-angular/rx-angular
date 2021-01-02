import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { ArrayProviderService } from '../../../../../shared/debug-helper/value-provider';
import { rxIterableDifferFactory } from '../../shared';
import { RxState } from '@rx-angular/state';
import { Hooks } from '../../../../../shared/debug-helper/hooks';
import { bufferTime, filter, switchMap, switchMapTo } from 'rxjs/operators';

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
      <div>
        <p *rxForViewContainerRef="let a of arrayP.array$; trackBy: trackById">
          test: {{ a | json }}
        </p>
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
  providers: [ArrayProviderService]
})
export class RxIterableDifferComponent extends Hooks {
  @ViewChild('arrayP')
  arrayP;

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
}
