import { ChangeDetectorRef, Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { from, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  addItemImmutable,
  addItemMutable,
  moveItemMutable,
  moveItemsImmutable,
  shuffleItemsImmutable,
  removeItemsImmutable,
  removeItemsMutable,
  updateItemImmutable,
  updateItemMutable,
  withCompleteAndError,
} from './utils';
import { ProvidedValues } from './model';

@Injectable()
export class ArrayProviderService extends RxState<ProvidedValues> {
  array$: Observable<any[]>;

  protected errorSubject = new Subject<any>();
  protected error$ = this.errorSubject.pipe(
    map((_) => {
      throw new Error('ERROR');
    })
  );
  protected completeSubject = new Subject<any>();
  protected resetSubject = new Subject<any>();

  protected addItemsImmutableSubject = new Subject<number | undefined>();
  protected moveItemsImmutableSubject = new Subject<number | undefined>();
  protected shuffleItemsImmutableSubject = new Subject<void>();
  protected updateItemsImmutableSubject = new Subject<number>();
  protected removeItemsImmutableSubject = new Subject<number>();

  protected addItemsMutableSubject = new Subject<number | undefined>();
  protected moveItemsMutableSubject = new Subject<number | undefined>();
  protected updateItemsMutableSubject = new Subject<number[] | undefined>();
  protected removeItemsMutableSubject = new Subject<number[] | undefined>();

  private resetAll = () => {
    this.resetObservables();
    this.cdRef.markForCheck();
  };

  private resetObservables = () => {
    this.array$ = this.$.pipe(
      map((s) => s.array),
      withCompleteAndError(this.error$, this.completeSubject)
    );
  };

  constructor(protected cdRef: ChangeDetectorRef) {
    super();

    this.connect(
      'array',
      this.addItemsImmutableSubject,
      (state, numItems = 1) => addItemImmutable(state?.array || [], numItems)
    );

    this.connect('array', this.updateItemsImmutableSubject, (state, num) =>
      updateItemImmutable(state?.array || [], num)
    );

    this.connect('array', this.moveItemsImmutableSubject, (state, positions) =>
      moveItemsImmutable(state?.array || [], positions)
    );

    this.connect('array', this.shuffleItemsImmutableSubject, (state) =>
      shuffleItemsImmutable(state?.array || [])
    );

    this.connect('array', this.removeItemsImmutableSubject, (state, num) =>
      removeItemsImmutable(state?.array || [], num)
    );

    this.connect('array', this.addItemsMutableSubject, (state, numItems = 1) =>
      addItemMutable(state?.array || [], numItems)
    );

    this.connect('array', this.updateItemsMutableSubject, (state, itemIds) =>
      updateItemMutable(state?.array || [], itemIds)
    );

    this.connect('array', this.moveItemsMutableSubject, (state, positions) =>
      moveItemMutable(state?.array || [], positions)
    );

    this.connect('array', this.removeItemsMutableSubject, (state, ids) =>
      removeItemsMutable(state?.array || [], ids)
    );

    this.resetAll();
  }

  addItemsImmutable(numItems?: number): void {
    this.addItemsImmutableSubject.next(numItems);
  }

  moveItemsImmutable(numPositions: number = 1): void {
    this.moveItemsImmutableSubject.next(numPositions);
  }

  shuffleAttack(): void {
    from([0, 1, 2]).subscribe(v => {
      this.shuffleItemsImmutable();
    })
  }

  shuffleItemsImmutable(): void {
    this.shuffleItemsImmutableSubject.next();
  }

  updateItemsImmutable(num: number): void {
    this.updateItemsImmutableSubject.next(num);
  }

  removeItemsImmutable(numItems: number): void {
    this.removeItemsImmutableSubject.next(numItems);
  }

  addItemsMutable(numItems?: number): void {
    this.addItemsMutableSubject.next(numItems);
  }

  moveItemsMutable(positions?: number): void {
    this.moveItemsMutableSubject.next(positions);
  }

  updateItemsMutable(itemsIds?: number[]): void {
    this.updateItemsMutableSubject.next(itemsIds);
  }

  removeItemsMutable(itemsIds?: number[]): void {
    this.removeItemsMutableSubject.next(itemsIds);
  }

  error(): void {
    this.errorSubject.next(undefined);
  }

  complete(): void {
    this.completeSubject.next(undefined);
  }

  reset(): void {
    this.resetSubject.next(undefined);
  }
}
