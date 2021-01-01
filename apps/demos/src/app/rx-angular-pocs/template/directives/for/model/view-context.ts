import { RxViewContext } from '../../../../cdk';
import { NgIterable } from '@angular/core';
import { BehaviorSubject, Observable, ObservableInput, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

export interface RxForOfComputedViewContext {
  index: number;
  count: number;
  first: boolean;
  last: boolean;
  odd: boolean;
  even: boolean;
}

export class RxForViewContext<
  T extends Record<string | number | symbol, any>,
  U extends NgIterable<T> = NgIterable<T>,
  K = keyof T
  > implements RxViewContext<T> {

  readonly _item = new ReplaySubject<T>(1);
  item$ = this._item.asObservable();
  private _$implicit: T;
  private _$complete: boolean;
  private _$error: false | Error;
  private _$suspense: any;
  private readonly _computedContext = new BehaviorSubject<
    RxForOfComputedViewContext
    >({
    index: -1,
    count: -1,
    first: false,
    last: false,
    odd: false,
    even: false
  });

  set $implicit($implicit: T) {
    this._$implicit = $implicit;
    this._item.next($implicit);
  }

  get $complete(): boolean {
    return this._$complete;
  }

  get $error(): false | Error {
    return this._$error;
  }

  get $suspense(): any {
    return this._$suspense;
  }
  get context(): Observable<RxForOfComputedViewContext> {
    return this._computedContext.asObservable();
  }

  get index(): number {
    return this._computedContext.getValue().index;
  }

  get count(): number {
    return this._computedContext.getValue().count;
  }

  get first(): boolean {
    return this._computedContext.getValue().first;
  }

  get last(): boolean {
    return this._computedContext.getValue().last;
  }

  get even(): boolean {
    return this._computedContext.getValue().even;
  }

  get odd(): boolean {
    return this._computedContext.getValue().odd;
  }

  get index$(): Observable<number> {
    return this._computedContext.pipe(
      pluck('index'),
      distinctUntilChanged()
    );
  }

  get count$(): Observable<number> {
    return this._computedContext.pipe(
      pluck('count'),
      distinctUntilChanged()
    );
  }

  get first$(): Observable<boolean> {
    return this._computedContext.pipe(
      pluck('first'),
      distinctUntilChanged()
    );
  }

  get last$(): Observable<boolean> {
    return this._computedContext.pipe(
      pluck('last'),
      distinctUntilChanged()
    );
  }

  get even$(): Observable<boolean> {
    return this._computedContext.pipe(
      pluck('even'),
      distinctUntilChanged()
    );
  }

  get odd$(): Observable<boolean> {
    return this._computedContext.pipe(pluck('odd'), distinctUntilChanged());
  }

  constructor(
    private item: T,
    public rxForOf: ObservableInput<U>,
    private distinctBy: (a: T, b: T) => boolean = (a, b) => a === b
  ) {
    // tslint:disable-next-line:no-unused-expression
    this.$implicit = item;
  }

  setComputedContext(context: Partial<RxForOfComputedViewContext>): void {
    this._computedContext.next({
      ...this._computedContext.getValue(),
      ...context
    });
  }

  select = (props: K[]): Observable<any> => {
    return this.item$.pipe(pluck(...(props as any)));
  };

}
