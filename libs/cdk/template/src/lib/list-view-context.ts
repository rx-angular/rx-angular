import { NgIterable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

export interface RxListViewComputedContext {
  index: number;
  count: number;
}

export interface RxListViewContext<
  T,
  U = RxListViewComputedContext,
> extends RxListViewComputedContext {
  $implicit: T;
  item$: Observable<T>;
  updateContext(newProps: Partial<U>): void;
}

/** @internal the template read `index` or a value derived from it */
export const CONTEXT_READS_INDEX = 1;
/** @internal the template read `count` or a value derived from it */
export const CONTEXT_READS_COUNT = 2;

const computeFirst = ({ count, index }) => index === 0;
const computeLast = ({ count, index }) => index === count - 1;
const computeEven = ({ count, index }) => index % 2 === 0;

export class RxDefaultListViewContext<
  T,
  U extends NgIterable<T> = NgIterable<T>,
  K = keyof T,
> implements RxListViewContext<T> {
  readonly _item = new ReplaySubject<T>(1);
  item$ = this._item.asObservable();
  private _$implicit: T;
  private _$complete: boolean;
  private _$error: false | Error;
  private _$suspense: any;
  private readonly _context$ = new BehaviorSubject<RxListViewComputedContext>({
    index: -1,
    count: -1,
  });
  /**
   * @internal
   * Which computed values the view read (`CONTEXT_READS_*` flags). A view that never read `index`
   * or `count` doesn't need change detection when only those change.
   */
  _reads = 0;

  set $implicit($implicit: T) {
    this._$implicit = $implicit;
    this._item.next($implicit);
  }

  get $implicit(): T {
    return this._$implicit;
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

  get index(): number {
    this._reads |= CONTEXT_READS_INDEX;
    return this._context$.getValue().index;
  }

  get count(): number {
    this._reads |= CONTEXT_READS_COUNT;
    return this._context$.getValue().count;
  }

  get first(): boolean {
    this._reads |= CONTEXT_READS_INDEX;
    return computeFirst(this._context$.getValue());
  }

  get last(): boolean {
    this._reads |= CONTEXT_READS_INDEX | CONTEXT_READS_COUNT;
    return computeLast(this._context$.getValue());
  }

  get even(): boolean {
    this._reads |= CONTEXT_READS_INDEX;
    return computeEven(this._context$.getValue());
  }

  get odd(): boolean {
    return !this.even;
  }

  get index$(): Observable<number> {
    this._reads |= CONTEXT_READS_INDEX;
    return this._context$.pipe(
      map((c) => c.index),
      distinctUntilChanged(),
    );
  }

  get count$(): Observable<number> {
    this._reads |= CONTEXT_READS_COUNT;
    return this._context$.pipe(
      map((s) => s.count),
      distinctUntilChanged(),
    );
  }

  get first$(): Observable<boolean> {
    this._reads |= CONTEXT_READS_INDEX;
    return this._context$.pipe(map(computeFirst), distinctUntilChanged());
  }

  get last$(): Observable<boolean> {
    this._reads |= CONTEXT_READS_INDEX | CONTEXT_READS_COUNT;
    return this._context$.pipe(map(computeLast), distinctUntilChanged());
  }

  get even$(): Observable<boolean> {
    this._reads |= CONTEXT_READS_INDEX;
    return this._context$.pipe(map(computeEven), distinctUntilChanged());
  }

  get odd$(): Observable<boolean> {
    return this.even$.pipe(map((even) => !even));
  }

  constructor(item: T, customProps?: { count: number; index: number }) {
    this.$implicit = item;
    if (customProps) {
      this.updateContext(customProps);
    }
  }

  /** @internal index and count, without marking them as read */
  _peek(): RxListViewComputedContext {
    return this._context$.getValue();
  }

  updateContext(newProps: Partial<RxListViewComputedContext>): void {
    this._context$.next({
      ...this._context$.getValue(),
      ...newProps,
    });
  }

  select = (props: K[]): Observable<any> => {
    return this.item$.pipe(
      map((r) => props.reduce((acc, key) => acc?.[key as any], r)),
    );
  };
}
