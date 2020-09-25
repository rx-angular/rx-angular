import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';
import { BaseComponent } from '../../../base.component.ts/base.component';

@Component({
  selector: 'app-let-parent03',
  template: `
    <h2>
      Let Directive 03
      <small
        >Multiple single-shot observables bound by multiple rxLet as input
        binding with as syntax</small
      >
    </h2>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    <span>strategy: </span><b class="strategy">{{ strategy }}</b>
    <br />
    <button [unpatch] click="btnClick$.next($event)">increment</button>
    <ng-container *rxLet="value1$ as v"> Value1: {{ v }} </ng-container>
    <ng-container *rxLet="value2$ as v"> Value2: {{ v }} </ng-container>
    <ng-container *rxLet="value3$ as v"> Value3: {{ v }} </ng-container>
  `,
  changeDetection: environment.changeDetection,
})
export class LetParent03Component extends BaseComponent {
  btnClick$ = new Subject<Event>();

  value1$: Observable<number> = this.btnClick$.pipe(
    startWith(0),
    scan((a): any => ++a, 0)
  );
  value2$: Observable<number> = this.btnClick$.pipe(
    startWith(0),
    scan((a): any => ++a, 0)
  );
  value3$: Observable<number> = this.btnClick$.pipe(
    startWith(0),
    scan((a): any => ++a, 0)
  );
}
