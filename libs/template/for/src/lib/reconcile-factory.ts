import {
  ChangeDetectorRef,
  EmbeddedViewRef,
  ErrorHandler,
  NgIterable,
  NgZone,
  TemplateRef,
  TrackByFunction,
  ViewContainerRef,
} from '@angular/core';
import {
  RxStrategyNames,
  RxStrategyProvider,
} from '@rx-angular/cdk/render-strategies';
import {
  RxDefaultListViewContext,
  RxListViewComputedContext,
} from '@rx-angular/cdk/template';
import { Observable } from 'rxjs';

export type ReconcileFactoryOptions<
  T,
  U extends NgIterable<T> = NgIterable<T>,
> = {
  values$: Observable<U>;
  strategy$: Observable<RxStrategyNames>;
  viewContainerRef: ViewContainerRef;
  template: TemplateRef<RxDefaultListViewContext<T>>;
  strategyProvider: RxStrategyProvider;
  errorHandler: ErrorHandler;
  cdRef: ChangeDetectorRef;
  trackBy: TrackByFunction<T>;
  createViewContext: (
    item: T,
    context: RxListViewComputedContext,
  ) => RxDefaultListViewContext<T>;
  updateViewContext: (
    item: T,
    view: EmbeddedViewRef<RxDefaultListViewContext<T>>,
    context: RxListViewComputedContext,
  ) => void;
  parent?: boolean;
  patchZone?: NgZone;
};

export type RxReconcileFactory = <T, U extends NgIterable<T> = NgIterable<T>>(
  options: ReconcileFactoryOptions<T, U>,
) => Observable<NgIterable<T>>;
