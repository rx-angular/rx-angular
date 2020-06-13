import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import {
  NextObserver,
  Observable,
  ObservableInput,
  Observer,
  Unsubscribable
} from 'rxjs';
import { createRenderAware, RenderAware } from '../core';
import {
  DEFAULT_STRATEGY_NAME,
  getStrategies
} from '../render-strategies/strategies/strategies-map';

export interface LetViewContext<T> {
  // to enable `let` syntax we have to use $implicit (var; let v = var)
  $implicit?: T;
  // to enable `as` syntax we have to assign the directives selector (var as v)
  rxLet?: T;
  // set context var complete to true (var$; let e = $error)
  $error?: boolean;
  // set context var complete to true (var$; let c = $complete)
  $complete?: boolean;
}

/**
 * @Directive LetDirective
 *
 * @description
 *
 * The `*rxLet` directive serves a convenient way of binding observables to a view context (a dom element scope).
 * It also helps with several internal processing under the hood.
 *
 * The current way of binding an observable to the view looks like that:
 * ```html
 * <ng-container *ngIf="observableNumber$ as n">
 * <app-number [number]="n">
 * </app-number>
 * <app-number-special [number]="n">
 * </app-number-special>
 * </ng-container>
 *  ```
 *
 *  The problem is `*ngIf` is also interfering with rendering and in case of a `0` the component would be hidden
 *
 * Included Features:
 * - binding is always present. (`*ngIf="truthy$"`)
 * - it takes away the multiple usages of the `async` or `push` pipe
 * - a unified/structured way of handling null and undefined
 * - triggers change-detection differently if `zone.js` is present or not (`ChangeDetectorRef.detectChanges` or
 *   `ChangeDetectorRef.markForCheck`)
 * - triggers change-detection differently if ViewEngine or Ivy is present (`ChangeDetectorRef.detectChanges` or
 *   `ɵdetectChanges`)
 * - distinct same values in a row (distinctUntilChanged operator),
 *
 * @usageNotes
 *
 * The `*rxLet` directive take over several things and makes it more convenient and save to work with streams in the
 *   template
 * `<ng-container *rxLet="observableNumber$ as c"></ng-container>`
 *
 * ```html
 * <ng-container *rxLet="observableNumber$ as n">
 * <app-number [number]="n">
 * </app-number>
 * </ng-container>
 *
 * <ng-container *rxLet="observableNumber$; let n">
 * <app-number [number]="n">
 * </app-number>
 * </ng-container>
 * ```
 *
 * In addition to that it provides us information from the whole observable context.
 * We can track the observables:
 * - next value
 * - error value
 * - complete base-state
 *
 * ```html
 * <ng-container *rxLet="observableNumber$; let n; let e = $error, let c = $complete">
 * <app-number [number]="n"  *ngIf="!e && !c">
 * </app-number>
 * <ng-container *ngIf="e">
 * There is an error: {{e}}
 * </ng-container>
 * <ng-container *ngIf="c">
 * Observable completed: {{c}}
 * </ng-container>
 * </ng-container>
 * ```
 *
 * @publicApi
 */
@Directive({ selector: '[rxLet]' })
export class LetDirective<U> implements OnDestroy {
  @Input()
  set rxLet(potentialObservable: ObservableInput<U> | null | undefined) {
    this.renderAware.nextPotentialObservable(potentialObservable);
  }

  @Input('rxLetStrategy')
  set strategy(config: string | Observable<string> | undefined) {
    if (config) {
      this.renderAware.nextStrategy(config);
    }
  }

  constructor(
    cdRef: ChangeDetectorRef,
    private readonly templateRef: TemplateRef<LetViewContext<U>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    this.strategies = getStrategies<U>({ cdRef });

    this.renderAware = createRenderAware<U>({
      strategies: this.strategies,
      resetObserver: this.resetObserver,
      updateObserver: this.updateObserver,
      defaultStrategy: DEFAULT_STRATEGY_NAME
    });
    this.subscription = this.renderAware.subscribe();
  }

  static ngTemplateGuard_rxLet: 'binding';
  strategies;
  private embeddedView: any;
  private readonly ViewContext: LetViewContext<U | undefined | null> = {
    $implicit: undefined,
    rxLet: undefined,
    $error: false,
    $complete: false
  };

  protected readonly subscription: Unsubscribable;
  private readonly renderAware: RenderAware<U | null | undefined>;
  private readonly resetObserver: NextObserver<void> = {
    next: () => {
      // if not initialized no need to set undefined
      if (this.embeddedView) {
        this.ViewContext.$implicit = undefined;
        this.ViewContext.rxLet = undefined;
        this.ViewContext.$error = false;
        this.ViewContext.$complete = false;
      }
    }
  };
  private readonly updateObserver: Observer<U | null | undefined> = {
    next: (value: U | null | undefined) => {
      // to have init lazy
      if (!this.embeddedView) {
        this.createEmbeddedView();
      }
      this.ViewContext.$implicit = value;
      this.ViewContext.rxLet = value;
    },
    error: (error: Error) => {
      // to have init lazy
      if (!this.embeddedView) {
        this.createEmbeddedView();
      }
      this.ViewContext.$error = true;
    },
    complete: () => {
      // to have init lazy
      if (!this.embeddedView) {
        this.createEmbeddedView();
      }
      this.ViewContext.$complete = true;
    }
  };

  static ngTemplateContextGuard<U>(
    dir: LetDirective<U>,
    ctx: unknown | null | undefined
  ): ctx is LetViewContext<U> {
    return true;
  }

  createEmbeddedView() {
    this.embeddedView = this.viewContainerRef.createEmbeddedView(
      this.templateRef,
      this.ViewContext
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.viewContainerRef.clear();
  }
}
