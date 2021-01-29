import {
  ChangeDetectorRef,
  ElementRef, EmbeddedViewRef,
  NgZone,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { RxBaseTemplateNames, RxViewContext } from './model';
import { EMPTY, isObservable, merge, Observable, of } from 'rxjs';
import { RenderWork, StrategyCredentialsMap } from '../render-strategies/model';
import { CreateViewContext } from './list-manager-move';
import {
  notificationKindToViewContext,
  getEmbeddedViewCreator,
  getParentNotifications$,
  getTNode,
  strategyHandling,
  templateHandling,
  templateTriggerHandling,
  TNode,
} from './utils';
import { rxMaterialize } from '../utils/rxjs/operators';
import {
  catchError,
  distinctUntilChanged,
  map,
  merge as mergeWith,
  switchAll,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { onStrategy } from '../render-strategies';
import { RxNotification, RxNotificationKind } from '../utils/rxjs';

export interface RenderAware<T> {
  nextStrategy: (nextConfig: string | Observable<string>) => void;
  render: (values$: Observable<T>) => Observable<any>;
}

export interface TemplateManager2<
  T,
  C extends RxViewContext<T>,
  N = RxBaseTemplateNames | string
> extends RenderAware<T> {
  addTemplateRef: (name: N, templateRef: TemplateRef<C>) => void;
  addTrigger: (trigger$: Observable<RxNotification<T>>) => void;
}

export function createTemplateManager2<
  T,
  C extends RxViewContext<T>,
  N = RxBaseTemplateNames | string
>(config: {
  viewContainerRef: ViewContainerRef;
  defaultStrategyName: string;
  strategies: StrategyCredentialsMap;
  cdRef: ChangeDetectorRef;
  eRef: ElementRef;
  ngZone: NgZone;
  templateTrigger$: Observable<N>;
  renderConfig: { parent: boolean; patchZone: NgZone | false };
  notificationToTemplateName: { [rxKind: string]: N };
  customContext: (value: T) => object;
}): TemplateManager2<T, C, N> {
  const {
    viewContainerRef,
    defaultStrategyName,
    strategies,
    cdRef,
    renderConfig,
    notificationToTemplateName,
    eRef,
    customContext,
  } = config;
  const injectingViewCdRef = cdRef;
  const { parent, patchZone } = renderConfig;
  const tNode: TNode = parent
    ? getTNode(injectingViewCdRef, eRef.nativeElement)
    : false;

  let activeTemplate: N;

  const strategyHandling$ = strategyHandling(defaultStrategyName, strategies);
  const templates = templateHandling<N, C>();

  const createEmbeddedView = getEmbeddedViewCreator(
    viewContainerRef,
    patchZone
  );
  const triggerHandling = templateTriggerHandling();
  const getContext = notificationKindToViewContext(customContext);

  return {
    addTemplateRef: templates.add,
    addTrigger: triggerHandling.next,
    nextStrategy: strategyHandling$.next,
    render(values$: Observable<T>): Observable<any> {
      return values$.pipe(
        map((o) => (isObservable(o) ? o : of(o))),
        distinctUntilChanged(),
        switchAll(),
        distinctUntilChanged(),
        rxMaterialize(),
        mergeWith(triggerHandling.trigger$ || EMPTY),
        withLatestFrom(strategyHandling$.strategy$),
        // Cancel old renders
        switchMap(([notification, strategy]) => {
          const kind: RxNotificationKind = notification.kind;
          const value: T = notification.value as T;
          const templateName = notificationToTemplateName[kind];
          const template = templates.get(templateName);
          const isNewTemplate = activeTemplate !== templateName;
          return merge(
            onStrategy(
              value,
              strategy,
              (v: T, work: RenderWork, options: { scope?: any }) => {
                if (isNewTemplate) {
                  if (viewContainerRef.length > 0) {
                    viewContainerRef.remove();
                  }
                  createEmbeddedView(template);
                }
                const context = getContext[kind](value);
                const view = <EmbeddedViewRef<C>>viewContainerRef.get(0);
                Object.keys(context).forEach(k => {
                  view.context[k] = context[k];
                });
                work(view, options.scope, notification);
                activeTemplate = templateName;
              }
              // { scope: viewContainerRef.get(0) }
            ),
            ...(isNewTemplate && parent
              ? getParentNotifications$(tNode, cdRef, strategy)
              : [])
          );
        }),
        catchError((e) => {
          console.error(e);
          return EMPTY;
        }),
      );
    },
  };
}
