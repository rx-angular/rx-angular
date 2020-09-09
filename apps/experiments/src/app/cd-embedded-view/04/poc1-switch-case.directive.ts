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
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<Object>,
    @Host() private poc1Switch: Poc1Switch<any>
  ) {

  }

  ngOnInit() {
    this.subscription = combineLatest([
      this.caseValues$,
      this.poc1Switch.values$
    ])
      .pipe(
        tap(([b, c]) => {
          if (b === c) {
            if(!this._view) {
              this._view = this.viewContainer.createEmbeddedView(
                this.templateRef,
                { $implicit: undefined }
              );
            } else {
              this.viewContainer.insert(this._view);
            }
            this._view.detectChanges();
          } else {
            this.viewContainer.clear();
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
