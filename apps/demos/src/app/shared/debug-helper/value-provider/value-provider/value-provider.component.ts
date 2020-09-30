import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { EMPTY, merge, Observable, Subject, timer } from 'rxjs';
import { map, repeat, scan, switchMap, takeUntil } from 'rxjs/operators';
import { ngInputAll } from '../../../utils/ngInputAll';
import { animationFrameTick } from '../../../../../../../../libs/template/src/lib/render-strategies/rxjs/scheduling';

interface ProvidedValues {
  random: number
}

interface SchedulerConfig { scheduler: string, duration?: number, numEmissions?: number, tickSpeed?: number }

@Component({
  selector: 'rxa-value-provider',
  exportAs: 'rxaValueProvider',
  template: `
    <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValueProviderComponent extends RxState<ProvidedValues> {
  private outerChanges = new Subject<Observable<any>>();

  next$ = new Subject<any>();
  error$ = new Subject<any>();
  complete$ = new Subject<any>();
  schedule$ = new Subject<SchedulerConfig>();

  float$ = this.select('random');
  int$ = this.select(map(s => toInt(s.random, this.min, this.max)));
  incremental$ = this.select(scan(inc => ++inc, 0));
  boolean$ = this.select(map(s => toBoolean(s.random, this.truthy)));

  float: number;
  int: number;
  boolean: boolean;

  @Input()
  truthy = 0.5;

  @Input()
  min = 0;

  @Input()
  max = 10;

  @Input()
  set changes$(o$: Observable<any>) {
    this.outerChanges.next(o$);
  }

  updateStatic = (float: number): void => {
    this.float = float;
    this.int = toInt(float, this.min, this.max);
    this.boolean = toBoolean(float, this.truthy);
  };

  constructor() {
    super();
    const outerChanges$ = merge(
      this.outerChanges.pipe(ngInputAll()),
      this.schedule$.pipe(toTick())
    );
    this.connect('random', merge(this.next$, outerChanges$)
      .pipe(map(toRandom))
    );
    this.hold(this.float$, this.updateStatic);
  }

}

function toTick(): (o: Observable<SchedulerConfig>) => Observable<number> {
  return o => o.pipe(
    switchMap((scheduleConfig) => {
      if (!scheduleConfig) {
        return EMPTY;
      } else {
        const stop$ = scheduleConfig.duration ? timer(scheduleConfig.duration) : EMPTY;
        if (scheduleConfig.scheduler === 'timeout') {
          return timer(0, scheduleConfig.tickSpeed).pipe(
            takeUntil(stop$)
          );
        } else if (scheduleConfig.scheduler === 'animationFrame') {
          return animationFrameTick().pipe(
            repeat(scheduleConfig.numEmissions),
            takeUntil(stop$)
          );
        }
        throw new Error('Wrong scheduler config');
      }
    })
  );
}

function toInt(float: number, min = 0, max = 10): number {
  // tslint:disable-next-line:no-bitwise
  return ~~(min + float * (max - min));
}

function toRandom(): number {
  return Math.random();
}

function toBoolean(float: number, truthy: number): boolean {
  return float < truthy;
}


