import { ChangeDetectorRef, EmbeddedViewRef, Inject, OnDestroy, Optional, Pipe, PipeTransform } from '@angular/core';
import { NextObserver, Observable, ObservableInput, OperatorFunction, Subscription, Unsubscribable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RxTemplateObserver } from '@rx-angular/template';
import {
  getDefaultStrategyCredentialsMap,
  mergeStrategies,
  RX_CUSTOM_STRATEGIES,
  RX_PRIMARY_STRATEGY,
  StrategyCredentialsMap
} from '../render-stragegies';
import { createRenderAware, RenderAware } from '../cdk';

@Pipe({ name: 'pipe', pure: true })
export class PipePipe<U> implements PipeTransform {

  transform<T>(
    potentialObservable: null,
    operatorFn?: OperatorFunction<T, any>,
  ): null;
  transform<T>(
    potentialObservable: undefined,
    operatorFn?: OperatorFunction<T, any>,
  ): undefined;
  transform<T>(
    potentialObservable: Observable<T>,
    operatorFn?: OperatorFunction<T, any>,
  ): T;
  transform<T>(
    potentialObservable: Observable<T>,
    operatorFn?: OperatorFunction<T, U>,
  ): Observable<U> {
    return potentialObservable.pipe(operatorFn)
  }

}
