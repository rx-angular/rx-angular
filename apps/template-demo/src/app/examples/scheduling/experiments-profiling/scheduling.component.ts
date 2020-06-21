import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
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
    <button [unpatch] (click)="scheduleAllPrios()">
      scheduleAll
    </button>
    <button [unpatch] (click)="scheduleByPrio()">
      Unscheduled
    </button>
    <button [unpatch] (click)="scheduleByPrio(prios.Promise)">
      {{ prios.Promise }}
    </button>
    <button [unpatch] (click)="scheduleByPrio(prios.animationFrame)">
      {{ prios.animationFrame }}
    </button>
    <button [unpatch] (click)="scheduleByPrio(prios.idleCallback)">
      {{ prios.idleCallback }}
    </button>
    <button [unpatch] (click)="scheduleByPrio(prios.background)">
      {{ prios.background }}
    </button>
    <button [unpatch] (click)="scheduleByPrio(prios.userVisible)">
      {{ prios.userVisible }}
    </button>
    <button [unpatch] (click)="scheduleByPrio(prios.userBlocking)">
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
export class SchedulingComponent implements OnInit {
  numRenders = 0;

  prios = SchedulingPriority;

  strategies;
  nextValues = new Subject<any>();
  value$: Observable<string> = this.nextValues.pipe(
    scan(count => ++count),
    tap(v => console.log('count:', v))
  );
  value;

  constructor(private cdRef: ChangeDetectorRef) {}

  rerenders() {
    return ++this.numRenders;
  }

  scheduleAllPrios() {
    const sync = () => {
      this.cdRef.detectChanges();
    };
    const micro = () => {
      this.cdRef.detectChanges();
    };
    const animationFrame = () => {
      this.cdRef.detectChanges();
    };
    const idleCallback = () => {
      this.cdRef.detectChanges();
    };
    const userBlocking = () => {
      this.cdRef.detectChanges();
    };
    const userVisible = () => {
      this.cdRef.detectChanges();
    };
    const background = () => {
      this.cdRef.detectChanges();
    };

    sync();
    getScheduler(SchedulingPriority.Promise).schedule(micro);
    getScheduler(SchedulingPriority.animationFrame).schedule(animationFrame);
    getScheduler(SchedulingPriority.background).schedule(background);
    getScheduler(SchedulingPriority.userVisible).schedule(userVisible);
    getScheduler(SchedulingPriority.userBlocking).schedule(userBlocking);
    getScheduler(SchedulingPriority.idleCallback).schedule(idleCallback);
  }

  scheduleByPrio(priority?: SchedulingPriority) {
    const XXXXXXXXXXXXXXXXXXXXX = () => {
      this.cdRef.detectChanges();
      console.log('scheduled over', priority);
    };

    priority
      ? getScheduler(priority).schedule(XXXXXXXXXXXXXXXXXXXXX)
      : XXXXXXXXXXXXXXXXXXXXX();
  }

  ngOnInit() {
    this.strategies = getStrategies({ cdRef: this.cdRef });
    console.log(this.strategies, this.cdRef);
  }
}
