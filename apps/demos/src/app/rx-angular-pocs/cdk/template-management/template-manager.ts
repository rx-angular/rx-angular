import { EmbeddedViewRef, TemplateRef } from '@angular/core';
import { combineLatest, EMPTY, isObservable, Observable, of } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  merge as mergeWith,
  switchAll,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { onStrategy } from '../render-strategies';
import { RenderWork } from '../render-strategies/model';
import { RxNotification, RxNotificationKind } from '../utils/rxjs';
import { rxMaterialize } from '../utils/rxjs/operators';
import {
  RenderSettings,
  RxBaseTemplateNames,
  TemplateSettings,
} from './model';
import {
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
import { RxViewContext } from '@rx-angular/cdk';

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
  renderSettings: RenderSettings<T, C>;
  templateSettings: TemplateSettings<T, C>;
  templateTrigger$?: Observable<RxNotificationKind>;
  notificationToTemplateName: {
    [rxKind: string]: (
      value: T,
      templates: { get: (name: N) => TemplateRef<C> }
    ) => N;
  };
}): TemplateManager2<T, C, N> {
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
        map((o) => (isObservable(o) ? o : of(o))),
        distinctUntilChanged(),
        switchAll(),
        distinctUntilChanged(),
        rxMaterialize(),
        /* tslint:disable */
        mergeWith(triggerHandling.trigger$ || EMPTY),
        /* tslint:enable */
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
              (v: T, work: RenderWork, options: { scope?: any }) => {
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
              // { scope: viewContainerRef.get(0) }
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
