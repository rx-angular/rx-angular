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

    <button (click)="scheduleCD()">renderChange</button>
    {{ value }}
    <br />

    <button (click)="rxRenderChange()">rxRenderChange</button>

    <br />

    <button (click)="rxUpdateValue()">rxUpdateValue</button>
    <br />

    push: {{ value$ | push }}<br />
    push: {{ value$ | push }}<br />
    push: {{ value$ | push }}<br />

    ---- <br />
    <ng-container *rxLet="value$; let value"> rxLet: {{ value }} </ng-container
    ><br />
    <ng-container *rxLet="value$; let value"> rxLet: {{ value }} </ng-container
    ><br />
    <ng-container *rxLet="value$; let value"> rxLet: {{ value }} </ng-container
    ><br />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoBasicsComponent implements OnInit {
  numRenders = 0;
  strategies;
  nextValues = new Subject<any>();
  value$: Observable<string> = defer(() =>
    this.nextValues.pipe(
      mergeMap(() => ['1', '2', '3', '4', Math.random() + '']),
      renderChange(this.strategies.ɵlocal),
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
      .pipe(renderChange(this.strategies.ɵlocal))
      .subscribe(v => {
        console.log('s', v);
        this.value = v;
      });
    toNever(from(['a', 'b']))
      .pipe(renderChange(this.strategies.ɵlocal))
      .subscribe(v => {
        console.log('s', v);
        this.value = v;
      });
    toNever(from(['§', '$']))
      .pipe(renderChange(this.strategies.ɵlocal))
      .subscribe(v => {
        console.log('s', v);
        this.value = v;
      });
    toNever(from(['ü', Math.random() + '']))
      .pipe(renderChange(this.strategies.ɵlocal))
      .subscribe(v => {
        console.log('s', v);
        this.value = v;
      });
  }

  scheduleCD() {
    this.value = Math.random() + '';
    this.strategies.ɵlocal.scheduleCD();
    this.strategies.ɵlocal.scheduleCD();
    this.strategies.ɵlocal.scheduleCD();
    this.strategies.ɵlocal.scheduleCD();
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
