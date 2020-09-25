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

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[poc2For]'
})
export class Poc2ForDirective<U> implements OnInit, OnDestroy {
  private subscription: Unsubscribable = new Subscription();

  observables$ = new ReplaySubject(1);
  embeddedViews: Map<U, { view: EmbeddedViewRef<any>, item: any }> = new Map();

  values$: Observable<U[]> = this.observables$
    .pipe(
      distinctUntilChanged(),
      switchAll()
    );

  @Input()
  set poc2For(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  @Input()
  poc2ForTrackBy;

  @Input()
  poc2ForDistinctBy = (a, b) => a === b;

  constructor(
    private cdRef: ChangeDetectorRef,
    private readonly templateRef: TemplateRef<{ $implicit: U }>,
    private readonly viewContainerRef: ViewContainerRef
  ) {

  }

  ngOnInit() {
    this.subscription = this.values$
      .pipe(
        tap(),
        mergeMap(arr => arr),
        groupBy(i => i[this.poc2ForTrackBy]),
        map(o$ => o$.pipe(
            distinctUntilChanged(this.poc2ForDistinctBy),
            tap(this.updateItem)
          )
        ),
        mergeAll()
      )
      .subscribe();
  }

  updateItem = (item): void => {
    const key = item[this.poc2ForTrackBy];
    let existingItem = this.embeddedViews.has(key) ? this.embeddedViews.get(key) : undefined;
    if (!existingItem) {
      const view = this.viewContainerRef
        .createEmbeddedView(this.templateRef, { $implicit: item });
      existingItem = { view, item};
      this.embeddedViews.set(key, existingItem);

    } else {
      existingItem.view.context.$implicit = item;
    }
    existingItem.view.detectChanges();
  }


  ngOnDestroy() {
    this.viewContainerRef.clear();
    this.subscription.unsubscribe();
  }

}
