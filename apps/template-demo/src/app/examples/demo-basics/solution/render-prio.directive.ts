import { Directive, ElementRef, Optional } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, mergeAll } from 'rxjs/operators';
import { LetDirective } from '@rx-angular/template';

function intersectionObserver(
  options?: object
): {
  observe: (target: Element) => void;
  unobserve: (target: Element) => void;
  entries$: Observable<any>;
} {
  const subject = new Subject();
  const observer = observerSupported()
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => subject.next(entry));
      }, options)
    : null;

  const entries$ = new Observable(subscriber => {
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
    unobserve: observer.unobserve
  };
}

const observerSupported = () =>
  typeof window !== 'undefined'
    ? !!(window as any).IntersectionObserver
    : false;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[viewport-prio]'
})
export class RenderPrioDirective {
  entriesSubject = new Subject<IntersectionObserverEntry[]>();
  entries$: Observable<IntersectionObserverEntry> = this.entriesSubject.pipe(
    mergeAll()
  );

  private observer: IntersectionObserver | null = observerSupported()
    ? new IntersectionObserver(entries => this.entriesSubject.next(entries), {
        threshold: 0
      })
    : null;

  visibilityEvents$ = this.entries$.pipe(
    map(entry => {
      if (entry.intersectionRatio > 0) {
        return 'visible';
      } else {
        return 'invisible';
      }
    })
  );

  constructor(
    private readonly el: ElementRef,
    @Optional() letDirective: LetDirective<any>
  ) {
    this.observer.observe(this.el.nativeElement);

    this.visibilityEvents$
      .pipe(map(visibility => (visibility === 'visible' ? 'ɵlocal' : 'noop')))
      .subscribe(strategyName => {
        letDirective.strategy = strategyName;
        letDirective.strategies[strategyName].scheduleCD();
      });
  }
}
