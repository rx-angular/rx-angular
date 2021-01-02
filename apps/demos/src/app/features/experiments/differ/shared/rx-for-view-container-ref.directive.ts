import {
  ChangeDetectorRef,
  Directive,
  Input,
  IterableChangeRecord,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { ObservableInput, ReplaySubject, Subscription, Unsubscribable } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { distinctUntilChanged, filter, map, startWith, switchAll, take, tap } from 'rxjs/operators';
import { ngInputFlatten } from '../../../../shared/utils/ngInputFlatten';
import { RxEffects } from '../../../../rx-angular-pocs/state/rx-effects/rx-effects.service';
import { createViewContainerRef, RxViewContainerRef } from './rx-view-container-ref';
import { RxForViewContainerRefContext } from './rx-view-container-ref-context';
import { constantPluck } from './utils';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxForViewContainerRef]',
  providers: []
})
export class RxForViewContainerRefDirective<T extends object, U extends NgIterable<T> = NgIterable<T>> implements OnInit {
  private subscription: Unsubscribable = new Subscription();

  private differ: IterableDiffer<T> | null = null;
  private observables$ = new ReplaySubject<Observable<U>>(1);

  values$ = this.observables$
    .pipe(
      ngInputFlatten()
    );

  private readonly rxViewContainerRef: RxViewContainerRef<T, RxForViewContainerRefContext<T>>;

  @Input()
  set rxForViewContainerRef(potentialObservable: Observable<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }
  _trackBy = a => a;
  @Input()
  set rxForViewContainerRefTrackBy(trackByFnOrKey: string | ((i) => any)) {
    this._trackBy = typeof trackByFnOrKey !== 'function' ? constantPluck(trackByFnOrKey) : trackByFnOrKey;
  }

  constructor(
    private iterableDiffers: IterableDiffers,
    private cdRef: ChangeDetectorRef,
    private readonly templateRef: TemplateRef<RxForViewContainerRefContext<any>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    this.rxViewContainerRef = createViewContainerRef<T>({
      viewContainerRef,
      templateRef,
      createViewContext,
      updateInsertedViewContext: updateInsertedAndMovedViewContext
    });
  }

  ngOnInit() {
    this.rxViewContainerRef.subscribe();
    this.values$.pipe(
      take(1)
    ).subscribe((value) => {
      console.log('initDiffer', value);
      this.initDiffer(value)
    });
  }

  initDiffer(iterable: U = [] as U) {
    this.differ = this.iterableDiffers.find(iterable).create((index: number, item: T) => this._trackBy(item));
    const changes$ = this.values$.pipe(
      startWith(iterable),
      map(i => ({ diff: this.differ.diff(i), iterable: i })),
      filter(r => r.diff != null),
      map(r => r.diff),
      tap(console.log)
    );
    this.rxViewContainerRef.connectChanges(changes$);
  }

}

function createViewContext<T, U extends NgIterable<T> = NgIterable<T>>(
  record: IterableChangeRecord<T>
): RxForViewContainerRefContext<T> {
  const ctx = new RxForViewContainerRefContext<T>(record.item);
  // create uses the current index
  ctx.setComputedContext({ index: record.currentIndex });
  return ctx;
}

function updateInsertedAndMovedViewContext(insertsAndMoveAndUnchanged, count) {
  const result = [];
  for (const insert of insertsAndMoveAndUnchanged) {
    const index = insert.context.index;
    const even = index % 2 === 0;
    const newCtx = {
      index,
      count,
      first: index === 0,
      last: index === count - 1,
      even,
      odd: !even
    };
    const old = insert.work;
    insert.work = () => {
      insert.context.setComputedContext(newCtx);
      // tslint:disable-next-line:no-unused-expression
      old && old();
    };
    result.push(insert);
  }
  return result;
}
