import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { defer, fromEvent, Observable, ReplaySubject } from 'rxjs';
import { switchAll } from 'rxjs/operators';
import { BaseComponent } from '../../base.component.ts/base.component';

@Component({
  selector: 'app-push-child12',
  template: `
    <h3>Push Child 12</h3>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    <span>strategy: </span><b class="strategy">{{ strategy }}</b
    ><br />
    Passed input binding: {{ value1$ | push: strategy }}
    <!-- -->
  `,
  changeDetection: environment.changeDetection,
})
export class Child12Component extends BaseComponent {
  valueSubject = new ReplaySubject<Observable<number>>(1);
  @Input()
  set value(value$: Observable<number>) {
    if (value$) {
      this.valueSubject.next(value$);
    }
  }

  value1$ = this.valueSubject.pipe(switchAll());
}
