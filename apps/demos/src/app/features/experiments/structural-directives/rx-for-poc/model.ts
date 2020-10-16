import { EmbeddedViewRef, NgIterable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { pluck, switchAll, tap } from 'rxjs/operators';

export class RxForViewContext<T extends object, U extends NgIterable<T> = NgIterable<T>, K = keyof T> {

  localVariableProjections: CustomVariablesProjectors = {};

  private readonly _record = new ReplaySubject<Observable<T>>(1);

  constructor(public $implicit: T, public rxFor: U, public index: number, public count: number) {
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

  set record$(o$: Observable<T>) {
    this._record.next(o$);
  }

  $select$ = (props: K[]): Observable<any> => {
    console.log(props);
    return this._record.pipe(
      switchAll(),
      tap(console.log),
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

