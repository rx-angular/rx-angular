import {
  ChangeDetectorRef,
  NgZone,
  TemplateRef,
  Type,
  ViewContainerRef,
  ɵdetectChanges as detectChanges,
} from '@angular/core';
import {
  merge, NextObserver,
  ObservableInput, Observer,
  OperatorFunction,
  ReplaySubject,
  Subject
} from 'rxjs';
import { Observable } from 'rxjs';
import {
  mergeAll,
  share,
  startWith,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  StrategyCredentials,
  StrategyCredentialsMap,
} from '../render-strategies/model/strategy-credentials';
import {
  nameToStrategyCredentials,
  onStrategy,
} from '../render-strategies/utils/strategy-helper';
import {
  CONTEXT,
  HEADER_OFFSET,
  L_CONTAINER_NATIVE,
  T_HOST,
  TVIEW,
} from '../utils/view-constants';
import { RxBaseTemplateNames, RxViewContext } from './model';
import { CreateViewContext } from './list-manager-move';
import { ngInputFlatten } from '../utils/rxjs/operators';
import { RxNotification, RxNotificationKind, RxTemplateObserver } from '../utils/rxjs';

export type TNode = any;

export function getTNode(cdRef: ChangeDetectorRef, native: Node) {
  const lView = (cdRef as any)._cdRefInjectingView;
  const tView = lView[TVIEW];
  let i = HEADER_OFFSET;
  let lContainer;
  while (!lContainer && i <= tView['bindingStartIndex']) {
    const candidate = lView[i];
    if (candidate && candidate[L_CONTAINER_NATIVE] === native) {
      lContainer = candidate;
    }
    i++;
  }
  return lContainer[T_HOST];
}

export function extractProjectionParentViewSet(
  cdRef: ChangeDetectorRef,
  tNode: any
): Set<Type<any>> {
  const injectingLView = (cdRef as any)._cdRefInjectingView;
  const injectingTView = injectingLView[1];
  const components = new Set<number>(injectingTView['components']);
  const parentElements = new Set<Type<any>>();
  let parent = tNode['parent'];
  while (parent != null && components.size > 0) {
    const idx = parent['index'];
    if (components.has(idx)) {
      // TODO: we should discuss about this. currently only the first Component will get returned, not a list of
      //  components. Maybe we should make the parent notification configurable regarding the level of `deepness`?
      // components.delete(idx);
      components.clear();
      parentElements.add(injectingLView[idx][CONTEXT]);
    }
    parent = parent['parent'];
  }
  return parentElements;
}

export function extractProjectionViews(
  cdRef: ChangeDetectorRef,
  tNode: any
): Type<any>[] {
  return Array.from(extractProjectionParentViewSet(cdRef, tNode));
}

export function renderProjectionParents(
  cdRef: ChangeDetectorRef,
  tNode: any,
  strategy$: Observable<StrategyCredentials>
): OperatorFunction<any, any> {
  return (o$) =>
    o$.pipe(
      withLatestFrom(strategy$),
      switchMap(([_, strategy]) => {
        const parentElements = extractProjectionParentViewSet(cdRef, tNode);
        const behaviors = [];
        for (const el of parentElements.values()) {
          behaviors.push(
            onStrategy(
              el,
              strategy,
              (value, work, options) => {
                detectChanges(el);
              },
              { scope: el }
            )
          );
        }
        behaviors.push(
          onStrategy(
            null,
            strategy,
            (value, work, options) => work(cdRef, options.scope),
            { scope: (cdRef as any).context || cdRef }
          )
        );
        return merge(...behaviors);
      })
    );
}

export type RxViewContextMap<T> =
  Record<
    RxNotificationKind,
    (value?: any) => RxViewContext<T>
  >

