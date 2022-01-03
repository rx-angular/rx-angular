import { Observable } from 'rxjs';

export function observeElementSize(
  element: Element,
  property?: keyof DOMRectReadOnly
): Observable<number | DOMRectReadOnly> {
  const extractProp = property
    ? (contentRect) => contentRect[property]
    : (contentRect) => contentRect;
  return new Observable<number | DOMRectReadOnly>((subscriber) => {
    const observer = new ResizeObserver((entries) => {
      subscriber.next(extractProp(entries[0].contentRect));
    });
    observer.observe(element);
    return () => observer.disconnect();
  });
}
