import {
  ChangeDetectorRef,
  Directive, ElementRef,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef, ɵdetectChanges as detectChanges,
} from '@angular/core';

import {
  ConnectableObservable,
  EMPTY,
  isObservable, merge,
  Observable,
  of,
  ReplaySubject,
  Subscription,
} from 'rxjs';

import {
  applyStrategy2, asap,
  createTemplateManager, extractProjectionViews, getTNode,
  nameToStrategyCredentials, renderProjectionParents, onStrategy,
  RenderWork,
  select,
  StrategyCredentialsMap,
  StrategyProvider,
  TemplateManager,
} from '../../../cdk';
import { RxIfTemplateNames, rxIfTemplateNames, RxIfViewContext } from './model';
import {
  catchError, delay,
  distinctUntilChanged, filter,
  map,
  mergeAll,
  publishReplay,
  scan, switchMap, tap, withLatestFrom,
} from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxIf]',
})
export class RxIf<U> implements OnInit, OnDestroy {
  readonly strategies: StrategyCredentialsMap;

  observablesSubject$ = new ReplaySubject<
    Observable<{ isTrue: U; strategyName: string }>
  >(1);

  private subscription = new Subscription();
  private readonly templateManager: TemplateManager<
    RxIfViewContext<boolean | undefined | null>,
    rxIfTemplateNames
  >;

  state$ = this.observablesSubject$
    .pipe(
      distinctUntilChanged(), mergeAll(),
      scan((state, slice) => ({ ...state, ...slice }), {} as any),
      catchError((e) => {
        console.error(e);
        return EMPTY;
      }),
      publishReplay(1)
    );

  @Input()
  set rxIf(potentialObservable: Observable<U> | U | null | undefined) {
    this.connect('isTrue', potentialObservable);
  }

  @Input('rxIfParent') renderParent = true;

  @Input('rxIfStrategy')
  set strategy(strategyName: Observable<string> | string | null | undefined) {
    this.connect('strategyName', strategyName);
  }

  @Input('rxIfElse')
  set else(templateRef: TemplateRef<any>) {
    if (templateRef) {
      this.templateManager.addTemplateRef(RxIfTemplateNames.else, templateRef);
    }
  }

  private readonly isTrue$ = this.state$.pipe(select('isTrue'));
  private readonly strategy$ = this.state$.pipe(
    select('strategyName'),
    nameToStrategyCredentials(
      this.strategyProvider.strategies,
      this.strategyProvider.primaryStrategy
    )
  );

  constructor(
    private strategyProvider: StrategyProvider,
    private cdRef: ChangeDetectorRef,
    private eRef: ElementRef<Comment>,
    private readonly thenTemplateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    this.templateManager = createTemplateManager(
      this.viewContainerRef,
      {} as any
    );
    this.subscription.add(
      (this.state$ as ConnectableObservable<any>).connect()
    );
    this.connect('strategyName', this.strategyProvider.primaryStrategy);
  }

  ngOnInit() {
    const tNode = getTNode(this.cdRef, this.eRef.nativeElement);
    this.subscription.add(
      this.templateManager.templateChanged$
        .pipe(
          delay(0, asap),
          filter(() => this.renderParent),
          renderProjectionParents(this.cdRef, tNode, this.strategy$)
        )
        .subscribe()
    );
    this.templateManager.addTemplateRef(
      RxIfTemplateNames.then,
      this.thenTemplateRef
    );
    this.subscription.add(
      this.isTrue$
        .pipe(
          // tslint:disable-next-line:triple-equals
          distinctUntilChanged(),
          map(coerceBooleanProperty),
          applyStrategy2(
            this.strategy$,
            this.rxIfWorkFactory,
            this.viewContainerRef
          )
        )
        .subscribe()
    );
  }

  private connect<T>(
    key: 'strategyName' | 'isTrue',
    slice$: Observable<string | U> | string |  U
  ) {
    this.observablesSubject$.next(
      (isObservable(slice$) ? slice$ : of(slice$)).pipe(
        map((value) => ({ ...{}, [key]: value }))
      ) as any
    );
  }

  ngOnDestroy() {
    this.templateManager.destroy();
    this.subscription.unsubscribe();
  }

  rxIfWorkFactory = (value: any, work: RenderWork) => {
    const templateName = value
      ? RxIfTemplateNames.then
      : RxIfTemplateNames.else;
    const elseView = this.templateManager.getEmbeddedView(templateName);
    if(elseView) {
      this.templateManager.displayView(templateName);
      this.templateManager.updateViewContext({
        $implicit: value,
        rxIf: value,
      });
      work(elseView, elseView);
    } else {
      this.templateManager.displayView(null);
    }
    work(this.cdRef, (this.cdRef as any)?.context || this.cdRef);
  };
}
