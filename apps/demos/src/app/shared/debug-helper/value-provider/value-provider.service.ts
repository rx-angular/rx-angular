import { ChangeDetectorRef, Injectable } from '@angular/core';
import { insert,update,remove, RxState } from '@rx-angular/state';
import { merge, Observable, Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import { toBoolean, toInt, toRandom, toRandomItems, toTick, withCompleteAndError } from './utils';
import { Positions, ProvidedValues, SchedulerConfig } from './model';
import { ngInputFlatten } from '../../utils/ngInputFlatten';


@Injectable()
export class ValueProviderService extends RxState<ProvidedValues> {
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

  protected addItemsSubject = new Subject<number>();
  protected moveItemsSubject = new Subject<Positions>();
  protected updateItemsSubject = new Subject<number[]>();
  protected removeItemsSubject = new Subject<number[]>();

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
      this.schedule$.pipe(toTick())
    );
    this.connect(
      'random',
      merge(this.nextSubject, outerChanges$).pipe(map(toRandom))
    );
    this.connect(
      'array',
      this.addItemsSubject.pipe(map(numItems => toRandomItems([toInt(Math.random(), 0, 10)]))),
      (state, item) => insert(state.array, item)
    );
    this.connect(
      'array',
      this.updateItemsSubject,
      (state, itemIds) => update(state.array, toRandomItems([1,2,3]), existingItem => itemIds.some(idToUpdate => existingItem.id === idToUpdate))
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


  addItems(numItems: number): void {
    this.addItemsSubject.next(numItems);
  }

  moveItems(positions: Positions): void {
    this.moveItemsSubject.next(positions);
  }

  updateItems(itemsIds: number[]): void {
    this.updateItemsSubject.next(itemsIds);
  }

  removeItems(itemsIds: number[]): void {
    this.removeItemsSubject.next(itemsIds);
  }

  reset(): void {
    this.resetSubject.next();
  }
}
