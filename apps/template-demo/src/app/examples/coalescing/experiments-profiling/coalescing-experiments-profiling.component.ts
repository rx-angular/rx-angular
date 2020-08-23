import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import {
  asapScheduler,
  BehaviorSubject,
  concat,
  EMPTY,
  from,
  interval,
  NEVER,
  Observable
} from 'rxjs';
import { getStrategies } from '@rx-angular/template';
import { CoalescingTestService } from './coalescing-test.service';

@Component({
  selector: 'demo-basics',
  template: `
    <renders></renders>

    <br />
    --
    <label>Render Strategy: {{ strategy$ | push }}</label>
    <select [unpatch] (change)="strategy$.next($event?.target?.value)">
      <option [value]="s" *ngFor="let s of strategies">{{ s }}</option>
    </select>

    <br />

    <button [unpatch] (click)="updateValue()">UpdateValue</button>
    <br />
    <coalescing-child
      [value]="value$"
      [strategy]="strategy$"
    ></coalescing-child>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CoalescingTestService]
})
export class CoalescingExperimentsProfilingComponent implements OnInit {
  strategy$ = this.s.strategy$;

  strategies = Object.keys(getStrategies({ cdRef: { context: {} } } as any));
  value$: Observable<string> = this.s.value$;

  constructor(
    private cdRef: ChangeDetectorRef,
    public s: CoalescingTestService
  ) {}

  updateValue() {
    this.s.updateValue();
  }

  updatePattern() {
    this.s.updatePattern();
  }

  updatePatternSet() {
    //from(this.strategies)
    this.s.updatePatternSet(['local', 'global', 'local']);
  }

  ngOnInit() {
    this.s.toggleTick.subscribe();
  }
}

function toNever<T>(o: Observable<T>): Observable<T> {
  return concat(o, NEVER);
}
