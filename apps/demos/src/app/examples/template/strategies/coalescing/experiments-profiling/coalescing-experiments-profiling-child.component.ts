import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  Observable
} from 'rxjs';
import {
  map,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { getStrategies } from '@rx-angular/template';
import { CoalescingTestService } from './coalescing-test.service';
import { RxState } from '@rx-angular/state';

@Component({
  selector: 'coalescing-child',
  template: `
    strategy$ : {{ strategy$ | push: 'local' }}, renders: <renders></renders>
    <br />

    push: {{ value$ | push: strategy$ }}<br />
    push: {{ value$ | push: strategy$ }}<br />
    <ng-container *rxLet="value$; let value; strategy: strategy$">
      rxLet: {{ value }}
    </ng-container>
    <br />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CoalescingTestService]
})
export class CoalescingExperimentsProfilingChildComponent
  extends RxState<{ val: any; strategy: any }>
  implements OnInit {
  strategies;
  strategy$ = this.select('strategy');
  value$ = this.select(map(s => s.val));
  valueComp$ = this.select(
    map(s => s.val),
    withLatestFrom(this.strategy$),
    tap(([v, s]) => this.strategies[s].scheduleCD())
  );

  @Input()
  set value(val$: Observable<any>) {
    this.connect('val', val$);
  }
  @Input()
  set strategy(strategy$: Observable<any>) {
    this.connect('strategy', strategy$);
  }

  constructor(
    private cdRef: ChangeDetectorRef,
    public s: CoalescingTestService
  ) {
    super();
  }

  ngOnInit(): void {
    this.strategies = getStrategies({ cdRef: this.cdRef });
    this.hold(this.valueComp$);
  }
}
