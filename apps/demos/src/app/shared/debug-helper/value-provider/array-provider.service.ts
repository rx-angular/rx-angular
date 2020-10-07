import { ChangeDetectorRef, Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  addItemImmutable, addItemMutable,
  moveItemImmutable, moveItemMutable,
  removeItemsImmutable, removeItemsMutable,
  updateItemImmutable, updateItemMutable,
  withCompleteAndError
} from './utils';
import { Positions, ProvidedValues } from './model';


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
  protected moveItemsImmutableSubject = new Subject<Positions | undefined>();
  protected updateItemsImmutableSubject = new Subject<number[] | undefined>();
  protected removeItemsImmutableSubject = new Subject<number[] | undefined>();

  protected addItemsMutableSubject = new Subject<number | undefined>();
  protected moveItemsMutableSubject = new Subject<Positions | undefined>();
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
      (state, numItems = 1) => addItemImmutable(state.array, numItems)
    );

    this.connect(
      'array',
      this.updateItemsImmutableSubject,
      (state, itemIds) => updateItemImmutable(state.array, itemIds)
    );

    this.connect(
      'array',
      this.moveItemsImmutableSubject,
      (state, positions) => moveItemImmutable(state.array, positions)
    );

    this.connect(
      'array',
      this.removeItemsImmutableSubject,
      (state, ids) => removeItemsImmutable(state.array, ids)
    );

    this.connect(
      'array',
      this.addItemsMutableSubject,
      (state, numItems = 1) => addItemMutable(state.array, numItems)
    );

    this.connect(
      'array',
      this.updateItemsMutableSubject,
      (state, itemIds) => updateItemMutable(state.array, itemIds)
    );

    this.connect(
      'array',
      this.moveItemsMutableSubject,
      (state, positions) => moveItemMutable(state.array, positions)
    );

    this.connect(
      'array',
      this.removeItemsMutableSubject,
      (state, ids) => removeItemsMutable(state.array, ids)
    );

    this.resetAll();
  }

  addItemsImmutable(numItems?: number): void {
    this.addItemsImmutableSubject.next(numItems);
  }

  moveItemsImmutable(positions?: Positions): void {
    this.moveItemsImmutableSubject.next(positions);
  }

  updateItemsImmutable(itemsIds?: number[]): void {
    this.updateItemsImmutableSubject.next(itemsIds);
  }

  removeItemsImmutable(itemsIds?: number[]): void {
    this.removeItemsImmutableSubject.next(itemsIds);
  }

  addItemsMutable(numItems?: number): void {
    this.addItemsMutableSubject.next(numItems);
  }

  moveItemsMutable(positions?: Positions): void {
    this.moveItemsMutableSubject.next(positions);
  }

  updateItemsMutable(itemsIds?: number[]): void {
    this.updateItemsMutableSubject.next(itemsIds);
  }

  removeItemsMutable(itemsIds?: number[]): void {
    this.removeItemsMutableSubject.next(itemsIds);
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
