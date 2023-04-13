import {
  EmbeddedViewRef,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  TrackByFunction,
} from '@angular/core';
import {
  onStrategy,
  RxStrategyCredentials,
  strategyHandling,
} from '@rx-angular/cdk/render-strategies';
import { RxListViewContext } from '@rx-angular/cdk/template';
import {
  combineLatest,
  concat,
  MonoTypeOperatorFunction,
  NEVER,
  Observable,
  of,
  OperatorFunction,
  Subject,
} from 'rxjs';
import { distinctUntilChanged, ignoreElements } from 'rxjs/operators';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';

import {
  ListRange,
  ListTemplateChangeType,
  RenderSettings,
  TemplateSettings,
} from './model';
import { getVirtualTemplateHandler } from './virtual-list-view-handler';

export type VirtualListManager<T, C> = {
  render(
    data$: Observable<NgIterable<T> | null | undefined>,
    range$: Observable<ListRange>
  ): Observable<any>;
  nextStrategy: (config: string | Observable<string>) => void;
  viewsRendered$: Observable<EmbeddedViewRef<C>[]>;
  viewRendered$: Observable<{
    index: number;
    view: EmbeddedViewRef<C>;
    item: T;
  }>;
  renderingStart$: Observable<void>;
  detach(): void;
};

export function createVirtualListManager<
  T,
  C extends RxListViewContext<T>,
  U
>(config: {
  renderSettings: RenderSettings;
  templateSettings: TemplateSettings<T, C, U>;
  //
  trackBy: TrackByFunction<T>;
  iterableDiffers: IterableDiffers;
}): VirtualListManager<T, C> {
  const { templateSettings, renderSettings, trackBy, iterableDiffers } = config;
  const {
    defaultStrategyName,
    strategies,
    cdRef: injectingViewCdRef,
    parent,
    patchZone,
  } = renderSettings;
  const errorHandler = renderSettings.errorHandler;
  const strategyHandling$ = strategyHandling(defaultStrategyName, strategies);
  let _differ: IterableDiffer<T> | undefined;
  function getDiffer(values: NgIterable<T>): IterableDiffer<T> | null {
    if (_differ) {
      return _differ;
    }
    return values
      ? (_differ = iterableDiffers.find(values).create(trackBy))
      : null;
  }
  //               type,  payload
  const listViewHandler = getVirtualTemplateHandler({
    ...templateSettings,
  });
  const viewContainerRef = templateSettings.viewContainerRef;

  let partiallyFinished = false;
  let renderedRange: ListRange;
  const _viewsRendered$ = new Subject<EmbeddedViewRef<C>[]>();
  const _viewRendered$ = new Subject<{
    index: number;
    view: EmbeddedViewRef<C>;
    item: T;
  }>();
  const _renderingStart$ = new Subject<void>();
  const viewRenderedSub = listViewHandler.viewRendered$
    .pipe(
      filter(
        ({ view, change }) => !!view && change !== ListTemplateChangeType.remove
      ),
      map(
        ({ view, item, index }) =>
          ({
            view,
            item,
            index,
          } as {
            index: number;
            view: EmbeddedViewRef<C>;
            item: T;
          })
      )
    )
    .subscribe(_viewRendered$);

  function handleError<T>(): MonoTypeOperatorFunction<T | null> {
    return (o$) =>
      o$.pipe(
        catchError((err: Error) => {
          partiallyFinished = false;
          errorHandler?.handleError(err);
          return of(null);
        })
      );
  }

  return {
    viewsRendered$: _viewsRendered$,
    viewRendered$: _viewRendered$,
    renderingStart$: _renderingStart$,
    nextStrategy(nextConfig: Observable<string> | string): void {
      strategyHandling$.next(nextConfig);
    },
    render(
      values$: Observable<NgIterable<T> | null | undefined>,
      range$: Observable<ListRange>
    ): Observable<any> {
      return combineLatest([
        values$.pipe(
          map((values) =>
            Array.isArray(values)
              ? values
              : values != null
              ? Array.from(values)
              : []
          )
        ),
        range$,
        strategyHandling$.strategy$.pipe(distinctUntilChanged()),
      ]).pipe(render(), handleError());
    },
    detach(): void {
      viewRenderedSub.unsubscribe();
      listViewHandler.detach();
    },
  };

  function render(): OperatorFunction<
    [T[], ListRange, RxStrategyCredentials],
    any
  > {
    return (
      o$: Observable<[T[], ListRange, RxStrategyCredentials]>
    ): Observable<any> =>
      o$.pipe(
        // map iterable to latest diff
        map(([items, range, strategy]) => {
          renderedRange = range;
          const iterable = items.slice(range.start, range.end);
          const differ = getDiffer(iterable);
          let changes: IterableChanges<T> | null = null;
          if (differ) {
            if (partiallyFinished) {
              const currentIterable = [];
              for (let i = 0, ilen = viewContainerRef.length; i < ilen; i++) {
                const viewRef = <EmbeddedViewRef<C>>viewContainerRef.get(i);
                currentIterable[i] = viewRef.context.$implicit;
              }
              differ.diff(currentIterable);
              // partiallyFinished = false;
            }
            changes = differ.diff(iterable);
          }
          return {
            changes,
            itemsToRender: iterable,
            count: items.length,
            strategy,
          };
        }),
        // Cancel old renders
        switchMap(({ changes, count, itemsToRender, strategy }) => {
          if (!changes) {
            return NEVER;
          }
          const { work$, insertedOrRemoved } = listViewHandler.toTemplateWork(
            changes,
            itemsToRender,
            renderedRange,
            strategy,
            count,
            patchZone
          );
          partiallyFinished = true;
          const notifyParent = insertedOrRemoved && parent;
          _renderingStart$.next();
          return combineLatest(
            // emit after all changes are rendered
            work$.length > 0 ? work$ : [of(itemsToRender)]
          ).pipe(
            tap(() => {
              partiallyFinished = false;
              const viewsRendered = [];
              const end = viewContainerRef.length;
              let i = 0;
              for (i; i < end; i++) {
                viewsRendered.push(
                  viewContainerRef.get(i) as EmbeddedViewRef<C>
                );
              }
              _viewsRendered$.next(viewsRendered);
            }),
            notifyParent
              ? switchMap((v) =>
                  concat(
                    of(v),
                    onStrategy(
                      injectingViewCdRef,
                      strategy,
                      (_v, work, options) => {
                        work(injectingViewCdRef, options.scope);
                      },
                      {
                        ngZone: patchZone,
                        scope:
                          (injectingViewCdRef as any).context ||
                          injectingViewCdRef,
                      }
                    ).pipe(ignoreElements())
                  )
                )
              : (o$) => o$,
            handleError(),
            map(() => itemsToRender)
          );
        })
      );
  }
}
