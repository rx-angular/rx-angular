import { EmbeddedViewRef, TemplateRef } from '@angular/core';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import {
  catchError,
  filter,
  merge as mergeWith,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { onStrategy } from '../render-strategies/utils';
import {
  RenderWork
} from '../render-strategies/model';
import {
  RenderAware,
  RxRenderSettings,
  RxBaseTemplateNames,
  RxViewContext,
  TemplateSettings
} from './model';
import {
  coerceDistinctWith,
  getEmbeddedViewCreator,
  getTNode,
  notificationKindToViewContext,
  notifyAllParentsIfNeeded,
  notifyInjectingParentIfNeeded,
  strategyHandling,
  templateHandling,
  templateTriggerHandling,
  TNode,
} from './utils';
import { CoalescingOptions, RxNotification, RxNotificationKind } from '../model';
import { rxMaterialize } from '../utils/rxMaterialize';

export interface RxTemplateManager<
  T,
  C extends RxViewContext<T>,
  N = RxBaseTemplateNames | string
> extends RenderAware<T> {
  addTemplateRef: (name: N, templateRef: TemplateRef<C>) => void;
  addTrigger: (trigger$: Observable<RxNotification<T>>) => void;
}

export type NotificationTemplateNameMap<T, C, N> = Record<
  RxNotificationKind,
  (value: T, templates: { get: (name: N) => TemplateRef<C> }) => N
>;

export function createTemplateManager<
  T,
  C extends RxViewContext<T>,
  N = RxBaseTemplateNames | string
>(config: {
  renderSettings: RxRenderSettings<T, C>;
  templateSettings: TemplateSettings<T, C>;
  templateTrigger$?: Observable<RxNotificationKind>;
  notificationToTemplateName: NotificationTemplateNameMap<T, C, N>;
}): RxTemplateManager<T, C, N> {
  const {
    renderSettings,
    notificationToTemplateName,
    templateSettings,
  } = config;
  const {
    defaultStrategyName,
    strategies,
    cdRef: injectingViewCdRef,
    patchZone,
    parent,
    eRef,
  } = renderSettings;

  const tNode: TNode = parent
    ? getTNode(injectingViewCdRef, eRef.nativeElement)
    : false;

  let activeTemplate: N;

  const strategyHandling$ = strategyHandling(defaultStrategyName, strategies);
  const templates = templateHandling<N, C>();
  const viewContainerRef = templateSettings.viewContainerRef;

  const createEmbeddedView = getEmbeddedViewCreator(
    viewContainerRef,
    patchZone
  );
  const triggerHandling = templateTriggerHandling();
  const getContext = notificationKindToViewContext(
    templateSettings.customContext
  );

  return {
    addTemplateRef: templates.add,
    addTrigger: triggerHandling.next,
    nextStrategy: strategyHandling$.next,
    render(values$: Observable<T>): Observable<any> {
      return values$.pipe(
        coerceDistinctWith(),
        rxMaterialize(),
        mergeWith(triggerHandling.trigger$ || EMPTY),
        withLatestFrom(strategyHandling$.strategy$),
        // Cancel old renders
        switchMap(([notification, strategy]) => {
          const kind: RxNotificationKind = notification.kind;
          const value: T = notification.value as T;
          const templateName = notificationToTemplateName[kind](
            value,
            templates
          );

          const template = templates.get(templateName);
          const isNewTemplate = activeTemplate !== templateName;
          const notifyParent = isNewTemplate || parent;
          return combineLatest([
            onStrategy(
              value,
              strategy,
              (v: T, work: RenderWork, options: CoalescingOptions) => {
                if (isNewTemplate) {
                  if (viewContainerRef.length > 0) {
                    viewContainerRef.clear();
                  }
                  if (template) {
                    createEmbeddedView(template);
                  }
                }
                if (template) {
                  const context = getContext[kind](value);
                  const view = <EmbeddedViewRef<C>>viewContainerRef.get(0);
                  Object.keys(context).forEach((k) => {
                    view.context[k] = context[k];
                  });
                  work(view, options.scope, notification);
                }
                activeTemplate = templateName;
              }
              // @TODO specify scoping
            ),
            notifyInjectingParentIfNeeded(
              injectingViewCdRef,
              strategy,
              isNewTemplate
            ),
          ]).pipe(
            notifyAllParentsIfNeeded(
              tNode,
              injectingViewCdRef,
              strategy,
              () => notifyParent
            ),
            filter((v) => v != null)
          );
        }),
        catchError((e) => {
          console.error(e);
          return EMPTY;
        })
      );
    },
  };
}
