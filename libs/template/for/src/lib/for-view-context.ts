import { NgIterable } from '@angular/core';
import { RxDefaultListViewContext } from '@rx-angular/cdk/template';

/** same flag as `CONTEXT_READS_COUNT`: the collection changes whenever the count does */
const READS_COLLECTION = 2;

export class RxForViewContext<
  T,
  U extends NgIterable<T> = NgIterable<T>,
  K = keyof T,
> extends RxDefaultListViewContext<T, U, K> {
  private _rxForOf: U;

  get rxForOf(): U {
    this._reads |= READS_COLLECTION;
    return this._rxForOf;
  }
  set rxForOf(rxForOf: U) {
    this._rxForOf = rxForOf;
  }

  constructor(
    item: T,
    rxForOf: U,
    customProps?: { count: number; index: number },
  ) {
    super(item, customProps);
    this._rxForOf = rxForOf;
  }
}
