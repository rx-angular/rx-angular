import { ChangeDetectorRef, Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  addItemImmutable,
  moveItemImmutable,
  removeItemsImmutable,
  updateItemImmutable,
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

  protected addItemsSubject = new Subject<number | undefined>();
  protected moveItemsSubject = new Subject<Positions | undefined>();
  protected updateItemsSubject = new Subject<number[] | undefined>();
  protected removeItemsSubject = new Subject<number[] | undefined>();

  private resetAll = () => {
    this.resetObservables();
    this.cdRef.markForCheck();
  };

  private resetObservables = () => {
    this.array$ = this.select(
      map((s) => s.array),
      withCompleteAndError(this.error$, this.completeSubject)
    );
  };

  constructor(protected cdRef: ChangeDetectorRef) {
    super();

    this.connect(
      'array',
      this.addItemsSubject,
      (state, numItems = 1) => addItemImmutable(state.array, numItems)
    );

    this.connect(
      'array',
      this.updateItemsSubject,
      (state, itemIds) => updateItemImmutable(state.array, itemIds)
    );

    this.connect(
      'array',
      this.moveItemsSubject,
      (state, positions) => moveItemImmutable(state.array, positions)
    );

    this.connect(
      'array',
      this.removeItemsSubject,
      (state, ids) => removeItemsImmutable(state.array, ids)
    );

    this.resetAll();
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
