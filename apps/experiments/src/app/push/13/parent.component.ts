import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { defer, fromEvent, Observable, Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';
import { CdConfigService } from '../../cd-config.service';
import { BaseComponent } from '../../base.component.ts/base.component';

@Component({
  selector: 'app-push-parent13',
  template: `
    <h2>
      Push Pipe 13
      <small
        >one single-shot observable bound by multiple push as input
        binding</small
      >
    </h2>
    <div class="base-info">
      <span>CD: <b class="cds">Default</b></span>
      <span
        >dirty: <b class="dirty">{{ isMarkedDirty }}</b></span
      >
      <span
        >render: <b class="num-renders">{{ getNumOfRenderings() }}</b></span
      >
    </div>
    <br />
    <button #button>increment</button>
    <!-- -->
    <br />
    <app-push-child13 [value]="value1$ | push: strategy"> </app-push-child13>
    <app-push-child13 [value]="value1$ | push: strategy"> </app-push-child13>
    <app-push-child13 [value]="value1$ | push: strategy"> </app-push-child13>
  `,
  changeDetection: environment.changeDetection,
})
export class Parent13Component extends BaseComponent {
  @ViewChild('button') button: ElementRef<HTMLButtonElement>;
  btnClick$ = defer(() => fromEvent(this.button.nativeElement, 'click'));

  value1$: Observable<number> = this.btnClick$.pipe(
    startWith(0),
    scan((a): any => ++a, 0)
  );
}
