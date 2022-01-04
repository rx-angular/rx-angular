import {
  Directive,
  EmbeddedViewRef,
  Injectable,
  NgIterable,
  TrackByFunction,
} from '@angular/core';
import { Observable } from 'rxjs';

export interface ListRange {
  start: number;
  end: number;
}

@Injectable()
export abstract class RxVirtualScrollStrategy {
  /** Emits when the index of the first element visible in the viewport changes. */
  scrolledIndex$: Observable<number>;
  renderedRange$: Observable<ListRange>;
  contentSize$: Observable<number>;

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

@Injectable()
export abstract class RxVirtualScrollViewport {
  elementScrolled$: Observable<void>;
  containerSize$: Observable<number>;
  abstract getScrollTop(): number;
  abstract scrollTo(scrollTo: number, behavior?: ScrollBehavior): void;
}

@Directive()
export abstract class RxVirtualViewRepeater<
  T,
  U extends NgIterable<T> = NgIterable<T>
> {
  _trackBy: TrackByFunction<T> = (i, a) => a;
  values$: Observable<U>;
  contentRendered$: Observable<EmbeddedViewRef<any>[]>;
}
