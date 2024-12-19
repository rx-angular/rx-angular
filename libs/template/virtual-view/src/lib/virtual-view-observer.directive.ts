import {
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, combineLatest, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, startWith, tap } from 'rxjs/operators';
import { _RxVirtualViewObserver } from './model';
import { RxaResizeObserver } from './resize-observer';
import { VirtualViewCache } from './virtual-view-cache';

@Directive({
  selector: '[rxVirtualViewObserver]',
  standalone: true,
  providers: [
    VirtualViewCache,
    RxaResizeObserver,
    { provide: _RxVirtualViewObserver, useExisting: RxVirtualViewObserver },
  ],
})
export class RxVirtualViewObserver implements OnInit {
  #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  #observer: IntersectionObserver | null = null;

  root = input<ElementRef | HTMLElement | null>();
  rootMargin = input('');
  threshold = input<number | number[]>(0);

  #rootElement = computed(() => {
    const root = this.root();
    if (root) {
      if (root instanceof ElementRef) {
        return root.nativeElement;
      }
      return root;
    } else if (root === null) {
      return null;
    }
    return this.#elementRef.nativeElement;
  });

  #elements = new WeakMap<Element, Subject<boolean>>();

  #forcedHidden$ = new BehaviorSubject(false);

  ngOnInit(): void {
    this.#observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (this.#elements.has(entry.target))
            this.#elements.get(entry.target).next(entry.isIntersecting);
        });
      },
      {
        root: this.#rootElement(),
        rootMargin: this.rootMargin(),
        threshold: this.threshold(),
      },
    );
  }

  hideAll(): void {
    this.#forcedHidden$.next(true);
  }

  showAllVisible(): void {
    this.#forcedHidden$.next(false);
  }

  register(virtualView: HTMLElement) {
    const isVisible$ = new ReplaySubject<boolean>(1);
    this.#elements.set(virtualView, isVisible$);
    this.#observer.observe(virtualView);
    return combineLatest([isVisible$, this.#forcedHidden$]).pipe(
      map(([isVisible, forcedHidden]) => (forcedHidden ? false : isVisible)),
      startWith(false),
      distinctUntilChanged(),
      tap({
        unsubscribe: () => this.#elements.delete(virtualView),
      }),
    );
  }
}
