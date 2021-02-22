import { EmbeddedViewRef, TemplateRef } from '@angular/core';
import { EMPTY, merge, Observable } from 'rxjs';
import {
  catchError,
  filter,
  ignoreElements,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  CoalescingOptions,
  RenderWork,
  RxNotification,
  RxNotificationKind,
} from '../model';
import { onStrategy } from '../utils/onStrategy';
import { strategyHandling } from '../utils/strategy-handling';
import {
  RenderAware,
  rxBaseTemplateNames,
  RxRenderSettings,
  RxViewContext,
  TemplateSettings,
} from './model';
import {
  getTNode,
  notifyAllParentsIfNeeded,
  notifyInjectingParentIfNeeded,
  templateHandling,
  TNode,
} from './utils';

export interface RxTemplateManager<
  T,
  C extends RxViewContext<T>,
  N = rxBaseTemplateNames | string
> extends RenderAware<T> {
  addTemplateRef: (name: N, templateRef: TemplateRef<C>) => void;
  // addTrigger: (trigger$: Observable<RxNotification<T>>) => void;
  // activeTemplate: N;
}

export type NotificationTemplateNameMap<T, C, N> = Record<
  RxNotificationKind,
  (value?: T, templates?: { get: (name: N) => TemplateRef<C> }) => N
>;

/**
 * @internal
 *
 * A factory function that returns a map of projections to turn a notification of a Observable (next, error, complete)
 *
 * @param customNextContext - projection function to provide custom properties as well as override existing
 */
export function notificationKindToViewContext<T>(
  customNextContext: (value: T) => object
): RxViewContextMap<T> {
  // @TODO rethink overrides
  return {
    suspense: (value?: any) => {
      return {
        $implicit: undefined,
        // if a custom value is provided take it, otherwise assign true
        $suspense: value !== undefined ? value : true,
        $error: false,
        $complete: false,
      };
    },
    next: (value: T | null | undefined) => {
      return {
        $implicit: value,
        $suspense: false,
        $error: false,
        $complete: false,
        ...customNextContext(value),
      };
    },
    error: (error: Error) => {
      return {
        $complete: false,
        $error: error,
        $suspense: false,
      };
    },
    complete: () => {
      return {
        $error: false,
        $complete: true,
        $suspense: false,
      };
    },
  };
}
export type RxViewContextMap<T> = Record<
  RxNotificationKind,
  (value?: any) => Partial<RxViewContext<T>>
>;

export function createTemplateManager<
  T,
  C extends RxViewContext<T>,
  N = rxBaseTemplateNames | string
>(config: {
  renderSettings: RxRenderSettings<T, C>;
  templateSettings: TemplateSettings<T, C>;
  templateTrigger$?: Observable<RxNotification<unknown>>;
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
  const templates = templateHandling<N, C>(
    templateSettings.viewContainerRef,
    patchZone
  );
  const viewContainerRef = templateSettings.viewContainerRef;

  const triggerHandling = config.templateTrigger$ || EMPTY;
  const getContext = notificationKindToViewContext(
    templateSettings.customContext
  );

  return {
    addTemplateRef: templates.add,
    // addTrigger: triggerHandling.next,
    nextStrategy: strategyHandling$.next,
    render(values$: Observable<RxNotification<T>>): Observable<any> {
      return values$.pipe(
        /* tslint:disable */
        // mergeWith(triggerHandling.trigger$ || EMPTY),
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
          const notifyParent = isNewTemplate && parent;
          return merge(
            onStrategy(
              value,
              strategy,
              (v: T, work: RenderWork, options: CoalescingOptions) => {
                if (isNewTemplate) {
                  if (viewContainerRef.length > 0) {
                    viewContainerRef.clear();
                  }
                  if (template) {
                    templates.createEmbeddedView(templateName);
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
              // we don't need to specify any scope here. The template manager is the only one
              // who will call `viewRef#detectChanges` on any of the templates it manages.
              // whenever a new value comes in, any pre-scheduled work of this taskManager will
              // be nooped before a new work will be scheduled. This happens because of the implementation
              // of `StrategyCredential#behavior`
            ).pipe(
              notifyAllParentsIfNeeded(
                tNode,
                injectingViewCdRef,
                strategy,
                () => notifyParent
              )
            ),
            notifyInjectingParentIfNeeded(
              injectingViewCdRef,
              strategy,
              isNewTemplate
            ).pipe(ignoreElements())
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
