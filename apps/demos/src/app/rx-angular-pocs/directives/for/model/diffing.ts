import { EmbeddedViewRef, NgIterable } from '@angular/core';
import { RxForViewContext } from '../model';

export interface CustomVariablesProjectors {
  [variableName: string]: (context) => unknown;
}

export interface RecordViewTuple<T extends object, U extends NgIterable<T>> {
  record: any;
  view: EmbeddedViewRef<RxForViewContext<T, U>>;
}

