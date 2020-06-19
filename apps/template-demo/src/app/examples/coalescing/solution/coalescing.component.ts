import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { concat, defer, from, NEVER, Observable, Subject } from 'rxjs';
import { delay, mergeMap, startWith, tap } from 'rxjs/operators';
import { getStrategies } from '@rx-angular/template';

@Component({
  selector: 'demo-basics',
  template: `
    renders: {{ rerenders() }}

    <br />
    ---
    <br />
    <label>Render Strategy</label>
    <select (change)="strategy = $event?.target?.value">
      <option [value]="s" *ngFor="let s of strategies">{{ s }}</option>
    </select>

    <button [unpatch] (click)="rxRenderChange()">rxRenderChange</button>

    <br />

    <button [unpatch] (click)="rxUpdateValue()">rxUpdateValue</button>
    <br />

    push: {{ value$ | push: strategy }}<br />
    push: {{ value$ | push: strategy }}<br />
    push: {{ value$ | push: strategy }}<br />
    push: {{ value$ | push: strategy }}<br />
    push: {{ value$ | push: strategy }}<br />

    ---- <br />

    <ng-container *rxLet="value$; let value; strategy: strategy">
      rxLet: {{ value }}
    </ng-container>
    <br />
    <ng-container *rxLet="value$; let value; strategy: strategy">
      rxLet: {{ value }}
    </ng-container>
    <br />

    <ng-container *rxLet="value$; let value; strategy: strategy">
      rxLet: {{ value }}
    </ng-container>

    <br />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoalescingComponent implements OnInit {
  numRenders = 0;

  strategy = 'local';

  strategies = Object.keys(getStrategies({ cdRef: {} } as any));
  nextValues = new Subject<any>();
  value$: Observable<string> = this.nextValues.pipe(
    mergeMap(() => ['1', '2', '3', '4', Math.random() + '']),
    tap(v => console.log('value$', v))
  );
  value;

  constructor(private cdRef: ChangeDetectorRef) {}

  rerenders() {
    return ++this.numRenders;
  }

  rxRenderChange() {}

  rxUpdateValue() {
    this.nextValues.next(1);
  }

  ngOnInit() {}
}

function toNever<T>(o: Observable<T>): Observable<T> {
  return concat(o, NEVER);
}
