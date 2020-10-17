import { EmbeddedViewRef, NgIterable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { pluck, share, switchAll, tap } from 'rxjs/operators';

export class RxForViewContext<T extends object, U extends NgIterable<T> = NgIterable<T>, K = keyof T> {

  private readonly _record = new ReplaySubject<Observable<T>>(1);
  private readonly _record$ = this._record.pipe(switchAll(), share());
  private readonly _index = new BehaviorSubject<number>(-1);

  constructor(public $implicit: T, public rxFor: U) {
    // tslint:disable-next-line:no-unused-expression

  }

  set index(index: number | any) {
    this._index.next(index);
  }

  set record$(o$: Observable<T>) {
    this._record.next(o$);
  }

  get record$() {
    return this._record$;
  }

  select = (props: K[]): Observable<any> => {
    console.log('select', props);
    return this._record$.pipe(
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

