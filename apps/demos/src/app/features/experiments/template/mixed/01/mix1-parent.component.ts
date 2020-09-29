import { Component } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';

@Component({
  selector: 'rxa-mixed-parent01',
  template: `
    <h2>
      Mixed Setup 01
      <small
      >One single-shot observable bound by one push and one rxLet as input
        binding
      </small
      >
    </h2>
    <renders></renders><br/>
    <span>strategy: </span><b class="strategy"></b>
    <br/>
    <button [unpatch] (click)="btnClick$.next($event)">increment</button>
    <!-- -->
    <br/>
    <ng-container *rxLet="value1$ as sync1">{{ sync1 }}</ng-container>
    <rxa-mixed-child01 [value]="value1$ | push"></rxa-mixed-child01>
  `,
  changeDetection: environment.changeDetection
})
export class Mix1ParentComponent {
  btnClick$ = new Subject<Event>();

  value1$: Observable<number> = this.btnClick$.pipe(
    startWith(0),
    scan((a): any => ++a, 0)
  );
}
