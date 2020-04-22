import {
  BehaviorSubject,
  EMPTY,
  NextObserver,
  Observable,
  of,
  PartialObserver,
  Subject,
  Subscribable,
  Subscription
} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  mergeAll,
  switchMap,
  tap
} from 'rxjs/operators';
import { nameToStrategy } from './nameToStrategy';
import { RenderStrategy, DEFAULT_STRATEGY_NAME } from './strategies';

export interface StrategySelection<U> {
  [strategy: string]: RenderStrategy<U>;
}

export interface RenderAware<U> extends Subscribable<U> {
  nextPotentialObservable: (value: any) => void;
  nextStrategy: (config: string | Observable<string>) => void;
}

/**
 * class RenderAware
 *
 * @description
 * This abstract class holds all the shared logic for the push pipe and the let directive
 * responsible for change detection
 * If you extend this class you need to implement how the update of the rendered value happens.
 * Also custom behaviour is something you need to implement in the extending class
 */
export function createRenderAware<U>(cfg: {
  strategies: StrategySelection<U>;
  resetObserver: NextObserver<void>;
  updateObserver: NextObserver<U>;
}): RenderAware<U | undefined | null> {
  let strategy: RenderStrategy<U>;
  const strategyName$ = new BehaviorSubject<string | Observable<string>>(
    DEFAULT_STRATEGY_NAME
  );
  const updateStrategyEffect$: Observable<RenderStrategy<
    U
  >> = strategyName$.pipe(
    switchMap(stringOrObservable =>
      typeof stringOrObservable === 'string'
        ? of(stringOrObservable)
        : stringOrObservable.pipe(mergeAll())
    ),
    nameToStrategy(cfg.strategies),
    tap(s => (strategy = s))
  );

  const observablesFromTemplate$ = new Subject<Observable<U>>();
  const renderingEffect$ = observablesFromTemplate$.pipe(
    distinctUntilChanged(),
    tap(observable$ => {
      if (observable$ === null) {
        cfg.updateObserver.next(observable$ as any);
      } else {
        cfg.resetObserver.next();
      }
      strategy.render();
    }),
    map(o$ =>
      o$.pipe(
        distinctUntilChanged(),
        tap(cfg.updateObserver.next),
        strategy.behaviour()
      )
    ),
    switchMap(observable$ => (observable$ == null ? EMPTY : observable$)),
    distinctUntilChanged(),
    tap(() => strategy.render()),
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
        .add(updateStrategyEffect$.subscribe())
        .add(renderingEffect$.subscribe());
    }
  } as RenderAware<U | undefined | null>;
}
