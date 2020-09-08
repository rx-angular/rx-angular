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
import { distinctUntilChanged, switchAll } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[pocFor]'
})
export class PocForDirective<U> implements OnInit, OnDestroy {
  observables$ = new ReplaySubject(1);
  embeddedViews: Map<U, { view: EmbeddedViewRef<any>, item: any }> = new Map();

  values$: Observable<U[]> = this.observables$
    .pipe(
      distinctUntilChanged(),
      switchAll()
    );

  @Input()
  set pocFor(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  _pocForTrackBy;
  @Input()
  set pocForTrackBy(key: string) {
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
      .subscribe(
        arr => {
          arr.forEach((item, idx) => {
            const key = item[this._pocForTrackBy];
            if (!this.embeddedViews.has(key)) {
              const view = this.viewContainerRef.createEmbeddedView(
                this.templateRef,
                { $implicit: item },
                idx
              );
              this.embeddedViews.set(key, { view, item });
            } else {
              this.embeddedViews.get(key).view.context.$implicit = item;
            }

            this.embeddedViews.get(key).view.detectChanges();
          });
        }
      );
  }

  ngOnDestroy() {
    this.embeddedViews.forEach(i => i.view.destroy());
    this.subscription.unsubscribe();
  }

}
