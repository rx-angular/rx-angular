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

import { EMPTY, ReplaySubject, Subscription, Unsubscribable } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map, startWith, take } from 'rxjs/operators';
import { ngInputFlatten } from '../../../../shared/utils/ngInputFlatten';
import { createViewContainerRef, ListManager } from '../../../cdk/template-management/list-manager';
import { RxForViewContext } from './model/view-context';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxFor]',
  providers: []
})
export class RxFor<T extends object, U extends NgIterable<T> = NgIterable<T>> implements OnInit {
  private subscription: Unsubscribable = new Subscription();

  private differ: IterableDiffer<T> | null = null;
  private observables$ = new ReplaySubject<Observable<U>>(1);

  values$ = this.observables$
    .pipe(
      ngInputFlatten()
    );

  private readonly rxViewContainerRef: ListManager<T, RxForViewContext<T>>;

  @Input()
  set rxFor(potentialObservable: Observable<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  @Input()
  set rxForOf(potentialObservable: Observable<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  _trackBy = (i, a) => a;

  @Input()
  set rxForTrackBy(trackByFnOrKey: string | ((i) => any)) {
    this._trackBy = typeof trackByFnOrKey !== 'function' ? (i, a) => a[trackByFnOrKey] : trackByFnOrKey;
  }

  constructor(
    private iterableDiffers: IterableDiffers,
    private cdRef: ChangeDetectorRef,
    private readonly templateRef: TemplateRef<RxForViewContext<any>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    this.rxViewContainerRef = createViewContainerRef<T, RxForViewContext<T>>({
      cdRef,
      strategy$: EMPTY,
      viewContainerRef,
      templateRef,
      createViewContext
    });
  }

  ngOnInit() {
    this.rxViewContainerRef.subscribe();
    this.values$.pipe(
      take(1)
    ).subscribe((value) => {
      this.initDiffer(value);
    });
  }

  initDiffer(iterable: U = [] as U) {
    this.differ = this.iterableDiffers.find(iterable).create(this._trackBy);
    const changes$ = this.values$.pipe(
      startWith(iterable),
      map(i => ({ diff: this.differ.diff(i), iterable: i })),
      filter(r => r.diff != null),
      map(r => r.diff)
    );
    this.rxViewContainerRef.connectChanges(changes$);
  }

}

function createViewContext<T, U extends NgIterable<T> = NgIterable<T>>(
  record: IterableChangeRecord<T>
): RxForViewContext<T> {
  return new RxForViewContext<T>(record.item);
}
