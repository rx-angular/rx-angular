import { Directive, Host, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Poc1Switch } from './poc1-switch.directive';
import { ReplaySubject, Subscription, Unsubscribable } from 'rxjs';
import { distinctUntilChanged, switchAll, tap } from 'rxjs/operators';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[poc1SwitchCase]' })
export class Poc1SwitchCase implements OnInit, OnDestroy {
  private subscription: Unsubscribable = new Subscription();
  private _view: any;
  observables$ = new ReplaySubject(1);

  values$ = this.observables$
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
    @Host() private ngSwitch: Poc1Switch<any>
  ) {
    this._view = viewContainer.createEmbeddedView(
      templateRef,
      { $implicit: undefined }
    );
  }

  ngOnInit() {
    this.subscription = this.values$
      .pipe(
        tap((v) => {
          if (this.ngSwitch.poc1Switch === v) {
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
