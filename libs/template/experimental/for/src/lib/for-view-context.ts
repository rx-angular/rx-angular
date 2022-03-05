import { NgIterable } from '@angular/core';
import { RxDefaultListViewContext } from '@rx-angular/cdk/template';

export class RxForViewContext<
  T,
  U extends NgIterable<T> = NgIterable<T>,
  K = keyof T
> extends RxDefaultListViewContext<T, U, K> {
  constructor(
    item: T,
    public rxForOf: U,
    customProps?: { count: number; index: number }
  ) {
    super(item, customProps);
  }
}
