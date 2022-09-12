import { EmbeddedViewRef, TemplateRef } from '@angular/core';
import { RxCoalescingOptions } from '@rx-angular/cdk/coalescing';
import {
  RxCompleteNotification,
  RxErrorNotification,
  RxNextNotification,
  RxNotification,
  RxNotificationKind,
  RxSuspenseNotification,
} from '@rx-angular/cdk/notifications';
import {
  onStrategy,
  RxRenderWork,
  strategyHandling,
} from '@rx-angular/cdk/render-strategies';
import { EMPTY, merge, Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  rxBaseTemplateNames,
  RxRenderAware,
  RxRenderSettings,
  RxTemplateSettings,
  RxViewContext,
} from './model';
import { createErrorHandler } from './render-error';
import { notifyAllParentsIfNeeded, templateHandling } from './utils';

export interface RxTemplateManager<
  T,
  C extends RxViewContext<T>,
  N = rxBaseTemplateNames | string
> extends RxRenderAware<T> {
  addTemplateRef: (name: N, templateRef: TemplateRef<C>) => void;
}

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
    suspense: (notification: RxSuspenseNotification<T>) => {
      const $implicit: T | null | undefined = notification.value as T;
      return {
        $implicit,
        suspense: true,
        error: false,
        complete: false,
        ...customNextContext($implicit),
      };
    },
    next: (notification: RxNextNotification<T>) => {
      const $implicit: T | null | undefined = notification.value as T;
      return {
        $implicit,
        suspense: false,
        error: false,
        complete: false,
        ...customNextContext($implicit),
      };
    },
    error: (notification: RxErrorNotification<T>) => {
      const $implicit: T | null | undefined = notification.value as T;
      return {
        $implicit,
        complete: false,
        error: notification.error || true,
        suspense: false,
        ...customNextContext($implicit),
      };
    },
    complete: (notification: RxCompleteNotification<T>) => {
      const $implicit: T | null | undefined = notification.value as T;
      return {
        $implicit,
        error: false,
        complete: true,
        suspense: false,
        ...customNextContext($implicit),
      };
    },
  };
}
export type RxViewContextMap<T> = Record<
  RxNotificationKind,
  (value?: any) => Partial<RxViewContext<T>>
>;

export type RxNotificationTemplateNameMap<T, C, N> = Record<
  RxNotificationKind,
  (value?: T, templates?: { get: (name: N) => TemplateRef<C> }) => N
>;

export function createTemplateManager<
  T,
  C extends RxViewContext<T>,
  N extends string = string
>(config: {
  renderSettings: RxRenderSettings;
  templateSettings: RxTemplateSettings<T, C>;
  templateTrigger$?: Observable<RxNotificationKind>;
  notificationToTemplateName: RxNotificationTemplateNameMap<T, C, N>;
}): RxTemplateManager<T, C, N> {
  const { renderSettings, notificationToTemplateName, templateSettings } =
    config;
  const {
    defaultStrategyName,
    strategies,
    cdRef: injectingViewCdRef,
    patchZone,
    parent,
  } = renderSettings;

  const errorHandler = createErrorHandler(renderSettings.errorHandler);
  const ngZone = patchZone ? patchZone : undefined;

  let activeTemplate: N;

  const strategyHandling$ = strategyHandling(defaultStrategyName, strategies);
  const templates = templateHandling<N, C>(templateSettings.viewContainerRef);
  const viewContainerRef = templateSettings.viewContainerRef;

  const triggerHandling = config.templateTrigger$ || EMPTY;
  const getContext = notificationKindToViewContext(
    templateSettings.customContext || ((v) => {})
  );
  let withSuspense = false;

  return {
    addTemplateRef: (name: N, templateRef: TemplateRef<C>) => {
      if (!withSuspense && name === 'suspenseTpl') {
        withSuspense = true;
      }
      templates.add(name, templateRef);
    },
    nextStrategy: strategyHandling$.next,
    render(values$: Observable<RxNotification<T>>): Observable<any> {
      let trg: RxNotificationKind | undefined;
      let notification: RxNotification<T> = {
        value: undefined,
        complete: false,
        error: false,
        kind: withSuspense
          ? RxNotificationKind.Suspense
          : RxNotificationKind.Next,
        hasValue: false,
      };

      return merge(
        values$.pipe(
          filter(
            ({ kind }) => withSuspense || kind !== RxNotificationKind.Suspense
          ),
          tap((n) => {
            notification = n;
            // set suspense to true after first emission so that we have continuous suspense context values
            withSuspense = true;
          })
        ),
        triggerHandling.pipe(
          tap<RxNotificationKind>((trigger) => (trg = trigger))
        )
      ).pipe(
        map(() => {
          const contextKind: RxNotificationKind = trg || notification.kind;
          trg = undefined;
          const value: T = notification.value as T;
          const templateName = notificationToTemplateName[contextKind](
            value,
            templates
          );
          const template = templates.get(templateName);
          return { template, templateName, notification, contextKind };
        }),
        withLatestFrom(strategyHandling$.strategy$),
        // Cancel old renders
        switchMap(
          ([
            { template, templateName, notification, contextKind },
            strategy,
          ]) => {
            const isNewTemplate = activeTemplate !== templateName || !template;
            const notifyParent = isNewTemplate && parent;
            return onStrategy(
              notification.value,
              strategy,
              (v: T, work: RxRenderWork, options: RxCoalescingOptions) => {
                const context = <C>getContext[contextKind](notification);
                if (isNewTemplate) {
                  // template has changed (undefined => next; suspense => next; ...)
                  // handle remove & insert
                  // remove current view if there is any
                  if (viewContainerRef.length > 0) {
                    // patch removal if needed
                    viewContainerRef.clear();
                  }
                  // create new view if any
                  if (template) {
                    // createEmbeddedView is already patched, no need for workFactory
                    templates.createEmbeddedView(templateName, context);
                  }
                } else if (template) {
                  // template didn't change, update it
                  // handle update
                  const view = <EmbeddedViewRef<C>>viewContainerRef.get(0);
                  Object.keys(context).forEach((k) => {
                    view.context[k] = context[k];
                  });
                  // update view context, patch if needed
                  work(view, options.scope, notification);
                }
                activeTemplate = templateName;
              },
              { ngZone }
              // we don't need to specify any scope here. The template manager is the only one
              // who will call `viewRef#detectChanges` on any of the templates it manages.
              // whenever a new value comes in, any pre-scheduled work of this taskManager will
              // be nooped before a new work will be scheduled. This happens because of the implementation
              // of `StrategyCredential#behavior`
            ).pipe(
              notifyAllParentsIfNeeded(
                injectingViewCdRef,
                strategy,
                () => notifyParent,
                ngZone
              ),
              catchError((e) => {
                errorHandler.handleError(e);
                return of(e);
              })
            );
          }
        )
      );
    },
  };
}
