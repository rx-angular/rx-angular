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
import { distinctUntilChanged, groupBy, map, mergeAll, mergeMap, pluck, switchAll } from 'rxjs/operators';

export class RxForViewContext<T extends object, K = keyof T> {
  // to enable `as` syntax we have to assign the directives selector (var as v)
  rxFor?: T;
  $prop_arr$: any;
  $implicit?: T;

  constructor(private $value$: Observable<T>) {
    this.$prop_arr$ = $value$.pipe(pluck('arr'), distinctUntilChanged());
  }

  $selectSlices = (props: K[]): Observable<any> => {
    return this.$value$.pipe(
     pluck(...props as any)
  );
  }
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxFor]'
})
export class RxForDirective<U> implements OnInit, OnDestroy {
  private subscription: Unsubscribable = new Subscription();

  observables$ = new ReplaySubject(1);
  embeddedViews: Map<U, { view: EmbeddedViewRef<any>, item: any }> = new Map();

  values$: Observable<U[]> = this.observables$
    .pipe(
      distinctUntilChanged(),
      switchAll()
    );

  @Input()
  set rxFor(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  @Input()
  rxForTrackBy = 'id';

  @Input()
  rxForDistinctBy = (a, b) => a.value === b.value;

  constructor(
    private cdRef: ChangeDetectorRef,
    private readonly templateRef: TemplateRef<RxForViewContext<any>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {

  }

  ngOnInit() {
    this.subscription = this.values$
      .pipe(
        mergeMap(arr => arr),
        groupBy(i => i[this.rxForTrackBy]),
        map(o$ => {
          const distincted$ = o$.pipe(
            distinctUntilChanged(this.rxForDistinctBy)
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
    .createEmbeddedView(this.templateRef, new RxForViewContext<any>($value$));
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
