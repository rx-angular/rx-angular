import {
  BehaviorSubject,
  ConnectableObservable,
  EMPTY,
  isObservable,
  NextObserver,
  Observable,
  of,
  Subject,
  Subscribable,
  Subscription
} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  publish,
  publishReplay,
  startWith,
  switchAll,
  switchMap,
  tap
} from 'rxjs/operators';
import { DEFAULT_STRATEGY_NAME } from '../../render-strategies/strategies/strategies-map';
import { RenderStrategy, StrategySelection } from './interfaces';
import { nameToStrategy } from './nameToStrategy';

export interface RenderAware<U> extends Subscribable<U> {
  nextPotentialObservable: (value: any) => void;
  nextStrategy: (config: string | Observable<string>) => void;
}

/**
 * RenderAware
 *
 * @description
 * This function returns an object that holds all the shared logic for the push pipe and the let directive
 * responsible for change detection
 * If you extend this class you need to implement how the update of the rendered value happens.
 * Also custom behaviour is something you need to implement in the extending class
 */
export function createRenderAware<U>(cfg: {
  strategies: StrategySelection<U>;
  resetObserver: NextObserver<void>;
  updateObserver: NextObserver<U>;
  defaultStrategy: string;
}): RenderAware<U | undefined | null> {
  let strategy: RenderStrategy<U>;
  const strategyName$ = new Subject<string | Observable<string>>();
  const updateStrategyEffect$: Observable<RenderStrategy<
    U
  >> = strategyName$.pipe(
    startWith(DEFAULT_STRATEGY_NAME),
    distinctUntilChanged(),
    switchMap(stringOrObservable =>
      typeof stringOrObservable === 'string'
        ? of(stringOrObservable)
        : stringOrObservable
    ),
    nameToStrategy(cfg.strategies),
    tap(s => (strategy = s)),
    publishReplay(1)
  );

  const observablesFromTemplate$ = new Subject<Observable<U>>();
  const valuesFromTemplate$ = observablesFromTemplate$.pipe(
    distinctUntilChanged()
  );
  let firstTemplateObservableChange = true;
  const renderingEffect$ = valuesFromTemplate$.pipe(
    // handle null | undefined assignment and new Observable reset
    tap(observable$ => {
      if (!firstTemplateObservableChange || observable$ === null) {
        if (observable$ === null) {
          cfg.updateObserver.next(observable$ as any);
        } else {
          cfg.resetObserver.next();
        }
        strategy.scheduleCD();
      }
      firstTemplateObservableChange = false;
    }),
    // forward only observable values
    filter(o$ => isObservable(o$)),
    map(o$ =>
      o$.pipe(
        distinctUntilChanged(),
        tap(cfg.updateObserver),
        strategy.behavior
      )
    ),
    switchAll(),
    tap(() => strategy.renderMethod()),
    catchError(e => {
      console.error(e);
      return EMPTY;
    })
  );

  return {
    nextPotentialObservable(value: any): void {
      observablesFromTemplate$.next(value);
    },
    nextStrategy(nextConfig: string | Observable<string>): void {
      strategyName$.next(nextConfig);
    },
    subscribe(): Subscription {
      return new Subscription()
        .add(
          (updateStrategyEffect$ as ConnectableObservable<
            RenderStrategy<U>
          >).connect()
        )
        .add(renderingEffect$.subscribe());
    }
  };
}
