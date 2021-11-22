import { Directive, ElementRef, Inject, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { coerceObservableWith } from '@rx-angular/cdk/coercing';
import { RxNotification } from '@rx-angular/cdk/notifications';
import { LetDirective } from '@rx-angular/template/let';
import { BehaviorSubject, combineLatest, Observable, of, Subject, tap } from 'rxjs';
import { filter, map, mergeAll, withLatestFrom } from 'rxjs/operators';

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
    unobserve: observer.unobserve
  };
}

const observerSupported = () =>
  typeof window !== 'undefined'
    ? !!(window as any).IntersectionObserver
    : false;

@Directive({
  /**
   * @todo: use camelcase for directive selector.
   * @todo: deprecate [viewport-prio] + add camelcase support.
   */
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[viewport-prio]'
})
export class ViewportPrioDirective implements OnInit, OnDestroy {
  // Note that we're picking only the `intersectionRatio` property
  // since this is the only property that we're intersted in.
  entriesSubject = new Subject<Pick<IntersectionObserverEntry, 'intersectionRatio'>[]>();

  entries$: Observable<Pick<IntersectionObserverEntry, 'intersectionRatio'>> =
    this.entriesSubject.pipe(mergeAll());

  _viewportPrioObservables = new BehaviorSubject<Observable<string> | string>(
    of('noop')
  );
  _viewportPrio = this._viewportPrioObservables.pipe(
    coerceObservableWith(),
    mergeAll(),
    map((v) => (!v ? 'noop' : v))
  );
  @Input('viewport-prio')
  set viewportPrio(prio: string | Observable<string>) {
    this._viewportPrioObservables.next(prio);
  }

  private observer: IntersectionObserver | null = observerSupported()
    ? new IntersectionObserver(
      (entries) => {
        this.entriesSubject.next(entries);
      },
      {
        threshold: 0
      }
    )
    : null;

  visibilityEvents$ = this.entries$.pipe(
    map((entry) => {
      if (entry.intersectionRatio > 0) {
        return 'visible';
      } else {
        return 'invisible';
      }
    })
  );

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private strategyProvider: RxStrategyProvider,
    @Inject(LetDirective)
    @Optional()
    private letDirective: LetDirective<any> | null
  ) {
  }

  ngOnInit() {
    const letStrategyName$ = this.strategyProvider.primaryStrategy$.pipe(
      map(({ name }) => name)
    );

    let lastValue = undefined;
    // @TODO add a connect here to get rid of the subscribe
    this.letDirective.values$
      .pipe(filter((n: RxNotification<any>) => n.kind === 'next'))
      .subscribe((v) => {
        lastValue = v;
      });


    this.visibilityEvents$
      .pipe(
        withLatestFrom(
          combineLatest(letStrategyName$, this._viewportPrio).pipe(
            filter(([newN, oldN]) => newN !== oldN)
          )),
        map(([visibility, strategyNames]) => {
        const [inStrategyName, outStrategyName] = strategyNames
         return visibility === 'visible'
            ? [visibility, inStrategyName]
            : [visibility, outStrategyName]
        })
      )
      .subscribe(([visibility, strategyName]) => {
        if (this.letDirective !== null) {
          this.letDirective.strategy = strategyName as string;
        }

        if (visibility === 'visible') {
          // render actual state on viewport enter
          //  this.letDirective.templateNotification$.next(lastValue);
        }
      });

    // If the browser doesn't support the `IntersectionObserver` or we're inside
    // the Node.js environment, then this will throw an exception that property
    // `observe` doesn't exist on `null`.
    if (this.observer !== null) {
      this.observer.observe(this.el.nativeElement);
    } else {
      // If we're inside the Node.js environment then this should be
      // rendered (e.g. for SEO purposes), and when running this code in browser
      // it will decide itself to render it or not.
      this.entriesSubject.next([{ intersectionRatio: 1 }]);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
