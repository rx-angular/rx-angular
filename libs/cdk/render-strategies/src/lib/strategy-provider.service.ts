import {
  ChangeDetectorRef,
  Inject,
  Injectable,
  NgZone,
  Optional,
} from '@angular/core';
import {
  BehaviorSubject,
  fromEvent,
  MonoTypeOperatorFunction,
  Observable,
} from 'rxjs';
import { map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import {
  mergeDefaultConfig,
  RX_RENDER_STRATEGIES_CONFIG,
  RxRenderStrategiesConfig,
} from './config';
import { onStrategy } from './onStrategy';
import {
  RxStrategies,
  RxStrategyCredentials,
  RxStrategyNames,
  ScheduleOnStrategyOptions,
} from './model';

/**
 * @description
 * RxStrategyProvider is a wrapper service that you can use to consume strategies and schedule your code execution.
 *
 * @example
 * Component({
 *   selector: 'app-service-communicator',
 *   template: ``
 * });
 * export class ServiceCommunicationComponent {
 *   private currentUserSettings;
 *
 *   constructor(
 *     private strategyProvider: RxStrategyProvider,
 *     private userService: UserService,
 *     private backgroundSync: BackgroundSyncService
 *   ) {
 *     this.userService.fetchCurrentUserSettings
 *       .pipe(
 *         tap(settings => (this.currentUserSettings = settings)),
 *         this.strategyProvider.scheduleWith(
 *           settings => this.backgroundSync.openConnection(settings),
 *           { strategy: 'idle' }
 *         )
 *       )
 *       .subscribe();
 *   }
 * }
 *
 * @docsCategory RxStrategyProvider
 * @docsPage RxStrategyProvider
 */
@Injectable({ providedIn: 'root' })
export class RxStrategyProvider<T extends string = string> {
  private _strategies$ = new BehaviorSubject<RxStrategies<T>>(undefined);
  private _primaryStrategy$ = new BehaviorSubject<
    RxStrategyCredentials<RxStrategyNames<T>>
  >(undefined);

  private readonly _cfg: Required<RxRenderStrategiesConfig<T>>;

  /**
   * @description
   * Returns current `RxAngularConfig` used in the service.
   * Config includes:
   * - strategy that currently in use - `primaryStrategy`
   * - array of custom user defined strategies - `customStrategies`
   * - setting that is responsible for running in our outside of the zone.js - `patchZone`
   */
  get config(): Required<RxRenderStrategiesConfig<T>> {
    return this._cfg;
  }

  /**
   * @description
   * Returns object that contains key-value pairs of strategy names and their credentials (settings) that are available in the service.
   */
  get strategies(): RxStrategies<T> {
    return this._strategies$.getValue();
  }

  /**
   * @description
   * Returns an array of strategy names available in the service.
   */
  get strategyNames(): string[] {
    return Object.values(this.strategies).map((s) => s.name);
  }

  /**
   * @description
   * Returns current strategy of the service.
   */
  get primaryStrategy(): RxStrategyNames<T> {
    return this._primaryStrategy$.getValue().name;
  }

  /**
   * @description
   * Set's the strategy that will be used by the service.
   */
  set primaryStrategy(strategyName: RxStrategyNames<T>) {
    this._primaryStrategy$.next(
      <RxStrategyCredentials<RxStrategyNames<T>>>this.strategies[strategyName]
    );
  }

  /**
   * @description
   * Current strategy of the service as an observable.
   */
  readonly primaryStrategy$: Observable<RxStrategyCredentials> =
    this._primaryStrategy$.asObservable();

  /**
   * @description
   * Returns observable of an object that contains key-value pairs of strategy names and their credentials (settings) that are available in the service.
   */
  readonly strategies$ = this._strategies$.asObservable();

  /**
   * @description
   * Returns an observable of an array of strategy names available in the service.
   */
  readonly strategyNames$ = this.strategies$.pipe(
    map((strategies) => Object.values(strategies).map((s) => s.name)),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  /**
   * @internal
   */
  constructor(
    @Optional()
    @Inject(RX_RENDER_STRATEGIES_CONFIG)
    cfg: RxRenderStrategiesConfig<T>
  ) {
    this._cfg = mergeDefaultConfig(cfg);
    this._strategies$.next(this._cfg.customStrategies as any);
    this.primaryStrategy = this.config.primaryStrategy;
  }

  /**
   * @description
   * Allows to schedule a work inside rxjs `pipe`. Accepts the work and configuration options object.
   * - work is any function that should be executed
   * - (optional) options includes strategy, patchZone and scope
   *
   * Scope is by default a subscription but you can also pass `this` and then the scope will be current component.
   * Scope setup is useful if your work is some of the methods of `ChangeDetectorRef`. Only one change detection will be triggered if you have multiple schedules of change detection methods and scope is set to `this`.
   *
   * @example
   * myObservable$.pipe(
   *    this.strategyProvider.scheduleWith(() => myWork(), {strategy: 'idle', patchZone: false})
   * ).subscribe();
   *
   * @return MonoTypeOperatorFunction<R>
   */
  scheduleWith<R>(
    work: (v?: R) => void,
    options?: ScheduleOnStrategyOptions
  ): MonoTypeOperatorFunction<R> {
    const strategy = this.strategies[options?.strategy || this.primaryStrategy];
    const scope = options?.scope || {};
    const _work = getWork(work, options?.patchZone);
    const ngZone = options?.patchZone || undefined;
    return (o$) =>
      o$.pipe(
        switchMap((v) =>
          onStrategy(
            v,
            strategy,
            (_v) => {
              _work(_v);
            },
            { scope, ngZone }
          )
        )
      );
  }

  /**
   * @description
   * Allows to schedule a work as an observable. Accepts the work and configuration options object.
   * - work is any function that should be executed
   * - (optional) options includes strategy, patchZone and scope
   *
   * Scope is by default a subscription but you can also pass `this` and then the scope will be current component.
   * Scope setup is especially useful if you provide work that will trigger a change detection.
   *
   * @example
   * this.strategyProvider.schedule(() => myWork(), {strategy: 'idle', patchZone: false}).subscribe();
   *
   * @return Observable<R>
   */
  schedule<R>(
    work: () => R,
    options?: ScheduleOnStrategyOptions
  ): Observable<R> {
    const strategy = this.strategies[options?.strategy || this.primaryStrategy];
    const scope = options?.scope || {};
    const _work = getWork(work, options?.patchZone);
    const ngZone = options?.patchZone || undefined;
    let returnVal: R;
    return onStrategy(
      null,
      strategy,
      () => {
        returnVal = _work();
      },
      { scope, ngZone }
    ).pipe(map(() => returnVal));
  }

  /**
   * @description
   * Allows to schedule a change detection cycle. Accepts the ChangeDetectorRef and configuration options object.
   * Options include:
   * - afterCD which is the work that should be executed after change detection cycle.
   * - abortCtrl is an AbortController that you can use to cancel the scheduled cycle.
   *
   * @example
   * this.strategyProvider.scheduleCd(this.changeDetectorRef, {afterCD: myWork()});
   *
   * @return AbortController
   */
  scheduleCD(
    cdRef: ChangeDetectorRef,
    options?: ScheduleOnStrategyOptions & {
      afterCD?: () => void;
      abortCtrl?: AbortController;
    }
  ): AbortController {
    const strategy = this.strategies[options?.strategy || this.primaryStrategy];
    const scope = options?.scope || cdRef;
    const abC = options?.abortCtrl || new AbortController();
    const ngZone = options?.patchZone || undefined;
    const work = getWork(() => {
      strategy.work(cdRef, scope);
      if (options?.afterCD) {
        options.afterCD();
      }
    }, options.patchZone);
    onStrategy(
      null,
      strategy,
      () => {
        work();
      },
      { scope, ngZone }
    )
      .pipe(takeUntil(fromEvent(abC.signal, 'abort')))
      .subscribe();
    return abC;
  }
}

function getWork<T>(
  work: (args?: any) => T,
  patchZone?: false | NgZone
): (args?: any) => T {
  let _work = work;
  if (patchZone) {
    _work = (args?: any) => patchZone.run(() => work(args));
  }
  return _work;
}
