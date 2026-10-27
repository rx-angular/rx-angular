import { getZoneUnPatchedApi } from '@rx-angular/cdk/internals/core';
import {
  cancelAnimationFrame,
  Promise,
  requestAnimationFrame,
} from '@rx-angular/cdk/zone-less/browser';
import { from, Observable } from 'rxjs';
import { ListRange } from './model';

export function toBoolean(input: null | boolean | string | undefined): boolean {
  return input != null && `${input}` !== 'false';
}

/**
 * @description
 *
 * Whether a `ResizeObserver` measurement of `width` x `height` belongs to an
 * element that is not rendered at all, e.g. because an ancestor is
 * `display: none` (Ionic's page stack, cached router outlets). Such a collapsed
 * box is not a measurement and must not overwrite cached sizes.
 *
 * Only a box collapsed on both axes is ambiguous: an absolutely positioned,
 * empty item legitimately measures `0x0` as well. Just in that case the DOM is
 * asked whether the element has a layout box. Every regular measurement is
 * decided without touching the DOM, so this never forces a style recalc or
 * layout in the middle of a `ResizeObserver` batch that is writing positions.
 *
 * @internal
 */
export function isNotRendered(
  element: Element,
  width: number,
  height: number,
): boolean {
  return width === 0 && height === 0 && element.getClientRects().length === 0;
}

/**
 * @description
 *
 * compares two `ListRange`s, useful as comparator for `distinctUntilChanged`
 */
export function rangesEqual(a: ListRange, b: ListRange): boolean {
  return a.start === b.start && a.end === b.end;
}

/**
 * @description
 *
 * Locates the item at `index` of a previous dataset in the next one, both
 * given as their trackBy ids. Lookups by id net out inserts, removals and
 * moves in one go. If the item got removed, the nearest following survivor
 * takes its place.
 *
 * Returns `[previousIndex, nextIndex]` of the item that was found, or
 * `undefined` when nothing from `index` on survived.
 */
export function relocateItem(
  previousIds: unknown[],
  nextIds: unknown[],
  index: number,
): [number, number] | undefined {
  if (index < 0 || index >= previousIds.length) {
    return undefined;
  }
  const nextIndex = nextIds.indexOf(previousIds[index]);
  if (nextIndex > -1) {
    return [index, nextIndex];
  }
  const nextIndices = new Map<unknown, number>();
  for (let i = 0; i < nextIds.length; i++) {
    nextIndices.set(nextIds[i], i);
  }
  for (let i = index + 1; i < previousIds.length; i++) {
    const next = nextIndices.get(previousIds[i]);
    if (next !== undefined) {
      return [i, next];
    }
  }
  return undefined;
}

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

/**
 * @description
 *
 * Emits once, right after the browser computed the layout of a frame and
 * before it paints it. It is the moment where layout information is clean, so
 * reading it or writing the scroll position does not force a synchronous
 * layout. It relies on `ResizeObserver` delivering an initial observation for
 * every observed element at that point of the rendering steps.
 * The observation starts in an animation frame, so it is never registered
 * while a `ResizeObserver` loop is running, which would leave it undelivered.
 */
export function afterNextLayout(element: Element): Observable<void> {
  return new Observable<void>((observer) => {
    let resizeObserver: ResizeObserver | undefined;
    const tick = requestAnimationFrame(() => {
      resizeObserver = new ResizeObserver(() => {
        resizeObserver!.disconnect();
        observer.next();
        observer.complete();
      });
      resizeObserver.observe(element);
    });
    return () => {
      cancelAnimationFrame(tick);
      resizeObserver?.disconnect();
    };
  });
}

export function unpatchedMicroTask(): Observable<void> {
  return from(Promise.resolve()) as Observable<void>;
}

export function unpatchedScroll(el: EventTarget): Observable<void> {
  return new Observable<void>((observer) => {
    const listener = () => observer.next();
    getZoneUnPatchedApi(el, 'addEventListener').call(el, 'scroll', listener, {
      passive: true,
    });
    return () => {
      getZoneUnPatchedApi(el, 'removeEventListener').call(
        el,
        'scroll',
        listener,
        { passive: true },
      );
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
  containerSize: number,
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
  scrollTopAfterOffset: number,
) {
  let clamped = containerSize;
  if (scrollTopWithOutOffset < 0) {
    clamped = Math.max(0, containerSize + scrollTopWithOutOffset);
  } else if (scrollTopAfterOffset > 0) {
    clamped = Math.max(0, containerSize - scrollTopAfterOffset);
  }
  return clamped;
}
