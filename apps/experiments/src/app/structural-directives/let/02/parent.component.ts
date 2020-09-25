import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { defer, fromEvent, Observable, Subject } from 'rxjs';
import { BaseComponent } from '../../../base.component.ts/base.component';

@Component({
  selector: 'app-let-parent02',
  template: `
    <h2>
      Let Directive 02
      <small
        >One single-shot observables bound by multiple rxLet as input binding
        with as syntax</small
      >
    </h2>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    <span>strategy: </span><b class="strategy">{{ strategy }}</b>
    <br />
    <button [unpatch] (click)="btnClick$.next($event)">increment</button>
    <ng-container *rxLet="value1$ as v">Value1: {{ v }}</ng-container>
    <ng-container *rxLet="value1$ as v">Value1: {{ v }}</ng-container>
    <ng-container *rxLet="value1$ as v">Value1: {{ v }}</ng-container>
  `,
  changeDetection: environment.changeDetection,
})
export class LetParent02Component extends BaseComponent {
  btnClick$ = new Subject<Event>();

  value1$: Observable<number>;
}
