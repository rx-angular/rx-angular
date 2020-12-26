import { EmbeddedViewRef, NgIterable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, pluck, share, switchAll, tap } from 'rxjs/operators';

export class RxForViewContext<T extends object, U extends NgIterable<T> = NgIterable<T>, K = keyof T> {

  private readonly _record = new ReplaySubject<T>(1);
  private readonly _record$ = this._record.pipe(distinctUntilChanged(this.distinctBy), share());
  private readonly _index = new BehaviorSubject<number>(-1);
  private _implicit: T;


  constructor(private _$implicit: T, public rxFor: U, private distinctBy: (a: T, b: T) => boolean = (a, b) => a === b) {
    // tslint:disable-next-line:no-unused-expression
    this._record.next(_$implicit);
  }

  set index(index: number | any) {
    this._index.next(index);
  }

  set $implicit(record: T) {
    this._implicit = record;
    this._record.next(record);
  }

  get $implicit(): T {
    return this._implicit;
  }

  get record$() {
    return this._record$;
  }

  select = (props: K[]): Observable<any> => {
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

