import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { Observable, ObservableInput, ReplaySubject, Subscription, Unsubscribable } from 'rxjs';
import { distinctUntilChanged, groupBy, map, mergeAll, mergeMap, switchAll, tap } from 'rxjs/operators';

export class PocRxDifferViewContext<T extends object, K = keyof T> {
  $implicit?: T;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[pocRxDiffer]'
})
export class PocRxDifferDirective<U> implements OnInit, OnDestroy {
  private subscription: Unsubscribable = new Subscription();

  observables$ = new ReplaySubject(1);
  embeddedViews: Map<U, { view: EmbeddedViewRef<any>, item: any }> = new Map();

  values$: Observable<U[]> = this.observables$
    .pipe(
      distinctUntilChanged(),
      switchAll()
    );

  @Input()
  set pocRxDiffer(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  @Input()
  pocRxDifferTrackByKey = 'id';

  @Input()
  pocRxDifferDistinctByKey = (a, b) => a.value === b.value;

  constructor(
    private cdRef: ChangeDetectorRef,
    private readonly templateRef: TemplateRef<PocRxDifferViewContext<any>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {

  }

  ngOnInit() {
    this.subscription = this.values$
      .pipe(
        tap(),
        mergeMap(arr => arr),
        groupBy(i => i[this.pocRxDifferTrackByKey]),
        map(o$ => {
          const distincted$ = o$.pipe(
            distinctUntilChanged(this.pocRxDifferDistinctByKey)
          );
          this.updateItem(o$.key, distincted$)
          return distincted$;
          }
        ),
        mergeAll()
      )
      .subscribe();
  }

  updateItem = (key, $value$): void => {
    let existingItem = this.embeddedViews.has(key) ? this.embeddedViews.get(key) : undefined;
    if (!existingItem) {
      const view = this.viewContainerRef
    .createEmbeddedView(this.templateRef, { $implicit: $value$});
      existingItem = { view, item: $value$ };
      this.embeddedViews.set(key, existingItem);
      existingItem.view.detectChanges();
    }
  };


  ngOnDestroy() {
    this.viewContainerRef.clear();
    this.subscription.unsubscribe();
  }

}
