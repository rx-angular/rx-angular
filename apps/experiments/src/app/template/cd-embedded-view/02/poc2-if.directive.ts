import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { ObservableInput, ReplaySubject, Subscription, Unsubscribable } from 'rxjs';
import { distinctUntilChanged, switchAll } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[poc2If]'
})
export class Poc2IfDirective<U> implements OnInit, OnDestroy {
  observables$ = new ReplaySubject(1);
  viewContext = { $implicit: undefined};
  tuthyEmbeddedView;
  falseyEmbeddedView;
  falseyTemplateRef

  values$ = this.observables$
    .pipe(
      distinctUntilChanged(),
      switchAll()
    );

  @Input()
  set poc2If(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }
 @Input()
  set poc2IfFalsey(templateRef: TemplateRef<any>) {
   this.falseyTemplateRef = templateRef;
   this.falseyEmbeddedView = this.viewContainerRef.createEmbeddedView(
     this.falseyTemplateRef,
     this.viewContext
   );
  }

  private subscription: Unsubscribable = new Subscription();

  constructor(
    private cdRef: ChangeDetectorRef,
    private readonly truthyTemplateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef
  ) {

  }

  ngOnInit() {
    this.tuthyEmbeddedView = this.viewContainerRef.createEmbeddedView(
      this.truthyTemplateRef,
      this.viewContext
    );

    this.subscription = this.values$
      .subscribe(
        v => {
          this.viewContext.$implicit = v;
          this.viewContainerRef.clear();
          if(v) {
            this.tuthyEmbeddedView = this.viewContainerRef.createEmbeddedView(
              this.truthyTemplateRef,
              this.viewContext
            );
            this.tuthyEmbeddedView.detectChanges();
          } else {
            this.falseyEmbeddedView = this.viewContainerRef.createEmbeddedView(
              this.falseyTemplateRef,
              this.viewContext
            );
            this.falseyEmbeddedView.detectChanges();
          }
        }
      );
  }

  ngOnDestroy() {
    this.tuthyEmbeddedView.destroy();
    if(this.falseyTemplateRef) {
      this.falseyEmbeddedView.destroy();
    }
    this.subscription.unsubscribe();
  }

}