export function notificationKindToViewContext<T>(
  customContext: (value: T) => object
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
        ...customContext(value),
        $implicit: value,
        $suspense: false,
        $error: false,
        $complete: false,
      };
    },
    error: (error: Error) => {
      return {
        $implicit: undefined,
        $complete: false,
        $error: error,
        $suspense: false,
      };
    },
    complete: () => {
      return {
        $implicit: undefined,
        $error: false,
        $complete: true,
        $suspense: false,
      };
    },
  };
}

export function getEmbeddedViewCreator<C, T>(
  viewContainerRef: ViewContainerRef,
  patchZone: NgZone | false
) {
  return (templateRef: TemplateRef<C>) => {
    if (patchZone) {
      return patchZone.run(() =>
        viewContainerRef.createEmbeddedView(templateRef)
      );
    } else {
      return viewContainerRef.createEmbeddedView(templateRef);
    }
  };
}

export function getParentNotifications$(
  tNode: TNode,
  injectingViewCdRef: ChangeDetectorRef,
  strategy: StrategyCredentials
) {
  const parentElements = extractProjectionParentViewSet(
    injectingViewCdRef,
    tNode
  );
  const behaviors = [];
  for (const parentComponent of parentElements.values()) {
    behaviors.push(
      onStrategy(
        parentComponent,
        strategy,
        // Here we CD the parent to update their projected views scenarios
        (value, work, options) => {
          // console.log('parentComponent', parentComponent);
          detectChanges(parentComponent);
        },
        { scope: parentComponent }
      )
    );
  }
  return behaviors;
}

export function getInsertViewExecutionContext<T>(ngZone: NgZone | false) {
  let insertViewExecutionContext = (fn: () => T): T => {
    return fn();
  };
  if (ngZone) {
    // @Notice: to have zone aware eventListeners work we create the view in ngZone.run
    insertViewExecutionContext = (fn: () => T) => {
      return ngZone.run(() => fn());
    };
  }
  return insertViewExecutionContext;
}

export function templateHandling<N, C>() {
  const templateCache = new Map<N, TemplateRef<C>>();

  return {
    add(name: N, templateRef: TemplateRef<C>): void {
      assertTemplate(name, templateRef);
      if (!templateCache.has(name)) {
        templateCache.set(name, templateRef);
      } else {
        throw new Error(
          'Updating an already existing Template is not supported at the moment.'
        );
      }
    },
    get(name: N): TemplateRef<C> {
      return templateCache.get(name);
    },
  };

  //
  function assertTemplate<T>(
    property: any,
    templateRef: TemplateRef<T> | null
  ): templateRef is TemplateRef<T> {
    const isTemplateRefOrNull = !!(
      !templateRef || templateRef.createEmbeddedView
    );
    if (!isTemplateRefOrNull) {
      throw new Error(
        `${property} must be a TemplateRef, but received something else.`
      );
    }
    return isTemplateRefOrNull;
  }
}

export function strategyHandling(
  defaultStrategyName: string,
  strategies: StrategyCredentialsMap
) {
  const strategyName$ = new ReplaySubject<string | Observable<string>>(1);
  const strategy$: Observable<StrategyCredentials> = strategyName$.pipe(
    ngInputFlatten(),
    startWith(defaultStrategyName),
    nameToStrategyCredentials(strategies, defaultStrategyName),
    share()
  );
  return {
    next(name: string | Observable<string>) {
      strategyName$.next(name);
    },
    strategy$,
  };
}

export function templateTriggerHandling<T>() {
  const templateTriggerSubject = new Subject<Observable<RxNotification<T>>>();
  const trigger$ = templateTriggerSubject.pipe(mergeAll());
  return {
    next(templateName: Observable<RxNotification<T>>) {
      templateTriggerSubject.next(templateName);
    },
    trigger$,
  };
}

export function getHotMerged<U>() {
  const observablesSubject = new ReplaySubject<ObservableInput<U> | U>(1);
  const values$ = observablesSubject.pipe(ngInputFlatten()) as Observable<U>;

  return {
    next(observable: ObservableInput<U> | U) {
      observablesSubject.next(observable);
    },
    values$,
  };
}
