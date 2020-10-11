import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { ObservableInput, ReplaySubject, Subscription, Unsubscribable } from 'rxjs';
import { distinctUntilChanged, switchAll } from 'rxjs/operators';
import { createTemplateManager, RxTemplateObserver, TemplateManager } from '@rx-angular/template';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[poc3If]'
})
export class Poc3IfDirective<U> implements OnInit, OnDestroy {
  private subscription: Unsubscribable = new Subscription();
  private readonly templateManager: TemplateManager<{ $implicit: U | undefined | null }>;

  private readonly observables$ = new ReplaySubject(1);
  private readonly values$ = this.observables$
    .pipe(
      distinctUntilChanged(),
      switchAll()
    );

  @Input()
  set poc3If(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  @Input()
  set poc3IfFalsey(templateRef: TemplateRef<any>) {
    this.templateManager.addTemplateRef('falsey', templateRef);
  }

  private readonly templateObserver: RxTemplateObserver<U | null | undefined> = {
    next: ($implicit: U | null | undefined) => this.updateView($implicit)
  };

  updateView = ($implicit) => {
    const templateName = ($implicit != null && !!$implicit) ? 'truthy' : 'falsey';
    this.templateManager.displayView(templateName);
    this.templateManager.updateViewContext({ $implicit });
    this.templateManager.getEmbeddedView(templateName).detectChanges();
  };

  constructor(
    private cdRef: ChangeDetectorRef,
    private readonly truthyTemplateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    this.templateManager = createTemplateManager(this.viewContainerRef, { $implicit: undefined });
  }

  ngOnInit() {
    this.templateManager.addTemplateRef('truthy', this.truthyTemplateRef);
    this.subscription = this.values$.subscribe(this.templateObserver);
  }

  ngOnDestroy() {
    this.templateManager.destroy();
    this.subscription.unsubscribe();
  }

}
