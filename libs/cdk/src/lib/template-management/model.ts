import {
  ChangeDetectorRef,
  ElementRef,
  EmbeddedViewRef,
  NgIterable,
  NgZone,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Observable } from 'rxjs';
import { StrategyCredentialsMap } from '../render-strategies/model';

export type rxBaseTemplateNames = 'rxError' | 'rxComplete' | 'rxSuspense';

export enum RxBaseTemplateNames {
  error = 'rxError',
  complete = 'rxComplete',
  suspense = 'rxSuspense',
}

export const enum RxListTemplateChange {
  insert,
  remove,
  move,
  update,
  context,
}

export type RxListTemplateChanges = [[RxListTemplateChange, any][], boolean];

export interface RxViewContext<T> {
  // to enable `let` syntax we have to use $implicit (var; let v = var)
  $implicit: T;
  // set context var complete to true (var$; let e = $error)
  $error: false | Error;
  // set context var complete to true (var$; let c = $complete)
  $complete: boolean;
  // set context var suspense to true (var$; let s = $suspense)
  $suspense: any;
}

export interface RxListViewComputedContext {
  index: number;
  count: number;
}

export interface RxListViewContext<
  T,
  U = RxListViewComputedContext
> extends RxListViewComputedContext {
  $implicit: T;
  item$: Observable<T>;
  updateContext(newProps: Partial<U>): void;
}

export interface RxListManager<T, C> {
  nextStrategy: (config: string | Observable<string>) => void;
  render(changes$: Observable<NgIterable<T>>): Observable<any>;
}

export interface RxRenderSettings<T, C> {
  cdRef: ChangeDetectorRef;
  eRef: ElementRef;
  parent: boolean;
  patchZone: NgZone | false;
  strategies: StrategyCredentialsMap;
  defaultStrategyName: string;
}

export interface RenderAware<T> {
  nextStrategy: (nextConfig: string | Observable<string>) => void;
  render: (values$: Observable<T>) => Observable<any>;
}

export type CreateViewContext<T, C> = (value: T) => C;
export type UpdateViewContext<T, C> = (
  value: T,
  view: EmbeddedViewRef<C>
) => void;

export interface TemplateSettings<T, C> {
  templateRef?: TemplateRef<C>;
  customContext?: (value: T) => any,
  viewContainerRef: ViewContainerRef;
  createViewContext: CreateViewContext<T, C>;
  updateViewContext: UpdateViewContext<T, C>;
}

export type CreateListViewContext<T, C, U> = (value: T, computedContext: U) => C;
export type UpdateListViewContext<T, C, U> = (
  value: T,
  view: EmbeddedViewRef<C>,
  computedContext: U
) => void;

export type RxListTemplateSettings<T, C, U> = Omit<TemplateSettings<T, C>, 'customContext' | 'createViewContext' | 'updateViewContext'> & {
  createViewContext: CreateListViewContext<T, C, U>;
  updateViewContext: UpdateListViewContext<T, C, U>;
}
