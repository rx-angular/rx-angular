import {
  cancelAnimationFrame,
  Promise,
  requestAnimationFrame,
} from '@rx-angular/cdk/zone-less/browser';
import { getZoneUnPatchedApi } from '@rx-angular/cdk/internals/core';
import { from, Observable } from 'rxjs';

export function unpatchedAnimationFrameTick(): Observable<void> {
  return new Observable<void>((observer) => {
    const tick = requestAnimationFrame(() => {
      observer.next();
      observer.complete();
    });
    return () => {
      cancelAnimationFrame(tick);
    };
  });
}

export function unpatchedMicroTask(): Observable<void> {
  return from(Promise.resolve()) as Observable<void>;
}

export function unpatchedScroll(el: any): Observable<void> {
  return new Observable<void>((observer) => {
    const listener = () => observer.next();
    getZoneUnPatchedApi(el, 'addEventListener').call(el, 'scroll', listener, {
      passive: true,
    });
    return () => {
      getZoneUnPatchedApi(
        this.elementRef.nativeElement,
        'removeEventListener'
      ).call(el, 'scroll', listener, { passive: true });
    };
  });
}

/**
 * @description
 *
 * calculates the correct scrollTop value in which the rx-virtual-scroll-viewport
 * is actually visible
 */
export function parseScrollTopBoundaries(
  scrollTop: number,
  offset: number,
  contentSize: number,
  containerSize: number
): {
  scrollTopWithOutOffset: number;
  scrollTopAfterOffset: number;
  scrollTop: number;
} {
  const scrollTopWithOutOffset = scrollTop - offset;
  const maxSize = Math.max(contentSize - containerSize, containerSize);
  const maxScrollTop = Math.max(contentSize, containerSize);
  const adjustedScrollTop = Math.max(0, scrollTopWithOutOffset);
  const scrollTopAfterOffset = adjustedScrollTop - maxSize;
  return {
    scrollTopWithOutOffset,
    scrollTopAfterOffset,
    scrollTop: Math.min(adjustedScrollTop, maxScrollTop),
  };
}

/**
 * @description
 *
 * Calculates the visible size of the rx-virtual-scroll-viewport container. It
 * accounts for the fact that the viewport can partially or fully be out of viewport because
 * static contents that are living between the boundaries of rx-virtual-scroll-viewport
 * and its scrollable element.
 */
export function calculateVisibleContainerSize(
  containerSize: number,
  scrollTopWithOutOffset: number,
  scrollTopAfterOffset: number
) {
  let clamped = containerSize;
  if (scrollTopWithOutOffset < 0) {
    clamped = Math.max(0, containerSize + scrollTopWithOutOffset);
  } else if (scrollTopAfterOffset > 0) {
    clamped = Math.max(0, containerSize - scrollTopAfterOffset);
  }
  return clamped;
}
