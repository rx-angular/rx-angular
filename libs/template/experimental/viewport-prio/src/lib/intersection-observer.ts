import { Observable, Subject } from 'rxjs';

let _observerSupported: boolean = undefined;
function observerSupported(): boolean {
  if (_observerSupported !== undefined) {
    return _observerSupported;
  }
  _observerSupported =
    typeof window !== 'undefined'
      ? !!(window as any).IntersectionObserver
      : false;
  return _observerSupported;
};

function intersectionObserver(options?: object): {
  observe: (target: Element) => void;
  unobserve: (target: Element) => void;
  entries$: Observable<any>;
} {
  const subject = new Subject();
  const observer = observerSupported()
    ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => subject.next(entry));
    }, options)
    : null;

  const entries$ = new Observable((subscriber) => {
    subject.subscribe(subscriber);
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  });

  return {
    entries$,
    observe: observer.observe,
    unobserve: observer.unobserve,
  };
}

export function saveCreateIntersectionObserver(callback: IntersectionObserverCallback, cfg: any = {
  threshold: 0,
}): IntersectionObserver | null {
  return observerSupported()
    ? new IntersectionObserver(callback, cfg)
    : null
}
