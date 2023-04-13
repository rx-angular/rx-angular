import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
  ErrorHandler,
  NgIterable,
  NgZone,
  Output,
  TemplateRef,
  TrackByFunction,
  ViewContainerRef,
} from '@angular/core';
import { RxStrategies } from '@rx-angular/cdk/render-strategies';
import { RxDefaultListViewContext } from '@rx-angular/cdk/template';
import { Observable, Subject } from 'rxjs';

type CreateViewContext<T, C, U> = (value: T, computedContext: U) => C;

type UpdateViewContext<T, C, U> = (
  value: T,
  view: EmbeddedViewRef<C>,
  computedContext?: U
) => void;

export interface TemplateSettings<T, C, U> {
  viewContainerRef: ViewContainerRef;
  templateRef: TemplateRef<C>;
  createViewContext: CreateViewContext<T, C, U>;
  updateViewContext: UpdateViewContext<T, C, U>;
  viewCacheSize: number;
}

export interface RenderSettings {
  cdRef: ChangeDetectorRef;
  parent: boolean;
  patchZone?: NgZone;
  strategies: RxStrategies<string>;
  defaultStrategyName: string;
  errorHandler?: ErrorHandler;
}

export const enum ListTemplateChangeType {
  insert,
  remove,
  move,
  update,
  context,
}
// [value, index, oldIndex?]
export type ListTemplateChangePayload<T> = [T, number?, number?];
export type ListTemplateChange<T = any> = [
  ListTemplateChangeType,
  ListTemplateChangePayload<T>
];
export type ListTemplateChanges<T = any> = [
  ListTemplateChange<T>[], // changes to apply
  boolean // notify parent
];

export interface ListRange {
  start: number;
  end: number;
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
  U extends NgIterable<T> = NgIterable<T>
> {
  /** Emits when the index of the first element visible in the viewport changes. */
  /** @internal */
  abstract scrolledIndex$: Observable<number>;
  /** @internal */
  abstract renderedRange$: Observable<ListRange>;
  /** @internal */
  abstract contentSize$: Observable<number>;

  /**
   * @description
   *
   * Emits whenever an update to a single view was rendered
   */
  @Output() readonly viewRenderCallback = new Subject<{
    view: EmbeddedViewRef<RxVirtualForViewContext<T, U>>;
    item: T;
    index: number;
  }>();

  /** @internal */
  private nodeIndex?: number;

  /** @internal */
  protected getElement(
    view: EmbeddedViewRef<RxVirtualForViewContext<T, U>>
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
    viewRepeater: RxVirtualViewRepeater<any>
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
  abstract rendered$: Observable<any>;
  abstract viewRange: Observable<ListRange>;
  abstract elementScrolled$: Observable<void>;
  abstract containerRect$: Observable<{ height: number; width: number }>;
  abstract getScrollTop(): number;
  abstract scrollTo(scrollTo: number, behavior?: ScrollBehavior): void;
}

/** @internal */
@Directive()
export abstract class RxVirtualViewRepeater<
  T,
  U extends NgIterable<T> = NgIterable<T>
> {
  abstract values$: Observable<U | null | undefined>;
  abstract rendered$: Observable<any>;
  abstract viewsRendered$: Observable<EmbeddedViewRef<any>[]>;
  abstract viewRendered$: Observable<{
    view: EmbeddedViewRef<RxVirtualForViewContext<T, U>>;
    index: number;
    item: T;
  }>;
  abstract renderingStart$: Observable<void>;
  _trackBy: TrackByFunction<T> = (i, a) => a;
}

/** @internal */
export class RxVirtualForViewContext<
  T,
  U extends NgIterable<T> = NgIterable<T>,
  C extends { count: number; index: number } = { count: number; index: number },
  K = keyof T
> extends RxDefaultListViewContext<T, U, K> {
  constructor(item: T, public rxVirtualForOf: U, customProps?: C) {
    super(item, customProps);
  }
}
