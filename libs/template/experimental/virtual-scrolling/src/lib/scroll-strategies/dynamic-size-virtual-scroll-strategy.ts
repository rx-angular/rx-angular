import {
  Directive,
  inject,
  Input,
  IterableDiffer,
  IterableDiffers,
  NgIterable,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import {
  combineLatest,
  MonoTypeOperatorFunction,
  ReplaySubject,
  Subject,
} from 'rxjs';
import {
  debounce,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

import {
  ListRange,
  RxVirtualScrollStrategy,
  RxVirtualScrollViewport,
  RxVirtualViewRepeater,
} from '../model';
import { unpatchedAnimationFrameTick } from '../util';
import {
  DEFAULT_ITEM_SIZE,
  DEFAULT_RUNWAY_ITEMS,
  DEFAULT_RUNWAY_ITEMS_OPPOSITE,
  RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS,
} from '../virtual-scroll.config';

/** @internal */
type VirtualViewItem = {
  size: number;
};

/** @internal */
type AnchorItem = {
  index: number;
  offset: number;
};

/** @internal */
function removeFromArray(arr: any[], index: number): any {
  // perf: array.pop is faster than array.splice!
  if (index >= arr.length - 1) {
    return arr.pop();
  } else {
    return arr.splice(index, 1)[0];
  }
}

const defaultItemSize = () => DEFAULT_ITEM_SIZE;

/**
 * @Directive DynamicSizeVirtualScrollStrategy
 *
 * @description
 *
 * The `DynamicSizeVirtualScrollStrategy` is very similar to the `AutosizeVirtualScrollStrategy`.
 * It positions items based on a function determining its size.
 *
 * @docsCategory RxVirtualFor
 * @docsPage RxVirtualFor
 * @publicApi
 */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'rx-virtual-scroll-viewport[dynamic]',
  providers: [
    {
      provide: RxVirtualScrollStrategy,
      useExisting: DynamicSizeVirtualScrollStrategy,
    },
  ],
  standalone: true,
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class DynamicSizeVirtualScrollStrategy<
    T,
    U extends NgIterable<T> = NgIterable<T>
  >
  extends RxVirtualScrollStrategy<T, U>
  implements OnChanges, OnDestroy
{
  private readonly differs = inject(IterableDiffers);
  private readonly defaults? = inject(RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS, {
    optional: true,
  });

  /**
   * @description
   * The amount of items to render upfront in scroll direction
   */
  @Input() runwayItems = this.defaults?.runwayItems ?? DEFAULT_RUNWAY_ITEMS;

  /**
   * @description
   * The amount of items to render upfront in reverse scroll direction
   */
  @Input() runwayItemsOpposite =
    this.defaults?.runwayItemsOpposite ?? DEFAULT_RUNWAY_ITEMS_OPPOSITE;

  /**
   * @description
   * Function returning the size of an item
   */
  @Input('dynamic')
  set itemSize(fn: (item: T) => number) {
    if (fn) {
      this._itemSizeFn = fn;
    }
  }
  get itemSize() {
    return this._itemSizeFn;
  }
  private _itemSizeFn: (item: T) => number = defaultItemSize;

  /** @internal */
  private viewport: RxVirtualScrollViewport | null = null;
  /** @internal */
  private viewRepeater: RxVirtualViewRepeater<T, U> | null = null;
  /** @internal */
  private dataDiffer: IterableDiffer<T> | null = null;

  /** @internal */
  private readonly _contentSize$ = new ReplaySubject<number>(1);
  /** @internal */
  readonly contentSize$ = this._contentSize$.asObservable();

  /** @internal */
  private _contentSize = 0;
  /** @internal */
  private set contentSize(size: number) {
    this._contentSize = size;
    this._contentSize$.next(size);
  }

  /** @internal */
  private readonly _renderedRange$ = new ReplaySubject<ListRange>(1);
  /** @internal */
  readonly renderedRange$ = this._renderedRange$.asObservable();
  /** @internal */
  private _renderedRange: ListRange = { start: 0, end: 0 };
  // range of items where size is known and doesn't need to be re-calculated

  /** @internal */
  private set renderedRange(range: ListRange) {
    this._renderedRange = range;
    this._renderedRange$.next(range);
  }
  /** @internal */
  private get renderedRange(): ListRange {
    return this._renderedRange;
  }
  /** @internal */
  private readonly _scrolledIndex$ = new ReplaySubject<number>(1);
  /** @internal */
  readonly scrolledIndex$ = this._scrolledIndex$.pipe(distinctUntilChanged());
  /** @internal */
  private set scrolledIndex(index: number) {
    this._scrolledIndex$.next(index);
  }
  /** @internal */
  private contentLength = 0;
  /** @internal */
  private _virtualItems: VirtualViewItem[] = [];
  /** @internal */
  private scrollTop = 0;
  /** @internal */
  private direction: 'up' | 'down' = 'down';
  /** @internal */
  private anchorScrollTop = 0;
  /** @internal */
  private anchorItem = {
    index: 0,
    offset: 0,
  };
  /** @internal */
  private lastScreenItem = {
    index: 0,
    offset: 0,
  };

  /** @internal */
  private readonly detached$ = new Subject<void>();
  /** @internal */
  private readonly runwayStateChanged$ = new Subject<void>();
  /** @internal */
  private until$<A>(): MonoTypeOperatorFunction<A> {
    return (o$) => o$.pipe(takeUntil(this.detached$));
  }

  /** @internal */
  ngOnChanges(changes: SimpleChanges) {
    if (
      (changes['runwayItemsOpposite'] &&
        !changes['runwayItemsOpposite'].firstChange) ||
      (changes['runwayItems'] && !changes['runwayItems'].firstChange)
    ) {
      this.runwayStateChanged$.next();
    }
  }

  /** @internal */
  ngOnDestroy() {
    this.detach();
  }

  /** @internal */
  attach(
    viewport: RxVirtualScrollViewport,
    viewRepeater: RxVirtualViewRepeater<T, U>
  ): void {
    this.viewport = viewport;
    this.viewRepeater = viewRepeater;
    this.maintainVirtualItems();
    this.calcRenderedRange();
    this.positionElements();
  }

  /** @internal */
  detach(): void {
    this.viewport = null;
    this.viewRepeater = null;
    this._virtualItems = [];
    this.detached$.next();
  }

  scrollToIndex(index: number, behavior?: ScrollBehavior): void {
    const _index = Math.min(Math.max(index, 0), this.contentLength - 1);
    let offset = 0;
    for (let i = 0; i < _index; i++) {
      offset += this._virtualItems[i].size;
    }
    this.viewport!.scrollTo(offset, behavior);
  }

  /** @internal */
  private maintainVirtualItems(): void {
    this.viewRepeater!.values$.pipe(this.until$()).subscribe((items) => {
      const changes = this.getDiffer(items)?.diff(items);
      if (changes) {
        changes.forEachOperation(
          (change, adjustedPreviousIndex, currentIndex) => {
            if (change.previousIndex == null) {
              const entry = {
                size: this.itemSize(change.item),
              };
              if (
                currentIndex !== null &&
                currentIndex < this._virtualItems.length
              ) {
                this._virtualItems.splice(currentIndex, 0, entry);
              } else {
                this._virtualItems.push(entry);
              }
            } else if (currentIndex == null) {
              const removeIdx =
                adjustedPreviousIndex == null
                  ? this._virtualItems.length - 1
                  : adjustedPreviousIndex;
              removeFromArray(this._virtualItems, removeIdx);
            } else if (adjustedPreviousIndex !== null) {
              this._virtualItems[currentIndex] =
                this._virtualItems[adjustedPreviousIndex];
            }
          }
        );
        changes.forEachIdentityChange((record) => {
          this._virtualItems[record.currentIndex as number] = {
            size: this.itemSize(record.item),
          };
        });
        let contentSize = 0;
        for (let i = 0; i < this._virtualItems.length; i++) {
          contentSize += this._virtualItems[i].size;
        }
        this.contentSize = contentSize;
      }
    });
  }

  /** @internal */
  private calcRenderedRange(): void {
    const dataLengthChanged$ = this.viewRepeater!.values$.pipe(
      map(
        (values) =>
          (Array.isArray(values)
            ? values
            : values != null
            ? Array.from(values)
            : []
          ).length
      ),
      distinctUntilChanged()
    );
    const onScroll$ = this.viewport!.elementScrolled$.pipe(
      debounce(() => unpatchedAnimationFrameTick()),
      map(() => this.viewport!.getScrollTop()),
      startWith(0),
      tap((_scrollTop) => {
        this.direction = _scrollTop > this.scrollTop ? 'down' : 'up';
        this.scrollTop = _scrollTop;
      })
    );
    combineLatest([
      dataLengthChanged$.pipe(
        tap((length) => {
          this.contentLength = length;
        })
      ),
      this.viewport!.containerRect$.pipe(
        map(({ height }) => height),
        distinctUntilChanged()
      ),
      onScroll$,
      this.runwayStateChanged$.pipe(startWith(void 0)),
    ])
      .pipe(
        map(([length, containerHeight]) => {
          const range = { start: 0, end: 0 };

          const delta = this.scrollTop - this.anchorScrollTop;
          if (this.scrollTop == 0) {
            this.anchorItem = { index: 0, offset: 0 };
          } else {
            this.anchorItem = this.calculateAnchoredItem(
              this.anchorItem,
              delta
            );
          }
          this.scrolledIndex = this.anchorItem.index;
          this.anchorScrollTop = this.scrollTop;
          this.lastScreenItem = this.calculateAnchoredItem(
            this.anchorItem,
            containerHeight
          );
          if (this.direction === 'up') {
            range.start = Math.max(0, this.anchorItem.index - this.runwayItems);
            range.end = Math.min(
              length,
              this.lastScreenItem.index + this.runwayItemsOpposite
            );
          } else {
            range.start = Math.max(
              0,
              this.anchorItem.index - this.runwayItemsOpposite
            );
            range.end = Math.min(
              length,
              this.lastScreenItem.index + this.runwayItems
            );
          }
          return range;
        })
      )
      .pipe(
        distinctUntilChanged(
          ({ start: prevStart, end: prevEnd }, { start, end }) =>
            prevStart === start && prevEnd === end
        ),
        this.until$()
      )
      .subscribe((range: ListRange) => (this.renderedRange = range));
  }

  /** @internal */
  private positionElements(): void {
    this.viewRepeater!.renderingStart$.pipe(
      switchMap(() => {
        const renderedRange = this.renderedRange;
        const adjustIndexWith = renderedRange.start;
        let scrolledIndex: number | null = null;
        let position = 0;
        return this.viewRepeater!.viewRendered$.pipe(
          map(({ view, index: viewIndex, item }, idx) => {
            const index = viewIndex + adjustIndexWith;
            if (idx === 0) {
              position = this.calcInitialPosition(renderedRange);
            }
            const size = this.getItemSize(index);
            this.positionElement(this.getElement(view), position);
            position += size;
            if (scrolledIndex == null && position > this.scrollTop) {
              scrolledIndex = index;
            }
            if (scrolledIndex != null) {
              this.scrolledIndex = scrolledIndex;
            }
            this.viewRenderCallback.next({
              index,
              view,
              item,
            });
          })
        );
      }),
      this.until$()
    ).subscribe();
  }

  /**
   * @internal
   * heavily inspired by
   *   https://github.com/GoogleChromeLabs/ui-element-samples/blob/gh-pages/infinite-scroller/scripts/infinite-scroll.js
   */
  private calculateAnchoredItem(
    initialAnchor: AnchorItem,
    delta: number
  ): AnchorItem {
    if (delta == 0) return initialAnchor;
    delta += initialAnchor.offset;
    let i = initialAnchor.index;
    const items = this._virtualItems;
    if (delta < 0) {
      while (delta < 0 && i > 0) {
        delta += items[i - 1].size;
        i--;
      }
    } else {
      while (delta > 0 && i < this.contentLength && items[i].size < delta) {
        delta -= items[i].size;
        i++;
      }
    }
    return {
      index: Math.min(i, this.contentLength),
      offset: delta,
    };
  }

  /** @internal */
  private calcInitialPosition(range: ListRange): number {
    let pos = 0;
    let i = 0;
    this.anchorScrollTop = 0;
    for (i = 0; i < this.anchorItem.index; i++) {
      this.anchorScrollTop += this.getItemSize(i);
    }
    this.anchorScrollTop += this.anchorItem.offset;

    // Calculate position of starting node
    pos = this.anchorScrollTop - this.anchorItem.offset;
    i = this.anchorItem.index;
    while (i > range.start) {
      const itemSize = this.getItemSize(i - 1);
      pos -= itemSize;
      i--;
    }
    while (i < range.start) {
      const itemSize = this.getItemSize(i);
      pos += itemSize;
      i++;
    }
    return pos;
  }
  /** @internal */
  private getItemSize(index: number): number {
    return this._virtualItems[index].size;
  }

  /** @internal */
  private positionElement(element: HTMLElement, scrollTop: number): void {
    element.style.position = 'absolute';
    element.style.transform = `translateY(${scrollTop}px)`;
  }

  /** @internal */
  private getDiffer(values: U | null | undefined): IterableDiffer<T> | null {
    if (this.dataDiffer) {
      return this.dataDiffer;
    }
    return values
      ? (this.dataDiffer = this.differs
          .find(values)
          .create(this.viewRepeater!._trackBy))
      : null;
  }
}
