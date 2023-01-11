import {
  ChangeDetectorRef,
  EmbeddedViewRef,
  NgZone,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import {
  onStrategy,
  RxStrategyCredentials,
} from '@rx-angular/cdk/render-strategies';
import {
  BehaviorSubject,
  concat,
  MonoTypeOperatorFunction,
  Observable,
  of,
  Subject,
} from 'rxjs';
import { ignoreElements, switchMap } from 'rxjs/operators';

/**
 * @internal
 * creates an embeddedViewRef
 *
 * @param viewContainerRef
 * @param templateRef
 * @param context
 * @param index
 * @return EmbeddedViewRef<C>
 */
export function createEmbeddedView<C>(
  viewContainerRef: ViewContainerRef,
  templateRef: TemplateRef<C>,
  context: C,
  index = 0
): EmbeddedViewRef<C> {
  const view = viewContainerRef.createEmbeddedView(templateRef, context, index);
  view.detectChanges();
  return view;
}

/**
 * @internal
 *
 * A factory function returning an object to handle `TemplateRef`'s.
 * You can add and get a `TemplateRef`.
 *
 */
export function templateHandling<N, C>(
  viewContainerRef: ViewContainerRef
): {
  add(name: N, templateRef: TemplateRef<C>): void;
  get(name: N): TemplateRef<C>;
  get$(name: N): Observable<TemplateRef<C>>;
  createEmbeddedView(name: N, context?: C, index?: number): EmbeddedViewRef<C>;
} {
  const templateCache = new Map<N, Subject<TemplateRef<C>>>();

  const get$ = (name: N): Observable<TemplateRef<C>> => {
    return templateCache.get(name) || of(undefined);
  };
  const get = (name: N): TemplateRef<C> | undefined => {
    let ref: TemplateRef<C>;
    const templatRef$ = get$(name);
    if (templatRef$) {
      const sub = templatRef$.subscribe((r) => (ref = r));
      sub.unsubscribe();
    }
    return ref;
  };

  return {
    add(name: N, templateRef: TemplateRef<C>): void {
      assertTemplate(name, templateRef);
      if (!templateCache.has(name)) {
        templateCache.set(
          name,
          new BehaviorSubject<TemplateRef<C>>(templateRef)
        );
      } else {
        templateCache.get(name).next(templateRef);
      }
    },
    get$,
    get,
    createEmbeddedView: (name: N, context?: C) =>
      createEmbeddedView(viewContainerRef, get(name), context),
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
        `${property} must be a TemplateRef, but received ${typeof templateRef}`
      );
    }
    return isTemplateRefOrNull;
  }
}

/**
 * @internal
 *
 * A side effect operator similar to `tap` but with a static internal logic.
 * It calls detect changes on the 'VirtualParent' and the injectingViewCdRef.
 *
 * @param injectingViewCdRef
 * @param strategy
 * @param notifyNeeded
 * @param ngZone
 */
export function notifyAllParentsIfNeeded<T>(
  injectingViewCdRef: ChangeDetectorRef,
  strategy: RxStrategyCredentials,
  notifyNeeded: () => boolean,
  ngZone?: NgZone
): MonoTypeOperatorFunction<T> {
  return (o$) =>
    o$.pipe(
      switchMap((v) => {
        const notifyParent = notifyNeeded();
        if (!notifyParent) {
          return of(v);
        }
        return concat(
          of(v),
          onStrategy(
            injectingViewCdRef,
            strategy,
            (_v, work, options) => {
              /*console.log(
               'notifyAllParentsIfNeeded injectingView',
               (injectingViewCdRef as any).context
               );*/
              work(injectingViewCdRef, options.scope);
            },
            {
              scope: (injectingViewCdRef as any).context || injectingViewCdRef,
              ngZone,
            }
          ).pipe(ignoreElements())
        );
      })
    );
}
