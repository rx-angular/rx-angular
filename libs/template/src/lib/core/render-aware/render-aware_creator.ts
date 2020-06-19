import {
  ConnectableObservable,
  EMPTY,
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
  publishReplay,
  switchAll,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { RenderStrategy, StrategySelection } from './interfaces';
import { nameToStrategy } from './nameToStrategy';

export interface RenderAware<U> extends Subscribable<U> {
  nextPotentialObservable: (value: any) => void;
  nextStrategy: (config: string | Observable<string>) => void;
  getStrategy: () => RenderStrategy<U>;
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
}): RenderAware<U | undefined | null> {
  const strategyName$ = new Subject<string | Observable<string>>();
  let strategy: RenderStrategy<U>;
  const strategy$: Observable<RenderStrategy<U>> = strategyName$.pipe(
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
    map(observable$ => {
      if (observable$ === null) {
        return of(null);
      }
      if (!firstTemplateObservableChange) {
        cfg.resetObserver.next();
        if (observable$ === undefined) {
          return of(undefined);
        }
      }
      firstTemplateObservableChange = false;
      return observable$;
    }),
    // forward only observable values
    filter(o$ => o$ !== undefined),
    map(o$ => o$.pipe(distinctUntilChanged(), tap(cfg.updateObserver))),
    switchAll(),
    withLatestFrom(strategy$),
    tap(([v, strat]) => strat.scheduleCD()),
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
    getStrategy: () => strategy,
    subscribe(): Subscription {
      return new Subscription()
        .add((strategy$ as ConnectableObservable<RenderStrategy<U>>).connect())
        .add(renderingEffect$.subscribe());
    }
  };
}
