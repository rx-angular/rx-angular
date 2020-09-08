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

  _pocForTrackBy;
  @Input()
  set poc2ForTrackBy(key: string) {
    this._pocForTrackBy = key;
  }

  private subscription: Unsubscribable = new Subscription();

  constructor(
    private cdRef: ChangeDetectorRef,
    private readonly templateRef: TemplateRef<{ $implicit: U }>,
    private readonly viewContainerRef: ViewContainerRef
  ) {

  }

  ngOnInit() {
    this.subscription = this.values$
      .pipe(
        mergeMap(arr => arr),
        groupBy(i => i[this._pocForTrackBy]),
        map(o$ => o$.pipe(
            distinctUntilChanged(),
            tap((item) => {
              const key = item[this._pocForTrackBy];
              if (!this.embeddedViews.has(key)) {
                const view = this.viewContainerRef.createEmbeddedView(
                  this.templateRef,
                  { $implicit: item }
                );
                this.embeddedViews.set(key, { view, item });
              } else {
                this.embeddedViews.get(key).view.context.$implicit = item;
              }

              this.embeddedViews.get(key).view.detectChanges();
            }))
        ),
        mergeAll()
      )
      .subscribe( );
  }

  ngOnDestroy() {
    this.embeddedViews.forEach(i => i.view.destroy());
    this.subscription.unsubscribe();
  }

}
