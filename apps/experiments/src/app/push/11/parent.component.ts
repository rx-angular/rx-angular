import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { defer, fromEvent, Observable, Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';
import { CdConfigService } from '../../cd-config.service';
import { BaseComponent } from '../../base.component.ts/base.component';

@Component({
  selector: 'app-push-parent11',
  template: `
    <h2>
      Push Pipe 11
      <small
        >one single-shot observable bound by one push as input binding</small
      >
    </h2>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    <span>strategy: </span><b class="strategy">{{ strategy }}</b>
    <br />
    <button (click)="btnClick.next()">increment</button>
    <!-- -->
    <br />
    <app-push-child11 [value]="value1$ | push: strategy"> </app-push-child11>
  `,
  changeDetection: environment.changeDetection,
})
export class Parent11Component extends BaseComponent {
  btnClick = new Subject<Event>();

  value1$: Observable<number> = this.btnClick.pipe(
    startWith(0),
    scan((a): any => ++a, 0)
  );
}
