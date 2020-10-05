import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { RxState } from '@rx-angular/state';
import { EMPTY, merge, Observable, Subject, timer } from 'rxjs';
import {
  map,
  merge as mergeWith,
  repeat,
  scan,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { animationFrameTick } from '../../../../../../../../libs/template/src/lib/render-strategies/rxjs/scheduling';
import { ngInputFlatten } from '../../../utils/ngInputFlatten';

interface ProvidedValues {
  random: number;
}

interface SchedulerConfig {
  scheduler: string;
  duration?: number;
  numEmissions?: number;
  tickSpeed?: number;
}

@Component({
  selector: 'rxa-value-provider',
  exportAs: 'rxaValueProvider',
  template: ` <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValueProviderComponent extends RxState<ProvidedValues> {
  private outerChanges = new Subject<Observable<any>>();

  private nextSubject = new Subject<any>();
  private schedule$ = new Subject<SchedulerConfig>();

  private errorSubject = new Subject<any>();
  private error$ = this.errorSubject.pipe(
    map((_) => {
      throw new Error('ERROR');
    })
  );
  private completeSubject = new Subject<any>();
  private resetSubject = new Subject<any>();

  float$;
  int$;
  incremental$;
  boolean$;

  float: number;
  int: number;
  incremental = 0;
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

  private resetAll = () => {
    this.resetObservables();
    this.updateStatic(undefined);
    this.cdRef.markForCheck();
  };

  private resetObservables = () => {
    this.float$ = this.select('random');
    this.int$ = this.select(
      map((s) => toInt(s.random, this.min, this.max)),
      withCompleteAndError(this.error$, this.completeSubject)
    );
    this.incremental$ = this.select(
      scan((inc) => ++inc, 0),
      withCompleteAndError(this.error$, this.completeSubject)
    );
    this.boolean$ = this.select(
      map((s) => toBoolean(s.random, this.truthy)),
      withCompleteAndError(this.error$, this.completeSubject)
    );
    this.hold(this.float$, this.updateStatic);
    this.hold(this.resetSubject, this.resetAll);
  };

  private updateStatic = (float: number): void => {
    this.float = float;
    this.int = toInt(float, this.min, this.max);
    ++this.incremental;
    this.boolean = toBoolean(float, this.truthy);
  };

  constructor(private cdRef: ChangeDetectorRef) {
    super();
    const outerChanges$ = merge(
      this.outerChanges.pipe(ngInputFlatten()),
      this.schedule$.pipe(toTick())
    );
    this.connect(
      'random',
      merge(this.nextSubject, outerChanges$).pipe(map(toRandom))
    );
    this.resetAll();
  }

  next(): void {
    this.nextSubject.next();
  }

  error(): void {
    this.errorSubject.next();
  }

  complete(): void {
    this.completeSubject.next();
  }

  reset(): void {
    this.resetSubject.next();
  }
}

function withCompleteAndError(error$, complete$) {
  return (o: Observable<unknown>): Observable<unknown> =>
    o.pipe(mergeWith(error$), takeUntil(complete$));
}

function toTick(): (o: Observable<SchedulerConfig>) => Observable<number> {
  return (o) =>
    o.pipe(
      switchMap((scheduleConfig) => {
        if (!scheduleConfig) {
          return EMPTY;
        } else {
          const stop$ = scheduleConfig.duration
            ? timer(scheduleConfig.duration)
            : EMPTY;
          if (scheduleConfig.scheduler === 'timeout') {
            return timer(0, scheduleConfig.tickSpeed).pipe(takeUntil(stop$));
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
