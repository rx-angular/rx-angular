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

import { EMPTY, ReplaySubject, Subject, Subscription, Unsubscribable } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map, tap } from 'rxjs/operators';
import { ngInputFlatten } from '../../../../shared/utils/ngInputFlatten';
import { createViewContainerRef, ListManager } from '../../../cdk/template-management/list-manager';
import { RxForViewContext } from './model/view-context';
import { RxEffects } from '../../../state/rx-effects';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxFor]',
  providers: [RxEffects]
})
export class RxFor<T extends object, U extends NgIterable<T> = NgIterable<T>> implements OnInit {
  private differ: IterableDiffer<T> | null = null;
  private observables$ = new ReplaySubject<Observable<U>>(1);

  private _renderCallback: Subject<any>;

  values$ = this.observables$
    .pipe(
      ngInputFlatten()
    );

  private readonly listManager: ListManager<T, RxForViewContext<T>>;

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

  @Input('rxForRenderCallback') set renderCallback(
    renderCallback: Subject<void>
  ) {
    this._renderCallback = renderCallback;
  }

  constructor(
    private iterableDiffers: IterableDiffers,
    private cdRef: ChangeDetectorRef,
    private readonly templateRef: TemplateRef<RxForViewContext<any>>,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly rxEf: RxEffects
  ) {

    this.listManager = createViewContainerRef<T, RxForViewContext<T>>({
      cdRef,
      strategy$: EMPTY,
      viewContainerRef,
      templateRef,
      createViewContext
    });
  }

  ngOnInit() {
    this.differ = this.iterableDiffers.find([]).create(this._trackBy);
    const changes$ = this.values$.pipe(
      map(i => ({ diff: this.differ.diff(i), iterable: i })),
      filter(r => r.diff != null),
      map(r => r.diff)
    );

    this.rxEf.hold(
      this.listManager.render(changes$), (v) => {
        this._renderCallback?.next(v);
      }
    );
  }

}

function createViewContext<T, U extends NgIterable<T> = NgIterable<T>>(
  record: IterableChangeRecord<T>
): RxForViewContext<T> {
  return new RxForViewContext<T>(record.item);
}
