import { Directive, Host, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Poc1Switch } from './poc1-switch.directive';
import { combineLatest, ReplaySubject, Subscription, Unsubscribable } from 'rxjs';
import { distinctUntilChanged, switchAll, tap } from 'rxjs/operators';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[poc1SwitchCase]' })
export class Poc1SwitchCase implements OnInit, OnDestroy {
  private subscription: Unsubscribable = new Subscription();
  private _view: any;
  observables$ = new ReplaySubject(1);

  caseValues$ = this.observables$
    .pipe(
      distinctUntilChanged(),
      switchAll()
    );

  @Input()
  set poc1SwitchCase(o$) {
    this.observables$.next(o$);
  };

  constructor(
    viewContainer: ViewContainerRef, templateRef: TemplateRef<Object>,
    @Host() private poc1Switch: Poc1Switch<any>
  ) {
    this._view = viewContainer.createEmbeddedView(
      templateRef,
      { $implicit: undefined }
    );
  }

  ngOnInit() {
    this.subscription = combineLatest([
      this.caseValues$,
      this.poc1Switch.values$
    ])
      .pipe(
        tap(([b, c]) => {
          if (b === c) {
            this._view.detectChanges();
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
