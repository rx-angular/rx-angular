import { Observable } from 'rxjs';

export function observeElementSize<T>(
  element: Element,
  extract?: (entries: ResizeObserverEntry[]) => T,
  options?: ResizeObserverOptions
): Observable<T | DOMRectReadOnly> {
  const extractProp: (entries: ResizeObserverEntry[]) => T | DOMRectReadOnly =
    extract ? extract : (entries) => entries[0].contentRect;
  return new Observable<T | DOMRectReadOnly>((subscriber) => {
    const observer = new ResizeObserver((entries) => {
      subscriber.next(extractProp(entries));
    });
    observer.observe(element, options);
    return () => observer.disconnect();
  });
}
