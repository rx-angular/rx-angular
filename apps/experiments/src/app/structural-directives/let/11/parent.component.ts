import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';
import { BaseComponent } from '../../../base.component.ts/base.component';

@Component({
  selector: 'app-let-parent11',
  template: `
    <h2>
      Let Directive 11
      <small
        >One single-shot observable bound by one rxLet as input binding with let
        syntax</small
      >
    </h2>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    <span>strategy: </span><b class="strategy">{{ strategy }}</b>
    <br />
    <button #button>increment</button>
    <ng-container *rxLet="value$; let v">Value: {{ v }}</ng-container>
  `,
  changeDetection: environment.changeDetection,
})
export class LetParent11Component extends BaseComponent {
  btnClick$ = new Subject<Event>();

  value$: Observable<number> = this.btnClick$.pipe(
    startWith(0),
    scan((a): any => ++a, 0)
  );
}
