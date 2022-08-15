import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { coerceObservableWith } from '@rx-angular/cdk/coercing';
import { RxNotification } from '@rx-angular/cdk/notifications';
import { LetDirective } from '@rx-angular/template/let';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  Subject,
  Subscription,
} from 'rxjs';
import { filter, map, mergeAll, withLatestFrom } from 'rxjs/operators';
import { saveCreateIntersectionObserver } from './intersection-observer';

type IntersectionRatio = Pick<IntersectionObserverEntry, 'intersectionRatio'>;

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[viewportPrio]',
})
export class ViewportPrioDirective implements OnInit, OnDestroy {
  subscription = new Subscription();
  /* internal */
  // Note that we're picking only the `intersectionRatio` property
  // since this is the only property that we're intersted in.
  private entriesSubject = new Subject<IntersectionRatio[]>();

  /* internal */
  private entries$: Observable<IntersectionRatio> = this.entriesSubject.pipe(mergeAll());

  /* internal */
  private viewportPrioObservables = new BehaviorSubject<
    Observable<string> | string
  >(of('noop'));

  /* internal */
  private internalViewportPrio = this.viewportPrioObservables.pipe(
    coerceObservableWith(),
    mergeAll(),
    // @TODO add comment
    map((v) => (!v ? 'noop' : v))
  );

  /* internal */
  // The directives host intersection observer
  private observer: IntersectionObserver | null =
    saveCreateIntersectionObserver((entries) => {
      this.entriesSubject.next(entries);
    });

  /* internal */
  // A stream of visibility events from the host element
  private visibilityState$ = this.entries$.pipe(
    map((entry) => {
      if (entry.intersectionRatio > 0) {
        return true;
      } else {
        return false;
      }
    })
  );

  @Input('viewportPrio')
  set viewportPrio(prio: string | Observable<string>) {
    this.viewportPrioObservables.next(prio);
  }

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private strategyProvider: RxStrategyProvider,
    @Inject(LetDirective)
    @Optional()
    private letDirective: LetDirective<any> | null
  ) {}

  /* internal */
  ngOnInit() {
    const letStrategyName$ = this.strategyProvider.primaryStrategy$.pipe(
      map(({ name }) => name)
    );

    let lastNextNotification: RxNotification<any> = undefined;
    let lastRenderedValue: any = undefined;

    this.subscription.add(
      this.letDirective.values$.subscribe((v) => {
        if (v.kind === 'next') {
          lastNextNotification = v;
        }
      })
    );

    this.subscription.add(
      this.visibilityState$
        .pipe(
          withLatestFrom(
            combineLatest(letStrategyName$, this.internalViewportPrio).pipe(
              filter(([newN, oldN]) => newN !== oldN)
            )
          ),
          map(([visibility, strategyNames]) => {
            const [inStrategyName, outStrategyName] = strategyNames;
            return visibility
              ? [visibility, inStrategyName]
              : [visibility, outStrategyName];
          })
        )
        .subscribe(([visibility, strategyName]) => {
          // @Todo add comments
          if (this.letDirective !== null) {
            this.letDirective.strategy = strategyName as string;
          }

          // @Todo add comments
          if (visibility && lastRenderedValue !== lastNextNotification.value) {
            // render actual state on viewport enter
            this.letDirective.templateNotification$.next(lastNextNotification);
            lastRenderedValue = lastNextNotification.value;
          }
        })
    );

    // @TODO add an early exit for browsers that dont support intersection observer

    // If the browser doesn't support the `IntersectionObserver` or we're inside
    // the Node.js environment, then this will throw an exception that property
    // `observe` doesn't exist on `null`.
    if (this.observer !== null) {
      this.observer.observe(this.el.nativeElement);
    } else {
      // If we're inside the Node.js environment then this should be
      // rendered (e.g. for SEO purposes), and when running this code in Browser
      // it will decide itself to render it or not.
      this.entriesSubject.next([{ intersectionRatio: 1 }]);
    }
  }

  /* internal */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
