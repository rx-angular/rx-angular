import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { RxVirtualScrollViewportComponent } from '../virtual-scroll-viewport.component';

@Injectable()
export abstract class VirtualScrollStrategy {
  /** Emits when the index of the first element visible in the viewport changes. */
  scrolledIndexChange: Observable<number>;

  /**
   * Attaches this scroll strategy to a viewport.
   * @param viewport The viewport to attach this strategy to.
   */
  abstract attach(viewport: RxVirtualScrollViewportComponent): void;

  /** Detaches this scroll strategy from the currently attached viewport. */
  abstract detach(): void;

  /** Called when the viewport is scrolled (debounced using requestAnimationFrame). */
  abstract onContentScrolled(): void;

  /**
   * Scroll to the offset for the given index.
   * @param index The index of the element to scroll to.
   * @param behavior The ScrollBehavior to use when scrolling.
   */
  abstract scrollToIndex(index: number, behavior: ScrollBehavior): void;
}
