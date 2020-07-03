import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  asapScheduler,
  BehaviorSubject,
  concat,
  EMPTY,
  from,
  interval,
  NEVER,
  Observable,
  Subject
} from 'rxjs';
import {
  concatMap,
  mergeMap,
  scan,
  switchMap,
  take,
  takeUntil,
  tap
} from 'rxjs/operators';
import { getStrategies } from '@rx-angular/template';
import { CoalescingTestService } from './coalescing-test.service';

@Component({
  selector: 'demo-basics',
  template: `
    renders: {{ rerenders() }}

    <br />
    ---
    <br />
    <label>tick in ms</label>
    <input (change)="s.ms = $event.target?.value" />
    <br />

    <label>Render Strategy</label>
    <select [unpatch] (change)="strategy$.next($event?.target?.value)">
      <option [value]="s" *ngFor="let s of strategies">{{ s }}</option>
    </select>

    <br />

    <button [unpatch] (click)="updateValue()">UpdateValue</button>
    <br />
    <button [unpatch] (click)="updatePattern()">updatePattern</button>
    <br />
    <button [unpatch] (click)="updatePatternSet()">
      updatePatternSet {{ strategy$ | push }}
    </button>
    <br />
    <button [unpatch] (click)="s.toggle.next($event)">toggle</button>
    <br />

    push: {{ value$ | push: strategy$ }}<br />
    push: {{ value$ | push: strategy$ }}<br />
    push: {{ value$ | push: strategy$ }}<br />
    push: {{ value$ | push: strategy$ }}<br />
    push: {{ value$ | push: strategy$ }}<br />
    push: {{ value$ | push: strategy$ }}<br />
    push: {{ value$ | push: strategy$ }}<br />
    push: {{ value$ | push: strategy$ }}<br />
    push: {{ value$ | push: strategy$ }}<br />
    push: {{ value$ | push: strategy$ }}<br />

    ---- <br />
    <!--  <br />
    -->
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CoalescingTestService]
})
export class CoalescingExperimentsProfilingComponent implements OnInit {
  numRenders = 0;

  strategy$ = this.s.strategy$;

  strategies = Object.keys(getStrategies({ scope: {} } as any));
  value$: Observable<string> = this.s.value$;

  constructor(
    private cdRef: ChangeDetectorRef,
    public s: CoalescingTestService
  ) {}

  rerenders() {
    return ++this.numRenders;
  }

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
