import { ChangeDetectorRef, Inject, OnDestroy, OnInit, Optional, Pipe, PipeTransform } from '@angular/core';
import { NextObserver, Observable, ObservableInput, Subscription, Unsubscribable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  getDefaultStrategyCredentialsMap,
  mergeStrategies,
  RX_CUSTOM_STRATEGIES,
  RX_PRIMARY_STRATEGY,
  StrategyCredentialsMap
} from '../../render-strategies';
import { createRenderAware,RenderAware } from '../../cdk/render-aware/render-aware';
import { RxTemplateObserver } from '../../cdk';

@Pipe({ name: 'push', pure: true })
export class PushPipe<U> implements PipeTransform, OnDestroy, OnInit{
  private renderedValue: U | null | undefined;

  private readonly strategies: StrategyCredentialsMap;
  private readonly renderAware: RenderAware<U | null | undefined>;
  private subscription: Unsubscribable;
  private renderCallbackSubscription: Unsubscribable = Subscription.EMPTY;

  private readonly templateObserver: RxTemplateObserver<U | null | undefined> = {
    suspense: () => (this.renderedValue = undefined),
    next: (value: U | null | undefined) => {
      console.log('tobs', value);
      (this.renderedValue = value)
    }
  };

  constructor(
    private cdRef: ChangeDetectorRef,
    @Optional()
    @Inject(RX_CUSTOM_STRATEGIES)
    private customStrategies: StrategyCredentialsMap[],
    @Inject(RX_PRIMARY_STRATEGY)
    private defaultStrategyName: string
  ) {
    this.strategies = this.customStrategies.reduce((a, i) => mergeStrategies(a, i), getDefaultStrategyCredentialsMap());
    console.log('strategies: ', this.strategies);
    this.renderAware = createRenderAware<U>({
      strategies: this.strategies,
      defaultStrategyName: this.defaultStrategyName,
      templateObserver: this.templateObserver,
      getContext: () => (this.cdRef as any).context,
      getCdRef: () => {
        console.log('this.cdRef', this.cdRef);
        return this.cdRef
      }
    });
    this.renderAware.subscribe();
  }

  transform<T>(
    potentialObservable: null,
    config?: string | Observable<string>,
    renderCallback?: NextObserver<U>
  ): null;
  transform<T>(
    potentialObservable: undefined,
    config?: string | Observable<string>,
    renderCallback?: NextObserver<U>
  ): undefined;
  transform<T>(
    potentialObservable: ObservableInput<T>,
    config?: string | Observable<string>,
    renderCallback?: NextObserver<U>
  ): T;
  transform<T>(
    potentialObservable: ObservableInput<T> | null | undefined,
    strategyName: string | Observable<string> | undefined,
    renderCallback?: NextObserver<U>
  ): T | null | undefined {
    console.log('strategyName', strategyName);
    this.renderAware.nextStrategy(strategyName);
    this.renderAware.nextPotentialObservable(potentialObservable);
    this.subscribeRenderCallback(renderCallback);
    return this.renderedValue as any;
  }

  ngOnDestroy(): void {
    this.renderCallbackSubscription.unsubscribe();
    this.subscription?.unsubscribe();
  }

  private subscribeRenderCallback(renderCallback?: NextObserver<U>): void {
    if (renderCallback) {
      this.renderCallbackSubscription.unsubscribe();
      this.renderCallbackSubscription = this.renderAware.rendered$
        .pipe(map(({ value }) => value))
        .subscribe(renderCallback);
    }
  }

  ngOnInit(): void {
    this.subscription = this.renderAware.rendered$.subscribe();
  }
}
