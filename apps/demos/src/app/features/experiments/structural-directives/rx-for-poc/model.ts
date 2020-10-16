import { EmbeddedViewRef, NgIterable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

export class RxForViewContext<T extends object, U extends NgIterable<T> = NgIterable<T>, K = keyof T> {

  localVariableProjections: CustomVariablesProjectors = {};

  constructor(public $implicit: T, public rxFor: U, public index: number, public count: number, private $value$: Observable<T>) {
  }

  get first(): boolean {
    return this.index === 0;
  }

  get last(): boolean {
    return this.index === this.count - 1;
  }

  get even(): boolean {
    return this.index % 2 === 0;
  }

  get odd(): boolean {
    return !this.even;
  }

  get customVariable(): unknown {
    return Object.entries(this.localVariableProjections)
      .reduce((acc, [name, fn]) => {
        return { ...acc, [name]: fn(this) };
      }, {});
  }

  $select = (props: K[]): Observable<any> => {
    return this.$value$.pipe(
      pluck(...props as any)
    );
  };
}

export interface CustomVariablesProjectors {
  [variableName: string]: (context) => unknown;
}

export interface RecordViewTuple<T extends object, U extends NgIterable<T>> {
  record: any;
  view: EmbeddedViewRef<RxForViewContext<T, U>>;
}

