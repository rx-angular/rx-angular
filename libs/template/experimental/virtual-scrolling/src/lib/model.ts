import {
  Directive,
  ElementRef,
  EmbeddedViewRef,
  NgIterable,
  TemplateRef,
  TrackByFunction,
  ViewContainerRef,
} from '@angular/core';
import { RxDefaultListViewContext } from '@rx-angular/cdk/template';
import { Observable, of, Subject } from 'rxjs';

type CreateViewContext<Implicit, Context, ComputedContext> = (
  value: Implicit,
  computedContext: ComputedContext,
) => Context;

type UpdateViewContext<Implicit, Context, ComputedContext> = (
  value: Implicit,
  view: EmbeddedViewRef<Context>,
  computedContext?: ComputedContext,
) => void;

export interface TemplateSettings<Implicit, Context, ComputedContext> {
  viewContainerRef: ViewContainerRef;
  templateRef: TemplateRef<Context>;
  createViewContext: CreateViewContext<Implicit, Context, ComputedContext>;
  updateViewContext: UpdateViewContext<Implicit, Context, ComputedContext>;
  templateCacheSize: number;
}

export interface ListRange {
  start: number;
  end: number;
}

export abstract class DataSource<T> {
  abstract connect(
    collectionViewer: CollectionViewer,
  ): Observable<NgIterable<T>>;
  abstract disconnect(collectionViewer: CollectionViewer): void;
}

export interface CollectionViewer {
  viewChange: Observable<ListRange>;
}

/**
 * @Directive RxVirtualScrollStrategy
 *
 * @description
 * Abstract implementation for the actual implementations of the ScrollStrategies
 * being consumed by `*rxVirtualFor` and `rx-virtual-scroll-viewport`.
 *
 * This is one of the core parts for the virtual scrolling implementation. It has
 * to determine the `ListRange` being rendered to the DOM as well as managing
 * the layouting task for the `*rxVirtualFor` directive.
 *
 * @docsCategory RxVirtualFor
 * @docsPage RxVirtualFor
 * @publicApi
 */
@Directive()
export abstract class RxVirtualScrollStrategy<
  T,
  U extends NgIterable<T> = NgIterable<T>,
> {
  /** Emits when the index of the first element visible in the viewport changes. */
  /** @internal */
  abstract scrolledIndex$: Observable<number>;
  /** @internal */
  abstract renderedRange$: Observable<ListRange>;
  /** @internal */
  abstract contentSize$: Observable<number>;
  /** @internal */
  get isStable() {
    return of(true);
  }

  /**
   * @description
   *
   * Emits whenever an update to a single view was rendered
   */
  readonly viewRenderCallback = new Subject<{
    view: EmbeddedViewRef<RxVirtualForViewContext<T, U>>;
    item: T;
    index: number;
  }>();

  /** @internal */
  private nodeIndex?: number;

  /** @internal */
  protected getElement(
    view: EmbeddedViewRef<RxVirtualForViewContext<T, U>>,
  ): HTMLElement {
    if (this.nodeIndex !== undefined) {
      return view.rootNodes[this.nodeIndex];
    }
    const rootNode = view.rootNodes[0];
    this.nodeIndex = rootNode instanceof HTMLElement ? 0 : 1;
    return view.rootNodes[this.nodeIndex] as HTMLElement;
  }

  /**
   * Attaches this scroll strategy to a viewport.
   * @param viewport The viewport to attach this strategy to.
   * @param viewRepeater The viewRepeater attached to the viewport.
   */
  abstract attach(
    viewport: RxVirtualScrollViewport,
    viewRepeater: RxVirtualViewRepeater<any>,
  ): void;

  /** Detaches this scroll strategy from the currently attached viewport. */
  abstract detach(): void;

  /**
   * Scroll to the offset for the given index.
   * @param index The index of the element to scroll to.
   * @param behavior The ScrollBehavior to use when scrolling.
   */
  abstract scrollToIndex(index: number, behavior?: ScrollBehavior): void;
}

/** @internal */
@Directive()
export abstract class RxVirtualScrollViewport {
  abstract elementScrolled$: Observable<void>;
  abstract containerRect$: Observable<{ height: number; width: number }>;
  abstract getScrollTop(): number;
  abstract scrollTo(scrollTo: number, behavior?: ScrollBehavior): void;
  abstract getScrollElement(): HTMLElement;
  abstract measureOffset(): number;
}

/** @internal */
@Directive()
export abstract class RxVirtualViewRepeater<
  T,
  U extends NgIterable<T> = NgIterable<T>,
> {
  abstract values$: Observable<U | null | undefined>;
  abstract viewsRendered$: Observable<
    EmbeddedViewRef<RxVirtualForViewContext<T, U>>[]
  >;
  abstract viewRendered$: Observable<{
    view: EmbeddedViewRef<RxVirtualForViewContext<T, U>>;
    index: number;
    item: T;
  }>;
  abstract viewContainer: ViewContainerRef;
  abstract renderingStart$: Observable<Set<number>>;
  _trackBy: TrackByFunction<T> | null;
}

/** @internal */
export class RxVirtualForViewContext<
  T,
  U extends NgIterable<T> = NgIterable<T>,
  C extends { count: number; index: number } = { count: number; index: number },
  K = keyof T,
> extends RxDefaultListViewContext<T, U, K> {
  constructor(
    item: T,
    public rxVirtualForOf: U,
    customProps?: C,
  ) {
    super(item, customProps);
  }
}

@Directive()
export abstract class RxVirtualScrollElement {
  abstract elementScrolled$: Observable<void>;
  abstract getElementRef(): ElementRef<HTMLElement>;
  abstract measureOffset(): number;
}
