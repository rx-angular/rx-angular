import {
  ChangeDetectorRef,
  Directive,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  ViewContainerRef,
  ɵmarkDirty as markDirty
} from '@angular/core';
import {
  coalesceWith,
  createTemplateManager,
  priorityTickMap,
  rxMaterialize,
  RxNotification,
  RxTemplateObserver,
  RxViewContext,
  SchedulingPriority,
  TemplateManager,
  RxNotificationKind
} from '@rx-angular/template';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { Observable, ObservableInput, of, ReplaySubject, Subscription, Unsubscribable } from 'rxjs';
import { publish, switchMap, tap } from 'rxjs/operators';
import {
  globalTaskManager,
  GlobalTaskPriority
} from '../../../../shared/render-stragegies/render-queue/global-task-manager';
import { RxChangeDetectorRef } from '../../../../shared/rx-change-detector-ref/rx-change-detector-ref.service';
import { RX_CUSTOM_STRATEGIES } from './custom-strategies-token';
import { RX_DEFAULT_STRATEGY } from './default-strategy-token';
import { ngInputFlatten } from '../../../../shared/utils/ngInputFlatten';
import { nameToStrategyConfig, RenderBehavior } from './strategy-handling';

export interface LetViewContext<T> extends RxViewContext<T> {
  // to enable `as` syntax we have to assign the directives selector (var as v)
  rxLet: T;
}

export interface StrategyCredentials {
  name: string;
  work: (cdRef, context) => void
  behavior?: RenderBehavior
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[rxLet]',
  exportAs: 'renderNotifier',
  providers: [RxChangeDetectorRef]
})
export class LetPocDirective<U> implements OnInit, OnDestroy {
  static ngTemplateGuard_rxLet: 'binding';

  @Input()
  set rxLet(potentialObservable: ObservableInput<U> | null | undefined) {
    this.observable$Subject$.next(potentialObservable);
  }

  @Input('rxLetStrategy')
  set strategy(strategyName: string | Observable<string>) {
    this.strategy$Subject$.next(strategyName);
  }

  @Input('rxLetRxComplete')
  set rxComplete(
    templateRef: TemplateRef<LetViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef('rxComplete', templateRef);
  }

  @Input('rxLetRxError')
  set rxError(
    templateRef: TemplateRef<LetViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef('rxError', templateRef);
  }

  @Input('rxLetRxSuspense')
  set rxSuspense(
    templateRef: TemplateRef<LetViewContext<U | undefined | null> | null>
  ) {
    this.templateManager.addTemplateRef('rxSuspense', templateRef);
  }

  private subscription: Unsubscribable = Subscription.EMPTY;
  private strategyChangeSubscription: Unsubscribable = Subscription.EMPTY;

  private readonly templateManager: TemplateManager<LetViewContext<U | undefined | null>,
    RxNotificationKind>;

  private readonly initialViewContext: LetViewContext<U> = {
    $implicit: undefined,
    rxLet: undefined,
    $rxError: false,
    $rxComplete: false,
    $rxSuspense: false
  };

  observable$Subject$ = new ReplaySubject(1);
  observable$ = this.observable$Subject$.pipe(
    ngInputFlatten()
  );
  strategy$Subject$ = new ReplaySubject<string | Observable<string>>(1);
  strategy$: Observable<StrategyCredentials> = this.strategy$Subject$.pipe(
    ngInputFlatten(),
    nameToStrategyConfig()
  );

  private readonly templateObserver: RxTemplateObserver<U | null | undefined> = {
    suspense: () => {
      this.displayInitialView();
      this.templateManager.updateViewContext({
        $implicit: undefined,
        rxLet: undefined,
        $rxError: false,
        $rxComplete: false,
        $rxSuspense: true
      });
    },
    next: (value: U | null | undefined) => {
      this.templateManager.displayView('rxNext');
      this.templateManager.updateViewContext({
        $implicit: value,
        rxLet: value
      });
    },
    error: (error: Error) => {
      // fallback to rxNext when there's no template for rxError
      this.templateManager.hasTemplateRef('rxError')
        ? this.templateManager.displayView('rxError')
        : this.templateManager.displayView('rxNext');
      this.templateManager.updateViewContext({
        $rxError: error
      });
    },
    complete: () => {
      // fallback to rxNext when there's no template for rxComplete
      this.templateManager.hasTemplateRef('rxComplete')
        ? this.templateManager.displayView('rxComplete')
        : this.templateManager.displayView('rxNext');
      this.templateManager.updateViewContext({
        $rxComplete: true
      });
    }
  };

