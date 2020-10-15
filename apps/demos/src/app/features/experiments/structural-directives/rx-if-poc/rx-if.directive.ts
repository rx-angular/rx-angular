import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { ObservableInput, ReplaySubject, Subscription, Unsubscribable } from 'rxjs';
import { distinctUntilChanged, switchAll } from 'rxjs/operators';
import { createTemplateManager, RxTemplateObserver, TemplateManager } from '@rx-angular/template';


type RxIfTemplateNames = 'truthy' | 'falsey';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxIf]'
})
export class RxIfDirective<U> implements OnInit, OnDestroy {
  private activeName: RxIfTemplateNames;
  private subscription: Unsubscribable = new Subscription();
  private readonly templateManager: TemplateManager<{ $implicit: U | undefined | null }, RxIfTemplateNames>;

  private readonly observables$ = new ReplaySubject(1);
  private readonly values$ = this.observables$
    .pipe(
      distinctUntilChanged(),
      switchAll(),
      distinctUntilChanged()
    );

  @Input()
  set rxIf(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  @Input()
  set rxIfFalsey(templateRef: TemplateRef<any>) {
    if (templateRef) {
      this.templateManager.addTemplateRef('falsey', templateRef);
    }
  }

  private readonly templateObserver: RxTemplateObserver<U | null | undefined> = {
    next: ($implicit: U | null | undefined) => this.updateView($implicit)
  };

  updateView = ($implicit) => {
    const templateName = ($implicit != null && !!$implicit) ? 'truthy' : 'falsey';

    this.templateManager.displayView(templateName);

    if (this.templateManager.hasTemplateRef(templateName)) {
      this.templateManager.updateViewContext({ $implicit });
      this.templateManager.getEmbeddedView(templateName).detectChanges();
      this.activeName = templateName;
    } else {
      const activeViewEmbeddedView = this.templateManager.getEmbeddedView(this.activeName);
      if (this.activeName && activeViewEmbeddedView) {
        activeViewEmbeddedView.detectChanges();
        this.activeName = templateName;
      }
    }

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
