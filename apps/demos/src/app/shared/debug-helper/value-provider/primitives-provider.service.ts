import { ChangeDetectorRef, Injectable } from '@angular/core';
import { insert, remove, RxState, update } from '@rx-angular/state';
import { merge, Observable, Subject } from 'rxjs';
import { map, scan, switchMap } from 'rxjs/operators';
import {
  getRandomItems,
  moveItemMutable,
  toBoolean,
  toInt,
  toNewItems,
  toRandom,
  toTick,
  withCompleteAndError
} from './utils';
import { Positions, ProvidedValues, SchedulerConfig } from './model';
import { ngInputFlatten } from '../../utils/ngInputFlatten';


@Injectable()
export class PrimitivesProviderService extends RxState<ProvidedValues> {
  protected outerChanges = new Subject<Observable<any>>();

  protected nextSubject = new Subject<any>();
  protected schedule$ = new Subject<SchedulerConfig>();

  protected errorSubject = new Subject<any>();
  protected error$ = this.errorSubject.pipe(
    map((_) => {
      throw new Error('ERROR');
    })
  );
  protected completeSubject = new Subject<any>();
  protected resetSubject = new Subject<any>();

  float$: Observable<number>;
  int$: Observable<number>;
  incremental$: Observable<number>;
  boolean$: Observable<boolean>;
  array$: Observable<any[]>;

  float: number;
  int: number;
  boolean: boolean;
  array: any[];

  truthy = 0.5;
  min = 0;
  max = 10;

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
    this.array$ = this.select(
      map((s) => s.array),
      withCompleteAndError(this.error$, this.completeSubject)
    );
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
    this.boolean = toBoolean(float, this.truthy);
  };

  constructor(protected cdRef: ChangeDetectorRef) {
    super();
    const outerChanges$ = merge(
      this.outerChanges.pipe(ngInputFlatten()),
      this.schedule$.pipe(switchMap(v => toTick(v)))
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
