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

export interface PocLetViewContext<T> {
  // to enable `as` syntax we have to assign the directives selector (var as v)
  pocLet: T;
  $implicit: T,
  $error: false | Error,
  $complete: boolean,
  $suspense: boolean
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[poc1Let]'
})
export class Poc1LetDirective<U> implements OnInit, OnDestroy {
  observables$ = new ReplaySubject(1);
  viewContext = { $implicit: undefined};
  embeddedView;
  values$ = this.observables$
    .pipe(
      distinctUntilChanged(),
      switchAll()
    );

  @Input()
  set poc1Let(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observables$.next(potentialObservable);
  }

  private subscription: Unsubscribable = new Subscription();

  constructor(
    private cdRef: ChangeDetectorRef,
    private readonly nextTemplateRef: TemplateRef<PocLetViewContext<U>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {

  }

  ngOnInit() {
    this.embeddedView = this.viewContainerRef.createEmbeddedView(
      this.nextTemplateRef,
      this.viewContext
    );

    this.subscription = this.values$
      .subscribe(
        v => {
          this.viewContext.$implicit = v;
          this.embeddedView.detectChanges()
        }
      );
  }

  ngOnDestroy() {
    this.embeddedView.destroy();
    this.subscription.unsubscribe();
  }

}
