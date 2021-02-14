import {
  ChangeDetectorRef,
  ElementRef,
  EmbeddedViewRef,
  NgIterable,
  NgZone,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Observable } from 'rxjs';
import { StrategyCredentialsMap } from '../render-strategies/model';

export enum RxBaseTemplateNames {
  error = 'errorTpl',
  complete = 'completeTpl',
  suspense = 'suspenseTpl'
}

// @TODO when TS 4.1.3 => export type rxBaseTemplateNames = `${RxBaseTemplateNames}`;
export type rxBaseTemplateNames = 'errorTpl' | 'completeTpl' | 'suspenseTpl';

/**
 * @internal
 */
export const enum ListChange {
  insert,
  remove,
  move,
  update,
  context,
}

// [[changeType, changePayload][], notifyParent]
export type ListChanges = [[ListChange, any][], boolean];

interface RxViewContext<T> {
  // to enable `let` syntax we have to use $implicit (var; let v = var)
  $implicit: T;
  // set context var complete to true (var$; let e = $error)
  $error: false | Error;
  // set context var complete to true (var$; let c = $complete)
  $complete: boolean;
  // set context var suspense to true (var$; let s = $suspense)
  $suspense: any;
}

export interface RxListViewContextComputed<T> {
  index: number;
  count: number;
}

export interface RxListViewContext<T extends Record<string | number | symbol, unknown>, U extends NgIterable<T> = NgIterable<T>, K = keyof T> extends RxListViewContextComputed<T> {
  $implicit: T;
  item$: Observable<T>;
  updateContext(newProps: RxListViewContextComputed<T>): void;
}

export interface  TemplateSettings<T, C> {
  templateRef?: TemplateRef<C>;
  customContext?: (value: T) => Record<string | number | symbol, unknown>,
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

export interface ListManager<T, C> {
  nextStrategy: (config: string | Observable<string>) => void;
  render(changes$: Observable<NgIterable<T>>): Observable<any>;
}

export type CreateViewContext<T, C> = (value: T, customProps?: object) => C;
export type UpdateViewContext<T, C> = (
  value: T,
  view: EmbeddedViewRef<C>,
  context: C
) => void;
