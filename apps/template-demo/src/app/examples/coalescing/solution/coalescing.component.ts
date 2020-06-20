import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  BehaviorSubject,
  concat,
  EMPTY,
  from,
  interval,
  NEVER,
  Observable,
  Subject,
  timer
} from 'rxjs';
import {
  concatMap,
  mergeMap,
  scan,
  switchMap,
  take,
  takeUntil,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { getStrategies } from '@rx-angular/template';

@Component({
  selector: 'demo-basics',
  template: `
    renders: {{ rerenders() }}

    <br />
    ---
    <br />
    <label>Render Strategy</label>
    <input (change)="ms = $event.target?.value" />
    <br />

    <label>Render Strategy</label>
    <select [unpatch] (change)="strategy$.next($event?.target?.value)">
      <option [value]="s" *ngFor="let s of strategies">{{ s }}</option>
    </select>

    <button [unpatch] (click)="renderChange()">RenderChange</button>

    <br />

    <button [unpatch] (click)="updateValue()">UpdateValue</button>
    <br />
    <button [unpatch] (click)="updatePattern()">updatePattern</button>
    <br />
    <button [unpatch] (click)="updatePatternSet()">
      updatePatternSet {{ strategy$ | push }}
    </button>
    <br />
    <button [unpatch] (click)="toggle.next($event)">toggle</button>
    <br />

    push: {{ value$ | push: strategy$ }}<br />
    push: {{ value$ | push: strategy$ }}<br />
    push: {{ value$ | push: strategy$ }}<br />
    push: {{ value$ | push: strategy$ }}<br />
    push: {{ value$ | push: strategy$ }}<br />

    ---- <br />

    <ng-container *rxLet="value$; let value; strategy: strategy$">
      rxLet: {{ value }}
    </ng-container>
    <br />
    <ng-container *rxLet="value$; let value; strategy: strategy$">
      rxLet: {{ value }}
    </ng-container>
    <br />

    <ng-container *rxLet="value$; let value; strategy: strategy$">
      rxLet: {{ value }}
    </ng-container>

    <br />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoalescingComponent implements OnInit {
  numRenders = 0;
  ms = 100;
  strategy$ = new BehaviorSubject('noop');

  strategies = Object.keys(getStrategies({ cdRef: {} } as any));
  nextValues = new Subject<any>();
  toggle = new Subject<any>();
  value$: Observable<string> = this.nextValues.pipe(
    mergeMap(() => ['1', '2', '3', '4', Math.random() + ''])
  );
  value;

  constructor(private cdRef: ChangeDetectorRef) {}

  rerenders() {
    return ++this.numRenders;
  }

  renderChange() {}

  updateValue() {
    this.nextValues.next(1);
  }

  updatePattern() {
    interval(this.ms)
      .pipe(take(20))
      .subscribe(() => this.nextValues.next(1));
  }

  updatePatternSet() {
    from(this.strategies)
      .pipe(
        concatMap(strategyName => {
          this.strategy$.next(strategyName);
          console.log('strategy', strategyName);
          return interval(this.ms).pipe(takeUntil(interval(3000)));
        })
      )
      .subscribe(() => {
        this.nextValues.next(1);
      });
  }

  ngOnInit() {
    this.toggle
      .pipe(
        scan(isTrue => !isTrue, true),
        switchMap(isTrue => (isTrue ? interval(this.ms) : EMPTY)),
        tap(() => this.nextValues.next(1))
      )
      .subscribe();
  }
}

function toNever<T>(o: Observable<T>): Observable<T> {
  return concat(o, NEVER);
}
