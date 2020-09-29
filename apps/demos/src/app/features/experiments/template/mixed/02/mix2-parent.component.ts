import { Component } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';

@Component({
  selector: 'rxa-mixed-parent02',
  template: `
    <h2>
      Mixed Setup 02
      <small>Kitchen sink</small>
    </h2>
    <renders></renders><br/>
    <span>strategy: </span><b class="strategy"></b>
    <br/>
    <button [unpatch] (click)="btnClick$.next($event)">increment</button>
    <!-- -->
    <br/>
    {{ nums1$ | push }}
    <rxa-mixed-child02 [value]="nums1$ | push"></rxa-mixed-child02>
    <span *ngFor="let num of nums1$ | push">{{ num }}</span>
    <ng-container *ngIf="nums1$ | push as sync1">{{
      sync1 | json
      }}</ng-container>
    <ng-container *rxLet="nums1$ as sync1">{{ sync1 | json }}</ng-container>
    <rxa-mixed-child02 [value]="nums1$ | push"></rxa-mixed-child02>
  `,
  changeDetection: environment.changeDetection
})
export class Mix2ParentComponent {
  btnClick$ = new Subject<Event>();

  nums1$: Observable<number> = this.btnClick$.pipe(
    startWith(0),
    scan((i) => ++i, 0),
    scan((nums, num): any => [...nums, num], [])
  );
}
