import { createErrorHandler } from '../../../../../../../../libs/cdk/template/src/lib/render-error';
import { ListRange } from './model';
import {
  EmbeddedViewRef,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  TemplateRef,
  TrackByFunction,
} from '@angular/core';
import { RxListViewContext } from '@rx-angular/cdk/template';
import {
  combineLatest,
  merge,
  Observable,
  of,
  OperatorFunction,
  Subject,
  catchError,
  filter,
  ignoreElements,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { strategyHandling } from '@rx-angular/cdk/render-strategies';
import {
  RxRenderSettings,
  RxTemplateSettings,
} from '../../../../../../../../libs/cdk/template/src/lib/model';
import { notifyAllParentsIfNeeded } from '../../../../../../../../libs/cdk/template/src/lib/utils';
import { getVirtualTemplateHandler } from './virtual-list-view-handler';

export interface RxListManager<T> {
  nextStrategy: (config: string | Observable<string>) => void;
}

export type VirtualListManager<T> = RxListManager<T> & {
  render(
    data$: Observable<NgIterable<T>>,
    range$: Observable<ListRange>
  ): Observable<any>;
  viewsRendered$: Observable<EmbeddedViewRef<any>[]>;
  beforeViewsRendered$: Observable<void>;
  detach(): void;
};

export function createVirtualListManager<
  T,
  C extends RxListViewContext<T>
>(config: {
  renderSettings: RxRenderSettings;
  templateSettings: RxTemplateSettings<T, C> & {
    templateRef: TemplateRef<C>;
    viewCacheSize: number;
  };
  //
  trackBy: TrackByFunction<T>;
  iterableDiffers: IterableDiffers;
}): VirtualListManager<T> {
  const { templateSettings, renderSettings, trackBy, iterableDiffers } = config;
  const {
    defaultStrategyName,
    strategies,
    cdRef: injectingViewCdRef,
    parent,
    patchZone,
  } = renderSettings;

  const strategyHandling$ = strategyHandling(defaultStrategyName, strategies);
  const listViewHandler = getVirtualTemplateHandler({
    ...templateSettings,
    initialTemplateRef: templateSettings.templateRef,
    patchZone: false,
  });
  const viewContainerRef = templateSettings.viewContainerRef;
  const errorHandler = createErrorHandler(renderSettings.errorHandler);
  const ngZone = patchZone ? patchZone : undefined;

  let notifyParent = false;
  let partiallyFinished = false;
  let renderedRange: ListRange;
  const _viewsRendered$ = new Subject<EmbeddedViewRef<C>[]>();
  const _beforeViewsRendered$ = new Subject<void>();

  let _differ: IterableDiffer<T> | undefined;
  function getDiffer(values: NgIterable<T>): IterableDiffer<T> | null {
    if (_differ) {
      return _differ;
    }
    return values
      ? (_differ = iterableDiffers.find(values).create(trackBy))
      : null;
  }

  return {
    viewsRendered$: _viewsRendered$,
    beforeViewsRendered$: _beforeViewsRendered$,
    nextStrategy(nextConfig: Observable<string>): void {
      strategyHandling$.next(nextConfig);
    },
    render(
      values$: Observable<NgIterable<T>>,
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
      ]).pipe(render());
    },
    detach(): void {
      listViewHandler.detach();
    },
  };

  function handleError() {
    return (o$) =>
      o$.pipe(
        catchError((err: Error) => {
          partiallyFinished = false;
          errorHandler.handleError(err);
          return of(null);
        })
      );
  }

  function render(): OperatorFunction<[T[], ListRange], any> {
    let count = 0;
    return (o$: Observable<[T[], ListRange]>): Observable<any> =>
      combineLatest([o$, strategyHandling$.strategy$]).pipe(
        // map iterable to latest diff
        map(([[iterable, range], strategy]) => {
          const differ = getDiffer(iterable);
          let changes: IterableChanges<T>;
          let items: T[];
          renderedRange = range;
          if (differ) {
            if (partiallyFinished) {
              const currentIterable = [];
              for (let i = 0, ilen = viewContainerRef.length; i < ilen; i++) {
                const viewRef = <EmbeddedViewRef<C>>viewContainerRef.get(i);
                currentIterable[i] = viewRef.context.$implicit;
              }
              differ.diff(currentIterable);
              partiallyFinished = false;
            }
            items = iterable.slice(range.start, range.end);
            changes = differ.diff(items);
          }
          return {
            strategy,
            changes,
            items,
            data: iterable,
          };
        }),
        // Cancel old renders
        switchMap(({ strategy, changes, items, data }) => {
          if (!changes) {
            return of([]);
          }
          const { work$, insertedOrRemoved } = listViewHandler.toTemplateWork(
            changes,
            items,
            renderedRange,
            strategy,
            count
          );
          partiallyFinished = true;
          // @TODO we need to know if we need to notifyParent on move aswell
          notifyParent = insertedOrRemoved && parent;
          count = data.length;
          _beforeViewsRendered$.next();
          // console.log('changes', changesArr, notifyParent);
          return combineLatest(
            // emit after all changes are rendered
            work$.length > 0 ? work$ : [of(null)]
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
            // somehow this makes the strategySelect work
            notifyAllParentsIfNeeded(
              injectingViewCdRef,
              strategy,
              () => notifyParent,
              ngZone
            ),
            handleError(),
            map(() => items)
          );
        }),
        handleError()
      );
  }
}
