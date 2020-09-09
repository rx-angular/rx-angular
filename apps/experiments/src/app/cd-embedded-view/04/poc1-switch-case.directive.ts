import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { combineLatest, ReplaySubject, Subscription, Unsubscribable } from 'rxjs';
import { distinctUntilChanged, map, switchAll, tap } from 'rxjs/operators';
import { Poc1Switch } from './poc1-switch.directive';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[poc1SwitchCase]' })
export class Poc1SwitchCase implements OnInit, OnDestroy {
  private subscription: Unsubscribable = new Subscription();
  private _view: EmbeddedViewRef<any>;
  private inserted = false;
  private caseValue;
  observables$ = new ReplaySubject(1);

  caseValues$ = this.observables$
    .pipe(
      distinctUntilChanged(),
      switchAll(),
      distinctUntilChanged(),
      tap(v => this.caseValue = v)
    );

  @Input()
  set poc1SwitchCase(o$) {
    this.observables$.next(o$);
  };

  constructor(
    private viewContainer: ViewContainerRef,
    public templateRef: TemplateRef<Object>,
    private cdRef: ChangeDetectorRef,
    @Inject(forwardRef(() => Poc1Switch)) private poc1Switch: Poc1Switch<any>
  ) {

  }

  ngOnInit() {
    this.createView();
    this.subscription = combineLatest([
      this.caseValues$,
      this.poc1Switch.values$,
    ])
      .pipe(
        map(([caseValue, switchValue]) => caseValue === switchValue),
        distinctUntilChanged(),
        tap(matched => {
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
          this._view.context.$implicit = this.caseValue;
          this._view.detectChanges();
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
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
