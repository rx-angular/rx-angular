import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { range, Subject } from 'rxjs';
import { getStrategies } from '@rx-angular/template';
import { switchMap, tap } from 'rxjs/operators';
import { BaseComponent } from '../../base.component.ts/base.component';

@Component({
  selector: 'app-cd-operators-parent01',
  template: `
    <h2>
      CD Operators 01
      <small>CD Operators</small>
    </h2>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    <br />
    <button [unpatch] (click)="btnClick$.next($event)">Next</button>

    value$: {{ value$ | async }}
  `,
  changeDetection: environment.changeDetection,
})
export class CdOperatorsParent01Component extends BaseComponent {
  btnClick$ = new Subject<Event>();

  cfg = { cdRef: this.cdRef };
  strategies = getStrategies(this.cfg);

  value$ = this.btnClick$.pipe(
    switchMap(() => range(1, 5)),
    tap((v) => console.log('before:', v)),
    tap(() => this.strategies.local.scheduleCD),
    tap((v) => console.log('after:', v))
  );
}
