import { Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { defer, Observable } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';
import { BaseComponent } from '../../base.component.ts/base.component';
import { fromZoneEvent } from '@rxjs-etc';

@Component({
  selector: 'app-mixed-parent02',
  template: `
    <h2>
      Mixed Setup 02
      <small>Kitchen sink</small>
    </h2>
    <span>render: </span><b class="num-renders">{{ getNumOfRenderings() }}</b
    ><br />
    <span>strategy: </span><b class="strategy">{{ strategy }}</b>
    <br />
    <button #button>increment</button>
    <!-- -->
    <br />
    {{ nums1$ | ngrxPush }}
    <app-mixed-child02 [value]="nums1$ | ngrxPush"></app-mixed-child02>
    <span *ngFor="let num of nums1$ | ngrxPush">{{ num }}</span>
    <ng-container *ngIf="nums1$ | ngrxPush as sync1">{{
      sync1 | json
    }}</ng-container>
    <ng-container *ngrxLet="nums1$ as sync1">{{ sync1 | json }}</ng-container>
    <app-mixed-child01 [value]="nums1$ | ngrxPush"></app-mixed-child01>
  `,
  changeDetection: environment.changeDetection
})
export class Parent02Component extends BaseComponent {
  @ViewChild('button') button: ElementRef<HTMLButtonElement>;
  btnClick$ = defer(() => fromZoneEvent(this.button.nativeElement, 'click'));

  nums1$: Observable<number> = this.btnClick$.pipe(
    startWith(0),
    scan(i => ++i, 0),
    scan((nums, num): any => [...nums, num], [])
  );
}
