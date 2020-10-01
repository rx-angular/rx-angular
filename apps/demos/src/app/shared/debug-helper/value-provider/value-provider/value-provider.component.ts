import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { ConnectableObservable, EMPTY, merge, Observable, Subject, Subscription, timer } from 'rxjs';
import { distinctUntilChanged, map, publishReplay, repeat, scan, switchMap, takeUntil, tap } from 'rxjs/operators';
import { animationFrameTick } from '../../../../../../../../libs/template/src/lib/render-strategies/rxjs/scheduling';
import { ngInputFlatten } from '../../../utils/ngInputFlatten';

interface ProvidedValues {
  random: number
}

interface SchedulerConfig {
  scheduler: string,
  duration?: number,
  numEmissions?: number,
  tickSpeed?: number
}

@Component({
  selector: 'rxa-value-provider',
  exportAs: 'rxaValueProvider',
  template: `
    <ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValueProviderComponent implements OnDestroy {
  private outerChanges = new Subject<Observable<any>>();

  private next$: Subject<any>;
  private schedule$: Subject<SchedulerConfig>;

  private readonly error$ = new Subject<any>();
  private readonly complete$ = new Subject<any>();
  private readonly reset$ = new Subject<any>();

  private _float$: Observable<number>;
  get float$() {
    return this._float$;
  }
  private _int$: Observable<number>;
  get int$() {
    return this._int$;
  }
  private _incremental$: Observable<number>;
  get incremental$() {
    return this._incremental$;
  }
  private _boolean$: Observable<boolean>;
  get boolean$() {
    return this._boolean$;
  }

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

  private sub = Subscription.EMPTY;

  constructor(private cdRef: ChangeDetectorRef) {
    this._reset();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  next(): void {
    this.next$.next();
  }

  complete(): void {
    this.complete$.next();
  }

  error(): void {
    this.error$.next();
  }

  reset(): void {
    this.reset$.next();
  }

  private _reset(): void {
    this.next$ = new Subject();
    this.schedule$ = new Subject();
    this.sub.unsubscribe();
    this.sub = new Subscription();
    const outerChanges$ = merge(
      this.outerChanges.pipe(ngInputFlatten()),
      this.schedule$.pipe(toTick())
    );
    const randomFloat$ = merge(this.next$, outerChanges$).pipe(map(toRandom));
    const stateful = o$ => o$.pipe(distinctUntilChanged(), publishReplay(1));
    this._float$ = randomFloat$.pipe(tap(v => this._updateStatic(v)), stateful);
    this._int$ = randomFloat$.pipe(map(s => toInt(s, this.min, this.max)), stateful);
    this._incremental$ = randomFloat$.pipe(scan(inc => ++inc, 0), stateful);
    this._boolean$ = randomFloat$.pipe(map(r => toBoolean(r, this.truthy)), stateful);
    this.sub.add((this.float$ as ConnectableObservable<number>).connect());
    this.sub.add((this.int$ as ConnectableObservable<number>).connect());
    this.sub.add((this.incremental$ as ConnectableObservable<number>).connect());
    this.sub.add((this.boolean$ as ConnectableObservable<boolean>).connect());
    this.sub.add(this.reset$.subscribe(() => {
      this._reset();
      this.cdRef.markForCheck();
    }));
    this.sub.add(this.error$.subscribe(() => {
      const e = new Error('Boom!!!');
      this.next$.error(e);
      this.schedule$.error(e);
    }));
    this.sub.add(this.complete$.subscribe(() => {
      this.next$.complete();
      this.schedule$.complete();
    }));
  }

  private _updateStatic(float: number): void {
    this.float = float;
    this.int = toInt(float, this.min, this.max);
    this.boolean = toBoolean(float, this.truthy);
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


