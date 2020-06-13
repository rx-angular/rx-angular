import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { getStrategies, renderChange } from '@rx-angular/template';
import { concat, defer, from, NEVER, Observable, Subject } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';

@Component({
  selector: 'demo-basics',
  template: `
    renders: {{ rerenders() }}

    <br />
    ---
    <br />

    <button [unpatch] (click)="scheduleCD()">renderChange</button>
    {{ value }}
    <br />

    <button [unpatch] (click)="rxRenderChange()">rxRenderChange</button>

    <br />

    <button [unpatch] (click)="rxUpdateValue()">rxUpdateValue</button>
    <br />
    <!--
    push: {{ value$ | push: strategy }}<br />
    push: {{ value$ | push: strategy }}<br />
    push: {{ value$ | push: strategy }}<br />
    push: {{ value$ | push: strategy }}<br />-->
    push: {{ value$ | push: strategy }}<br />

    ---- <br />
    <!--
    <ng-container *rxLet="value$; let value; strategy:strategy"> rxLet: {{ value }} </ng-container> <br />
    <ng-container *rxLet="value$; let value; strategy:strategy"> rxLet: {{ value }} </ng-container> <br />
     -->

    <ng-container *rxLet="value$; let value; strategy: strategy">
      rxLet: {{ value }}
    </ng-container>

    <br />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoBasicsComponent implements OnInit {
  numRenders = 0;

  strategy = 'ɵlocal';

  strategies;
  nextValues = new Subject<any>();
  value$: Observable<string> = defer(() =>
    this.nextValues.pipe(
      mergeMap(() => ['1', '2', '3', '4', Math.random() + '']),
      tap(v => console.log('value$', v))
    )
  );
  value;

  constructor(private cdRef: ChangeDetectorRef) {}

  rerenders() {
    return ++this.numRenders;
  }

  rxRenderChange() {
    toNever(from(['1', '2']))
      .pipe(
        tap(v => (this.value = v)),
        renderChange(this.strategies[this.strategy])
      )
      .subscribe(v => {
        console.log('s', v);
      });
    toNever(from(['a', 'b']))
      .pipe(
        tap(v => (this.value = v)),
        renderChange(this.strategies[this.strategy])
      )
      .subscribe(v => {
        console.log('s', v);
      });
    toNever(from(['§', '$']))
      .pipe(
        tap(v => (this.value = v)),
        renderChange(this.strategies[this.strategy])
      )
      .subscribe(v => {
        console.log('s', v);
      });
    toNever(from(['ü', Math.random() + '']))
      .pipe(
        tap(v => (this.value = v)),
        renderChange(this.strategies[this.strategy])
      )
      .subscribe(v => {
        console.log('s', v);
      });
  }

  scheduleCD() {
    this.value = Math.random() + '';
    this.strategies[this.strategy].scheduleCD();
    this.strategies[this.strategy].scheduleCD();
    this.strategies[this.strategy].scheduleCD();
    this.strategies[this.strategy].scheduleCD();
  }

  rxUpdateValue() {
    this.nextValues.next(1);
  }

  ngOnInit() {
    this.strategies = getStrategies<any>({ cdRef: this.cdRef });
  }
}

function toNever<T>(o: Observable<T>): Observable<T> {
  return concat(o, NEVER);
}