  /** @internal */
  static ngTemplateContextGuard<U>(
    dir: LetPocDirective<U>,
    ctx: unknown | null | undefined
  ): ctx is LetViewContext<U> {
    return true;
  }

  constructor(
    @Optional()
    @Inject(RX_CUSTOM_STRATEGIES)
    private customStrategies: StrategyCredentials[],
    @Inject(RX_DEFAULT_STRATEGY) private defaultStrategy: string,
    public cdRef: ChangeDetectorRef,
    private readonly nextTemplateRef: TemplateRef<LetViewContext<U>>,
    private readonly viewContainerRef: ViewContainerRef
  ) {
    this.templateManager = createTemplateManager(
      this.viewContainerRef,
      this.initialViewContext
    );
  }

  ngOnInit() {
    this.templateManager.addTemplateRef('rxNext', this.nextTemplateRef);
    this.displayInitialView();
    this.subscription = this.observable$
      .pipe(
        tap((value: any) => this.templateObserver.next(value)),
        rxMaterialize(),
        applyStrategy(this.strategy$, (this.cdRef as any).context, this.templateManager.getEmbeddedView)
      )
      .subscribe();
  }

  /** @internal */
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.strategyChangeSubscription.unsubscribe();
    this.templateManager.destroy();
  }

  /** @internal */
  private displayInitialView = () => {
    // Display "suspense" template if provided
    if (this.templateManager.hasTemplateRef('rxSuspense')) {
      this.templateManager.displayView('rxSuspense');
    }
  };
}

/**
 * VIEW RENDERING
 *
 * Global - only works with component,
 * Noop - not needed,
 * Native - works only with ChangeDetectorRef,
 * Local - needs to coalesce embeddedViews, scoping is not necessary (only in pipes)
 * Detach - could be a problem in switching from and to it,
 *
 * SCHEDULING
 *
 * Global - not yet configurable,
 * Noop - not needed,
 * Native - not configurable,
 * Local - fully configurable
 */

function renderByStrategyName(
  renderMethod: string,
  detach: boolean,
  queued: boolean,
  evCdRef,
  context
): void {
  switch (renderMethod) {
    case 'detectChanges':
      const work = () => {
        if (detach) {
          evCdRef.reattach();
        }
        evCdRef.detectChanges();
        if (detach) {
          evCdRef.detach();
        }
      };
      if (queued) {
        globalTaskManager.scheduleTask({
          priority: GlobalTaskPriority.chunk,
          scope: evCdRef,
          work
        });
      } else {
        work();
      }
      break;
    case 'markDirty':
      // could be solved with intermediate last strategy
      evCdRef.reattach();
      markDirty(context);
      break;
    case 'markForCheck':
      // could be solved with intermediate last strategy
      evCdRef.reattach();
      evCdRef.markForCheck();
      break;
    case 'noop':
    // do nothing
  }
}

function scheduleByPriority<T>(
  prio: SchedulingPriority
): (o$: Observable<T>) => Observable<T> {
  return (o$) => {
    switch (prio) {
      case SchedulingPriority.sync:
        return o$;
      default:
        return o$.pipe(coalesceWith(priorityTickMap[prio]));
    }
  };
}

function applyStrategy<T>(
  credentials$: Observable<StrategyCredentials>,
  context,
  getEmbeddedView
): (o$: Observable<RxNotification<T>>) => Observable<RxNotification<T>> {
  return notification$ => notification$.pipe(
    publish((n$) =>
      credentials$.pipe(
        switchMap((credentials) => n$.pipe(
          switchMap(n => {
            const work = () => credentials.work(getEmbeddedView(n.kind), context);
            return of(n).pipe(credentials.behavior(work, context));
          })
          )
        )
      )
    )
  );
}
