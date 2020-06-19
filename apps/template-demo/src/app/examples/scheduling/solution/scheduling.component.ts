import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';

import { concat, NEVER, Observable, Subject } from 'rxjs';
import { scan, tap } from 'rxjs/operators';
import {
  getScheduler,
  getStrategies,
  SchedulingPriority
} from '@rx-angular/template';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'scheduling',
  template: `
    renders: {{ rerenders() }}
    <br />
    ---
    <button [unpatch] (click)="increment()">
      Unscheduled
    </button>
    <button [unpatch] (click)="increment(prios.Promise)">
      {{ prios.Promise }}
    </button>
    <button [unpatch] (click)="increment(prios.animationFrame)">
      {{ prios.animationFrame }}
    </button>
    <button [unpatch] (click)="increment(prios.idleCallback)">
      {{ prios.idleCallback }}
    </button>
    <button [unpatch] (click)="increment(prios.background)">
      {{ prios.background }}
    </button>
    <button [unpatch] (click)="increment(prios.userVisible)">
      {{ prios.userVisible }}
    </button>
    <button [unpatch] (click)="increment(prios.userBlocking)">
      {{ prios.userBlocking }}
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      button:active {
        background: red;
      }
    `
  ]
})
export class SchedulingComponent {
  numRenders = 0;

  prios = SchedulingPriority;

  strategies;
  nextValues = new Subject<any>();
  value$: Observable<string> = this.nextValues.pipe(
    scan(count => ++count),
    tap(v => console.log('count:', v))
  );
  value;

  constructor(private cdRef: ChangeDetectorRef) {
    this.strategies = getStrategies({ cdRef });
  }

  rerenders() {
    return ++this.numRenders;
  }

  increment(priority?: SchedulingPriority) {
    const XXXXXXXXXXXXXXXXXXXXX = () => {
      this.cdRef.detectChanges();
      console.log('scheduled over', priority);
    };
    this.strategies.local.scheduleCD();
    priority
      ? getScheduler(priority).schedule(XXXXXXXXXXXXXXXXXXXXX)
      : XXXXXXXXXXXXXXXXXXXXX();
  }
}

function toNever<T>(o: Observable<T>): Observable<T> {
  return concat(o, NEVER);
}
