import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
  forwardRef, Host,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { of, Subscription, Unsubscribable } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { RxSwitch } from './rx-switch.directive';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[rxSwitchCase]' })
export class RxSwitchCase implements OnInit, OnDestroy {

  @Input()
  set rxSwitchCaseValue(v) {
    this.caseValue = v;
  };

  @Input()
  set rxSwitchCase(v) {
    this.caseValue = v;
  };

  private subscription: Unsubscribable = new Subscription();
  private _view: EmbeddedViewRef<any>;
  private inserted = false;
  private caseValue;

  constructor(
    private viewContainer: ViewContainerRef,
    public templateRef: TemplateRef<Object>,
    private cdRef: ChangeDetectorRef,
    @Host() private rxSwitch: RxSwitch<any>
  ) {

  }

  ngOnInit() {
    this.createView();
    this.subscription = this.rxSwitch.values$
      .pipe(
        // tslint:disable-next-line:triple-equals
        map((switchValue) => this.caseValue === switchValue),
        distinctUntilChanged(),
        withLatestFrom(this.rxSwitch.strategy$),
        switchMap(([matched, strategy]) => {
          if (matched) {
            if (!this.inserted) {
              this.viewContainer.insert(this._view, 0);
              this.inserted = true;
            }
          } else {
            if (this._view && this.inserted) {
              this.viewContainer.detach(0);
              this.inserted = false;
            }
          }
          return strategy.behavior(
            () => {
              this._view.context.$implicit = this.caseValue
              strategy.work(this._view, this._view);
              strategy.work(this.cdRef, (this.cdRef as any)?.context || this.cdRef);
            },
            this._view
          )(of(matched));
        }),
      )
      .subscribe({ error: console.log });
  }

  ngOnDestroy(): void {
    this.viewContainer.clear();
    this.subscription.unsubscribe();
  }

  private createView(): void {
    this._view = this.viewContainer.createEmbeddedView(
      this.templateRef,
      { $implicit: this.caseValue },
      0
    );
    this.viewContainer.detach(0);
  }

}
