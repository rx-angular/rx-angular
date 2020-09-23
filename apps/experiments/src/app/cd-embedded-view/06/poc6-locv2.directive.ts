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
import { distinctUntilChanged, groupBy, map, mergeAll, mergeMap, pluck, switchAll, tap } from 'rxjs/operators';
import { selectSlice } from '@rx-angular/state';

export class Poc6Locv2ViewContext<T extends object, K = keyof T> {
  // to enable `as` syntax we have to assign the directives selector (var as v)
  poc6LocV2?: T;
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
  selector: '[poc6LocV2]'
})
export class Poc6Locv2Directive<U> implements OnInit, OnDestroy {
  private subscription: Unsubscribable = new Subscription();

  observables$ = new ReplaySubject(1);
  embeddedViews: Map<U, { view: EmbeddedViewRef<any>, item: any }> = new Map();

  values$: Observable<U[]> = this.observables$
    .pipe(
      distinctUntilChanged(),
      switchAll()
    );

  @Input()
  set poc6LocV2(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  @Input()
  poc6LocV2TrackBy = 'id';

  @Input()
  poc6LocV2DistinctBy = (a, b) => a.value === b.value;

  constructor(
    private cdRef: ChangeDetectorRef,
    private readonly templateRef: TemplateRef<Poc6Locv2ViewContext<any>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {

  }

  ngOnInit() {
    this.subscription = this.values$
      .pipe(
        tap(),
        mergeMap(arr => arr),
        groupBy(i => i[this.poc6LocV2TrackBy]),
        map(o$ => {
          const distincted$ = o$.pipe(
            distinctUntilChanged(this.poc6LocV2DistinctBy)
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
    console.log('updateItem', key);
    let existingItem = this.embeddedViews.has(key) ? this.embeddedViews.get(key) : undefined;
    if (!existingItem) {
      const view = this.viewContainerRef
    .createEmbeddedView(this.templateRef, new Poc6Locv2ViewContext<any>($value$));
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
