import { ChangeDetectorRef, Injectable } from '@angular/core';
import { insert, remove, RxState, update } from '@rx-angular/state';
import { merge, Observable, Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';
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

  protected addItemsSubject = new Subject<number | undefined>();
  protected moveItemsSubject = new Subject<Positions | undefined>();
  protected updateItemsSubject = new Subject<number[] | undefined>();
  protected removeItemsSubject = new Subject<number[] | undefined>();

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
      this.addItemsSubject.pipe(map(v => v || 1)),
      (state, numItems) => {
        const arr = (state.array || []);
        const items: any[] = toNewItems(arr, numItems);
        if (arr.length === 0) {
          return insert(arr, items);
        }
        const newItems = items.filter(ni => arr.some(oi => oi.id !== ni.id));
        const updateItems = items.filter(ni => arr.some(oi => oi.id === ni.id));
        return update(insert(arr, newItems), updateItems, 'id');
      });

    this.connect(
      'array',
      this.updateItemsSubject.pipe(map(v => v || [toInt()])),
      (state, itemIds) => update(state.array, getRandomItems(state.array, itemIds.length)
        .map(i => ({ ...i, value: toRandom() })), 'id')
    );

    this.connect(
      'array',
      this.moveItemsSubject,
      (state, positions) => {
        let arr = state.array;
        const randItemId = getRandomItems(arr, 1)[0].id;
        Object.entries(positions || { [randItemId]:1 }).forEach(([id, newIdx]) =>
          arr = moveItemMutable(arr, arr.findIndex(i => +i.id === +id), newIdx)
        );
        return [...arr];
      }
    );

    this.connect(
      'array',
      this.removeItemsSubject,
      (state, ids) => remove(state.array || [], ids || getRandomItems(state.array || [], 1), 'id')
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


  addItems(numItems?: number): void {
    this.addItemsSubject.next(numItems);
  }

  moveItems(positions?: Positions): void {
    this.moveItemsSubject.next(positions);
  }

  updateItems(itemsIds?: number[]): void {
    this.updateItemsSubject.next(itemsIds);
  }

  removeItems(itemsIds?: number[]): void {
    this.removeItemsSubject.next(itemsIds);
  }

  reset(): void {
    this.resetSubject.next();
  }
}
