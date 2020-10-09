import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  IterableDiffers,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { ArrayProviderService } from '../../../../../shared/debug-helper/value-provider';
import { RxState } from '@rx-angular/state';
import { map, shareReplay } from 'rxjs/operators';
import { Hooks } from '../../../../../shared/debug-helper/hooks';
import { fromFor } from '../../shared/from-for';
import { logIterable } from '../../shared/log-iterable';

@Component({
  selector: 'rxa-differ-ng-iterable-differ',
  template: `
    <rxa-visualizer>
      <div visualizerHeader class="row">
        <div class="col-sm-12">
          <h2>Angular Iterable Differ</h2>
          <rxa-array-provider [buttons]="true" [unpatched]="[]" #arrayP="rxaArrayProvider"></rxa-array-provider>
        </div>
      </div>
      <div class="w-100 row">
        <div class="col-sm-2">
          <h3>List</h3>
          <div *ngFor="let enterRes of arrayP.array$ | push">
            <pre>{{enterRes | json}}</pre>
            <rxa-work [load]="1" [type]="'layouting'"></rxa-work>
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
      </div>
    </rxa-visualizer>
  `,
  changeDetection: environment.changeDetection,
  encapsulation: ViewEncapsulation.None,
  providers: [ArrayProviderService, RxState]
})
export class NgIterableDifferComponent extends Hooks implements AfterViewInit {
  ngDiffer;

  @ViewChild('arrayP')
  arrayP;

  ngDifferResult$;
  enter$;
  move$;
  identityChange$;
  exit$;

  constructor(
    public cdRef: ChangeDetectorRef,
    public state: RxState<any>,
    private iterableDiffers: IterableDiffers) {
    super();

  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    this.ngDiffer = this.iterableDiffers.find([]).create((idx, item) => this.trackByIdFn(item));

    this.ngDifferResult$ = this.arrayP.array$.pipe(
      map(newData => this.ngDiffer.diff(newData)),
      shareReplay(1)
    );
    this.enter$ = this.ngDifferResult$.pipe(fromFor('forEachAddedItem'));
    this.move$ = this.ngDifferResult$.pipe(fromFor('forEachMovedItem'));
    this.identityChange$ = this.ngDifferResult$.pipe(fromFor('forEachIdentityChange'));
    this.exit$ = this.ngDifferResult$.pipe(fromFor('forEachRemovedItem'));

    this.state.hold(this.ngDifferResult$, logIterable);
    this.cdRef.detectChanges();
  }

  trackByIdFn = (a) => a.id;

}
