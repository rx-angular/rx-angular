import { ChangeDetectorRef, ElementRef, NgIterable, NgZone, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateViewContext, UpdateViewContext } from './list-manager-move';
import { StrategyCredentialsMap } from '../render-strategies/model';

export type rxBaseTemplateNames = 'rxError' | 'rxComplete' | 'rxSuspense';

export enum RxBaseTemplateNames {
  error = 'rxError',
  complete = 'rxComplete',
  suspense = 'rxSuspense'
}

export const enum ListChange {
  insert,
  remove,
  move,
  update,
  context,
}


export interface NgViewContext<T> {
  // to enable `let` syntax we have to use $implicit (var; let v = var)
  $implicit: T;
}

interface RxContext {
  // set context var complete to true (var$; let e = $error)
  $error: false | Error;
  // set context var complete to true (var$; let c = $complete)
  $complete: boolean;
  // set context var suspense to true (var$; let s = $suspense)
  $suspense: any;
}

export interface RxViewContext<T> extends NgViewContext<T>, RxContext {

}

export interface RxListViewComputedContext<T> {
  index: number;
  count: number;
}

export interface RxListViewContext<T extends Record<string | number | symbol, any>, U extends NgIterable<T> = NgIterable<T>, K = keyof T> extends RxListViewComputedContext<T> {
  $implicit: T;
  item$: Observable<T>;
  updateContext(newProps: RxListViewComputedContext<T>): void;
}

export interface  TemplateSettings<T, C> {
  templateRef?: TemplateRef<C>;
  customContext?: (value: T) => any,
  viewContainerRef: ViewContainerRef;
  createViewContext: CreateViewContext<T, C>;
  updateViewContext: UpdateViewContext<T, C>;
}
export interface  RenderSettings<T, C> {
  cdRef: ChangeDetectorRef;
  eRef: ElementRef;
  parent: boolean;
  patchZone: NgZone | false;
  strategies: StrategyCredentialsMap;
  defaultStrategyName: string;
}

