import { ChangeDetectorRef, Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { merge, Observable, Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import { ngInputFlatten } from '../../utils/ngInputFlatten';
import { ProvidedValues } from './model';
import { toBoolean, toImgUrl, toInt, toRandom, withCompleteAndError } from './utils';

@Injectable()
export class PrimitivesProviderService {
  protected outerChanges = new Subject<Observable<any>>();

  protected nextSubject = new Subject<any>();

  protected errorSubject = new Subject<any>();
  protected error$ = this.errorSubject.pipe(
    map((_) => {
      throw new Error('ERROR');
    })
  );
  protected completeSubject = new Subject<any>();
  protected resetSubject = new Subject<any>();

  float$: Observable<number>;
  int$: Observable<number>;
  incremental$: Observable<number>;
  boolean$: Observable<boolean>;
  imgUrl$: Observable<string>;

  float: number;
  int: number;
  boolean: boolean;

  truthy = 0.5;
  min = 0;
  max = 10;

  set changes$(o$: Observable<any>) {
    this.outerChanges.next(o$);
  }

  private resetAll = () => {
    this.resetObservables();
    this.updateStatic(undefined);
    this.cdRef.markForCheck();
  };

  private resetObservables = () => {
    this.state.ngOnDestroy();
    this.state = new RxState<ProvidedValues>();

    this.state.connect(
      'random',
      merge(this.nextSubject, this.outerChanges.pipe(ngInputFlatten())).pipe(
        map(toRandom)
      )
    );

    this.float$ = this.state.select('random');
    this.int$ = this.state.select(
      map((s) => toInt(s.random, this.min, this.max)),
      withCompleteAndError(this.error$, this.completeSubject)
    );
    this.incremental$ = this.state.select(
      scan((inc) => ++inc, 0),
      withCompleteAndError(this.error$, this.completeSubject)
    );
    this.boolean$ = this.state.select(
      map((s) => toBoolean(s.random, this.truthy)),
      withCompleteAndError(this.error$, this.completeSubject)
    );
    this.imgUrl$ = this.state.select(
      map((s) => toImgUrl(s.random)),
      withCompleteAndError(this.error$, this.completeSubject)
    );

    this.state.hold(this.float$, this.updateStatic);
    this.state.hold(this.resetSubject, this.resetAll);
  };

  private updateStatic = (float: number): void => {
    this.float = float;
    this.int = toInt(float, this.min, this.max);
    this.boolean = toBoolean(float, this.truthy);
  };

  constructor(
    protected state: RxState<ProvidedValues>,
    protected cdRef: ChangeDetectorRef
  ) {
    this.resetAll();
  }

  next(): void {
    this.nextSubject.next();
  }

  error(): void {
    this.errorSubject.next();
  }

  complete(): void {
    this.completeSubject.next();
  }

  reset(): void {
    this.resetSubject.next();
  }
}
