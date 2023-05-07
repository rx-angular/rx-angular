import { Observable } from 'rxjs';

export function observeElementSize(
  element: Element,
  config?: {
    options?: ResizeObserverOptions;
  }
): Observable<DOMRectReadOnly>;
export function observeElementSize<T>(
  element: Element,
  config?: {
    options?: ResizeObserverOptions;
    extract: (entries: ResizeObserverEntry[]) => T;
  }
): Observable<T>;
export function observeElementSize<T>(
  element: Element,
  config?: {
    options?: ResizeObserverOptions;
    extract?: (entries: ResizeObserverEntry[]) => T;
  }
): Observable<T | DOMRectReadOnly> {
  const extractProp: (entries: ResizeObserverEntry[]) => T | DOMRectReadOnly =
    config?.extract ?? ((entries) => entries[0].contentRect);
  return new Observable<T | DOMRectReadOnly>((subscriber) => {
    const observer = new ResizeObserver((entries) => {
      subscriber.next(extractProp(entries));
    });
    observer.observe(element, config?.options);
    return () => observer.disconnect();
  });
}
