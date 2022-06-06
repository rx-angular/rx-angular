import {
  ChangeDetectorRef,
  NgZone,
  OnDestroy,
  Pipe,
  PipeTransform, ViewRef
} from '@angular/core';
import {
  RxStrategyNames,
  RxStrategyProvider,
  strategyHandling,
} from '@rx-angular/cdk/render-strategies';
import {
  createTemplateNotifier, RxNotification,
  RxNotificationKind
} from '@rx-angular/cdk/notifications';
import { Promise } from '@rx-angular/cdk/zone-less/browser';
import {
  from, MonoTypeOperatorFunction,
  NextObserver,
  Observable,
  ObservableInput, OperatorFunction, race, share, shareReplay, skip, Subscription,
  Unsubscribable
} from 'rxjs';
import { filter, map, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';

/**
 * @Pipe PushPipe
 *
 * @description
 *
 * The push pipe serves as a drop-in replacement for angulars built-in async pipe.
 * Just like the *rxLet Directive, it leverages a
 * [RenderStrategy](https://github.com/rx-angular/rx-angular/blob/main/libs/cdk/docs/render-strategies/README.md)
 *   under the hood which takes care of optimizing the ChangeDetection of your component. The rendering behavior can be
 *   configured per PushPipe instance using either a strategy name or provide a
 * `RxComponentInput` config.
 *
 * Usage in the template
 *
 * ```html
 * <hero-search [term]="searchTerm$ | push"> </hero-search>
 * <hero-list-component [heroes]="heroes$ | push"> </hero-list-component>
 * ```
 *
 * Using different strategies
 *
 * ```html
 * <hero-search [term]="searchTerm$ | push: 'immediate'"> </hero-search>
 * <hero-list-component [heroes]="heroes$ | push: 'normal'"> </hero-list-component>
 * ```
 *
 * Provide a config object
 *
 * ```html
 * <hero-search [term]="searchTerm$ | push: { strategy: 'immediate' }"> </hero-search>
 * <hero-list-component [heroes]="heroes$ | push: { strategy: 'normal' }"> </hero-list-component>
 * ```
 *
 * Other Features:
 *
 * - lazy rendering (see
 *  [LetDirective](https://github.com/rx-angular/rx-angular/tree/main/libs/template/docs/api/let-directive.md))
 * - Take observables or promises, retrieve their values and render the value to the template
 * - a unified/structured way of handling null, undefined or error
 * - distinct same values in a row skip not needed re-renderings
 *
 * @usageNotes
 *
 * ```html
 * {{observable$ | push}}
 * <ng-container *ngIf="observable$ | push as o">{{o}}</ng-container>
 * <component [value]="observable$ | push"></component>
 * ```
 *
 * @publicApi
 */
@Pipe({ name: 'push', pure: false })
export class PushPipe<S extends string = string>
  implements PipeTransform, OnDestroy
{
  /**
   * @internal
   * This is typed as `any` because the type cannot be inferred
   * without a class-level generic argument, which was removed to
   * fix https://github.com/rx-angular/rx-angular/pull/684
   */
  private renderedValue: any | null | undefined;
  /** @internal */
  private readonly subscription: Unsubscribable;
  /** @internal */
  private readonly templateObserver = createTemplateNotifier<any>();
  private readonly templateValues$ = this.templateObserver.values$.pipe(
    onlyValues(),
    shareReplay(1)
  )
  /** @internal */
  private readonly strategyHandler = strategyHandling(
    this.strategyProvider.primaryStrategy,
    this.strategyProvider.strategies
  );
  /** @internal */
  private patchZone: false | NgZone;
  /** @internal */
  private _renderCallback: NextObserver<any>;

  constructor(
    private strategyProvider: RxStrategyProvider,
    private cdRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.subscription = this.handleChangeDetection();
  }

  transform<U>(
    potentialObservable: null,
    config?: RxStrategyNames<S> | Observable<RxStrategyNames<S>>,
    renderCallback?: NextObserver<U>
  ): null;
  transform<U>(
    potentialObservable: undefined,
    config?: RxStrategyNames<S> | Observable<RxStrategyNames<S>>,
    renderCallback?: NextObserver<U>
  ): undefined;
  transform<U>(
    potentialObservable: ObservableInput<U> | U,
    config?: RxStrategyNames<S> | Observable<RxStrategyNames<S>>,
    renderCallback?: NextObserver<U>
  ): U;
  transform<U>(
    potentialObservable: ObservableInput<U>,
    config?: PushInput<U, S>
  ): U;
  transform<U>(
    potentialObservable: ObservableInput<U> | U | null | undefined,
    config:
      | PushInput<U, S>
      | RxStrategyNames<S>
      | Observable<RxStrategyNames<S>>
      | undefined,
    renderCallback?: NextObserver<U>
  ): U | null | undefined {
    this._renderCallback = renderCallback;
    if (config) {
      if (isRxComponentInput(config)) {
        this.strategyHandler.next(config.strategy as string);
        this._renderCallback = config.renderCallback;
        // set fallback if patchZone is not set
        this.setPatchZone(config.patchZone);
      } else {
        this.strategyHandler.next(config as string);
      }
    }
    this.templateObserver.next(potentialObservable);
    return this.renderedValue as U;
  }

  /** @internal */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /** @internal */
  private setPatchZone(patch?: boolean): void {
    const doPatch =
      patch == null ? this.strategyProvider.config.patchZone : patch;
    this.patchZone = doPatch ? this.ngZone : false;
  }

  /** @internal */
  private handleChangeDetection(): Unsubscribable {
    const scope = (this.cdRef as any).context;
    const sub = new Subscription();
    const setRenderedValue = this.templateValues$.pipe(
      onlyValues(),
    ).subscribe(({ value }) => this.renderedValue = value);
    const render = hasInitialValue(this.templateValues$)
      .pipe(
        switchMap(isSync => this.templateValues$.pipe(
          // skip ticking change detection
          // in case we have an initial value, we don't need to perform cd
          // the variable will be evaluated anyway because of the lifecycle
          skip(isSync ? 1 : 0),
          onlyValues(),
          this.render(scope),
          tap(v =>{
            console.log('rendered', v);
            this._renderCallback?.next(v);
          }),
        ))
      )
      .subscribe();
    sub.add(setRenderedValue);
    sub.add(render);
    return sub;
  }

  /** @internal */
  private render<T>(scope: object): OperatorFunction<RxNotification<T>, T> {
    return o$ => o$.pipe(
      withLatestFrom(this.strategyHandler.strategy$),
      switchMap(([notification, strategy]) =>
        this.strategyProvider
          .schedule(
            () => {
              strategy.work(this.cdRef, scope);
              return notification.value;
            },
            {
              scope,
              strategy: strategy.name,
              patchZone: this.patchZone,
            }
          )
    ))
  }
}

interface PushInput<T, S> {
  strategy?: RxStrategyNames<S> | Observable<RxStrategyNames<S>>;
  renderCallback?: NextObserver<T>;
  patchZone?: boolean;
}

// https://eslint.org/docs/rules/no-prototype-builtins
const hasOwnProperty = Object.prototype.hasOwnProperty;

function onlyValues<T>(): MonoTypeOperatorFunction<RxNotification<T>> {
  return o$ => o$.pipe(filter(
    (n) =>
      n.kind === RxNotificationKind.Suspense ||
      n.kind === RxNotificationKind.Next
  ));
}

/**
 *
 * @param value$
 */
function hasInitialValue(value$: Observable<unknown>): Observable<boolean> {
  return race(
    from(Promise.resolve()).pipe(map(() => false)),
    value$.pipe(map(() => true)),
  ).pipe(
    take(1)
  );
}

function isRxComponentInput<U, S>(value: any): value is PushInput<U, S> {
  return (
    value != null &&
    (hasOwnProperty.call(value, 'strategy') ||
      hasOwnProperty.call(value, 'renderCallback') ||
      hasOwnProperty.call(value, 'patchZone'))
  );
}
