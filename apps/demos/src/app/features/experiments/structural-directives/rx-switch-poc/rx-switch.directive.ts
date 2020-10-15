import { Directive, EmbeddedViewRef, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { ObservableInput, ReplaySubject, Subscription } from 'rxjs';
import { distinctUntilChanged, switchAll } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxSwitch]'
})
export class RxSwitch<U> implements OnInit, OnDestroy {
  private subscription = new Subscription();
  observables$ = new ReplaySubject(1);
  viewContext = { $implicit: undefined };

  defaultEmbeddedView: EmbeddedViewRef<any>;

  values$ = this.observables$
    .pipe(
      distinctUntilChanged(),
      switchAll(),
      distinctUntilChanged()
    );

  @Input()
  set rxSwitch(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {

  }

  ngOnInit() {
    this.defaultEmbeddedView = this.viewContainerRef.createEmbeddedView(
      this.templateRef,
      { $implicit: undefined }
    );
    this.subscription.add(this.values$.subscribe(value => {
      this.defaultEmbeddedView.context.$implicit = value;
      this.defaultEmbeddedView.detectChanges();
    }));
  }

  ngOnDestroy() {
    this.defaultEmbeddedView.destroy();
    this.subscription.unsubscribe();
  }

}
