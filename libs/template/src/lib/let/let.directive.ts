import {
  ChangeDetectorRef,
  Directive,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  EmbeddedViewRef
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

class TemplateManager<T> {
  private templateRefCache = new Map<string | number, TemplateRef<T>>();
  private embeddedViewCache = new Map<string | number, EmbeddedViewRef<T>>();

  constructor(
    private viewContext: T,
    private viewContainerRef: ViewContainerRef
  ) {}

  updateViewContext(viewContextSlice: Partial<T>) {
    // TODO implement and use
  }

  addTemplateRef(name: string, templateRef: TemplateRef<T>): void {
    assertTemplate(name, templateRef);
    this.templateRefCache.set(name, templateRef);
  }

  getTemplateRef(name: string): TemplateRef<T> | null {
    if (this.templateRefCache.has(name)) {
      return this.templateRefCache.get(name);
    }
    return null;
  }

  createEmbeddedView(name: string, templateRef: TemplateRef<T>) {
    this.embeddedViewCache.set(
      name,
      this.viewContainerRef.createEmbeddedView(templateRef, this.viewContext)
    );
  }
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
export class LetDirective<U> implements OnInit, OnDestroy {
  static ngTemplateGuard_rxLet: 'binding';

  private templateManager: TemplateManager<
    LetViewContext<U | undefined | null>
  >;

  private _completeTemplateRef: TemplateRef<
    LetViewContext<U | undefined | null>
  > | null = null;
  private _errorTemplateRef: TemplateRef<
    LetViewContext<U | undefined | null>
  > | null = null;
  private _suspenseTemplateRef: TemplateRef<
    LetViewContext<U | undefined | null>
  > | null = null;

  @Input()
  set rxLet(potentialObservable: ObservableInput<U> | null | undefined) {
    this.renderAware.nextPotentialObservable(potentialObservable);
  }
  @Input('rxLetStrategy')
  set strategy(strategy: string | Observable<string> | undefined) {
    this.renderAware.nextStrategy(strategy || DEFAULT_STRATEGY_NAME);
  }

  @Input()
  set rxLetComplete(
    templateRef: TemplateRef<LetViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef('rxLetComplete', templateRef);
  }

  @Input()
  set rxLetError(
    templateRef: TemplateRef<LetViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef('rxLetError', templateRef);
  }

  @Input()
  set rxLetSuspense(
    templateRef: TemplateRef<LetViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef('rxLetSuspense', templateRef);
  }

  readonly strategies;
  private embeddedView: EmbeddedViewRef<U | undefined | null>;
  private readonly viewContext: LetViewContext<U | undefined | null> = {
    $implicit: undefined,
    rxLet: undefined,
    $error: false,
    $complete: false
  };

  protected subscription: Unsubscribable;
  readonly renderAware: RenderAware<U | null | undefined>;
  private readonly resetObserver: NextObserver<void> = {
    next: () => {
      // if not initialized no need to set undefined
      if (this.embeddedView) {
        this.viewContext.$implicit = undefined;
        this.viewContext.rxLet = undefined;
        this.viewContext.$error = false;
        this.viewContext.$complete = false;
      }
    }
  };
  private readonly updateObserver: Observer<U | null | undefined> = {
    next: (value: U | null | undefined) => {
      // to have initial rendering lazy
      this.templateManager.createEmbeddedView(
        'rxLetNext',
        this._nextTemplateRef
      );
      this.createEmbeddedView(this._nextTemplateRef);
      this.viewContext.$implicit = value;
      this.viewContext.rxLet = value;
    },
    error: (error: Error) => {
      // to have initial rendering lazy
      this.createEmbeddedView(this._errorTemplateRef);
      this.viewContext.$error = true;
    },
    complete: () => {
      this.createEmbeddedView(this._completeTemplateRef);
      this.viewContext.$complete = true;
    }
  };

  static ngTemplateContextGuard<U>(
    dir: LetDirective<U>,
    ctx: unknown | null | undefined
  ): ctx is LetViewContext<U> {
    return true;
  }

  constructor(
    cdRef: ChangeDetectorRef,
    private readonly _nextTemplateRef: TemplateRef<LetViewContext<U>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    this.strategies = getStrategies<U>({ cdRef });
    this.templateManager = new TemplateManager(
      this.viewContext,
      this.viewContainerRef
    );

    this.renderAware = createRenderAware<U>({
      strategies: this.strategies,
      resetObserver: this.resetObserver,
      updateObserver: this.updateObserver
    });
    this.renderAware.nextStrategy(DEFAULT_STRATEGY_NAME);
  }

  ngOnInit() {
    this.subscription = this.renderAware.subscribe();
    if (this._suspenseTemplateRef) {
      this.createEmbeddedView(this._suspenseTemplateRef);
    }
  }

  createEmbeddedView(templateRef: TemplateRef<any>) {
    this.embeddedView = this.viewContainerRef.createEmbeddedView(
      templateRef,
      this.viewContext
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.viewContainerRef.clear();
  }
}

function assertTemplate(
  property: string,
  templateRef: TemplateRef<any> | null
): templateRef is TemplateRef<any> {
  const isTemplateRefOrNull = !!(
    !templateRef || templateRef.createEmbeddedView
  );
  if (!isTemplateRefOrNull) {
    throw new Error(
      `${property} must be a TemplateRef, but received something else.`
    );
  }
  return isTemplateRefOrNull;
}
