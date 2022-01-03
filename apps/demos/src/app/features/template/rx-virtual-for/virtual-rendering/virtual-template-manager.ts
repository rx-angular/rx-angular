import { ListRange } from './model';
import {
  EmbeddedViewRef,
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
} from 'rxjs';
import {
  filter,
  ignoreElements,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { strategyHandling } from '@rx-angular/cdk/render-strategies';
import {
  RxRenderSettings,
  RxTemplateSettings,
} from '../../../../../../../../libs/cdk/template/src/lib/model';
import {
  getTNode,
  notifyAllParentsIfNeeded,
  notifyInjectingParentIfNeeded,
  TNode,
} from '../../../../../../../../libs/cdk/template/src/lib/utils';
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
  detach(): void;
};

export function createVirtualListManager<
  T,
  C extends RxListViewContext<T>
>(config: {
  renderSettings: RxRenderSettings<T, C>;
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
    eRef,
  } = renderSettings;

  const strategyHandling$ = strategyHandling(defaultStrategyName, strategies);
  const differ: IterableDiffer<T> = iterableDiffers.find([]).create(trackBy);
  //               type,  payload
  const tNode: TNode = parent
    ? getTNode(injectingViewCdRef, eRef.nativeElement)
    : false;
  const listViewHandler = getVirtualTemplateHandler({
    ...templateSettings,
    initialTemplateRef: templateSettings.templateRef,
    patchZone: false,
  });
  const viewContainerRef = templateSettings.viewContainerRef;

  let notifyParent = false;
  let partiallyFinished = false;
  let renderedRange: ListRange;
  const _viewsRendered$ = new Subject<EmbeddedViewRef<C>[]>();

  return {
    viewsRendered$: _viewsRendered$,
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

  function render(): OperatorFunction<[T[], ListRange], any> {
    let count = 0;
    return (o$: Observable<[T[], ListRange]>): Observable<any> =>
      o$.pipe(
        // map iterable to latest diff
        map(([items, range]) => {
          renderedRange = range;
          console.log('renderedRange', range);
          const iterable = items.slice(range.start, range.end + 1);
          if (partiallyFinished) {
            const currentIterable = [];
            for (let i = 0, ilen = viewContainerRef.length; i < ilen; i++) {
              const viewRef = <EmbeddedViewRef<C>>viewContainerRef.get(i);
              currentIterable[i] = viewRef.context.$implicit;
            }
            differ.diff(currentIterable);
          }
          return {
            changes: differ.diff(iterable),
            items: iterable,
            data: items,
          };
        }),
        filter(({ changes }) => !!changes),
        withLatestFrom(strategyHandling$.strategy$),
        // Cancel old renders
        switchMap(([{ changes, items, data }, strategy]) => {
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
          // console.log('changes', changesArr, notifyParent);
          return merge(
            combineLatest(
              // emit after all changes are rendered
              work$.length > 0 ? [...work$] : [of(items)]
            ).pipe(
              tap(() => {
                partiallyFinished = false;
                const viewsRendered = [];
                let end = viewContainerRef.length;
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
                tNode,
                injectingViewCdRef,
                strategy,
                () => notifyParent
              )
            ),
            // emit injectingParent if needed
            notifyInjectingParentIfNeeded(
              injectingViewCdRef,
              strategy,
              insertedOrRemoved
            ).pipe(ignoreElements())
          );
        })
      );
  }
}
